showme("preparing TracksCreator.js");
function tracks_path_counter(c,vz,gh){
    var rez;
    var t0 = vec_maker(c);
    var t1 = vec_maker(geo.dotXDoffset(c,vz,-gh));
    rez = bez_maker_from_vectors([t0,t0,t1,t1]);
    return rez.getPoints();
}


function tracks_shape_counter(gt,c,vn,va,one_gw,one_gh){
    var rez;
    if (gt == "|||"){rez = gs1(c,one_gw,one_gh,vn,va);}
    else if (gt == "ooo"){rez = gs4(c,one_gw,one_gh,vn,va);}
    return rez;
}

function track_angles_counter(s6){
    rez = [];
    for (var i = 0;i < s6;i++){ rez.push(90); }
    return rez;
}

function tracks_center_dots_counter( c,vn,vz, r, nw, na, gw, one_gw ){
    //new polygon code, now it straight line with dots
    var cdot = geo.dotXDoffset(c,vz,r);
    var flatstep = Math.PI * 2 * r / na;
    var howmuch = Math.floor( na/2); // howmuch steps both side from center
    
    if (howmuch < 1) { howmuch = 1; } //fix it later na must be > 0
    var zcoor = geo.steps_external(cdot[2],cdot[2]+flatstep,howmuch,0); //z coordinates for dots
    zcoor.pop(); //cut last to balance both sides
    var polygon = [];
    for ( i=0; i<zcoor.length; i++){polygon.push([cdot[0],cdot[1],zcoor[i]]);}
    
    var offsets = column_internal(one_gw,nw,gw);//side offsets(along vn)
    var rez = [];
    for (var ip = 0;ip < polygon.length;ip++){
        var xrez=[];
        for (var io = 0;io < offsets.length;io++){
            xrez.push(geo.dotXDoffset(polygon[ip],vn,offsets[io]));
        }rez.push(xrez);
    }return rez; //list of center dots lists for each polygon vertex
}

function track_maker(dot,u,gp,gs,c,vn,va,vz,ns,gh,gt,ind,fullind){
    var mat = tracks_mat;
    
    var scaling = function(i, distance) { return 1; };
    if (gt == "|||" || gt == "ooo"){
        if (ns){
            scaling = function(i, distance) {
                if (distance < gh){ return distance / gh; }else{ return 1; }
            };
        }
    }
    var gripSettings={
		shape: gs,
		path: gp,
		cap: 3, 
		scaleFunction: scaling
		
	};
    var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("track"+fullind.toString(), gripSettings, scene);
    
    extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(u));
    
    extruded.position = vec_maker(dot);
    extruded.material = mat;
    return extruded;
}

