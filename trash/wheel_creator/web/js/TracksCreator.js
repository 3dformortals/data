showme("preparing TracksCreator.js");
function tracks_path_counter(c,vz,h,gt,one_ghhole,one_gw){
    var rez;
    if (gt == "|||" || gt == "ooo"){
        var t0 = vec_maker(geo.dotXDoffset(c,vz,h[1] / 2));
        var t1 = vec_maker(geo.dotXDoffset(c,vz,-h[1] / 2));
        rez = bez_maker([t0,t0,t1,t1]);
    }else{
        if (gt==">>>"){ rez = zigzag_counter(one_ghhole,one_gw); }
        else{rez = snake_counter(one_ghhole,one_gw); }
    }
    return rez.getPoints();
}
function trackgs(c,one_gh,h){
    var dx = one_gh / 2;
    var dy = h[1] / 2;
    
    var t1 = [dx,-dy,0];
    var t2 = [dx,dy,0];
    var t3 = [-dx,dy,0];
    var t4 = [-dx,-dy,0];
    
    
    var dotspair = geo.chain_F([t1,t2,t3,t4],2,true);
    var bez;
    for (var i = 0 ; i < dotspair.length ; i++){
        var v1 = vec_maker(dotspair[i][0]);
        var v2 = vec_maker(dotspair[i][1]);
        var vecs = [v1,v1,v2,v2];
        if (i == 0){ bez = bez_maker(vecs); }else{ bez = bez.continue(bez_maker(vecs)); }
    }
    // var bezmesh = BABYLON.Mesh.CreateLines("newgs2shape", bez.getPoints(), scene); 
	// bezmesh.color = new BABYLON.Color3(1, 0, 0);
    
    return bez.getPoints();
}

function tracks_shape_counter(gt,c,vn,va,one_gw,one_gh,one_ghhole,h){
    var rez;
    if (gt == "|||"){rez = gs1(c,one_gw,one_gh,vn,va);}
    else if (gt == ">>>"){rez = trackgs(c,one_gh,h);}
    else if (gt == ")))"){rez = trackgs(c,one_gh,h);}
    else if (gt == "ooo"){rez = gs4(c,one_gw,one_gh,vn,va);}
    return rez;
}


function base_subtrackt_tire_and_traks(gt){
    
    
    console.log("tracks.length = ",tracks.length, " before loop");
    
    for (i=0;i<tracks.length;i++){
        if(i==0) { var aCSG = BABYLON.CSG.FromMesh(tracks[i].bakeCurrentTransformIntoVertices() ); }
        else{ aCSG.unionInPlace( BABYLON.CSG.FromMesh(tracks[i].bakeCurrentTransformIntoVertices()) ); }
        tracks[i].dispose(false,true);
    }
    
    //NEW FLOW TIRE + TRACKS , and then subtrackt from base as CSG
    // if(gt==")))" || gt==">>>"){
    //     track_base.dispose(false,true); //kick from scene
    //     track_tire.dispose(false,true); //kick from scene
        
    //     for (i=0;i<tracks.length;i++){
    //         if(i==0) { var aCSG = BABYLON.CSG.FromMesh(tracks[i].bakeCurrentTransformIntoVertices() ); }
    //         else{ aCSG.unionInPlace( BABYLON.CSG.FromMesh(tracks[i].bakeCurrentTransformIntoVertices()) ); }
    //         tracks[i].dispose(false,true);
    //     }
    // }else{
        
    //     //new code trying loop each grip- super long... like hell), but result is more clear for curves
    //     track_base.bakeCurrentTransformIntoVertices();
    //     var aCSG = BABYLON.CSG.FromMesh(track_base);
    //     track_base.dispose(false,true); //kick from scene
        
    //     track_tire.bakeCurrentTransformIntoVertices();
    //     var bCSG = BABYLON.CSG.FromMesh(track_tire); //save to obj
    //     track_tire.dispose(false,true); //kick from scene
    //     aCSG.subtractInPlace(bCSG);
    //     for (i=0;i<tracks.length;i++){
    //         var aCSG = aCSG.subtract(BABYLON.CSG.FromMesh(tracks[i].bakeCurrentTransformIntoVertices()));
    //         tracks[i].dispose(false,true);
    //     }
    // } //have flat , tire + tracks
    tracks=[];
    track=aCSG.toMesh("track", mat, scene);
}

