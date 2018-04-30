function bolt7_shape(){}
function bolt6_shape(){}
function bolt5_shape(){}
function bolt4_shape(){}
function bolt3_shape(){}
function bolt2_shape(){}
function bolt1_shape(){}
function bolt0_shape(){
    //just need halfsphere
}
function bolt_shape( u,vn,va, h,w,s,b ){
    var bolt = b[4];
    var bw = w[5]/2;
    var br = geo.sum_F([h[8], h[7]]);
    var shape;
    if(bolt == 1){ shape = bolt1_shape(u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 2){ shape = bolt2_shape(u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 3){ shape = bolt3_shape(u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 4){ shape = bolt4_shape(u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 5){ shape = bolt5_shape(u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 6){ shape = bolt6_shape(u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 7){ shape = bolt7_shape(u,vn,va,b[1],b[2],bw,br); }
    return shape;
}
function bolt_shapes_for_extrusion(bsdots,bolt_angles,c,vn,va, h,w,s,b){
    // probrosit bsdots and c deeper
    var rez;
    if(b[4] > 0){
        rez=[];
        for (i=0;i<bolt_angles.length;i++){
            rez.push(bolt_shape( bolt_angles[i],vn,va, h,w,s,b ));
        }
    }return rez;
}

function bolt16_path(){}
function bolt7_path(){}
function bolt0_path(dot,u,tc,vn, b2){
    var vc = geo.vecXD(tc,dot);//vec c dot
    vc = geo.vec3Drotate(vc,vn,u);//rotated bolt vec
    var path = geo.dotXDoffset(dot,vc,b2 * 2 / 3);//move to 2/3 r bolt along rotated vec
    return path; //this case 0 ... will be just ellipsoid, without extrusion
}
function bolt_path(dot,u,tc,vn,va, h,w,s,b){
    var bolt = b[4];
    var bw = w[5]/2;
    var br = geo.sum_F([h[8], h[7]]);
    var path;
    if (bolt == 0){ path = bolt0_path(dot,u,tc,vn, b[2]); }
    else if (bolt == 7){ path = bolt7_path(dot,u,vn,va, b[1],b[2],bw,br); }
    else{ path = bolt16_path(dot,vn,va,b[1],bw,br); }
    return path;
}
function bolt_paths_for_extrusion(bsdots,bolt_angles,c,vn,va, h,w,s,b){
    var rez=[];
    var negativepolygon = bolt_angles.length / 2;
    var bw = w[5] / 2;
    for (i=0;i<negativepolygon * 2;i++){
        if (i<negativepolygon){tc = geo.dotXDoffset(c,vn,bw);}else{tc = geo.dotXDoffset(c,vn,-bw);}
        rez.push(bolt_path(bsdots[i],bolt_angles[i],tc,vn,va, h,w,s,b));
    }return rez;
}

function bolt0_maker(dot,b,hull=false){
	
	var ellipsoidSettings={diameter: b[2] * 2, diameterX: b[1] * 2};
    var bolt0 = BABYLON.MeshBuilder.CreateSphere("mySphere", ellipsoidSettings, scene);
    bolt0.position = vec_maker(dot);
    var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.5);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	bolt0.material = mat;
	
	console.log("endcode bolt0");
	return bolt0;
}
function bolt_maker(dot,vn,h,w,s,b,hull=false){
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var dot = [0,0,0]; var vn = [1,0,0]; var va = [0,1,0]; r = h[8];
	var myPath = ring_trajectory(dot, vn, va, r);
	var myShape = metal_shape_for_extrusion(h,w,s,c);//bezier cubic spline for extrusion
	var extrudeSettings={
		shape: myShape,
		path: myPath,
		// cap: 3, 
		// sideOrientation:BABYLON.Mesh.DOUBLESIDE,
		
	};
	var customExtrudeSettings={
		shape: myShape,
		path: myPath,
		// ribbonClosePath: true,
		ribbonCloseArray: true
		
	};
	// var extruded = BABYLON.MeshBuilder.ExtrudeShape("ext", extrudeSettings, scene);
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("ext", customExtrudeSettings, scene);
	// var extruded = BABYLON.MeshBuilder.ExtrudeShape("ext", {shape: myShape, path: myPath}, scene);
	
	var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	extruded.material = mat;
	
	console.log("endcode");
	return extruded;
}
function bolt_angles_counter(b3, s8){
    var rez;
    if(b3>0){
        rez = geo.repeater_F_F(b3,s8);
        rez = geo.repeater_F_F(2,rez,true); //mirror bolts
    }return rez;
}
function bolts_sheme_dots_counter(c,vn,va,n,r,d){
    var vb = geo.vec3Dnormal(vn,va);
    var nva = geo.vecXDback(va);
    var nvb = geo.vecXDback(vb);
    var vx = [va,vb,nva,nvb];
    var dot = geo.dotXDoffset(c,vn,d);
    console.log("dotpositive");
    console.log(dot);
    var doli = geo.repeater_F_F(n / 2,[1]);
    console.log("-------------doli-----------");
    console.log(doli);
    var polygon = geo.polygon3D_inside_ellipse(dot,vx,[r,r,r,r],doli);
    polygon.shift();
    console.log("first polygon");
    console.log(polygon);
    dot = geo.dotXDoffset(c,vn,-d);
    console.log("dotnegative");
    console.log(dot);
    var npolygon = geo.polygon3D_inside_ellipse(dot,vx,[r,r,r,r],doli);
    npolygon.shift();
    console.log("second polygon");
    console.log(npolygon);
    for (i=0;i<npolygon.length;i++){ polygon.push(npolygon[i]); }
    console.log("----------------polygon---------------");
    console.log(polygon);
    return polygon;
}
function bolts_maker(h,w,s,b,hull=false){
    var c = [0,0,0];
    var vn = [1, 0, 0];
    var va = [0, 1, 0];
    var bolts_number = b[3];
    var bolts_center_radius = geo.sum_F([h[8],h[7]]);
    var bolts_heigh = b[1];
    var bolts_width_distance = w[5]/2;
    var bolt_angles = bolt_angles_counter(b[3], s[8]);
    var bolt_shapes;
    var bolt_paths;
    if (bolt_angles){
        var bsdots = bolts_sheme_dots_counter(
            c, vn, va,
            bolt_angles.length,
            bolts_center_radius,
            bolts_width_distance
        );
        bolt_shapes = bolt_shapes_for_extrusion(bsdots,bolt_angles,c,vn,va, h,w,s,b);
        bolt_paths = bolt_paths_for_extrusion(bsdots,bolt_angles,c,vn,va, h,w,s,b);
    }
    if (!bolt_shapes){
        for (i=0;i<bolt_paths.length;i++){
            bolts.push(bolt0_maker(bolt_paths[i],b));
            
        }
    }else{
        
    }return bolts;
}