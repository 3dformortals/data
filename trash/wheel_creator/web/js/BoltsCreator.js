function bolt7_shape(){}
function bolt6_shape(){}
function bolt5_shape(){}
function bolt4_shape(){}
function bolt3_shape(){}
function bolt2_shape(){}
function bolt1_shape(u,vn,va,b2){
    var t1,r1,r2,t2;
    va = geo.vec3Drotate(va,vn,u);
    var vb = geo.vec3Dnormal(vn,va);
    var t0 = geo.dotXDoffset([0,0,0],vb,b2 / 3);
    t0 = geo.dotXDoffset(t0,va,b2);//left up corner of rectangle
    
    tend = geo.dotXDoffset(t0,va,-b2 * 2);
    t1 = vec_maker(t0); r1 = t1; r2 = vec_maker(tend); t2 = r2;
    var bez = bez_maker([t1,r1,r2,t2]);
    
    tend = geo.dotXDoffset(tend,vb,-b2 * 2 / 3);
    t1 = t2; r1 = t1; r2 = vec_maker(tend); t2 = r2;
    bez = bez.continue(bez_maker([t1,r1,r2,t2]));
    
    tend = geo.dotXDoffset(tend,va,b2 * 2);
    t1 = t2; r1 = t1; r2 = vec_maker(tend); t2 = r2;
    bez = bez.continue(bez_maker([t1,r1,r2,t2]));
    
    tend = t0;
    t1 = t2; r1 = t1; r2 = vec_maker(tend); t2 = r2;
    bez = bez.continue(bez_maker([t1,r1,r2,t2]));
    
    var myshape = bez;
	var myshapemesh = BABYLON.Mesh.CreateLines("boltshape", myshape.getPoints(), scene); 
	myshapemesh.color = new BABYLON.Color3(1, 1, 1);
	return myshape.getPoints();
}

