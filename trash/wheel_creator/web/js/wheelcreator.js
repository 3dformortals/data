showme("preparing wheelcreator.js");
var maxsize = 200; // radius max size for wheel , that scaling other sizes to camera field;

var geo = new GeometryXD();

// alert(geo.vecXD([1,2,3],[4,5,6]));
var fresh = true;
var metal; var metal_mat;
var bolts=[]; var bolts_mat;
var tire; var tire_mat;
var grips=[]; var grips_mat;
var track; //result track mesh, after subtract grips + oval shape
var track_base; //base for subtracktion
var track_tire; //tire shape for subtracktion from traks_base
var tracks=[]; var tracks_mat;
var axes=[]; //3mesh + 3 text

var canvas = document.getElementById("renderCanvas");
canvas.width = 600;
canvas.height = 600;
var engine = new BABYLON.Engine(canvas, true);
var scene;
var camera;
var ambient_light;
var directional_light;
var point_light;

function axes_creator (size) {
	var makeTextPlane = function (text, color, size) {
		var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
		dynamicTexture.hasAlpha = true;
		dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
		var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
		plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
		plane.material.backFaceCulling = false;
		plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
		plane.material.diffuseTexture = dynamicTexture;
		return plane;
	};
	var axisX = BABYLON.Mesh.CreateLines("axisX", [
		BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
		new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
	], scene);
	axisX.color = new BABYLON.Color3(1, 0, 0);
	var xChar = makeTextPlane("X", "red", size / 10);
	xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
	var axisY = BABYLON.Mesh.CreateLines("axisY", [
		BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
		new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
	], scene);
	axisY.color = new BABYLON.Color3(0, 1, 0);
	var yChar = makeTextPlane("Y", "green", size / 10);
	yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
	var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
		BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
		new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
	], scene);
	axisZ.color = new BABYLON.Color3(0, 0, 1);
	var zChar = makeTextPlane("Z", "blue", size / 10);
	zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	var axesbox = [xChar, yChar, zChar, axisX, axisY, axisZ];
	for (i=0;i<axesbox.length;i++) { axes.push(axesbox[i]); }
};