function zigzag_ribbon_track_maker(c, cdot, vn, ns, gn, gd, gw, gh, global_ind){
    // console.log("c",c,"cdot",cdot,"vn",vn,"ns",ns,"gn",gn,"gd",gd,"gw",gw,"gh",gh,"ind",global_ind);//ok
    var ew = gw / gn; //contour width
    var eh = 2 * gh / 3; //contour height
    var co = gh / 3; // contour offset
    var vr = geo.vecXD(c,cdot); //vec from center to radius dot
    // cdot = geo.dotXDoffset(cdot,vr,gd/2);//offset from center to longest grip dot
    var va = geo.vec3Dnormal(vn,vr); // vec around wheel direction up axis
    // console.log("vr",vr,"va",va);//ok
    var dx0 = -gw / 2;//start offset along side axis vn
    var dy0 = -gh / 2;//start offset along up axis va
    
    var dot0 = geo.dotXDoffset(cdot,vn,dx0);
    dot0 = geo.dotXDoffset(dot0,va,dy0);//start dot for zigzag contour
    // console.log("dot0",dot0);//ok
    var zigzag = [];
    for (var i = 0;i < gn;i++){
        var dot1 = geo.dotXDoffset(dot0,vn,ew);
        //чет нечет
        if(i % 2) {/*1dn*/ dot1 = geo.dotXDoffset(dot1,va,-eh); }else{/*2up*/ dot1 = geo.dotXDoffset(dot1,va,eh); }
        var strait_arc = geo.line3D_2dots(dot0,dot1);
        zigzag.push(strait_arc);
        dot0 = dot1;
    }
    // console.log("zigzag",zigzag);//ok
    // showPathArray([bez_maker([c,c,cdot,cdot]).getPoints()]);
    //mirror if need_scale == true
    var rdot = geo.dotXDoffset(cdot,va,-co / 2);
    if (ns) { for(var i = 0;i < zigzag.length;i++) { zigzag[i] = geo.curve3Drotate(zigzag[i],rdot,vn,180); } }
    // console.log("zigzag",zigzag)//ok
    
    //second contour for grip cap ribbon
    var zigzag_cap = [];
    for(var i = 0;i < zigzag.length;i++) { zigzag_cap.push( geo.curve3Doffset(zigzag[i],va,co) ); }
    // console.log("zig",zigzag); // ok
    // console.log("zig_cap",zigzag_cap);
    
    //------------------------------------
    //array of start dots for radial direction closed ribbon
    var zigzag_radial_s_dots = [];
    var zigzag_around_s_dots = [];
    var zigzag_cap_around_s_dots = [];
    for(var i = 0;i < zigzag.length;i++){
        zigzag_around_s_dots.push( zigzag[i][0] );
        zigzag_cap_around_s_dots.push( zigzag_cap[i][0] );
    }
    //plus last points for both
    zigzag_around_s_dots.push( zigzag[zigzag.length-1][3] );
    zigzag_cap_around_s_dots.push( zigzag_cap[zigzag.length-1][3] );
    // console.log(JSON.stringify( zigzag_around_s_dots ) );//ok
    
    //reverse cap dots
    zigzag_cap_around_s_dots.reverse();
    //close the ribbon skeleton start dots
    zigzag_cap_around_s_dots.push( zigzag_around_s_dots[0] );
    // console.log(JSON.stringify( zigzag_cap_around_s_dots ) );//ok
    
    //create array of start dots of radial ribbon skeleton
    for(var i = 0;i < zigzag_around_s_dots.length;i++) { zigzag_radial_s_dots.push( zigzag_around_s_dots[i] ); }
    for(var i = 0;i < zigzag_cap_around_s_dots.length;i++) { zigzag_radial_s_dots.push( zigzag_cap_around_s_dots[i] ); }
    // console.log(JSON.stringify( zigzag_radial_s_dots ) );//ok
    
    //create array of arcs for zigzag radial ribbon
    var zigzag_radial = [];
    for(var i = 0;i < zigzag_radial_s_dots.length;i++) { zigzag_radial.push( geo.line3D_dot_offset(zigzag_radial_s_dots[i],vr,-gd) ); }
    // console.log(JSON.stringify( zigzag_radial ) );//ok
    
    
    //creation of ribbons
    //cap ribbon
    //create array of babylonjs bezier curves from geo.curves
    // console.log("zigzag_length",zigzag.length,"zigzag",JSON.stringify(zigzag));//ok
    var zigzag_bez_array = bez_array_maker(zigzag);
    var zigzag_cap_bez_array = bez_array_maker(zigzag_cap);
    // console.log("zigzag_bez_array",JSON.stringify(zigzag_bez_array)); // ok
    // console.log("zigzag_cap_bez_array",zigzag_cap_bez_array);
    
    
    //convert each array to mono babylonjs bezier curve
    
    var zigzag_bez = bez_array_to_one_bez(zigzag_bez_array);
    var zigzag_cap_bez = bez_array_to_one_bez(zigzag_cap_bez_array);
    // console.log("mono",JSON.stringify(zigzag_bez));//ok
    
    //getPoints from bezier to skeleton
    var zigzag_skeleton = bez_array_getPoints([zigzag_bez,zigzag_cap_bez].reverse()); // may be need reverse() need test
    
    //create cap ribbon mesh
    // grips.push( new BABYLON.Mesh("meshExp_cap_"+global_ind.toString() , scene) );
    // var ind = grips.length-1;
    // createRibbon(grips[ind], zigzag_skeleton, false);
    // console.log(grips[ind]);
    tracks.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_cap_"+global_ind.toString(), { pathArray: zigzag_skeleton },  scene ) );
    var ind = tracks.length-1;
    
    tracks[ind].material = tracks_mat;
    
    //radial ribbon
    var zigzag_radial_bez_array = bez_array_maker(zigzag_radial);
    // var zigzag_radial_bez = bez_array_to_one_bez(zigzag_radial_bez_array);
    var zigzag_radial_skeleton = bez_array_getPoints(zigzag_radial_bez_array); // may be need reverse() need test
    
    // grips.push( new BABYLON.Mesh("meshExp_radial_"+global_ind.toString() , scene) );
    // var ind = grips.length-1;
    // createRibbon(grips[ind], zigzag_radial_skeleton, false);
    tracks.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_radial_"+global_ind.toString(), { pathArray: zigzag_radial_skeleton },  scene ) );
    var ind = tracks.length-1;
    // console.log(tracks[ind]);
    tracks[ind].material = tracks_mat;
}
function snake_ribbon_track_maker(c, cdot, vn, ns, gn, gd, gw, gh, global_ind){
    // console.log("c",c,"cdot",cdot,"vn",vn,"ns",ns,"gn",gn,"gd",gd,"gw",gw,"gh",gh,"ind",global_ind);//ok
    var ew = gw / gn; //contour width
    var eh = 2 * gh / 3; //contour height
    var co = gh / 3; // contour offset (may be this should be minus)
    var vr = geo.vecXD(c,cdot); //vec from center to radius dot
    var va = geo.vec3Dnormal(vn,vr); // vec around wheel direction up axis
    // console.log("vr",vr,"va",va);//ok
    var dx0 = -gw / 2;//start offset along side axis vn
    var dy0 = -gh / 2;//start offset along up axis va
    
    // cdot = geo.dotXDoffset(cdot,vr,gd/2);//offset from center to longest grip dot
    var dot0 = geo.dotXDoffset(cdot,vn,dx0);
    dot0 = geo.dotXDoffset(dot0,va,dy0);//start dot for zigzag contour
    // console.log("dot0",dot0);//ok
    var zigzag = [];
    for (var i = 0;i < gn;i++){
        var dot1 = geo.dotXDoffset(dot0,vn,ew);
        //чет нечет
        if(i % 2) {/*1dn*/ dot1 = geo.dotXDoffset(dot1,va,-eh); }else{/*2up*/ dot1 = geo.dotXDoffset(dot1,va,eh); }
        var lever0 = geo.dotXDoffset(dot0,vn,ew / 2);
        var lever1 = geo.dotXDoffset(dot1,vn,-ew / 2);
        var snake_arc = [dot0,lever0,lever1,dot1];
        zigzag.push(snake_arc);
        dot0 = dot1;
    }
    // console.log("zigzag",zigzag);//ok
    
    //mirror if need_scale == true
    var rdot = geo.dotXDoffset(cdot,va,-co / 2);
    if (ns) { for(var i = 0;i < zigzag.length;i++) { zigzag[i] = geo.curve3Drotate(zigzag[i],rdot,vn,180); } }
    // console.log("zigzag",zigzag)//ok
    
    //second contour for grip cap ribbon
    var zigzag_cap = [];
    for(var i = 0;i < zigzag.length;i++) { zigzag_cap.push( geo.curve3Doffset(zigzag[i],va,co) ); }
    // console.log("zig",zigzag); // ok
    // console.log("zig_cap",zigzag_cap);
    //creation of cap ribbon
    var mass = 16;//bezier curve dots number (default 4)
    var zigzag_bez_array = bez_array_maker(zigzag,mass);
    var zigzag_cap_bez_array = bez_array_maker(zigzag_cap,mass);
    var zigzag_bez = bez_array_to_one_bez(zigzag_bez_array);
    var zigzag_cap_bez = bez_array_to_one_bez(zigzag_cap_bez_array);
    var zigzag_skeleton = bez_array_getPoints([zigzag_bez,zigzag_cap_bez].reverse()); // may be need reverse() need test
    tracks.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_cap_"+global_ind.toString(), { pathArray: zigzag_skeleton },  scene ) );
    var ind = tracks.length-1;
    tracks[ind].material = tracks_mat;
    
    //------------------------------------
    //array of start dots for radial direction closed ribbon
    var gp_zigzag_bez= zigzag_bez.getPoints();
    var gp_zigzag_cap_bez= zigzag_cap_bez.getPoints();
    // console.log(JSON.stringify(gp_zigzag_bez));
    var zigzag_radial_s_dots = [];
    var zigzag_around_s_dots = [];
    var zigzag_cap_around_s_dots = [];
    for(var i = 0;i < gp_zigzag_bez.length;i++){ zigzag_around_s_dots.push( [ gp_zigzag_bez[i].x,gp_zigzag_bez[i].y,gp_zigzag_bez[i].z ]); }
    for(var i = 0;i < gp_zigzag_cap_bez.length;i++){ zigzag_cap_around_s_dots.push( [ gp_zigzag_cap_bez[i].x,gp_zigzag_cap_bez[i].y,gp_zigzag_cap_bez[i].z ]); }
    
    //reverse cap dots
    zigzag_cap_around_s_dots.reverse();
    //close the ribbon skeleton start dots
    zigzag_cap_around_s_dots.push( zigzag_around_s_dots[0] );
    // console.log(JSON.stringify( zigzag_cap_around_s_dots ) );//ok
    
    //create array of start dots of radial ribbon skeleton
    for(var i = 0;i < zigzag_around_s_dots.length;i++) { zigzag_radial_s_dots.push( zigzag_around_s_dots[i] ); }
    for(var i = 0;i < zigzag_cap_around_s_dots.length;i++) { zigzag_radial_s_dots.push( zigzag_cap_around_s_dots[i] ); }
    // console.log(JSON.stringify( zigzag_radial_s_dots ) );//ok
    
    //create array of arcs for zigzag radial ribbon
    var zigzag_radial = [];
    for(var i = 0;i < zigzag_radial_s_dots.length;i++) { zigzag_radial.push( geo.line3D_dot_offset(zigzag_radial_s_dots[i],vr,-gd) ); }
    // console.log(JSON.stringify( zigzag_radial ) );//ok
    
    
    
    
    //radial ribbon
    var zigzag_radial_bez_array = bez_array_maker(zigzag_radial);
    // var zigzag_radial_bez = bez_array_to_one_bez(zigzag_radial_bez_array);
    var zigzag_radial_skeleton = bez_array_getPoints(zigzag_radial_bez_array); // may be need reverse() need test
    
    // grips.push( new BABYLON.Mesh("meshExp_radial_"+global_ind.toString() , scene) );
    // var ind = grips.length-1;
    // createRibbon(grips[ind], zigzag_radial_skeleton, false);
    tracks.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_radial_"+global_ind.toString(), { pathArray: zigzag_radial_skeleton },  scene ) );
    var ind = tracks.length-1;
    // console.log(tracks[ind]);
    tracks[ind].material = tracks_mat;
}
function ribbon_track_maker(c, cdot, vn, gt, ns, gn, gd, gw, gh, ind){
    
    if (gt==">>>"){ zigzag_ribbon_track_maker(c, cdot, vn, ns, gn, gd, gw, gh, ind); }
    else{ snake_ribbon_track_maker(c, cdot, vn, ns, gn, gd, gw, gh, ind);  }
    
}

