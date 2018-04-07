
var geo = new GeometryXD();

// alert(geo.vecXD([1,2,3],[4,5,6]));



var container;
var camera, scene, renderer, controls;
var cp = new THREE.CurvePath();
var arc1 =[];
var arc2 =[];
var shape;
var extrudeSettings;
var mesh;
var mesh1;
var mesh2;
init();
animate();

function ring_trajectory(dot,vn,va,r){
	//vn=ox at this moment va = -oz
	var vb = geo.vec3Drotate(va,vn,90);
	var vad = geo.vecXDback(va);
	var vbd = geo.vecXDback(vb);
	var ta = geo.dotXDoffset(dot,va,r);
	var tb = geo.dotXDoffset(dot,vb,r);
	var tad = geo.dotXDoffset(dot,vad,r);
	var tbd = geo.dotXDoffset(dot,vbd,r);
	console.log("a b ad bd",va,vb,vad,vbd);
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	
	var ac1 = geo.curve3Dbeziercubic_3dots(dot,ta,tb);
	var ac2 = geo.curve3Dbeziercubic_3dots(dot,tb,tad);
	var ac3 = geo.curve3Dbeziercubic_3dots(dot,tad,tbd);
	var ac4 = geo.curve3Dbeziercubic_3dots(dot,tbd,ta);
	
	//curves for threejs
	for (i=0;i<4;i++){
		a1.push(vec_maker(ac1[i]));
		a2.push(vec_maker(ac2[i]));
		a3.push(vec_maker(ac3[i]));
		a4.push(vec_maker(ac4[i]));
	};
	console.log("arc1 curves use threejs vec as dot");
	console.log(a1); // look like done
	
	var arc1 = bez_maker(a1);
	var arc2 = bez_maker(a2);
	var arc3 = bez_maker(a3);
	var arc4 = bez_maker(a4);
	console.log("arc1 bezier curve use threejs")
	console.log(arc1);
	cp = new THREE.CurvePath();
	var arc = [arc1,arc2,arc3,arc4];
	
	cp.add(arc[0]);
	cp.add(arc[1]);
	cp.add(arc[2]);
	cp.add(arc[3]);
	// console.log(JSON.stringify(cp).toString());
	console.log("cp curvepath");
	console.log(cp);
	return cp;
}
//old code
function vec_maker(vec){
	var vec3 = new THREE.Vector3(vec[0],vec[1],vec[2]);
	return vec3;
}

function bez_maker(arc){
	// console.log(arc);
	var bez = new THREE.CubicBezierCurve3(arc[0],arc[1],arc[2],arc[3]);
	return bez;
}
function znak_maker(section){
	var znaky;
	var znakz;
	if(section==90){znaky=1; znakz=1;}
	else if(section==180){znaky=-1; znakz=1;}
	else if(section==270){znaky=-1; znakz=-1;}
	else if(section==360){znaky=1; znakz=-1;}
	return [znaky,znakz];
}
function arc_maker(tc,r,section){
	//profile in xy then arc for extrude way should be in yz plane
	var xc = tc.getComponent(0); yc = tc.getComponent(1); zc = tc.getComponent(2);
	// alert("33 xc="+xc +"\nyc="+yc+"\nzc="+zc);
	var znak=znak_maker(section);
	var arc=[];
	var vy=yc+r*znak[0];
	var vz=zc+r*znak[1];//for base dots
	var ly=yc+(0.55*r*znak[0]);
	var lz=zc+(0.55*r*znak[1]); //for levers of cubic bezier curve
	// alert("40 vy="+vy+"\nvz="+vz+"\nly="+ly+"\nlz="+lz);
	//+y +z
	if (section==90){
		arc.push( vec_maker([0,vy,zc]) );
		arc.push( vec_maker([0,vy,lz]) );
		arc.push( vec_maker([0,ly,vz]) );
		arc.push( vec_maker([0,yc,vz]) );
	}else if (section==180){
		arc.push( vec_maker([0,yc,vz]) );
		arc.push( vec_maker([0,ly,vz]) );
		arc.push( vec_maker([0,vy,lz]) );
		arc.push( vec_maker([0,vy,zc]) );
	}
	return arc;
}
function circle_extrude_way_maker(tc=new THREE.Vector3(),r=100,full=true){
	//recount global cp
	var cp = new THREE.CurvePath();
	var arc90=arc_maker(tc,r,90);
	var arc180=arc_maker(tc,r,180);
	var bez90=bez_maker(arc90);
	var bez180=bez_maker(arc180);
	// alert("63 check isCubicBezierCurve3 = "+bez90.isCubicBezierCurve3);
	// alert("64 String ="+JSON.stringify(bez90)+"\n"+"arc90="+JSON.stringify(arc90));
	cp.add(bez_maker(arc90));
	cp.add(bez_maker(arc180));
	if (full){
		var arc270=arc_maker(tc,r,270);
		var arc360=arc_maker(tc,r,360);
		cp.add(arc270);
		cp.add(arc360);
	}
	return cp;
}
function shape_maker(c){
	var pts = [], numPts = 4; //square profile
	pts.push( new THREE.Vector2 ( c[0]+0,c[1]+0));
	pts.push( new THREE.Vector2 ( c[0]+0,c[1]+40));
	pts.push( new THREE.Vector2 ( c[0]+20,c[1]+40));
	pts.push( new THREE.Vector2 ( c[0]+20,c[1]+0));
	
	shape = new THREE.Shape( pts );
	return shape;
}
function curveshape_maker(c){
	var bsp=new THREE.Shape();
	var x=c[0];
	var y=c[1];
	bsp.moveTo( x, y );
	bsp.bezierCurveTo( x+25, y+0, x+25, y+25, x+0, y+25 );
	bsp.bezierCurveTo( x+10, y+25, x+15, y+25, x+20, y+25 );
	bsp.bezierCurveTo( x+45, y+25, x+45, y+0, x+20, y+0 );
	bsp.bezierCurveTo( x+15, y+0, x+10, y+0, x+0, y+0 );
	return bsp;
}
function mesh_maker(tc,r=100,full=false){
	var c = new THREE.Vector3(tc[0],tc[1],tc[2]);
	// var cp = circle_extrude_way_maker(c,r);
	var dot = [0,0,0];
	var vn = [1,0,0];
	var va = [0,1,0];
	r = 100;
	var cp = ring_trajectory(dot, vn, va, r);
	console.log("mesh_maker cp.curves=");
	console.log(cp.curves);
	// var shape = shape_maker(tc);
	var shape = curveshape_maker(tc);
	console.log("shape");
	console.log(shape);
	
	var randomSpline = cp;
	//
	extrudeSettings = {
		steps: 200,
		bevelEnabled: false,
		extrudePath: randomSpline
		
	};
	console.log("before geometry");
	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings ); //coment this == change error
	console.log("after geometry");
	var material2 = new THREE.MeshLambertMaterial( { color: 0x0000ff, wireframe: false } );
	// scene.remove(mesh);
	mesh = new THREE.Mesh( geometry, material2 );
	return mesh;
}

