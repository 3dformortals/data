# Babylon.js issue description.
Parts of mesh, created uses babylon js , which broken when exported to obj. The imported mesh from obj uses freecad and meshlab need double side ligthning or some bolts have black color.

# Testing invironment.
ubuntu 16.04 x64
Babylon.js engine (v3.3.0-alpha.3)
freecad meshlab

# That reproduce the issue  
- clone the path `objexportissue`  
- inside web folder run `start.html`  
- use one of detected issue settings(see bottom) of `b4` and `b3`  
- press `ok`, it draw mesh on screen and prepare the `mesh` link to download file `scene.obj`  
- press `mesh` link and save file  
- open freecad, create new document, then file - import - scene.obj  
- or open meshlab, file - import mesh - scene.obj  

# Issue settings.
all settings touch only `b4`(type of bolts)  and `b3` (number of bolts).
![gui](png/gui.png?raw=true "gui")

---

b3 = 6 b4 = 6  
b3 = 7 b4 = 6  
These settings use `BABYLON.CSG.FromMesh` way and broken exported parts diffrent for both cases.  

![mesh66](png/mesh66.png?raw=true "mesh66")
![mesh76](png/mesh76.png?raw=true "mesh76")

---

b3 = 5 b4 = 3  
b3 = 6 b4 = 3  
These settings use `BABYLON.MeshBuilder.CreateCylinder` way and broken exported parts different for both cases.  

![mesh53](png/mesh53.png?raw=true "mesh53")
![mesh63](png/mesh63.png?raw=true "mesh63")

---
# Exported files placed inside `obj` folder  

[scene66.obj](obj/scene66.obj)  
[scene76.obj](obj/scene76.obj)  
[scene53.obj](obj/scene53.obj)  
[scene63.obj](obj/scene63.obj)  

---

The situation looks like all before export meshes to scene.obj work good.  
The difference between meshes is only position (angle of rotation in scene space and offset).  
In my beginner opinion the reason of issues can be inside exporter to OBJ, or inside `.bakeCurrentTransformIntoVertices()` method. But it only my fantasy.  

Hope it will be solved, i need this babylonjs functionality for my old project, which close to realization now.
