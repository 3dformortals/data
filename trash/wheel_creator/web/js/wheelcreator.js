showme("preparing wheelcreator.js");
var maxsize = 200; // radius max size for wheel , that scaling other sizes to camera field;

var geo = new GeometryXD();

// alert(geo.vecXD([1,2,3],[4,5,6]));
var fresh = true;
var metal;
var bolts=[];
var tire;
var grips=[];
var track; //result track mesh, after subtract grips + oval shape
var track_base; //base for subtracktion
var track_tire; //tire shape for subtracktion from traks_base
var tracks=[]; //flat placed grips for subtraction
var canvas = document.getElementById("renderCanvas");
canvas.width = 600;
canvas.height = 600;
var engine = new BABYLON.Engine(canvas, true);
var scene;
var camera;
var createScene = function () {

	// Create the scene space
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(1, 1, 1);
	// Add a camera to the scene and attach it to the canvas
	camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 500, BABYLON.Vector3.Zero(), scene);
	// camera.setPosition(new BABYLON.Vector3(-400, -400, -400));
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

    showAxis(400);

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
function bez_maker(arc){ var bez = BABYLON.Curve3.CreateCubicBezier(arc[0],arc[1],arc[2],arc[3],20); return bez; }
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



function metal_shape_for_extrusion(h,w,s,c=[0,0,0]){
	//bsp - bezier (cubic 2D) spline
	var x=c[0];
	var y=c[1];
	// var sx = x+w[5]+2; var sy = y+h[8]+2;
	sx=x+w[5]/2; sy=0;
	console.log("shape before bezX");
	var t1; var r1; var r2; var t2;
	//h87h65
	t1x = sx; t1y = sy;
	t1 = vec_maker([t1x,t1y, 0]);
	r1 = t1;
	r2x = sx; r2y = sy+geo.sum_F([h[7],h[6]]);
	r2 = vec_maker([r2x,r2y, 0]);
	t2 = r2;
	var bez = bez_maker([t1,r1,r2,t2]);
	
	//h65h54
	t1 = t2;
	r1x = r2x; r1y = r2y+s[4];
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x+w[3]/2+w[4] ; r2y = r2y+h[5]-s[3] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y+s[3];
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h54h43
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y+h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//w4
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[4] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h4
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//w3
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[3] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
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
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//w4m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[4] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h34h45m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h45h56m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t2x; r1y = t2y-s[3] ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x-w[5]/2 ; r2y = t2y-h[5]+s[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y-s[4] ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h56h78m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-geo.sum_F([h[6],h[7]]) ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//w5close
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx; r2y = sy;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	// //
	// t1x = ; t1y = ;
	// t1 = vec_maker([t1x,t1y, 0]);
	// r1x = ; r1y = ;
	// r1 = vec_maker([r1x,r1y, 0]);
	// r2x = ; r2y = ;
	// r2 = vec_maker([r2x,r2y, 0]);
	// t2x = ; t2y = ;
	// t2 = vec_maker([t2x,t2y, 0]);
	// var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//old triangle code , work done
	// var bez1 = bez_maker([
	// 	vec_maker([sx,sy,0]),
	// 	vec_maker([sx,sy,0]),
	// 	vec_maker([sx-w[5],sy,0]),
	// 	vec_maker([sx-w[5],sy,0])
	// ]);
	// console.log("after bez1");
	// var bez2 = bez_maker([
	// 	vec_maker([sx-w[5],sy,0]),
	// 	vec_maker([sx-w[5],sy,0]),
	// 	vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0]),
	// 	vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0])
	// ]);
	// var bez3 = bez_maker([
	// 	vec_maker([sx,sy+geo.sum_F([h[8],h[7],h[6]]),0]),
	// 	vec_maker([sx+20,sy+geo.sum_F([h[8],h[7],h[6]]),0]),
	// 	vec_maker([sx,sy,0]),
	// 	vec_maker([sx,sy,0])
	// ]);
	console.log("shape after bezX");
	// var myshape = bez1.continue(bez2.continue(bez3));
	var myshape = bez;
	console.log("myshape");
	console.log(myshape);
	console.log("myshape closed");
	console.log("myshape getPoints = ");
	console.log(myshape.getPoints());
	// var myshapemesh = BABYLON.Mesh.CreateLines("metalshape", myshape.getPoints(), scene); 
	// myshapemesh.color = new BABYLON.Color3(1, 1, 1);
	return myshape.getPoints();
}
function tire_shape_for_extrusion(h,w,s,c=[0,0,0]){
	//bsp - bezier (cubic 2D) spline
	var x=c[0];
	var y=c[1];
	// var sx = x+w[5]+2; var sy = y+h[8]+2;
	sx=x+w[3]/2; sy=0;
	console.log("tire shape before bezX");
	
	var t1; var r1; var r2; var t2;
	//h54h43
	t1x = sx; t1y = sy;
	t1 = vec_maker([t1x,t1y, 0]);
	r1 = t1;
	r2x = sx; r2y = sy+h[4];
	r2 = vec_maker([r2x,r2y, 0]);
	t2 = r2;
	var bez = bez_maker([t1,r1,r2,t2]);
	
	
	//h43h3
	t1x = r2x; t1y = r2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x+s[1]/2+h[2] ; r2y = r2y+h[3]/2-s[2]/2 ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y+s[2]/2 ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h3h32
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y+s[2]/2 ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x+w[2]/2 ; r2y = t2y+s[2]/2 ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h32h21
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y+h[2] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//w2
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x-w[2] ; r2y = r1y;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
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
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h23h3m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = x-s[1]/2-h[2] ; r2y = r1y-h[3]/2+s[2]/2 ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y-s[2]/2 ;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h3h34m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y-s[2]/2 ;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx-w[3] ; r2y = sy+h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//h34h45m
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = r1x; r2y = r1y-h[4] ;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	//try close
	t1x = t2x; t1y = t2y;
	t1 = vec_maker([t1x,t1y, 0]);
	r1x = t1x; r1y = t1y;
	r1 = vec_maker([r1x,r1y, 0]);
	r2x = sx ; r2y = sy;
	r2 = vec_maker([r2x,r2y, 0]);
	t2x = r2x; t2y = r2y;
	t2 = vec_maker([t2x,t2y, 0]);
	var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	// //
	// t1x = ; t1y = ;
	// t1 = vec_maker([t1x,t1y, 0]);
	// r1x = ; r1y = ;
	// r1 = vec_maker([r1x,r1y, 0]);
	// r2x = ; r2y = ;
	// r2 = vec_maker([r2x,r2y, 0]);
	// t2x = ; t2y = ;
	// t2 = vec_maker([t2x,t2y, 0]);
	// var bez = bez.continue(bez_maker([t1,r1,r2,t2]));
	
	
	console.log("shape after bezX");
	// var myshape = bez1.continue(bez2.continue(bez3));
	var myshape = bez;
	console.log("myshape");
	console.log(myshape);
	console.log("myshape closed");
	console.log("myshape getPoints = ");
	console.log(myshape.getPoints());
	// var myshapemesh = BABYLON.Mesh.CreateLines("metalshape", myshape.getPoints(), scene); 
	// myshapemesh.color = new BABYLON.Color3(1, 1, 1);
	return myshape.getPoints();
}
//----------------end geometry section