function init() {
	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.link = '#f80';
	info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - geometry extrude shapes';
	document.body.appendChild( info );
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	// renderer.setSize( window.innerWidth, window.innerHeight );
	// document.body.appendChild( renderer.domElement );
	renderer.setSize( 600, 600 );
	var container = document.getElementById("renderbox");
	container.appendChild(renderer.domElement);
	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0x222222 );
	scene.background = new THREE.Color( 0x888888 );
	// camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
	camera.position.set( 0, 0, 500 );
	// camera.aspect = 1;
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 200;
	controls.maxDistance = 500;
	scene.add( new THREE.AmbientLight( 0x888888 ) );
	var light = new THREE.PointLight( 0xffffff );
	light.position.copy( camera.position );
	scene.add( light );
	//
	var randomPoints = [];
	for ( var i = 0; i < 10; i ++ ) {
		randomPoints.push( new THREE.Vector3( ( i - 4.5 ) * 50, THREE.Math.randFloat( - 50, 50 ), THREE.Math.randFloat( - 50, 50 ) ) );
	}
	var z = 10;
	var ss = 100;
	//var arc1 = [];
	arc1.push( vec_maker([-ss,0,z*1]) );
	arc1.push( vec_maker([0,-ss,z*2]) );
	arc1.push( vec_maker([ss,0,z*3]) );
	arc1.push( vec_maker([0,ss,z*4]) );
	//var randomSpline =  new THREE.CatmullRomCurve3( arc , closed=true);
	var bez1 = bez_maker(arc1);
	//var cp = new THREE.CurvePath();
	cp.add(bez1);
	
	//var arc2 =[];
	arc2.push( vec_maker([0,ss,z*4]) );
	arc2.push( vec_maker([0,-ss*2,z*2]) );
	arc2.push( vec_maker([ss*2,0,z*3]) );
	arc2.push( vec_maker([-ss*2,0,z*1]) );
	var bez2 = bez_maker(arc2);
	//cp.add(bez2);
	
	var randomSpline = cp;
	//
	extrudeSettings = {
		steps: 200,
		bevelEnabled: false,
		extrudePath: randomSpline
		
	};
	var pts = [], numPts = 4; //square profile
	pts.push( new THREE.Vector2 ( 0,0));
	pts.push( new THREE.Vector2 ( 0,40));
	pts.push( new THREE.Vector2 ( 20,40));
	pts.push( new THREE.Vector2 ( 20,0));
	
	shape = new THREE.Shape( pts );
	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	var material2 = new THREE.MeshLambertMaterial( { color: 0x0000ff, wireframe: false } );
	mesh = new THREE.Mesh( geometry, material2 );
	scene.add( mesh );//blue extrude
	//
	
}
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
function remove_mesh(){
	scene.remove(mesh);
}
function mesh1(tc,r,full=false){
	mesh1=mesh_maker(tc,r,full);
	scene.add(mesh1);
}
function mesh2(tc,r,full=false){
	mesh2=mesh_maker(tc,r,full);
	scene.add(mesh2);
}
function change_camera_test(a,b,c){
	// camera.lookAt(new THREE.Vector3(-1000, 0, 0)); // wrong code
	// controls.target = new THREE.Vector3(0, -100, 0); // offset orbit center but not rotate
	// controls.reset(); // worked reset to default
	camera.position.set(a,b,c);
	controls.target = new THREE.Vector3();
}


