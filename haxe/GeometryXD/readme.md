# GeometryXD

## readme under development
multidimensional geometry manipulations.
Primarily targeted for 3D objects (points, vectors, curves).
Not pro level library. Just my own result.

- dot
  - offset
  - rotate
  - scale
- vector
  - rotate
  - resize to 1 lenght
- curve
  - offset
  - rotate
  - scale
---
  # generate docs uses `haxelib dox`
  * terminal on build.hxml level  
  * `sudo haxelib remove dox`
  * `sudo haxelib git dox https://github.com/HaxeFoundation/dox`
  * `haxe build.hxml`  
  * `haxelib run dox -i bin -o bin/pages`  
  need github version of dox, because it have some fixes(pgup, pgdn, keyboard arrows scrolling etc).
  ---
  # compiling to python3  
  * terminal on build.hxml level  
  * `haxe -main GeometryXD -python geo.py`
  ## usage  
  * open terminal on `geo.py` level  
  * `python3`  
  * `>>> from geo import GeometryXD as geo`  -> `GeometryXD`  
  * `>>> print( geo.vecXDback([3,2,1]))` -> `[-3, -2, -1]`
  ---
  # compiling to javascript  
  * terminal inside `GeometryXD/js` folder or remove all `static` keywords from `GeometryXD.hx` source except `public static main()` method, and replace begin string `package;` to `@:expose`
  * `haxe -main GeometryXD -js geo.js`
  ## usage
  for file tree  
` web`  
`    ├── js`  
`    │   ├── geo.js`  
`    │   └── big.js`  
`    └── start.html`  

big.js  
```
var geo = new GeometryXD();
alert(geo.vecXDback([3,2,1]));
```

start.html  
```
<html><head>
<script src="js/geo.js"></script>
<script src="js/big.js"></script>
</head></html>
```
opening start.html in browser show you `-3,-2,-1` alert window

  