
function bolt_maker(dot,u){}
function bolt1_maker(neg,dot,u,b){
    var meshSettings={
        height:b[2] * 2,
        width:b[1] * 2,
        depth:b[2] *2 / 3
    };
    var bolt1 = BABYLON.MeshBuilder.CreateBox("bolt", meshSettings, scene);
    bolt1.position = vec_maker(dot);
    var v = new BABYLON.Vector3(1,0,0);
    bolt1.rotate(v,geo.radians(u),BABYLON.Space.LOCAL);
    var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.5);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	bolt1.material = mat;
	
	console.log("endcode bolt1");
	return bolt1;
}

function bolts_center_offset(bsdots,bolt_angles,c,vn,va, b2){
    rez = [];
    var negativepolygon = bsdots.length / 2;
    var bw = w[5]/2;
    for (i=0;i<negativepolygon * 2;i++){
        var tc = geo.dotXDoffset(c,vn,bw);
        var vc = va;
        vc = geo.vec3Drotate(vc,vn,bolt_angles[i]);//rotated bolt vec
        rez.push(geo.dotXDoffset(bsdots[i],vc,b2 * 2 / 3));//move to 2/3 r bolt along rotated vec
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
        for (i=0;i<b3;i++){ ba.push(step*i); }
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
    var bt = b[4]; //bolt type
    var bolts_number = b[3];
    var bolts_center_radius = geo.sum_F([h[8],h[7]]);
    var bolts_heigh = b[1];
    var bolts_width_distance = w[5]/2;
    var bolt_angles = bolt_angles_counter(b[3], s[8]);
    if (bolt_angles){
        var bsdots = bolts_sheme_dots_counter(
            c, vn, va,
            bolt_angles.length,
            bolts_center_radius,
            bolts_width_distance
        );
        if(bt == 0 || bt == 7){ bsdots = bolts_center_offset(bsdots,bolt_angles,c,vn,va, b[2]); }
        var bal = bolt_angles.length;
        for (var i=0;i<bal;i++){
            var dot = bsdots[i];
            var u = bolt_angles[i];
            var neg = ((i<bal/2) ? false : true); //negative bolts
            if (bt == 0){ bolts.push(bolt0_maker(dot,b)); }//ellipsoid + excetric
            else if(bt == 1){ bolts.push(bolt1_maker(neg,dot,u,b)) } //box
            else if(bt == 2){ bolts.push(bolt_maker(dot,u)) } //cross
            else if(bt == 3){ bolts.push(bolt_maker(dot,u)) } //nohole
            else if(bt == 7){ bolts.push(bolt_maker(dot,u)) } //excentric
            else{ bolts.push(bolt_maker(dot,u)) } //polygons
            
        }
    }
    return bolts;
}