function tracks_maker(h,w,s,g,hull=false){
    
    var c = [0,0,0]; // center dot
    var vn = [1, 0, 0]; // normal vector
    var va = [0, 1, 0]; // vertical direction vector for 2D shape of grip
    var vz = [0, 0, 1]; // vector for extrude grip shape
    var grips_type = g; // "g1"..."g4"
    var grips_height = h[1];
    var grips_width = w[1];
    var grips_max_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]);
    // var grips_center_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]) - h[1] / 2;
    var grips_width_number = Math.ceil(s[5]);//how much per width
    var need_scale = false; //scale for g1 g4 and reverse for g2 g3
    if(grips_width_number < 0){
        grips_width_number = -grips_width_number;
        need_scale = true;
    }
    var grips_around_number = s[6];//how much around
    var grip_angles = track_angles_counter(s[6]);// just rotate 90 for each, remastered from GripsCreator.js
    
    var one_gh = Math.PI * 2 * grips_max_radius * s[7] / 100 / grips_around_number; // around grip height
    var one_ghhole = Math.PI * 2 * grips_max_radius / grips_around_number - one_gh; // around grip hole
    var one_gw = one_gw_counter(
        grips_type,
        grips_width,
        grips_width_number,
        one_ghhole
    );
    var cdots = tracks_center_dots_counter(
        c,vn,geo.vecXDback(va),
        grips_max_radius,
        grips_width_number,
        grips_around_number,
        grips_width,
        one_gw
    );
    var grips_shape;
    var grips_path;
    //code done not tested
    grips_path = tracks_path_counter(c,vz,grips_height);
    grips_shape = tracks_shape_counter(
        grips_type,
        c,vn,va,
        one_gw,one_gh
    );
    
    //create track
    var gal = grip_angles.length;
    var ind = 0;
    for (var i = 0;i < gal;i++){
        if(grips_type=="ooo" || grips_type=="|||"){
            var dots = cdots[i];
            var u = grip_angles[i];
            var gp = grips_path;
            var gs = grips_shape;
            var ns = need_scale;
            var gh = h[1];
            var gt = grips_type;
            for (var j = 0;j<dots.length;j++){
                tracks.push(track_maker(dots[j],u,gp,gs,c,vn,va,vz,ns,gh,gt,j,ind));
                ind += 1;
            }
        }else{
            //new code
            var _c = [c[0],c[1],cdots[i][0][2]];
            var cdot = [c[0],cdots[i][0][1],cdots[i][0][2]];
            var gt = grips_type;
            var ns = need_scale;
            var gn = grips_width_number;
            var gd = h[1]; //grips deep
            var gw = grips_width;
            var gh = one_gh;
            var ind = i; //track mesh index
            ribbon_track_maker(
                _c, cdot, vn,
                gt, ns, gn, gd, gw, gh, ind
            );
        }
    }
    
    return tracks;
}
showme("TracksCreator.js ready");