function metal_maker(h, w, s, hull=false,extrude=100){
	//metal base of wheel
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var dot = [0,0,0]; var vn = [1,0,0]; var va = [0,1,0]; r = h[8];
	var myPath = ring_trajectory(dot, vn, va, r);
	var myShape = metal_shape_for_extrusion(h,w,s,c);//bezier cubic spline for extrusion
	var extrudeSettings={
		shape: myShape,
		path: myPath,
		// cap: 3, 
		// sideOrientation:BABYLON.Mesh.DOUBLESIDE,
		
	};
	var customExtrudeSettings={
		shape: myShape,
		path: myPath,
		// ribbonClosePath: true,
		ribbonCloseArray: true
		
	};
	// var extruded = BABYLON.MeshBuilder.ExtrudeShape("ext", extrudeSettings, scene);
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("ext", customExtrudeSettings, scene);
	// var extruded = BABYLON.MeshBuilder.ExtrudeShape("ext", {shape: myShape, path: myPath}, scene);
	
	var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	extruded.material = mat;
	
	console.log("endcode");
	return extruded;
}

function tire_maker(h,w,s,hull=false){
	var ox = [1,0,0];
	var oy = [0,1,0];
	var c = [0,0,0];
	var dot = [0,0,0]; var vn = [1,0,0]; var va = [0,1,0]; r = geo.sum_F([h[8],h[7],h[6],h[5]]) ;
	var myPath = ring_trajectory(dot, vn, va, r);
	var myShape = tire_shape_for_extrusion(h,w,s,c);//bezier cubic spline for extrusion
	var extrudeSettings={
		shape: myShape,
		path: myPath,
	};
	var customExtrudeSettings={
		shape: myShape,
		path: myPath,
		ribbonCloseArray: true
	};
	var extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("ext", customExtrudeSettings, scene);
	
	var mat = new BABYLON.StandardMaterial("mat1", scene);
	mat.alpha = 1.0;
	mat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
	mat.backFaceCulling = false;
	// mat.wireframe = true;
	extruded.material = mat;
	
	console.log("endcode");
	return extruded;
}




