function metal_shape_for_extrusion(h,w,s,c=[0,0,0]){
	//bsp - bezier (cubic 2D) spline
	var x=c[0];
	var y=c[1];
	sx=x+w[5]/2; sy=0;
	var t1; var r1; var r2; var t2;
	//h87h65
	t1x = sx; t1y = sy;
	t1 = vec_maker([t1x,t1y, 0]);
	r1 = t1;
	r2x = sx; r2y = sy+geo.sum_F([h[7],h[6]]);
	r2 = vec_maker([r2x,r2y, 0]);
	t2 = r2;
	var bez = bez_maker_from_vectors([t1,r1,r2,t2]);
	
	//h65h54
	t1 = t2;
	r1x = r2x; r1y = r2y+s[4];
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x+w[3]/2+w[4] ; r2y = r2y+h[5]-s[3] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y+s[3];
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h54h43
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y+h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//w4
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[4] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h4
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//w3
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[3] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	//left mirrored contour
	//h4m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y+h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//w4m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[4] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h34h45m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h45h56m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y-s[3] ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x-w[5]/2 ; r2y = t2y-h[5]+s[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y-s[4] ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//h56h78m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-geo.sum_F([h[6],h[7]]) ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	
	//w5close
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx; r2y = sy;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker_from_vectors([t1,r1,r2,t2]));
	
	var myshape = bez;
	// var myshapemesh = BABYLON.Mesh.CreateLines("metalshape", myshape.getPoints(), scene); 
	// myshapemesh.color = new BABYLON.Color3(1, 1, 1);
	return myshape.getPoints();
}
function metal_maker(h, w, s, hull=false,extrude=100){
	//metal base of wheel
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var dot = [0,0,0]; var vn = [1,0,0]; var va = [0,1,0]; r = h[8];
	var myPath = ring_trajectory(dot, vn, va, r, 16);
	var myShape = metal_shape_for_extrusion(h,w,s,c);//bezier cubic spline for extrusion
	var customExtrudeSettings={
		shape: myShape,
		path: myPath,
		// ribbonClosePath: true,
		ribbonCloseArray: true
		
	};
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("metal", customExtrudeSettings, scene);
	
	var mat = metal_mat;
	extruded.material = mat;
	
	return extruded;
}