function bolt_shape(u,vn,va, h,w,s,b ){
    var bolt = b[4];
    var br = geo.sum_F([h[8], h[7]]);
    var shape;
    if(bolt == 1){ shape = bolt1_shape(u,vn,va,b[2]); }
    else if(bolt == 2){ shape = bolt2_shape(dot,u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 3){ shape = bolt3_shape(dot,u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 4){ shape = bolt4_shape(dot,u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 5){ shape = bolt5_shape(dot,u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 6){ shape = bolt6_shape(dot,u,vn,va,b[1],b[2],bw,br); }
    else if(bolt == 7){ shape = bolt7_shape(dot,u,vn,va,b[1],b[2],bw,br); }
    return shape;
}
function bolt_shapes_for_extrusion(bolt_angles, h,w,s,b){
    var vn = [0,0,1];
    var va = [0,1,0];
    var rez;
    var negativepolygon = bolt_angles.length / 2;
    var bw = w[5] / 2;
    if(b[4] > 0){
        rez=[];
        for (i=0;i<negativepolygon * 2;i++){
            rez.push(bolt_shape(bolt_angles[i],vn,va, h,w,s,b ));
        }
    }return rez;
}

function bolt1_path(dot,va,vb,b2){
    dot = geo.dotXDoffset(dot,vb,b2 / 3);//move left along vb
    dot = geo.dotXDoffset(dot,va,b2);//move up along va
    return dot;
}
function bolt16_path(bolt,neg,dot,u,tc,vn,b1,b2){
    if(neg){ u = -u;}
    console.log("--------PATH INCOMING DATA----------");
    
    var t1 = vec_maker(dot); var r1 = t1; var r2 = vec_maker(geo.dotXDoffset(dot,vn,b1)); var t2 = r2;
    var mypath = bez_maker([t1,r1,r2,t2]);
	var mypathmesh = BABYLON.Mesh.CreateLines("boltpath", mypath.getPoints(), scene); 
	mypathmesh.color = new BABYLON.Color3(1, 1, 1);
	return mypath.getPoints();
}
function bolt7_path(dot,u,tc,vn, b1,b2,bw,br){}
function bolt0_path(dot,u,tc,vn, b2){
    var vc = geo.vecXD(tc,dot);//vec c dot
    vc = geo.vec3Drotate(vc,vn,u);//rotated bolt vec
    var path = geo.dotXDoffset(dot,vc,b2 * 2 / 3);//move to 2/3 r bolt along rotated vec
    return path; //this case 0 ... will be just ellipsoid, without extrusion
}
function bolt_path(neg,dot,u,c,vn,va, h,w,s,b){
    var br = geo.sum_F([h[8], h[7]]);
    
    var bolt = b[4];
    var bw = w[5]/2;
    if(neg){vn = geo.vecXDback(vn);}
    var tc;
    tc = geo.dotXDoffset(c,vn,bw);
    
    var path;
    if (bolt == 0){ path = bolt0_path(dot,u,tc,vn, b[2]); }
    else if (bolt == 7){ path = bolt7_path(dot,u,tc,vn, b[1],b[2],bw,br); }
    else{ path = bolt16_path(bolt,neg,dot,u,tc,vn,b[1],b[2]); }
    return path;
}
function bolt_paths_for_extrusion(bsdots,bolt_angles,c,vn,va, h,w,s,b){
    var rez=[];
    var negativepolygon = bolt_angles.length / 2;
    var bw = w[5] / 2;
    for (i=0;i<negativepolygon * 2;i++){
        var neg; //negative bolts direction (second side)
        if(i<negativepolygon){neg = false;}else{neg = true;}
        rez.push(bolt_path(neg,bsdots[i],bolt_angles[i],c,vn,va, h,w,s,b));
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
function bolt16_maker(myPath,myShape,hull=false){
	var customExtrudeSettings={
		shape: myShape,
        path: myPath,
        cap:3,
		// ribbonClosePath: true,
		// ribbonCloseArray: true
		
	};
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("bolt", customExtrudeSettings, scene);
	
	var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	extruded.material = mat;
	
    console.log("bolt position");
    console.log(extruded.position);
	return extruded;
}
function bolt_angles_counter(b3, s8){
    var rez;
    if(b3>0){
        rez = geo.repeater_F_F(b3,s8);
        rez = geo.repeater_F_F(2,rez,true); //mirror bolts
        var ba=[];//baseangle
        var step = 360/b3;
        for (i=0;i<b3;i++){ ba.push(step*i); }
        for (i=0;i<b3;i++){ ba.push(-step*i); }
        rez = geo.sum_xF([rez,ba]);
    }return rez;
}
function bolts_sheme_dots_counter(c,vn,va,n,r,d){
    var vb = geo.vec3Dnormal(vn,va);
    var nva = geo.vecXDback(va);
    var nvb = geo.vecXDback(vb);
    var vx = [va,vb,nva,nvb];
    var dot = geo.dotXDoffset(c,vn,d);
    var doli = geo.repeater_F_F(n / 2,[1]);
    var polygon = geo.polygon3D_inside_ellipse(dot,vx,[r,r,r,r],doli);
    polygon.shift();
    dot = geo.dotXDoffset(c,vn,-d);
    var npolygon = geo.polygon3D_inside_ellipse(dot,vx,[r,r,r,r],doli);
    npolygon.shift();
    for (i=0;i<npolygon.length;i++){ polygon.push(npolygon[i]); }
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
        bolt_shapes = bolt_shapes_for_extrusion(bolt_angles, h,w,s,b);
        bolt_paths = bolt_paths_for_extrusion(bsdots,bolt_angles,c,vn,va, h,w,s,b);
        console.log("-----------------WTF--------------");
        console.log(JSON.stringify(bolt_shapes));
        console.log(JSON.stringify(bolt_paths));
    }
    if (!bolt_shapes){
        for (i=0;i<bolt_paths.length;i++){
            bolts.push(bolt0_maker(bolt_paths[i],b));
            
        }
    }else{
        for (i=0;i<bolt_paths.length;i++){
            bolts.push(bolt16_maker(bolt_paths[i],bolt_shapes[i]));
        }
    }return bolts;
}