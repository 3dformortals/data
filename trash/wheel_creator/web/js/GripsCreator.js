showme("preparing GripsCreator.js");
function grip_angles_counter(s6){
    rez = [];
    var step = 360/s6;
    for (var i = 0;i < s6;i++){ rez.push(i*step+90); }
    return rez;
}
function one_gw_counter(gt,gw,gwn,ghhole){
    var rez;
    if (gt == "|||" || gt == "ooo"){ rez = gw / (gwn * 2 - 1); }
    else{ rez = gw / gwn; }
    console.log("one_gw_counter = ",rez,"gt = ",gt,"gw = ",gw,"gwn = ",gwn,"ghhole = ",ghhole);
    return rez;
}
function column_internal(dc,nc,distance){
    distance -= dc * 1.02; //after this * 1.02 track only half cutted...very strange ERROR BUG
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
    console.log("--------VAXES-----------",vaxes);
    var doli = geo.repeater_F_F(na,[1]);
    console.log(doli);
    var polygon = geo.polygon3D_inside_ellipse(c,vaxes,[r,r,r,r],doli);
    console.log(polygon);
    polygon.shift();//contour without center dot
    // var one_gw = gw / (2 * nw - 1);//one_grip_width
    
    var offsets = column_internal(one_gw,nw,gw);//side offsets(along vn)
    var rez = [];
    for (var ip = 0;ip < polygon.length;ip++){
        var xrez=[];
        for (var io = 0;io < offsets.length;io++){
            xrez.push(geo.dotXDoffset(polygon[ip],vn,offsets[io]));
        }rez.push(xrez);
    }return rez; //list of center dots lists for each polygon vertex
}
function grips_path_counter(c,vz,h){
    var t0 = vec_maker(geo.dotXDoffset(c,vz,geo.sum_F([h[1],h[2],h[3] / 2]) / 2));
    var t1 = vec_maker(geo.dotXDoffset(c,vz,-geo.sum_F([h[1],h[2],h[3] / 2]) / 2));
    var rez = bez_maker([t0,t0,t1,t1]);
    return rez.getPoints();
}
function gs1(c,gw,gh,vx,vy){
    console.log("------GS1 start----------");
    var t0x; var t0y; var t1x; var t1y; var t2x; var t2y; var t1; var t2;
    t0x = 0 + gw / 2; t0y = 0 + gh / 2;
    //left
    t1x = t0x; t1y = t0y; t2x = t1x-gw; t2y = t1y;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez_maker([t1,t1,t2,t2]);
    //down
    t1x = t2x; t1y = t2y; t2x = t1x; t2y = t1y-gh;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez.continue(bez_maker([t1,t1,t2,t2]));
    //right
    t1x = t2x; t1y = t2y; t2x = t1x+gw; t2y = t1y;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez.continue(bez_maker([t1,t1,t2,t2]));
    //up
    t1x = t2x; t1y = t2y; t2x = t0x; t2y = t0y;
    t1 = vec_maker([t1x,t1y,0]); t2 = vec_maker([t2x,t2y,0]);
    var bez = bez.continue(bez_maker([t1,t1,t2,t2]));
    
    var bezmesh = BABYLON.Mesh.CreateLines("metalshape", bez.getPoints(), scene); 
	bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    console.log("------------bez GS1----------");
    console.log(bez);
    return bez.getPoints();
}
function gs2(c,one_gw,one_gh,one_ghhole,vn,va){
    console.log("GS2 start");
    var dx = one_gw / 2;
    var dy_min = (one_gh + one_ghhole) / 2 - one_gh;
    var dy_max = (one_gh + one_ghhole) / 2;
    
    var t1 = [dx,dy_min,0];
    var t2 = [dx,dy_max,0];
    var t3 = [-dx,-dy_min,0];
    var t4 = [-dx,-dy_max,0];
    
    var dotspair = geo.chain_F([t1,t2,t3,t4],2,true);
    console.log("GS2 dotspair = ",dotspair);
    var bez;
    for (var i = 0 ; i < dotspair.length ; i++){
        var v1 = vec_maker(dotspair[i][0]);
        var v2 = vec_maker(dotspair[i][1]);
        var vecs = [v1,v1,v2,v2];
        if (i == 0){ bez = bez_maker(vecs); }else{ bez = bez.continue(bez_maker(vecs)); }
    }
    var bezmesh = BABYLON.Mesh.CreateLines("gs2shape", bez.getPoints(), scene); 
	bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    console.log("------------bez GS2----------");
    console.log(bez);
    return bez.getPoints();
}
function gs3(c,one_gw,one_gh,one_ghhole,vn,va){
    console.log("GS3 start");
    var dx = one_gw / 2;
    var dy_min = (one_gh + one_ghhole) / 2 - one_gh;
    var dy_max = (one_gh + one_ghhole) / 2;
    
    var t1 = vec_maker([dx,dy_min,0]);
    var t2 = vec_maker([dx,dy_max,0]);
    var r2 = vec_maker([-dx / 2,dy_max,0]);
    var r3 = vec_maker([0,-dy_min,0]);
    var t3 = vec_maker([-dx,-dy_min,0]);
    var t4 = vec_maker([-dx,-dy_max,0]);
    var r4 = vec_maker([dx / 2,-dy_max,0]);
    var r1 = vec_maker([0,dy_min,0]);
    
    var dotsbox = [
        [t1,t1,t2,t2],
        [t2,r2,r3,t3],
        [t3,t3,t4,t4],
        [t4,r4,r1,t1]
    ];
    
    console.log("GS3 dotsbox = ",dotsbox);
    var bez;
    for (var i = 0 ; i < dotsbox.length ; i++){
        if (i == 0){ bez = bez_maker(dotsbox[i]); }else{ bez = bez.continue(bez_maker(dotsbox[i])); }
    }
    var bezmesh = BABYLON.Mesh.CreateLines("gs3shape", bez.getPoints(), scene); 
	bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    console.log("------------bez GS3----------");
    console.log(bez);
    return bez.getPoints();
}
function gs4(c,gw,gh,vx,vy){
    console.log("------GS4 start----------");
    var eaxes = [vx,vy,geo.vecXDback(vx),geo.vecXDback(vy)];
    var eaxesdist = [gw / 2, gh / 2,gw / 2, gh / 2];
    var edots = geo.ellipse3D_dots(c,eaxes,eaxesdist);
    edots = [edots[1],edots[3],edots[5],edots[7]];
    console.log("edots = ",edots);
    var dotspair = geo.chain_F(edots,2,true); //pair of dots for arc maker
    console.log("dotspair = ",dotspair);
    
    var bez;
    for (var i = 0 ; i < dotspair.length ; i++){
        var cur = geo.curve3D_3dots(c,dotspair[i][0],dotspair[i][1]);
        var vecs = [];
        for (var j = 0 ; j < cur.length ; j++ ){ vecs.push(vec_maker(cur[j])); }
        if (i == 0){ bez = bez_maker(vecs); }else{ bez = bez.continue(bez_maker(vecs)); }
    }
    
    var bezmesh = BABYLON.Mesh.CreateLines("metalshape", bez.getPoints(), scene); 
	bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    console.log("------------bez GS4----------");
    console.log(bez);
    return bez.getPoints();
}
/**
 * calculate the grip shape for extrusion
 * @param {String} gt grip type
 * @param {Number} r grip center radius
 * @param {Number} gw grip width
 * @param {Number} ga grips around number
 */