var createScene = function () {

	// Create the scene space
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(1, 1, 1);
	// Add a camera to the scene and attach it to the canvas
	camera = new BABYLON.ArcRotateCamera("Camera", geo.radians(45), geo.radians(45), 800, BABYLON.Vector3.Zero(), scene);
	// camera.setPosition(new BABYLON.Vector3(-400, -400, -400));
    camera.attachControl(canvas, true);
	
	// Add lights to the scene
	ambient_light = new BABYLON.HemisphericLight("ambient_light", new BABYLON.Vector3(1, 1, 1), scene);
	ambient_light.intensity = 1;
	directional_light = new BABYLON.DirectionalLight("directional_light", new BABYLON.Vector3(-500, -500, -500), scene );
	directional_light.intensity = 1; directional_light.setEnabled(false);
	point_light = new BABYLON.PointLight("point_light", new BABYLON.Vector3(500, 500, 500), scene );
	point_light.intensity = 0.3; point_light.setEnabled(false);
	
	axes_creator(400);

	// Add and manipulate meshes in the scene
	// var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1}, scene);

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

//----------------geometry section
function vec_maker(vec){ var vec3 = new BABYLON.Vector3(vec[0],vec[1],vec[2]); return vec3; }
function bez_maker(arc,mass=4){ var bez = BABYLON.Curve3.CreateCubicBezier(arc[0],arc[1],arc[2],arc[3],mass); return bez; }
function ring_trajectory(dot,vn,va,r){
	//vn=ox at this moment va = -oz
	var vb = geo.vec3Drotate(va,vn,90);
	var vad = geo.vecXDback(va);
	var vbd = geo.vecXDback(vb);
	var ta = geo.dotXDoffset(dot,va,r);
	var tb = geo.dotXDoffset(dot,vb,r);
	var tad = geo.dotXDoffset(dot,vad,r);
	var tbd = geo.dotXDoffset(dot,vbd,r);
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	
	var ac1 = geo.curve3D_3dots(dot,ta,tb);
	var ac2 = geo.curve3D_3dots(dot,tb,tad);
	var ac3 = geo.curve3D_3dots(dot,tad,tbd);
	var ac4 = geo.curve3D_3dots(dot,tbd,ta);
	
	
	
	//curve dots as vectors
	for (i=0;i<4;i++){
		a1.push(vec_maker(ac1[i]));
		a2.push(vec_maker(ac2[i]));
		a3.push(vec_maker(ac3[i]));
		a4.push(vec_maker(ac4[i]));
	};
	
	//bezier curves from vector arrays
	var mass=8;
	var arc1 = bez_maker(a1,mass);
	var arc2 = bez_maker(a2,mass);
	var arc3 = bez_maker(a3,mass);
	var arc4 = bez_maker(a4,mass);
	
	var arc14 = arc1.continue(arc2.continue(arc3.continue(arc4)));
	// var arc14mesh = BABYLON.Mesh.CreateLines("cbezier1", arc14.getPoints(), scene); arc14mesh.color = new BABYLON.Color3(1, 0.6, 0);
	return arc14.getPoints();
}
//----------------end geometry section

function whatdraw(){
	//metal,bolts,tire,grips,tracks
	var rez = [];
	for (i=1;i<6;i++){
		rez.push(document.getElementById("cbox_s" + i.toString() ).checked);
	}
	rez.push(document.getElementById( "axes" ).checked)
	return rez;
}

function one_mat_maker(hull,id){
	var mat = new BABYLON.StandardMaterial(id, scene);
	mat.alpha = 1.0;
	var htmlhexcolor = document.getElementById(id).value;
	mat.diffuseColor = new BABYLON.Color3.FromHexString(htmlhexcolor);
	mat.backFaceCulling = false;
	if (hull) { mat.wireframe = true; } else { mat.wireframe = false; }
	return mat;
}
function mat_maker(){
	var hull = document.getElementById("wireframe").checked;
	metal_mat = one_mat_maker(hull,"c1");
	bolts_mat = one_mat_maker(hull,"c2");
	tire_mat = one_mat_maker(hull,"c3");
	grips_mat = one_mat_maker(hull,"c4");
	tracks_mat = one_mat_maker(hull,"c5");
}
function mix_bolt_angles(){
	var ba_input = document.getElementById("s8");
	if (ba_input.value != "0"){ ba_input.value = "0"; }
	else{
		var rezbox = [];
		for (i=0;i<4;i++){
			rezbox.push( (Math.random() * 180).toString().split(".")[0] );
		}
		var rez= rezbox.join(" ");
		ba_input.value = rez;
	}
}
function background_color(){
	var colornow = scene.clearColor.toHexString();
	var colornew = document.getElementById("color_background").value.toUpperCase();
	if(colornow != colornew) { scene.clearColor = new BABYLON.Color3.FromHexString(colornew); console.log("background color changed from",colornow,"to",colornew);}
}
function refresh_lamp(){
	background_color();
	camera.alpha = geo.radians( parseFloat( document.getElementById("y_view").value ) );
	camera.beta = geo.radians( parseFloat( document.getElementById("z_view").value ) );
	camera.radius = parseFloat( document.getElementById("distance_view").value ) ;
	if (document.getElementById("perspective_view").checked){camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;}else{camera.mode =  BABYLON.Camera.ORTHOGRAPHIC_CAMERA;}
	
	ambient_light.direction = new BABYLON.Vector3(
		parseFloat(document.getElementById("x_ambient").value),
		parseFloat(document.getElementById("y_ambient").value),
		parseFloat(document.getElementById("z_ambient").value)
	);
	ambient_light.intensity = parseFloat(document.getElementById("intensity_ambient").value);
	if(document.getElementById("cbox_ambient").checked){ ambient_light.setEnabled(true); } else { ambient_light.setEnabled(false); }
	var htmlhexcolor = document.getElementById("color_ambient").value;
	ambient_light.diffuse = new BABYLON.Color3.FromHexString(htmlhexcolor);
	htmlhexcolor = document.getElementById("color_ground_ambient").value;
	ambient_light.groundColor = new BABYLON.Color3.FromHexString(htmlhexcolor);
	
	directional_light.direction = new BABYLON.Vector3(
		parseFloat(document.getElementById("x_directional").value),
		parseFloat(document.getElementById("y_directional").value),
		parseFloat(document.getElementById("z_directional").value)
	);
	directional_light.intensity = parseFloat(document.getElementById("intensity_directional").value);
	if(document.getElementById("cbox_directional").checked){ directional_light.setEnabled(true); } else { directional_light.setEnabled(false); }
	htmlhexcolor = document.getElementById("color_directional").value;
	directional_light.diffuse = new BABYLON.Color3.FromHexString(htmlhexcolor);
	
	point_light.position = new BABYLON.Vector3(
		parseFloat(document.getElementById("x_point").value),
		parseFloat(document.getElementById("y_point").value),
		parseFloat(document.getElementById("z_point").value)
	);
	point_light.intensity = parseFloat(document.getElementById("intensity_point").value);
	if(document.getElementById("cbox_point").checked){ point_light.setEnabled(true); } else { point_light.setEnabled(false); }
	htmlhexcolor = document.getElementById("color_point").value;
	point_light.diffuse = new BABYLON.Color3.FromHexString(htmlhexcolor);
	showme("\"LAMP\" tab data was applied");
}
function wheel_creator(){
	clearall();
	var dp = whatdraw(); //drawparts
	d=gui_reader(); //GuiReader.js
	h=d[0];w=d[1];b=d[2];s=d[3];g=d[4];
	// var angle = 0; //not used, looks hard to realise, because need additional displacement of tracks etc , and not looks benefit... head pain
	mat_maker();
	
	if (dp[5]) { axes_creator(400); }
	if (dp[0]) { metal = metal_maker(h,w,s); }
	if (dp[2]) { tire = tire_maker(h,w,s); }
	if (dp[1]) { bolts = bolts_maker(h,w,s,b); }
	if (dp[3]) { grips = grips_maker(h,w,s,g); }
	if (dp[4]) { tracks = tracks_maker(h,w,s,g); }
	showme("complete");
}

function clearall(){
	if (fresh) { fresh = false; }
	else{
		if(metal) { metal.dispose(false,true); metal = null; }
		if(tire) { tire.dispose(false,true); tire = null; }
		if(bolts) { for(i=0;i<bolts.length;i++){bolts[i].dispose(false,true);} bolts=[]; }
		if(grips) { for(i=0;i<grips.length;i++){grips[i].dispose(false,true);} grips=[]; }
		if(tracks) { for(i=0;i<tracks.length;i++){tracks[i].dispose(false,true);} tracks=[]; }
	}
	if (axes){ for(i=0;i<axes.length;i++) { axes[i].dispose(false, true); } axes = []; }
}

var OBJexport;
// work but big
function prepare_objects_for_export(objs){
	var rez = []
	for (i=0;i<objs.length;i++){
		var fullmesh = objs[i].bakeCurrentTransformIntoVertices();
		rez.push(fullmesh);
	}
	return rez;
}
function save_objmesh(){
	var text = "Attention! If you try export bolts or grips or tracks, export can be super long or impossible,\ndepend of your environment and wheel configuration.\nBecause huge number objects have a huge data of numbers.\n\nFor example firefox javascript engine have RAM limit of usage, etc.\nYou can try use chrome/chromium, export the model piece by piece(\"LOOK\" tab checkboxes), that later to collect it in full.\n\nDefault configuration, which you can see when start the app (metal + bolts + tire + grips + tracks),\nuses PC configuration (dual core AMD APU with integrated video 1Gb , CPU 3.4 Ghz, 8Gb RAM),\ncan be rendered with result file have 35 mb size.\nIf wheel have huge number of elements (bolts or grips or tracks)\nfirefox can fail with error \"allocation size overflow\", which you can see after press \"F12\" keyboard.\n\nWhen you see message about \"long running script\", just ignore it, when script will be completed message disappear."
	if (bolts || grips || tracks) { alert(text); }
	var exportobjects = []; //exported mesh array
	if (metal) { exportobjects.push(metal); }
	if (tire) { exportobjects.push(tire); }
	if (bolts) { for (i=0;i<bolts.length;i++) { exportobjects.push(bolts[i]); } }
	if (grips) { for (i=0;i<grips.length;i++) { exportobjects.push(grips[i]); } }
	if (tracks) { for (i=0;i<tracks.length;i++) { exportobjects.push(tracks[i]); } }
	
	OBJexport = prepare_objects_for_export(exportobjects);
	
	var a = document.getElementById('OBJexport');
	var text = BABYLON.OBJExport.OBJ(OBJexport);
	var type = "text/plain";
	var name = "exported_wheel.obj";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}
  
function get_camera_data_from_screen(){
	document.getElementById("y_view").value = geo.degrees(camera.alpha);
	document.getElementById("z_view").value = geo.degrees(camera.beta);
	document.getElementById("distance_view").value = camera.radius;
	
	
}
function change_camera_test(al,be){
	camera.alpha = geo.radians(al);
	camera.beta = geo.radians(be);
	document.getElementById("y_view").value = al;
	document.getElementById("z_view").value = be;
	
}
showme("wheelcreator.js ready");

function PNGexport(){
	var exp_res = document.getElementById("export_resolution").value; //export resolution / box side size px
	exp_res = parseInt(exp_res);
	var oldbackground = scene.clearColor;
	var transperent = document.getElementById("transperent").checked;
	if (transperent) {
		scene.clearColor = new BABYLON.Color4(0,0,0,0);
		scene.render();
	}
	BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, camera, exp_res);
	scene.clearColor = oldbackground;
}