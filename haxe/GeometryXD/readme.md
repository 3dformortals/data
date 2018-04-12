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

---

---
```haxe  
 class GeometryXD
```    
 GeometryXD - multidimensional geometry manipulations. Primarily targeted for 3D objects (points, vectors, curves). Not pro level library.
 
---
```haxe  
 public static function main()
```    
 trace "GeometryXD" message in time of initialisation
 
---
```haxe  
 public static function positive_inside_I(a:Array<Int>):Bool
```    
 return true if incoming Int Array have at least one positive element
 
---
```haxe  
 public static function zero_inside_I(a:Array<Int>):Bool
```    
 return true if incoming Int Array have at least one zero element
 
---
```haxe  
 public static function negative_inside_I(a:Array<Int>):Bool
```    
 return true if incoming Int Array have at least one negative element
 
---
```haxe  
 public static function positive_inside_F(a:Array<Float>):Bool
```    
 return true if incoming Float Array have at least one positive element
 
---
```haxe  
 public static function zero_inside_F(a:Array<Float>):Bool
```    
 return true if incoming Float Array have at least one zero element
 
---
```haxe  
 public static function negative_inside_F(a:Array<Float>):Bool
```    
 return true if incoming Float Array have at least one negative element
 
---
```haxe  
 public static function same_size_I(a:Array<Array<Int>>):Null<Bool>
```    
 return true if Int Arrays have same size
 
---
```haxe  
 public static function same_size_F(a:Array<Array<Float>>):Null<Bool>
```    
 return true if Float Arrays have same size
 
---
```haxe  
 public static function sum_I(a:Array<Int>):Null<Int>
```    
 return sum of Int Array elements
 
---
```haxe  
 public static function sum_F(a:Array<Float>):Null<Float>
```    
 return sum of Float Array elements
 
---
```haxe  
 public static function diff_I(a:Array<Int>):Null<Int>
```    
 return diff between first and others Int Array elements
 
---
```haxe  
 public static function diff_F(a:Array<Float>):Null<Float>
```    
 return diff between first and others Float Array elements
 
---
```haxe  
 public static function middle_F(a:Array<Float>):Null<Float>
```    
 return middle value of Float Array
 
---
```haxe  
 public static function multiply_I_I(a:Array<Int>, n:Int):Array<Int>
```    
 multiplies each element of an Int Array by Int
 
---
```haxe  
 public static function multiply_F_F(a:Array<Float>, n:Float):Array<Float>
```    
 multiplies each element of an Float Array by Float
 
---
```haxe  
 public static function multiply_I(a:Array<Int>):Null<Int>
```    
 multiplies all elements of an Int Array. [1, 2, 3] return 1 * 2 * 3
 
---
```haxe  
 public static function multiply_F(a:Array<Float>):Null<Float>
```    
 multiplies all elements of an Float Array. [1.1, 2.0, 3.0] return 1.1 * 2.0 * 3.0
 
---
```haxe  
 public static function minus_I(a:Array<Int>):Array<Int>
```    
 multiplies each element of the Int Array by -1
 
---
```haxe  
 public static function minus_F(a:Array<Float>):Array<Float>
```    
 multiplies each element of the Float Array by -1
 
---
```haxe  
 public static function sum_xI(a:Array<Array<Int>>):Array<Int>
```    
 return Int Array which is Int Arrays sum. [[1, 2, 3], [-3, -2, -1]] return [-2, 0, 2]
 
---
```haxe  
 public static function sum_xF(a:Array<Array<Float>>):Array<Float>
```    
 return Float Array which is Float Arrays sum. [[1.1, 2, 3], [-3, -2, -1]] return [-1.9, 0, 2]
 
---
```haxe  
 public static function diff_xI(a:Array<Array<Int>>):Array<Int>
```    
 return Int Array which is result of diff between first Int Array and others. [[1, 2, 3], [-3, -2, -1]] return [4, 4, 4]
 
---
```haxe  
 public static function diff_xF(a:Array<Array<Float>>):Array<Float>
```    
 return Float Array which is result of diff between first Float Array and others. [[1.1, 2, 3], [-3, -2, -1]] return [4.1, 4, 4]
 
---
```haxe  
 public static function middle_xF(a:Array<Array<Float>>):Array<Float>
```    
 return Float Array with middle values from arrays. [[1.1, 2, 3], [-3, -2, -1]] return [(1.1 - 3) / 2, (2 - 2) / 2, (3 - 1) / 2]
 
---
```haxe  
 public static function multiply_xI_I(a:Array<Array<Int>>, n:Int):Array<Array<Int>>
```    
 return Int arrays which is result of multiplying each element by Int
 
---
```haxe  
 public static function multiply_xF_F(a:Array<Array<Float>>, n:Float):Array<Array<Float>>
```    
 return Float arrays which is result of multiplying each element by Float
 
---
```haxe  
 public static function multiply_xI(a:Array<Array<Int>>):Array<Int>
```    
 return Int Array which is result of multiplying arrays. [[1, 2], [3, 4]] return [1 * 3, 2 * 4]
 
---
```haxe  
 public static function multiply_xF(a:Array<Array<Float>>):Array<Float>
```    
 return Float Array which is result of multiplying arrays. [[3.1, 2], [3, 4]] return [3.1 * 3, 2 * 4]
 
---
```haxe  
 public static function multisum_xI(a:Array<Array<Int>>):Null<Int>
```    
 Int Arrays bonus function. Short form of sum_I(multiply_xI(a)). [[a, b], [c, d]] return a * c + b * d
 
---
```haxe  
 public static function multisum_xF(a:Array<Array<Float>>):Null<Float>
```    
 Float Arrays bonus function. Short form of sum_F(multiply_xF(a)). [[a, b], [c, d]] return a * c + b * d
 
---
```haxe  
 public static function sum_previous_I(a:Array<Int>):Array<Int>
```    
 return Int Array which is result of sum with previous element. [1, 2, 3] return [1, 3, 5]
 
---
```haxe  
 public static function diff_previous_I(a:Array<Int>):Array<Int>
```    
 return Int Array which is result of diff with previous element. [1, 2, 3] return [1, 1, 1]
 
---
```haxe  
 public static function sum_before_I(a:Array<Int>):Array<Int>
```    
 return Int Array which is result of sum each element with before elements sum. [1, 2, 3] return [1, 3, 6]
 
---
```haxe  
 public static function diff_before_I(a:Array<Int>):Array<Int>
```    
 return Int Array which is result of diff each element with before elements diff. [1, 2, 3] return [1, 3, 6]
 