function grips_shape_counter(gt,c,vn,va,one_gw,one_gh,one_ghhole){
    var rez;
    console.log(gt);
    if (gt == "|||"){rez = gs1(c,one_gw,one_gh,vn,va);}
    else if (gt == ">>>"){rez = gs2(c,one_gw,one_gh,one_ghhole,vn,va);}
    else if (gt == ")))"){rez = gs3(c,one_gw,one_gh,one_ghhole,vn,va);}
    else if (gt == "ooo"){rez = gs4(c,one_gw,one_gh,vn,va);}
    return rez;
}
function grip_maker(dot,u,gp,gs,c,vn,ns,gh,gt,ind){
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
    var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("grip"+u.toString(), gripSettings, scene);
    
    if (gt == ">>>" || gt == ")))"){
        if(ind & 1 && !ns){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
        else if(ns && !(ind & 1)){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
    }
    extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(u));
    extruded.position = vec_maker(dot);
    // console.log(dot);
	
	var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.2);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	extruded.material = mat;
	
	console.log("endcode");
	return extruded;
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
    var grips_center_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]) - geo.sum_F([h[1],h[2],h[3] / 2]) / 2;
    var grips_width_number = s[5];//how much per width
    var need_scale = false; //scale for g1 g4 and reverse for g2 g3
    if(grips_width_number < 0){
        grips_width_number = -grips_width_number;
        need_scale = true;
    }
    var grips_around_number = s[6];//how much around
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
        grips_center_radius,
        grips_width_number,
        grips_around_number,
        grips_width,
        one_gw
    );
    console.log("cdots = ",cdots);
    console.log("angles = ",grip_angles);
    var grips_shape;
    var grips_path;
    //code done not tested
    grips_path = grips_path_counter(c,vz,h);
    grips_shape = grips_shape_counter(
        grips_type,
        c,vn,va,
        one_gw,one_gh,one_ghhole
    );
    var gal = grip_angles.length;
    for (var i = 0;i < gal;i++){
        var dots = cdots[i];
        var u = grip_angles[i];
        var gp = grips_path;
        var gs = grips_shape;
        var ns = need_scale;
        var gh = h[1];
        var gt = grips_type;
        for (var j = 0;j<dots.length;j++){
            grips.push(grip_maker(dots[j],u,gp,gs,c,vn,ns,gh,gt,j));
        }
    }
    
    return grips;
}
showme("GripsCreator.js ready");