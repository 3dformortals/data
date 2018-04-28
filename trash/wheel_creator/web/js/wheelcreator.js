var maxsize = 200; // radius max size for wheel , that scaling other sizes to camera field;

var geo = new GeometryXD();

// alert(geo.vecXD([1,2,3],[4,5,6]));

var canvas = document.getElementById("renderCanvas");
canvas.width = 400;
canvas.height = 400;
var engine = new BABYLON.Engine(canvas, true);
var scene;
var createScene = function () {

	// Create the scene space
	scene = new BABYLON.Scene(engine);

	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 2, BABYLON.Vector3.Zero(), scene);
	camera.setPosition(new BABYLON.Vector3(-400, -400, -400));
    camera.attachControl(canvas, true);

	// Add lights to the scene
	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
	var light3 = new BABYLON.HemisphericLight("light3", new BABYLON.Vector3(0, -1,-1), scene);
	// var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
	
	
	var showAxis = function (size) {
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
    };

    showAxis(200);

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
function bez_maker(arc){ var bez = BABYLON.Curve3.CreateCubicBezier(arc[0],arc[1],arc[2],arc[3],200); return bez; }
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
	
	
	
	//curve dots as vectors
	for (i=0;i<4;i++){
		a1.push(vec_maker(ac1[i]));
		a2.push(vec_maker(ac2[i]));
		a3.push(vec_maker(ac3[i]));
		a4.push(vec_maker(ac4[i]));
	};
	console.log("arc1 curves use vec as dot");
	console.log(a1); // look like done
	
	//bezier curves from vector arrays
	var arc1 = bez_maker(a1);
	var arc2 = bez_maker(a2);
	var arc3 = bez_maker(a3);
	var arc4 = bez_maker(a4);
	console.log("arc1 bezier curve use babylon")
	console.log(arc1);
	
	var arc14 = arc1.continue(arc2.continue(arc3.continue(arc4)));
	var arc14mesh = BABYLON.Mesh.CreateLines("cbezier1", arc14.getPoints(), scene); arc14mesh.color = new BABYLON.Color3(1, 0.6, 0);
	return arc14.getPoints();
	// console.log(JSON.stringify(cp).toString());
}


function metal_shape_for_extrusion(h,w,c=[0,0,0]){
	//bsp - bezier (cubic 2D) spline
	var x=c[0]+2;
	var y=c[1]+2;
	var sx = x+w[5]+2; var sy = y+h[8]+2;
	sx=0; sy=0;
	console.log("shape before bezX");
	
	var bez1 = bez_maker([
		vec_maker([sx,sy,0]),
		vec_maker([sx,sy,0]),
		vec_maker([sx-w[5],sy,0]),
		vec_maker([sx-w[5],sy,0])
	]);
	console.log("after bez1");
	var bez2 = bez_maker([
		vec_maker([sx-w[5],sy,0]),
		vec_maker([sx-w[5],sy,0]),
		vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0]),
		vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0])
	]);
	var bez3 = bez_maker([
		vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0]),
		vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0]),
		vec_maker([sx,sy,0]),
		vec_maker([sx,sy,0])
	]);
	console.log("shape after bezX");
	var myshape = bez1.continue(bez2.continue(bez3));
	console.log("myshape");
	console.log(myshape);
	console.log("myshape closed");
	console.log("myshape getPoints = ");
	console.log(myshape.getPoints());
	var myshapemesh = BABYLON.Mesh.CreateLines("metalshape", myshape.getPoints(), scene); 
	myshapemesh.color = new BABYLON.Color3(1, 0.6, 0);
	return myshape.getPoints();
}
//----------------end geometry section

function metal_maker(h, w, hull=false,extrude=100){
	//metal base of wheel
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var dot = [w[5],0,0]; var vn = [1,0,0]; var va = [0,1,0]; r = Math.floor(h[8]);
	alert(r);
	var myPath = ring_trajectory(dot, vn, va, r);
	var myShape = metal_shape_for_extrusion(h,w,c);//bezier cubic spline for extrusion
	var extruded = BABYLON.MeshBuilder.ExtrudeShape("ext", {shape: myShape, path: myPath}, scene);
	console.log("endcode");
	return extruded;
}












function wheel_creator(){
	d=gui_reader(); //GuiReader.js
	h=d[0];w=d[1];b=d[2];s=d[3];g=d[4];
	var angle = 0;
	var metal = metal_maker(h,w);
	console.log("metal part");
	console.log(metal);
}

//------------------------------
	


