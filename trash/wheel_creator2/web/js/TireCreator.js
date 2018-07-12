function tire_shape_for_extrusion(h,w,s,c=[0,0,0]){
	//bsp - bezier (cubic 2D) spline
	var x=c[0];
	var y=c[1];
	sx=x+w[3]/2; sy=0;
	
	var t1; var r1; var r2; var t2;
	//h54h43
	t1x = sx; t1y = sy;
	t1 = vec_maker([t1x,t1y, 0]);
	r1 = t1;
	r2x = sx; r2y = sy+h[4];
	r2 = vec_maker([r2x,r2y, 0]);
	t2 = r2;
	var bez = bez_maker_from_vectors([t1,r1,r2,t2]);
	
	
	//h43h3
	t1x = r2x; t1y = r2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x+s[1]/2+h[2] ; r2y = r2y+h[3]/2-s[2]/2 ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y+s[2]/2 ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h3h32
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y+s[2]/2 ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x+w[2]/2 ; r2y = t2y+h[3]/2 ; //fixed
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h32h21
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y+h[2] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//w2
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[2] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	//mirrored
	//h12h23m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[2] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h23h3m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x-s[1]/2-h[2] ; r2y = r1y-h[3]/2+s[2]/2 ; //fixed
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y-h[3]/2 ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h3h34m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y-s[2]/2 ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx-w[3] ; r2y = sy+h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h34h45m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//try close
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx ; r2y = sy;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	var myshape = bez;
	// var myshapemesh = BABYLON.Mesh.CreateLines("metalshape", myshape.getPoints(), scene); 
	// myshapemesh.color = new BABYLON.Color3(1, 1, 1);
	return myshape.getPoints();
}
function tire_maker(h,w,s,hull=false){
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var dot = [0,0,0]; var vn = [1,0,0]; var va = [0,1,0]; var r = geo.sum_F([h[8],h[7],h[6],h[5]]) ;
	var myPath = ring_trajectory(dot, vn, va, r, 16);
	var myShape = tire_shape_for_extrusion(h,w,s,c);//bezier cubic spline for extrusion
	var customExtrudeSettings={
		shape: myShape,
		path: myPath,
		ribbonCloseArray: true
	};
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("tire", customExtrudeSettings, scene);
	
	var mat = tire_mat;
	extruded.material = mat;
	
	return extruded;
}