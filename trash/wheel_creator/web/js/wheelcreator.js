var maxsize = 200; // radius max size for wheel , that scaling other sizes to camera field;

var geo = new GeometryXD();

// alert(geo.vecXD([1,2,3],[4,5,6]));

var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

	// Create the scene space
	var scene = new BABYLON.Scene(engine);

	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	// Add lights to the scene
	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
	var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);


	// Add and manipulate meshes in the scene
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);

	return scene;
};

/******* End of the create scene function ******/    

var scene = createScene(); //Call the createScene function

engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
scene.render();
});


window.addEventListener("resize", function () { // Watch for browser/canvas resize events
engine.resize();
});


//old code threejs
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
var mesh3;
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
	
	var ac1 = geo.curve3D_3dots(dot,ta,tb);
	var ac2 = geo.curve3D_3dots(dot,tb,tad);
	var ac3 = geo.curve3D_3dots(dot,tad,tbd);
	var ac4 = geo.curve3D_3dots(dot,tbd,ta);
	
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

function vec_maker(vec){
	var vec3 = new THREE.Vector3(vec[0],vec[1],vec[2]);
	return vec3;
}

function bez_maker(arc){
	var bez = new THREE.CubicBezierCurve3(arc[0],arc[1],arc[2],arc[3]);
	return bez;
}


function metal_shape_for_extrusion(h,w,c=[0,0,0]){
	//bsp - bezier (cubic 2D) spline
	var r1x = 0; var r1y = 0; var r2x = 0; var r2y = 0; var t2x = 0; var t2y = 0;
	var bsp=new THREE.Shape();
	var x=c[0]+2;
	var y=c[1]+2;
	var sx = x+w[5]+2; var sy = y+h[8]+2;
	bsp.moveTo( Math.floor(sx),Math.floor(sy) );//
	//just triangle shape clockwise
	bsp.lineTo(Math.floor(sx-w[5]) , Math.floor(sy) );//w5cw to left
	bsp.lineTo(Math.floor(sx),Math.floor(y+geo.sum_F([h[8],h[7],h[6]])));//to up
	bsp.lineTo(Math.floor(sx) , Math.floor(sy));//to down
	return bsp;
}
function metal_maker(h, w, hull=false,extrude=100){
	//metal base of wheel
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var bsp = metal_shape_for_extrusion(h,w,c);//bezier cubic spline for extrusion
	var dot = [w[5],0,0]; var vn = [1,0,0]; var va = [0,-1,0]; r = Math.floor(h[8]);
	alert(r);
	var cp = ring_trajectory(dot, vn, va, r);
	var randomSpline = cp;
	//
	extrudeSettings = {
		steps: 200,//200
		amount: 12,//not work
		bevelEnabled: false,
		extrudePath: randomSpline
	};
	var geometry = new THREE.ExtrudeGeometry( bsp, extrudeSettings );
	var material2 = new THREE.MeshPhysicalMaterial( { color: 0xff00ff, wireframe: false } );
	mesh3 = new THREE.Mesh( geometry, material2 );
	scene.add(mesh3);
	return mesh3;
}

function wheel_creator(){
	d=gui_reader(); //GuiReader.js
	h=d[0];w=d[1];b=d[2];s=d[3];g=d[4];
	var angle = 0;
	var metal = metal_maker(h,w);
	scene.add(metal);
	console.log(metal);
}

//------------------------------
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
	camera = new THREE.PerspectiveCamera( 45, 1, 1, 1500 );
	camera.position.set( 0, 0, 500 );
	// camera.aspect = 1;
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 200;
	controls.maxDistance = 1500;
	scene.add( new THREE.AmbientLight( 0x888888 ) );
	var light = new THREE.PointLight( 0xffffff );
	light.position.copy( camera.position );
	scene.add( light );
}
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}


