showme("preparing TracksCreator.js");
function base_subtrackt_tire_and_traks(){
    var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.5);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
    
    //tire cubtraction
    var aCSG = BABYLON.CSG.FromMesh(track_base);
    var bCSG = BABYLON.CSG.FromMesh(track_tire);
    var subCSG = aCSG.subtract(bCSG);
    var newMesh = subCSG.toMesh("csg", mat, scene);
    track_base.dispose(false,true);
    track_tire.dispose(false,true);
    track_base = newMesh;
    
    //subtrackt grips
    console.log("tracks.length = ",tracks.length, " before loop");
    
    //new code trying loop each grip- super long... like hell), but result is clear
    // var bCSG = BABYLON.CSG.FromMesh(tracks[0]);
    // for (i=1;i<tracks.length;i++){
    //     bCSG.unionInPlace(BABYLON.CSG.FromMesh(tracks[i]));
    // }
    // for (i=0;i<tracks.length;i++){ tracks[i].dispose(false,true); }//remove parts
    // tracks=[];
    // var aCSG = BABYLON.CSG.FromMesh(track_base);
    // var subCSG = aCSG.subtract(bCSG);
    // var newMesh = subCSG.toMesh("track", mat, scene);//result mesh
    // //remove parts
    // track_base.dispose(false,true);
    //end new code without bug
    
    //old code with bug /half cutted hole, if * 1.02 in GripsCreator.js line 16
    var sum_track = BABYLON.Mesh.MergeMeshes(tracks,true,true); //summary mesh
    for (i=0;i<tracks.length;i++){ tracks[i].dispose(false,true); }//remove parts
    tracks=[];
    console.log("<<<REMOVE TRACKS RESULT = ",tracks,"\nREMOVE sum_track = ",sum_track);
    
    var aCSG = BABYLON.CSG.FromMesh(track_base);
    var bCSG = BABYLON.CSG.FromMesh(sum_track);
    var subCSG = aCSG.subtract(bCSG);
    var newMesh = subCSG.toMesh("track", mat, scene);//result mesh
    //remove parts
    track_base.dispose(false,true);
    sum_track.dispose(false,true);
    //end old code
    
    track=newMesh;
    track.material = mat;
    
    // for (i=0;i<tracks.length;i++){
    //     var aCSG = BABYLON.CSG.FromMesh(track_base);
    //     var bCSG = BABYLON.CSG.FromMesh(tracks[i]);
    //     var subCSG = aCSG.subtract(bCSG);
    //     var newMesh = subCSG.toMesh("csg", mat, scene);
    //     track_base.dispose(false,true);
    //     // tracks[i].dispose(false,true); //fail
    //     console.log("wtf");
    //     if (!scene.getMeshByName("track"+i.toString())){console.log("namefail");}
    //     else{
    //         console.log("namegood");
    //         scene.getMeshByName("track"+i.toString()).dispose(false,true);
    //     }
        
    //     track_base = newMesh;
    // }
}

function tire_shape_for_track(h,w,s,c=[0,0,0]){
    //used when s1 + h2 * 2 < w1 or < w2
    //bsp - bezier (cubic 2D) spline
    var maxw = Math.max(w[1],w[2]);
    console.log("tire maker maxw = ",maxw," w1=",w[1]," w2=",w[2]);
    var maxh = geo.sum_F([h[2],h[3],h[4]]);
	var x=c[0];
	var y=c[1];
	// var sx = x+w[5]+2; var sy = y+h[8]+2;
	sx=x+maxw/2; sy=0;
	console.log("tire shape before bezX");
	
	var t1; var r1; var r2; var t2;
	//up
	t1x = sx; t1y = sy;
	t1 = vec_maker([t1x,t1y, 0]);
	r1 = t1;
	r2x = sx; r2y = sy+maxh;
	r2 = vec_maker([r2x,r2y, 0]);
	t2 = r2;
	var bez = bez_maker([t1,r1,r2,t2]);
	
	
	//side
	t1x = r2x; t1y = r2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-maxw ; r2y = r1y ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//down
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x ; r2y = t2y-maxh ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//loop
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx; r2y = sy ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	console.log("shape after bezX");
	// var myshape = bez1.continue(bez2.continue(bez3));
	var myshape = bez;
	console.log("myshape");
	console.log(myshape);
	console.log("myshape closed");
	console.log("myshape getPoints = ");
	console.log(myshape.getPoints());
	// var myshapemesh = BABYLON.Mesh.CreateLines("metalshape", myshape.getPoints(), scene); 
	// myshapemesh.color = new BABYLON.Color3(1, 0, 0);
	return myshape.getPoints();
}

function track_tire_maker(h,w,s,c,va,vn,cdots,vz){
    
    var tire_shape;
    var limitsize = s[1] + h[2] * 2;
    if( w[1] >= limitsize || w[2] >= limitsize){ tire_shape = tire_shape_for_track(h,w,s,c); }
    else { tire_shape = tire_shape_for_extrusion(h,w,s,c); }
    var tc = c;
    // tc = geo.dotXDoffset(tc,vn,w[3]/2) ;//center start dot for count trajectory
    tc = geo.dotXDoffset(tc,va,geo.sum_F([h[8],h[7],h[6],h[5]]) );
    var tlong = cdots[cdots.length-1][0][2] - cdots[0][0][2];
    var dot0 = geo.dotXDoffset(tc,vz,-tlong / 2);
    var dot1 = geo.dotXDoffset(tc,vz,tlong / 2);
    var line = geo.line3D_2dots(dot0,dot1);
    var curve = []; //as babylonjs vectors
    for (i=0;i<line.length;i++){
        curve.push(vec_maker(line[i]));
    }
    var tire_path = bez_maker(curve).getPoints();
    
    var customExtrudeSettings={
		shape: tire_shape,
        path: tire_path,
        cap:3,
		// ribbonCloseArray: true
	};
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("subtrackt_tire", customExtrudeSettings, scene);
    //rotate 180
    extruded.rotateAround(vec_maker(c),vec_maker(vz),geo.radians(180));
    
    //displacement from center
    // var dis = maxh/2 -geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]);
    // var dot = geo.dotXDoffset(c,va,dis);
    // extruded.position = vec_maker(dot);
    
	var mat = new BABYLON.StandardMaterial("mattiresubtrackt", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.2);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	// extruded.material = mat;
	
	console.log("tire for subtrackt done");
	return extruded;
    
}

