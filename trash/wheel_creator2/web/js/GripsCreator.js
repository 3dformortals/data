showme("preparing GripsCreator.js");
function grip_angles_counter(s6){
    rez = [];
    var step = 360/s6;
    for (var i = 0;i < s6;i++){ rez.push(i*step+90); }
    return rez;
}
function one_gw_counter(gt,gw,gwn,ghhole){
    var rez = gw / (gwn * 2 - 1);
    return rez;
}
function column_internal(dc,nc,distance){
    distance -= dc * 1.02; //can be problems, because i don't know why)... wtf)
    var xmax = distance / 2;
    var xmin = -xmax;
    var n = nc-2;
    var rez;
    if (n < 0){ rez = [0]; }
    else{ rez = geo.steps_internal(xmin,xmax,n,true); }
    return rez;
}
function grips_center_dots_counter( c,vn,vz, r, nw, na, gw, one_gw ){
    var va = vz;
    var vb = geo.vec3Dnormal(vn,va);
    var van = geo.vecXDback(va);
    var vbn = geo.vecXDback(vb);
    var vaxes = [va,vb,van,vbn];
    var doli = geo.repeater_F_F(na,[1]);
    var polygon = geo.polygon3D_inside_ellipse(c,vaxes,[r,r,r,r],doli);
    polygon.shift();//contour without center dot
    
    var offsets = column_internal(one_gw,nw,gw);//side offsets(along vn)
    var rez = [];
    for (var ip = 0;ip < polygon.length;ip++){
        var xrez=[];
        for (var io = 0;io < offsets.length;io++){
            xrez.push(geo.dotXDoffset(polygon[ip],vn,offsets[io]));
        }rez.push(xrez);
    }return rez; //list of center dots lists for each polygon vertex
}

function grips_path_counter(c,vz,gh){
    var rez;
    var t0 = vec_maker(c);
    var t1 = vec_maker(geo.dotXDoffset(c,vz,-gh));
    rez = bez_maker_from_vectors([t0,t0,t1,t1]);
    return rez.getPoints();
}
function gs1(c,gw,gh,vx,vy){
    var t0x; var t0y; var t1x; var t1y; var t2x; var t2y; var t1; var t2;
    t0x = 0 + gw / 2; t0y = 0 + gh / 2;
    //left
    t1x = t0x; t1y = t0y; t2x = t1x-gw; t2y = t1y;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez_maker_from_vectors([t1,t1,t2,t2]);
    //down
    t1x = t2x; t1y = t2y; t2x = t1x; t2y = t1y-gh;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez.continue(bez_maker_from_vectors([t1,t1,t2,t2]));
    //right
    t1x = t2x; t1y = t2y; t2x = t1x+gw; t2y = t1y;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez.continue(bez_maker_from_vectors([t1,t1,t2,t2]));
    //up
    t1x = t2x; t1y = t2y; t2x = t0x; t2y = t0y;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez.continue(bez_maker_from_vectors([t1,t1,t2,t2]));
    
    // var bezmesh = BABYLON.Mesh.CreateLines("metalshape", bez.getPoints(), scene); 
	// bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    return bez.getPoints();
}

function gs4(c,gw,gh,vx,vy){
    var eaxes = [vx,vy,geo.vecXDback(vx),geo.vecXDback(vy)];
    var eaxesdist = [gw / 2, gh / 2,gw / 2, gh / 2];
    var edots = geo.ellipse3D_dots(c,eaxes,eaxesdist);
    edots = [edots[1],edots[3],edots[5],edots[7]];
    var dotspair = geo.chain_F(edots,2,true); //pair of dots for arc maker
    
    var bez;
    for (var i = 0 ; i < dotspair.length ; i++){
        var cur = geo.curve3D_3dots(c,dotspair[i][0],dotspair[i][1]);
        var vecs = [];
        for (var j = 0 ; j < cur.length ; j++ ){ vecs.push(vec_maker(cur[j])); }
        if (i == 0){ bez = bez_maker_from_vectors(vecs); }else{ bez = bez.continue(bez_maker_from_vectors(vecs)); }
    }
    
    // var bezmesh = BABYLON.Mesh.CreateLines("gripshape", bez.getPoints(), scene); 
	// bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    return bez.getPoints();
}
/**
 * calculate the grip shape for extrusion
 * @param {String} gt grip type
 * @param {Number} r grip center radius
 * @param {Number} gw grip width
 * @param {Number} ga grips around number
 */
