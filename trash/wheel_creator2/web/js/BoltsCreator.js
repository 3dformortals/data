showme("preparing BoltsCreator.js");
function bolt7_maker(neg,dot,u,b){
    var meshSettings={
        height:b[1] * 2,
        diameter:b[2] * 2,
        tessellation:16
    };
    var bolt7 = BABYLON.MeshBuilder.CreateCylinder("bolt", meshSettings, scene);
    bolt7.position = vec_maker(dot);
    bolt7.rotate(new BABYLON.Vector3(0,0,1),geo.radians(90),BABYLON.Space.LOCAL);
    // bolt7.rotateAround(vec_maker(dot),new BABYLON.Vector3(1,0,0),geo.radians(u));
    //hole section for substract
    var holeSettings={
        height:b[1] * 2,
        diameter:b[2] * 2 * 2 / 3,
        tessellation:16
    }
    var hole = BABYLON.MeshBuilder.CreateCylinder("holebolt", holeSettings, scene);
    var vn = [dot[0],0,0];
    var d = Math.max( b[1] + (b[1] - b[2] * 2 / 3), b[1] *1.5 );
    var holedot = geo.dotXDoffset(dot,vn,d);
    hole.position = vec_maker(holedot);
    hole.rotateAround(vec_maker(holedot),new BABYLON.Vector3(0,0,1),geo.radians(90));
    
    var aCSG = BABYLON.CSG.FromMesh(bolt7);
    var bCSG = BABYLON.CSG.FromMesh(hole);
    var subCSG = aCSG.subtract(bCSG);
    var newMesh = subCSG.toMesh("csg", null, scene);
    bolt7.dispose(false,true);
    hole.dispose(false,true);
    
	return newMesh;
}
function bolt_maker(neg,dot,u,b){
    var meshSettings={
        height:b[1] * 2,
        diameter:b[2] * 2,
        tessellation:b[4]
    };
    var bolt4 = BABYLON.MeshBuilder.CreateCylinder("bolt", meshSettings, scene);
    bolt4.position = vec_maker(dot);
    bolt4.rotate(new BABYLON.Vector3(0,0,1),geo.radians(90),BABYLON.Space.LOCAL);
    bolt4.rotateAround(vec_maker(dot),new BABYLON.Vector3(1,0,0),geo.radians(u));
    //hole section for substract
    var holeSettings={
        height:b[1] * 2,
        diameter:b[2] * 2 * 2 / 3,
        tessellation:b[4]
    }
    var hole = BABYLON.MeshBuilder.CreateCylinder("holebolt", holeSettings, scene);
    var vn = [dot[0],0,0];
    var d = Math.max( b[1] + (b[1] - b[2] * 2 / 3), b[1] *1.5 );
    var holedot = geo.dotXDoffset(dot,vn,d);
    hole.position = vec_maker(holedot);
    hole.rotateAround(vec_maker(holedot),new BABYLON.Vector3(0,0,1),geo.radians(90));
    hole.rotateAround(vec_maker(holedot),new BABYLON.Vector3(1,0,0),geo.radians(u));
    
    var aCSG = BABYLON.CSG.FromMesh(bolt4);
    var bCSG = BABYLON.CSG.FromMesh(hole);
    var subCSG = aCSG.subtract(bCSG);
    var newMesh = subCSG.toMesh("csg", null, scene);
    bolt4.dispose(false,true);
    hole.dispose(false,true);
    
	return newMesh;
}
function bolt3_maker(neg,dot,u,b){
    if(neg){
        var db=b[2] * 2;
        var dt=0;
        var vx=[-1,0,0];
    }else{
        var dt=b[2] * 2;
        var db=0;
        var vx = [1,0,0];
    }
    var meshSettings={
        height:b[1],
        diameterBottom:db,
        diameterTop:dt,
        tessellation:3
    };
    var bolt3 = BABYLON.MeshBuilder.CreateCylinder("bolt3", meshSettings, scene);
    bolt3.position = vec_maker(geo.dotXDoffset(dot,vx,b[1] / 2));
    bolt3.rotate(new BABYLON.Vector3(0,0,1),geo.radians(90),BABYLON.Space.LOCAL);
    bolt3.rotateAround(vec_maker(dot),new BABYLON.Vector3(1,0,0),geo.radians(u),BABYLON.Space.LOCAL);
    return bolt3;
}
function bolt2_maker(neg,dot,u,b){
    var meshSettings={
        height:b[1] * 2,
        diameter:b[2] * 2,
        tessellation:16
    };
    var bolt2 = BABYLON.MeshBuilder.CreateCylinder("bolt", meshSettings, scene);
    bolt2.position = vec_maker(dot);
    bolt2.rotate(new BABYLON.Vector3(0,0,1),geo.radians(90),BABYLON.Space.LOCAL);
    //cross section for substract
    var cross1Settings={
        width:b[2] * 2 / 3,
        height:b[1] * 2,
        depth:b[2] * 2
    }
    var cross1 = BABYLON.MeshBuilder.CreateBox("cross1bolt", cross1Settings, scene);
    var cross2 = BABYLON.MeshBuilder.CreateBox("cross2bolt", cross1Settings, scene);
    cross2.rotate(new BABYLON.Vector3(0,1,0),geo.radians(90),BABYLON.Space.WORLD);
    var vn = [dot[0],0,0];
    var d = Math.max( b[1] + (b[1] - b[2] * 2 / 3), b[1] *1.5 );
    var crossdot = geo.dotXDoffset(dot,vn,d);
    cross1.position = vec_maker(crossdot);
    cross2.position = vec_maker(crossdot);
    cross1.rotateAround(vec_maker(crossdot),new BABYLON.Vector3(0,0,1),geo.radians(90));
    cross2.rotateAround(vec_maker(crossdot),new BABYLON.Vector3(0,0,1),geo.radians(90));
    cross1.rotateAround(vec_maker(crossdot),new BABYLON.Vector3(1,0,0),geo.radians(u));
    cross2.rotateAround(vec_maker(crossdot),new BABYLON.Vector3(1,0,0),geo.radians(u));
    
    var aCSG = BABYLON.CSG.FromMesh(bolt2);
    var bCSG = BABYLON.CSG.FromMesh(cross1);
    var cCSG = BABYLON.CSG.FromMesh(cross2);
    var subCSG = aCSG.subtract(bCSG);
    var subCSG = subCSG.subtract(cCSG);
    var newMesh = subCSG.toMesh("csg", null, scene);
    bolt2.dispose(false,true);
    cross1.dispose(false,true);
    cross2.dispose(false,true);
    
	return newMesh;
}
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
	
	var ellipsoidSettings={diameter: b[2] * 2, diameterX: b[1] * 2,segments:8};
    var bolt0 = BABYLON.MeshBuilder.CreateSphere("mySphere", ellipsoidSettings, scene);
    bolt0.position = vec_maker(dot);
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
            else if(bt == 2){ bolts.push(bolt2_maker(neg,dot,u,b)) } //cross
            else if(bt == 3){ bolts.push(bolt3_maker(neg,dot,u,b)) } //nohole
            else if(bt == 7){ bolts.push(bolt7_maker(neg,dot,u,b)) } //excentric
            else{ bolts.push(bolt_maker(neg,dot,u,b)) } //polygons
            bolts[i].material = bolts_mat;
        }
    }
    return bolts;
}
showme("BoltsCreator.js ready");