function tire_shape_for_track(h,w,s,c=[0,0,0]){
    //used when s1 + h2 * 2 < w1 or < w2
    //bsp - bezier (cubic 2D) spline
    var maxw = Math.max(w[1],w[2]);
    console.log("tire maker maxw = ",maxw," w1=",w[1]," w2=",w[2]);
    var maxh = geo.sum_F([h[2],h[3],h[4]]);
	var x=c[0];
	var y=c[1];
	sx=x+maxw/2; sy=0;
	
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
	
	var myshape = bez;
	return myshape.getPoints();
}

function track_tire_maker(h,w,s,c,va,r,vz){
    
    var tire_shape;
    var limitsize = s[1] + h[2] * 2;
    if( w[1] >= limitsize || w[2] >= limitsize){ tire_shape = tire_shape_for_track(h,w,s,c); }
    else { tire_shape = tire_shape_for_extrusion(h,w,s,c); }
    var tc = c;
    tc = geo.dotXDoffset(tc,va,geo.sum_F([h[8],h[7],h[6],h[5]]) );
    var tlong = Math.PI*2*r * 1.1;
    
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
    
	var mat = new BABYLON.StandardMaterial("mattiresubtrackt", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.2);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	// extruded.material = mat;
	
	return extruded;
}

function track_base_maker(h,w,s,r,c,va){
    
    var maxw = 0;//max width size
    maxw = Math.max( s[1]+h[2]*2 + 2*h[1], w[1] + 2*h[1], w[2] + 2*h[1] );
    var maxh = 0;//max hieght size
    maxh = Math.max(h[1], h[2], h[3] /2, h[1] + h[2] + h[3]) ;
    var tlong = Math.PI*2*r * 1.2;
    var box = BABYLON.MeshBuilder.CreateBox("tracks_base", {height: maxh, width: maxw, depth: tlong}, scene);
    //displacement from center
    var dis = maxh/2 - r - h[3] / 2 ; //r sum h 1...8
    var dot = geo.dotXDoffset(c,va,dis);
    box.position = vec_maker(dot);
    return box;
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
    
    
    if (gt == ">>>" || gt == ")))"){
        // extruded.rotateAround(vec_maker(c),vec_maker(vz),geo.radians(90));
        // extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(90));
        
        // if( ( ind/2 - Math.floor(ind/2) ) > 0 && ns==false){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
        if(ind & 1 && !ns){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
        else if(ns && !(ind & 1)){ extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180)); }
        extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(180));
        extruded.rotateAround(vec_maker(c),vec_maker(va),geo.radians(90));
        
    }else{
        extruded.rotateAround(vec_maker(c),vec_maker(vn),geo.radians(u));
    }
    
    extruded.position = vec_maker(dot);
    extruded.material = mat;
    return extruded;
}

function tracks_maker(h,w,s,g,hull=false){
    
    var c = [0,0,0]; // center dot
    var vn = [1, 0, 0]; // normal vector
    var va = [0, 1, 0]; // vertical direction vector for 2D shape of grip
    var vz = [0, 0, 1]; // vector for extrude grip shape
    var grips_type = g; // "g1"..."g4"
    var grips_height = geo.sum_F([h[3] / 2, h[2], h[1]]);
    var grips_width = w[1];
    var grips_max_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]);
    var grips_center_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2],h[1]]) - h[1] / 2;
    var grips_width_number = s[5];//how much per width
    var need_scale = false; //scale for g1 g4 and reverse for g2 g3
    if(grips_width_number < 0){
        grips_width_number = -grips_width_number;
        need_scale = true;
        console.log("TRACK need scale ",need_scale);
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
    var grips_shape;
    var grips_path;
    //code done not tested
    grips_path = tracks_path_counter(c,vz,h,grips_type,one_ghhole,one_gw);
    grips_shape = tracks_shape_counter(
        grips_type,
        c,vn,va,
        one_gw,one_gh,one_ghhole,h
    );
    //include base for subtracktion
    // track_base = track_base_maker(h,w,s,grips_max_radius,c,va);
    //create and subtract tire form from base
    // track_tire = track_tire_maker(h,w,s,c,va,grips_max_radius,vz);
    
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
        for (var j = 0;j<dots.length;j++){
            tracks.push(track_maker(dots[j],u,gp,gs,c,vn,va,vz,ns,gh,gt,j,ind));
            ind += 1;
        }
        
    }
    // base_subtrackt_tire_and_traks(grips_type);
    return tracks;
}
showme("TracksCreator.js ready");