function grips_shape_counter(gt,c,vn,va,one_gw,one_gh){
    var rez;
    if (gt == "|||"){rez = gs1(c,one_gw,one_gh,vn,va);}
    else if (gt == "ooo"){rez = gs4(c,one_gw,one_gh,vn,va);}
    return rez;
}
function grip_maker(dot,u,gp,gs,c,vn,va,ns,gh,gt,ind){
    var scaling = function(i, distance) { return 1; };
    if (ns){
        scaling = function(i, distance) {
            if (distance < gh){ return distance / gh; }else{ return 1; }
        };
    }
    var gripSettings={
		shape: gs,
		path: gp,
        cap: 3, 
        // ribbonClosePath: true,
        // ribbonCloseArray: true,
		scaleFunction: scaling
		
	};
    var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("grip"+u.toString(), gripSettings, scene);
    
    extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(u));
    extruded.position = vec_maker(dot);
    
	var mat = grips_mat;
	extruded.material = mat;
	
	return extruded;
}

function zigzag_ribbon_grip_maker(c, cdot, vn, ns, gn, gd, gw, gh, global_ind){
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
    grips.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_cap_"+global_ind.toString(), { pathArray: zigzag_skeleton },  scene ) );
    var ind = grips.length-1;
    
    grips[ind].material = grips_mat;
    
    //radial ribbon
    var zigzag_radial_bez_array = bez_array_maker(zigzag_radial);
    // var zigzag_radial_bez = bez_array_to_one_bez(zigzag_radial_bez_array);
    var zigzag_radial_skeleton = bez_array_getPoints(zigzag_radial_bez_array); // may be need reverse() need test
    
    // grips.push( new BABYLON.Mesh("meshExp_radial_"+global_ind.toString() , scene) );
    // var ind = grips.length-1;
    // createRibbon(grips[ind], zigzag_radial_skeleton, false);
    grips.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_radial_"+global_ind.toString(), { pathArray: zigzag_radial_skeleton },  scene ) );
    var ind = grips.length-1;
    // console.log(grips[ind]);
    grips[ind].material = grips_mat;
}
function snake_ribbon_grip_maker(c, cdot, vn, ns, gn, gd, gw, gh, global_ind){
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
    grips.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_cap_"+global_ind.toString(), { pathArray: zigzag_skeleton },  scene ) );
    var ind = grips.length-1;
    grips[ind].material = grips_mat;
    
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
    grips.push( BABYLON.MeshBuilder.CreateRibbon("meshExp_radial_"+global_ind.toString(), { pathArray: zigzag_radial_skeleton },  scene ) );
    var ind = grips.length-1;
    // console.log(grips[ind]);
    grips[ind].material = grips_mat;
}
function ribbon_grip_maker(c, cdot, vn, gt, ns, gn, gd, gw, gh, ind){
    
    if (gt==">>>"){ zigzag_ribbon_grip_maker(c, cdot, vn, ns, gn, gd, gw, gh, ind); }
    else{ snake_ribbon_grip_maker(c, cdot, vn, ns, gn, gd, gw, gh, ind);  }
    
}

function grips_maker(h,w,s,g,hull=false){
    var c = [0,0,0]; // center dot
    var vn = [1, 0, 0]; // normal vector
    var va = [0, 1, 0]; // vertical direction vector for 2D shape of grip
    var vz = [0, 0, 1]; // vector for extrude grip shape
    var grips_type = g; // "g1"..."g4"
    var grips_height = geo.sum_F([h[3] / 2, h[2], h[1]]);
    var grips_width = w[1];
    var grips_max_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]);
    // var grips_center_radius = grips_max_radius - grips_height / 2;
    var grips_width_number = Math.ceil(s[5]);//how much per width
    var need_scale = false; //scale for g1 g4 and reverse for g2 g3
    if(grips_width_number < 0){
        grips_width_number = -grips_width_number;
        need_scale = true;
    }
    var grips_around_number = Math.ceil(s[6]);//how much around
    var grip_angles = grip_angles_counter(s[6]);// may be need minus case for back direction etc
    //need extrude back to -oz per h2 + h1 + h3 / 2
    var one_gh = Math.PI * 2 * grips_max_radius * s[7] / 100 / grips_around_number; // around grip height
    var one_ghhole = Math.PI * 2 * grips_max_radius / grips_around_number - one_gh; // around grip hole
    var one_gw = one_gw_counter(
        grips_type,
        grips_width,
        grips_width_number,
        one_ghhole
    );
    var cdots = grips_center_dots_counter(
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
    grips_path = grips_path_counter(c,vz,grips_height);
    grips_shape = grips_shape_counter(
        grips_type,
        c,vn,va,
        one_gw,one_gh
    );
    var gal = grip_angles.length;
    // console.log(cdots);
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
                grips.push(grip_maker(dots[j],u,gp,gs,c,vn,va,ns,gh,gt,j));
            }
        }else{
            //new code place
            var cdot = [c[0],cdots[i][0][1],cdots[i][0][2]];
            var gt = grips_type;
            var ns = need_scale;
            var gn = grips_width_number;
            var gd = grips_height; //grips deep
            var gw = grips_width;
            var gh = one_gh;
            var ind = i; //grip mesh index
            ribbon_grip_maker(
                c, cdot, vn,
                gt, ns, gn, gd, gw, gh, ind
            );
        }
    }
    
    return grips;
}
showme("GripsCreator.js ready");