function whatdraw(){
	//metal,bolts,tire,grips,track
	var rez = [];
	for (i=1;i<6;i++){
		rez.push(document.getElementById("cbox_s" + i.toString() ).checked);
	}return rez;
}
function wheel_creator(){
	clearall();
	var dp = whatdraw(); //drawparts
	d=gui_reader(); //GuiReader.js
	h=d[0];w=d[1];b=d[2];s=d[3];g=d[4];
	// var angle = 0;
	if (dp[0]) { metal = metal_maker(h,w,s); }
	if (dp[2]) { tire = tire_maker(h,w,s); }
	if (dp[1]) { bolts = bolts_maker(h,w,s,b); }
	if (dp[3]) { grips = grips_maker(h,w,s,g); }
	if (dp[4]) { tracks = tracks_maker(h,w,s,g); }
	// console.log("--------tire export trying--------");
	// console.log(BABYLON.OBJExport.OBJ([tire]));
	// alert(BABYLON.OBJExport.OBJ([metal]));
	
	// console.log("EO length",exportobjects.length);
	// for (i=0;i<exportobjects.length;i++){exportobjects[i].dispose(false,true);}
	// console.log("EO length",exportobjects.length);
	// console.log(exportobjects);
	// download(BABYLON.OBJExport.OBJ(exportobjects),"scene.obj","text/plain");
	
	// download(BABYLON.OBJExport.OBJ(exportobjects,true,"wheelmaterials",false),"scene.obj","text/plain");
}

function clearall(){
	if (fresh) { fresh = false; }
	else{
		if(metal) { metal.dispose(false,true); metal = null; }
		if(tire) { tire.dispose(false,true); metal = null; }
		if(track) { track.dispose(false,true); track = null; }
		if(bolts) { for(i=0;i<bolts.length;i++){bolts[i].dispose(false,true);} bolts=[]; }
		if(grips) { for(i=0;i<grips.length;i++){grips[i].dispose(false,true);} grips=[]; }
	}
}
//------------------------------

// function download(text, name, type) {
// 	var a = document.getElementById("a");
// 	var file = new Blob([text], {type: type});
// 	a.href = URL.createObjectURL(file);
// 	a.download = name;
	
//   }

var OBJexport;
// work but big
function prepare_objects_for_export(objs){
	var rez = []
	for (i=0;i<objs.length;i++){
		var fullmesh = objs[i].bakeCurrentTransformIntoVertices();
		// var mesh = fullmesh.clone("mesh"+i.toString());
		// rez.push(fullmesh.clone("mesh"+i.toString())); //this make clone and white color
		rez.push(fullmesh);
		// mesh.dispose(false,true);
	}
	// download(BABYLON.OBJExport.OBJ(rez),"scene.obj","text/plain");
	for (i=0;i<rez.length;i++){
		// rez[i].dispose(false,true);
		// objs[i].dispose(false,true);
	}
	return rez;
}
function save_objmesh(){
	// document.getElementById("a").click();
	var exportobjects = []; //exported mesh array
	if (metal) { exportobjects.push(metal); }
	if (tire) { exportobjects.push(tire); }
	if (track) { exportobjects.push(track); }
	if (bolts) { for (i=0;i<bolts.length;i++) { exportobjects.push(bolts[i]); } }
	if (grips) { for (i=0;i<grips.length;i++) { exportobjects.push(grips[i]); } }
	// var exportobjects = [metal,tire,track].concat(bolts.concat(grips));
	OBJexport = prepare_objects_for_export(exportobjects);
	
	var a = document.getElementById('OBJexport');
	var text = BABYLON.OBJExport.OBJ(OBJexport)
	var type = "text/plain";
	var name = "exported_wheel.obj";
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}
  

function change_camera_test(al,be,ra){
	camera.alpha = al;
	camera.beta = be;
}
showme("wheelcreator.js ready");

function PNGexport(){
	var exp_res = document.getElementById("export_resolution").value; //export resolution / box side size px
	exp_res = parseInt(exp_res);
	var oldbackground = scene.clearColor;
	var transperent = document.getElementById("transperent").checked;
	if (transperent) {
		// scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
		scene.clearColor = new BABYLON.Color4(0,0,0,0);
		scene.render();
	}
	BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, camera, exp_res);
	scene.clearColor = oldbackground;
	// BABYLON.Tools.CreateScreenshot(engine, camera, 400);
}