function track_base_maker(h,w,s,cdots,c,va){
    // alert(h); alert(w); alert(s); alert(cdots);
    var maxw = 0;//max width size
    maxw = Math.max( s[1]+h[2]*2 + 2*h[1], w[1] + 2*h[1], w[2] + 2*h[1] );
    console.log("base maker maxw = ",maxw," w1=",w[1]," w2=",w[2]);
    var maxh = 0;//max hieght size
    maxh = Math.max(h[1], h[2], h[3] /2, h[1] + h[2] + h[3] / 2);
    var tlong = 0;//track base length
    tlong = cdots[cdots.length-1][0][2] - cdots[0][0][2];
    console.log(cdots);
    // alert(maxh.toString()+maxw.toString()+tlong.toString());
    var box = BABYLON.MeshBuilder.CreateBox("tracks_base", {height: maxh, width: maxw, depth: tlong}, scene);
    //displacement from center
    var dis = maxh/2 -geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]);
    var dot = geo.dotXDoffset(c,va,dis);
    box.position = vec_maker(dot);
    
    var mat = new BABYLON.StandardMaterial("matbox", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	// box.material = mat;
    console.log("box complete");
    return box;
}

function track_angles_counter(s6){
    rez = [];
    var step = 360/s6;
    for (var i = 0;i < s6;i++){ rez.push(90); }
    return rez;
}

function tracks_center_dots_counter( c,vn,vz, r, nw, na, gw, one_gw ){
    var va = vz;
    var vb = geo.vec3Dnormal(vn,va);
    var van = geo.vecXDback(va);
    var vbn = geo.vecXDback(vb);
    var vaxes = [va,vb,van,vbn];
    console.log("--------VAXES-----------",vaxes);
    var doli = geo.repeater_F_F(na,[1]);
    console.log(doli);
    // var polygon = geo.polygon3D_inside_ellipse(c,vaxes,[r,r,r,r],doli);
    // polygon.shift();//contour without center dot
    //new polygon code, now it straight line with dots
    var cdot = geo.dotXDoffset(c,vz,r);
    var flatstep = Math.PI * 2 * r / na;
    var howmuch = Math.floor( na/2); // howmuch steps both side from center
    if (howmuch < 1) { howmuch = 1; } //fix it later na must be > 0
    var zcoor = geo.steps_external(cdot[2],cdot[2]+flatstep,howmuch,0); //z coordinates for dots
    zcoor.pop(); //cut last to balance both sides
    var polygon = [];
    for ( i=0; i<zcoor.length; i++){polygon.push([cdot[0],cdot[1],zcoor[i]]);}
    console.log(polygon);
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

function track_maker(dot,u,gp,gs,c,vn,ns,gh,gt,ind){
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
    var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("track"+ind.toString(), gripSettings, scene);
    
    if (gt == ">>>" || gt == ")))"){
        if(ind & 1 && !ns){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
        else if(ns && !(ind & 1)){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
    }
    extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(u));
    extruded.position = vec_maker(dot);
    // console.log(dot);
	
	// var mat = new BABYLON.StandardMaterial("mat1", scene);
	// mat.alpha = 1.0;
	// mat.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.2);
	// mat.backFaceCulling = false;
	// mat.wireframe = true;
	// extruded.material = mat;
	
	console.log("track done");
	return extruded;
}
function merge_trackbox(trackbox){
    //fail...still half cutted hole
    
    var bCSG = BABYLON.CSG.FromMesh(trackbox[0]);
    
    for (i=1;i<trackbox.length;i++){
        bCSG.unionInPlace(BABYLON.CSG.FromMesh(trackbox[i]));
    }
    for (i=0;i<trackbox.length;i++){ trackbox[i].dispose(false,true); }//remove parts
    trackbox=[];
    var sum_track = bCSG.toMesh("track", null, scene);//result mesh
    
    return sum_track;
}
function tracks_maker(h,w,s,g,hull=false){
    console.log("Flat track calculating. Just ingnore 'long running prompt'");
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
    //include base for subtracktion
    track_base = track_base_maker(h,w,s,cdots,c,va);
    //create and subtract tire form from base
    track_tire = track_tire_maker(h,w,s,c,va,vn,cdots,vz);
    
    //create track and subtrackt from base form
    var gal = grip_angles.length;
    var ind = 0;
    for (var i = 0;i < gal;i++){
        var dots = cdots[i];
        var u = grip_angles[i];
        var gp = grips_path;
        var gs = grips_shape;
        var ns = need_scale;
        var gh = h[1];
        var gt = grips_type;
        var trackbox = []; // box for one width line traks before merging
        for (var j = 0;j<dots.length;j++){
            trackbox.push(track_maker(dots[j],u,gp,gs,c,vn,ns,gh,gt,ind));
            // tracks.push(track_maker(dots[j],u,gp,gs,c,vn,ns,gh,gt,ind));
            ind += 1;
        }
        tracks.push(merge_trackbox(trackbox));
        
    }
    base_subtrackt_tire_and_traks();
    return tracks;
}
showme("TracksCreator.js ready");