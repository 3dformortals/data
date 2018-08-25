/**
 Copyright (c) 2018 llll
**/
@:expose
/**
  GeometryXD - multidimensional geometry manipulations. Primarily targeted for 3D objects (points, vectors, curves).  
  Additional methods allow manipulate with arrays.  
  Convert arrays. Int <-> Float <-> String <-> Int Arrays.  
  Sum arrays. Parallel sum of arrays elements.  
  Diff arrays. Parallel diff of arrays elements from first array elements.  
  Multiplying arrays. Parallel multiplication of arrays elements.  
  Sum array elements.  
  Calculate max abs value from Float Array.  
  Not pro level library.  
**/
class GeometryXD{
    /**
      trace `GeometryXD is ready for use` message in time of initialisation
    **/
    public static function main(){trace("GeometryXD is ready for use");}
    /**
      return true if incoming Int Array have at least one positive element
      @param a - incoming array
     **/
    public inline function positive_inside_I(a:Array<Int>):Bool{
        for (i in a){ if (i > 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Int Array have at least one zero element
      @param a - incoming array
     **/
    public inline function zero_inside_I(a:Array<Int>):Bool{
        for (i in a){ if (i == 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Int Array have at least one negative element
      @param a - incoming array
     **/
    public inline function negative_inside_I(a:Array<Int>):Bool{
        for (i in a){ if (i < 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Float Array have at least one positive element
      @param a - incoming array
     **/
    public inline function positive_inside_F(a:Array<Float>):Bool{
        for (i in a){ if (i > 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Float Array have at least one zero element
      @param a - incoming array
     **/
    public inline function zero_inside_F(a:Array<Float>):Bool{
        var rez:Bool = false;
        for (i in a){ if (i == 0){ rez = true; } }
        return rez;
    }
    /**
      return true if incoming Float Array have at least one negative element
      @param a - incoming array
     **/
    public inline function negative_inside_F(a:Array<Float>):Bool{
        var rez:Bool = false;
        for (i in a){ if (i < 0){ rez = true; } }
        return rez;
    }
    /**
      return true if Int Arrays have same size
      @param a - incoming arrays
     **/
    public inline function same_size_I(a:Array<Array<Int>>):Null<Bool>{
        var rez:Null<Bool> = null;
        var al:Int = a.length;
        if (al > 1){
            rez = true;
            var size:Int = a[0].length;
            for (i in 1...al){
                if (size != a[i].length) { rez = false; break; }
            }
        }else{ rez  = true; }
        return rez;
    }
    /**
      return true if Float Arrays have same size
      @param a - incoming arrays
     **/
    public inline function same_size_F(a:Array<Array<Float>>):Null<Bool>{
        var rez:Null<Bool> = null;
        var al:Int = a.length;
        if (al > 1){
            rez = true;
            var size:Int = a[0].length;
            for (i in 1...al){
                if (size != a[i].length) { rez = false; }
            }
        }else{ rez = true; }
        return rez;
    }
    
    /**
     compare Int Arrays. Returns true if all arrays have equal data
     @param a - incoming array field
    **/
    public function same_xI(a:Array<Array<Int>>):Null<Bool>{
        var rez:Null<Bool> = null;
        var al:Int = a.length;
        if ( al > 0 && same_size_I(a) ){
            rez = true;
            var lv:Int = a[0].length;
            for (i in 1...al){
                for (j in 0...lv){
                    if(rez){ if (a[0][j] != a[i][j]) { rez = false; } }
                    else{ break; }
                }if (!rez){ break; }
            }
        }return rez;
    }
    /**
     compare Float Arrays. Returns true if all arrays have equal data
     @param a - incoming array field
    **/
    public function same_xF(a:Array<Array<Float>>):Null<Bool>{
        var rez:Null<Bool> = null;
        var al:Int = a.length;
        if ( al > 0 && same_size_F(a) ){
            rez = true;
            var lv:Int = a[0].length;
            for (i in 1...al){
                for (j in 0...lv){
                    if(rez){ if (a[0][j] != a[i][j]) { rez = false; } }
                    else{ break; }
                }if (!rez){ break; }
            }
        }return rez;
    }
    
    /**
      returns sum of Int Array elements. [1,2,3] -> 6. tested
      @param a - incoming array
     **/
    public inline function sum_I(a:Array<Int>):Null<Int>{
        var rez:Null<Int> = null;
        var al:Int = a.length;
        if (al > 0){ rez = 0; for (i in 0...al){ rez += a[i]; } }
        return rez;
    }
    /**
      returns sum of Float Array elements. [1.1,2,3] -> 6.1. tested
      @param a - incoming array
     **/
    public inline function sum_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = 0; for (i in 0...al){ rez += a[i]; } }
        return rez;
    }
    /**
      returns diff between first and others Int Array elements. [1,2,3] -> -4. tested
      @param a - incoming array
     **/
    public function diff_I(a:Array<Int>):Null<Int>{
        var rez:Null<Int> = null;
        var al:Int = a.length;
        if (al > 0){
            if (al == 1){ rez = a[0]; }
            else{ rez = a[0] - sum_I([for (i in 1...al) a[i]]); }
        }return rez;
    }
    /**
      returns diff between first and others Float Array elements. [1.1,2,3] -> -3.9. tested
      @param a - incoming array
     **/
    public function diff_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            if (al == 1){ rez = a[0]; }
            else{ rez = a[0] - sum_F([for (i in 1...al) a[i]]); }
        }return rez;
    }
    /**
      returns middle value of Float Array
      @param a - incoming array
     **/
    public function middle_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = sum_F(a) / al; }
        return rez;
    }
    /**
      multiplies each element of an Int Array by Int
      @param a - incoming array
      @param n - multiplier of each element
     **/
    public inline function multiply_I_I(
        a:Array<Int>,
        n:Int
        ):Array<Int>{
        var rez:Array<Int> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) a[i] * n]; }
        return rez;
    }
    /**
      multiplies each element of an Float Array by Float
      @param a - incoming array
      @param n - multiplier of each element
     **/
    public inline function multiply_F_F(
        a:Array<Float>,
        n:Float
        ):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) a[i] * n]; }
        return rez;
    }
    /**
      multiplies all elements of an Int Array. [1, 2, 3] return 1 * 2 * 3
      @param a - incoming array
     **/
    public inline function multiply_I(a:Array<Int>):Null<Int>{
        var rez:Null<Int> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = a[0];
            if (al>1){for(i in 1...al){ rez *= a[i]; }}
        }return rez;
    }
    /**
      multiplies all elements of an Float Array. [1.1, 2.0, 3.0] return 1.1 * 2.0 * 3.0
      @param a - incoming array
     **/
    public inline function multiply_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = a[0];
            if (al>1){for(i in 1...al){ rez *= a[i]; }}
        }return rez;
    }
    /**
      multiplies each element of the Int Array by -1
      @param a - incoming array
     **/
    public inline function minus_I(a:Array<Int>):Array<Int>{
        return [for (i in 0...a.length) -a[i]];
    }
    /**
      multiplies each element of the Float Array by -1
      @param a - incoming array
     **/
    public inline function minus_F(a:Array<Float>):Array<Float>{
        return [for (i in 0...a.length) -a[i]];
    }
    
    /**
      return Int Array which is Int Arrays sum. [[1, 2, 3], [-3, -2, -1]] return [-2, 0, 2]
      @param a - incoming arrays
     **/
    public function sum_xI(a:Array<Array<Int>>):Array<Int>{
        var rez:Array<Int> = null;
        if ( same_size_I(a) ){ rez = [for (i in 0...a[0].length) sum_I([for (ai in 0...a.length) a[ai][i] ]) ]; }
        return rez;
    }
    /**
      return Float Array which is Float Arrays sum. [[1.1, 2, 3], [-3, -2, -1]] return [-1.9, 0, 2]
      @param a - incoming arrays
     **/
    public function sum_xF(a:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if ( same_size_F(a) ){ rez = [for (i in 0...a[0].length) sum_F([for (ai in 0...a.length) a[ai][i] ]) ]; }
        return rez;
    }
    /**
      return Int Array which is result of diff between first Int Array and others. [[1, 2, 3], [-3, -2, -1]] return [4, 4, 4]
      @param a - incoming arrays
     **/
    public function diff_xI(a:Array<Array<Int>>):Array<Int>{
        var rez:Array<Int> = null;
        if ( same_size_I(a) ){ rez = [for (i in 0...a[0].length) diff_I([for (ai in 0...a.length) a[ai][i] ]) ]; }
        return rez;
    }
    /**
      return Float Array which is result of diff between first Float Array and others. [[1.1, 2, 3], [-3, -2, -1]] return [4.1, 4, 4]
      @param a - incoming arrays
     **/
    public function diff_xF(a:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if ( same_size_F(a) ){ rez = [for (i in 0...a[0].length) diff_F([for (ai in 0...a.length) a[ai][i] ]) ]; }
        return rez;
    }
    /**
      return Float Array with middle values from arrays. [[1.1, 2, 3], [-3, -2, -1]] return [(1.1 - 3) / 2, (2 - 2) / 2, (3 - 1) / 2]
      @param a - incoming arrays
     **/
    public function middle_xF(a:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if (a[0].length > 0 && same_size_F(a) ){ rez = [for (i in 0...a[0].length) middle_F([for (ai in 0...a.length) a[ai][i] ]) ]; }
        return rez;
    }
    /**
      return Int arrays which is result of multiplying each element by Int
      @param a - incoming arrays
      @param n - multiplier
     **/
    public function multiply_xI_I(
        a:Array<Array<Int>>,
        n:Int
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        if ( a.length > 0 ){ rez = [for (i in 0...a.length) multiply_I_I(a[i], n) ]; }
        return rez;
    }
    /**
      return Float arrays which is result of multiplying each element by Float
      @param a - incoming arrays
      @param n - multiplier
     **/
    public function multiply_xF_F(
        a:Array<Array<Float>>,
        n:Float
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if ( a.length > 0 ){ rez = [for (i in 0...a.length) multiply_F_F(a[i], n) ]; }
        return rez;
    }
    /**
      return Int Array which is result of multiplying arrays. [[1, 2], [3, 4]] return [1 * 3, 2 * 4]
      @param a - incoming arrays
     **/
    public function multiply_xI(a:Array<Array<Int>>):Array<Int>{
        var rez:Array<Int> = null;
        var al:Int = a.length;
        if(same_size_I(a)){
            if (al > 1){
                rez = [for (i in 0...a[0].length) multiply_I([for (ai in 0...a.length) a[ai][i] ]) ];
            }else if (al > 0){
                rez = a[0];
            }
        }return rez;
    }
    /**
      return Float Array which is result of multiplying arrays. [[3.1, 2], [3, 4]] return [3.1 * 3, 2 * 4]
      @param a - incoming arrays
     **/
    public function multiply_xF(a:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (same_size_F(a)){
            if (al > 1){
                rez = [for (i in 0...a[0].length) multiply_F([for (ai in 0...a.length) a[ai][i] ]) ];
            }else if (al > 0){
                rez = a[0];
            }
        }return rez;
    }
    /**
      Int Arrays bonus function. Short form of sum_I(multiply_xI(a)). [[a, b], [c, d]] return a * c + b * d
      @param a - incoming arrays
     **/
    public function multisum_xI(a:Array<Array<Int>>):Null<Int>{
        var rez:Null<Int> = null;
        if (
            a.length > 1 &&
            a[0].length > 0 &&
            same_size_I(a)
        ){
            rez = sum_I(multiply_xI(a));
        }
        return rez;
    }
    /**
      Float Arrays bonus function. Short form of sum_F(multiply_xF(a)). [[a, b], [c, d]] return a * c + b * d
      @param a - incoming arrays
     **/
    public function multisum_xF(a:Array<Array<Float>>):Null<Float>{
        var rez:Null<Float> = null;
        if (
            a.length > 1 &&
            a[0].length > 0 &&
            same_size_F(a)
        ){
            rez = sum_F(multiply_xF(a));
        }
        return rez;
    }
    /**
      return Int Array which is result of sum with previous element. [1, 2, 3] return [1, 3, 5]
      @param a - incoming array
     **/
    public inline function sum_previous_I(a:Array<Int>):Array<Int>{
        var rez:Array<Int> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) (i == 0) ? a[i] : a[i] + a[i - 1]]; }
        return rez;
    }
    /**
      return Int Array which is result of diff with previous element. [1, 2, 3] return [1, 1, 1]
      @param a - incoming array
     **/
    public inline function diff_previous_I(a:Array<Int>):Array<Int>{
        var rez:Array<Int> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) (i == 0) ? a[i] : a[i] - a[i - 1]]; }
        return rez;
    }
    /**
      return Int Array which is result of sum each element with before elements sum. [1, 2, 3] return [1, 3, 6]
      @param a - incoming array
     **/
    public inline function sum_before_I(a:Array<Int>):Array<Int>{
        var rez:Array<Int> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = [0];
            for (i in 0...al){
                rez.push( rez[rez.length - 1] + a[i] );
            }rez.shift();
        }return rez;
    }
    /**
      return Int Array which is result of diff each element with before elements diff. [1, 2, 3] return [1, 1, 2]
      @param a - incoming array
     **/
    public inline function diff_before_I(a:Array<Int>):Array<Int>{
        var rez:Array<Int> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = [0];
            for (i in 0...al){
                rez.push( a[i] - rez[rez.length - 1] );
            }rez.shift();
        }return rez;
    }
    /**
      return Float Array which is result of sum with previous element. [1.1, 2, 3] return [1.1, 3.1, 5]
      @param a - incoming array
     **/
    public inline function sum_previous_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) (i == 0) ? a[i] : a[i] + a[i - 1]]; }
        return rez;
    }
    /**
      return Float Array which is result of diff with previous element. [1.1, 2, 3] return [1.1, 0.9, 1]
      @param a - incoming array
     **/
    public inline function diff_previous_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) (i == 0) ? a[i] : a[i] - a[i - 1]]; }
        return rez;
    }
    /**
      return Float Array which is result of sum each element with before elements sum. [1.1, 2, 3] return [1.1, 3.1, 6.1]
      @param a - incoming array
     **/
    public inline function sum_before_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = [0];
            for (i in 0...al){
                rez.push( rez[rez.length - 1] + a[i] );
            }rez.shift();
        }return rez;
    }
    /**
      return Float Array which is result of diff each element with before elements diff. [1.1, 2, 3] return [1.1, 0.9, 2.1]
      @param a - incoming array
     **/
    public inline function diff_before_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = [0];
            for (i in 0...al){
                rez.push( a[i] - rez[rez.length - 1] );
            }rez.shift();
        }return rez;
    }
    
    /**
     recount Int Array to Float Array
     @param what - incoming array
    **/
    public inline function recounter_I_F(what:Array<Int>):Array<Float>{
        var rez:Array<Float> = [];
        for (i in 0...what.length){ rez.push(what[i]); }
        return rez;
    }
    /**
     recount Float Array to Int Array
     @param what - incoming array
    **/
    public inline function recounter_F_I(what:Array<Float>):Array<Int>{
        var rez:Array<Int> = [];
        for (i in 0...what.length){ rez.push(Std.int(what[i])); }
        return rez;
    }
    /**
     recount Int Array to String Array
     @param what - incoming array
    **/
    public inline function recounter_I_S(what:Array<Int>):Array<String>{
        var rez:Array<String> = [];
        for (i in 0...what.length){ rez.push(Std.string(what[i])); }
        return rez;
    }
    /**
     recount Float Array to String Array
     @param what - incoming array
    **/
    public inline function recounter_F_S(what:Array<Float>):Array<String>{
        var rez:Array<String> = [];
        for (i in 0...what.length){ rez.push(Std.string(what[i])); }
        return rez;
    }
    /**
     recount String Array to Int Array
     @param what - incoming array
    **/
    public inline function recounter_S_I(what:Array<String>):Array<Int>{
        var rez:Array<Int> = [];
        for (i in 0...what.length){ rez.push(Std.parseInt(what[i])); }
        return rez;
    }
    /**
     recount String Array to Float Array
     @param what - incoming array
    **/
    public inline function recounter_S_F(what:Array<String>):Array<Float>{
        var rez:Array<Float> = [];
        for (i in 0...what.length){ rez.push(Std.parseFloat(what[i])); }
        return rez;
    }
    
    /**
     repeat Float Array to specified length
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public inline function repeater_F_F(
        n:Int,
        what:Array<Float>,
        full:Bool = false
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat Int Array to specified length
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public inline function repeater_I_I(
        n:Int,
        what:Array<Int>,
        full:Bool = false
        ):Array<Int>{
        var rez:Array<Int> = null;
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat String Array to specified length
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public inline function repeater_S_S(
        n:Int,
        what:Array<String>,
        full:Bool = false
        ):Array<String>{
        var rez:Array<String> = null;
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat Float Array to specified length Int Array
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public function repeater_F_I(
        n:Int,
        what_:Array<Float>,
        full:Bool = false
        ):Array<Int>{
        var rez:Array<Int> = null;
        var what:Array<Int> = recounter_F_I(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat String Array to specified length Int Array
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public function repeater_S_I(
        n:Int,
        what_:Array<String>,
        full:Bool = false
        ):Array<Int>{
        var rez:Array<Int> = null;
        var what:Array<Int> = recounter_S_I(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat Int Array to specified length Float Array
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public function repeater_I_F(
        n:Int,
        what_:Array<Int>,
        full:Bool = false
        ):Array<Float>{
        var rez:Array<Float> = null;
        var what:Array<Float> = recounter_I_F(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat String Array to specified length Float Array
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public function repeater_S_F(
        n:Int,
        what_:Array<String>,
        full:Bool = false
        ):Array<Float>{
        var rez:Array<Float> = null;
        var what:Array<Float> = recounter_S_F(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat Int Array to specified length String Array
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public function repeater_I_S(
        n:Int,
        what_:Array<Int>,
        full:Bool = false
        ):Array<String>{
        var rez:Array<String> = null;
        var what:Array<String> = recounter_I_S(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    /**
     repeat Float Array to specified length String Array
     @param n - result array length
     @param what - incoming array
     @param full - if true then result array will be not cutted to result array length parameter
    **/
    public function repeater_F_S(
        n:Int,
        what_:Array<Float>,
        full:Bool = false
        ):Array<String>{
        var rez:Array<String> = null;
        var what:Array<String> = recounter_F_S(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = [for (i in 0...n) rez[i]]; }
        return rez;
    }
    
    /**
     return array of arrays with pair indexes which is indexes equivalent elements of a and b arrays.
     a=["1", "2"] b=["1", "2", "1"] return [[0, 0], [0, 2], [1, 1]]
     @param a - array what find
     @param b - array where find
    **/
    public inline function an_in_b_S(
        a:Array<String>,
        b:Array<String>
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = [];
        var al:Int = a.length;
        var bl:Int = b.length;
        if (al == 0 || bl == 0){ return null; }
        for (ia in 0...al){
            for (ib in 0...bl){
                if (a[ia] == b[ib]) { rez.push([ia, ib]); }
            }
        }return rez;
    }
    /**
     return array of arrays with pair indexes which is indexes equivalent elements of a and b arrays.
     a=["1", "2"] b=[["1", "2", "1"],["0", "2"]] return [[0, 0, 0], [0, 0, 2], [1, 0, 1], [1, 1, 1]]. where indexes [1, 0, 1] = [1(a), 0(b), 1(b[0])]
     @param a - array what find
     @param b - array where find
    **/
    public inline function an_in_bn_S(
        a:Array<String>,
        b:Array<Array<String>>
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = [];
        var al:Int = a.length;
        var bl:Int = b.length;
        if (al == 0 || bl == 0){ return null; }
        for (ia in 0...al){
            for (ib in 0...bl){
                for (ibn in 0...b[ib].length){
                    if (a[ia] == b[ib][ibn]) { rez.push([ia, ib, ibn]); }
                }
            }
        }return rez;
    }
    /**
     return array of arrays with pair indexes which is indexes equivalent elements of a and b arrays.
     a=[1, 2] b=[1, 2, 1] return [[0, 0], [0, 2], [1, 1]]
     @param a - array what find
     @param b - array where find
    **/
    public inline function an_in_b_I(
        a:Array<Int>,
        b:Array<Int>
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = [];
        var al:Int = a.length;
        var bl:Int = b.length;
        if (al == 0 || bl == 0){ return null; }
        for (ia in 0...al){
            for (ib in 0...bl){
                if (a[ia] == b[ib]) { rez.push([ia, ib]); }
            }
        }return rez;
    }
    /**
     return array of arrays with pair indexes which is indexes equivalent elements of a and b arrays.
     a=[1, 2] b=[[1, 2, 1],[0, 2]] return [[0, 0, 0], [0, 0, 2], [1, 0, 1], [1, 1, 1]]. where indexes [1, 0, 1] = [1(a), 0(b), 1(b[0])]
     @param a - array what find
     @param b - array where find
    **/
    public inline function an_in_bn_I(
        a:Array<Int>,
        b:Array<Array<Int>>
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = [];
        var al:Int = a.length;
        var bl:Int = b.length;
        if (al == 0 || bl == 0){ return null; }
        for (ia in 0...al){
            for (ib in 0...bl){
                for (ibn in 0...b[ib].length){
                    if (a[ia] == b[ib][ibn]) { rez.push([ia, ib, ibn]); }
                }
            }
        }return rez;
    }
    /**
     return array of arrays with pair indexes which is indexes equivalent elements of a and b arrays.
     a=[1.0, 2.0] b=[1.0, 2.0, 1.0] return [[0, 0], [0, 2], [1, 1]]
     @param a - array what find
     @param b - array where find
    **/
    public inline function an_in_b_F(
        a:Array<Float>,
        b:Array<Float>
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = [];
        var al:Int = a.length;
        var bl:Int = b.length;
        if (al == 0 || bl == 0){ return null; }
        for (ia in 0...al){
            for (ib in 0...bl){
                if (a[ia] == b[ib]) { rez.push([ia, ib]); }
            }
        }return rez;
    }
    /**
     return array of arrays with pair indexes which is indexes equivalent elements of a and b arrays.
     a=[1.0, 2.0] b=[[1.0, 2.0, 1.0],[0, 2.0]] return [[0, 0, 0], [0, 0, 2], [1, 0, 1], [1, 1, 1]]. where indexes [1, 0, 1] = [1(a), 0(b), 1(b[0])]
     @param a - array what find
     @param b - array where find
    **/
    public inline function an_in_bn_F(
        a:Array<Float>,
        b:Array<Array<Float>>
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = [];
        var al:Int = a.length;
        var bl:Int = b.length;
        if (al == 0 || bl == 0){ return null; }
        for (ia in 0...al){
            for (ib in 0...bl){
                for (ibn in 0...b[ib].length){
                    if (a[ia] == b[ib][ibn]) { rez.push([ia, ib, ibn]); }
                }
            }
        }return rez;
    }
    
    /**
     chain bonus function. split range to sequences specified length n with same border values.
     f(6, 3, false) return [[0, 1, 2], [2, 3, 4]]. But f(6, 3, true) return [[0, 1, 2], [2, 3, 4], [4, 5, 0]].
     Can be used to split dotsXDfield (array of 3D dots) to array of separated 4dots curves trajectories which have same border dots.
     Just split array of dots length a_l to n = 4. Then recount to beziercurves or create multidot curve use each last three dots.
     @param a_l - range of indexes (length of array which will be used later as splitted)
     @param n - length of each sequence (chain link)
     @param ring - if true then 0 will be added at the end of range of indexes, for the case of strict coincidence
    **/
    public function chain_indexes(
        a_l:Int,
        n:Int,
        ring:Bool
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Int> = [];
        var indring:Array<Int> = [for (i in 0...a_l) i];
        if(ring){
            indring.push(0);
            ind = [for (i in 0...Std.int((a_l + 1) / (n - 1)) * (n - 1) ) (i%(n-1) == 0 && i+n-1 < a_l + 1)? i : continue ]; // close to for loop(0 to a_l+1 with step=n)
        }else{
            ind = [for (i in 0...Std.int(a_l / (n - 1)) * (n - 1) ) (i%(n-1) == 0 && i+n-1 < a_l)? i : continue ]; // close to for loop(0 to a_l with step=n)
        }rez = [for (i in 0...ind.length) [for (j in 0...n) indring[ind[i]+j]] ];
        return rez;
    }
    /**
     create chain from String Array. Sequences with same border values
     @param a - incoming array
     @param n - chain link length
     @param ring - if true then first incoming element will be added at the end of range, for the case of strict coincidence
    **/
    public inline function chain_S(
        a:Array<String>,
        n:Int,
        ring:Bool = false
        ):Array<Array<String>>{
        var rez:Array<Array<String>> = null;
        var a_l:Int = a.length;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Array<Int>> = chain_indexes(a_l, n, ring);
        rez = [for (i in 0...ind.length) [for (j in 0...n) a[ind[i][j]]]];
        return rez;
    }
    /**
     create chain from Int Array. Sequences with same border values
     @param a - incoming array
     @param n - chain link length
     @param ring - if true then first incoming element will be added at the end of range, for the case of strict coincidence
    **/
    public inline function chain_I(
        a:Array<Int>,
        n:Int,
        ring:Bool = false
        ):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        var a_l:Int = a.length;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Array<Int>> = chain_indexes(a_l, n, ring);
        rez = [for (i in 0...ind.length) [for (j in 0...n) a[ind[i][j]]]];
        return rez;
    }
    /**
     create chain from Float Array. Sequences with same border values
     @param a - incoming array
     @param n - chain link length
     @param ring - if true then first incoming element will be added at the end of range, for the case of strict coincidence
    **/
    public inline function chain_F(
        a:Array<Float>,
        n:Int,
        ring:Bool = false
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var a_l:Int = a.length;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Array<Int>> = chain_indexes(a_l, n, ring);
        rez = [for (i in 0...ind.length) [for (j in 0...n) a[ind[i][j]]]];
        return rez;
    }
    
    /**
     split interval to equal steps
     @param xmin - minimum border
     @param xmax - maximum border
     @param n - steps number
     @param borders - if true then add borders into result
    **/
    public inline function steps_internal(
        xmin:Float,
        xmax:Float,
        n:Int,
        borders:Bool = false
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (n < 0){ return rez; }
        var st:Float = (xmax - xmin) / (n + 1);
        if (borders){
            rez = [for (i in 0...n + 2) (i > 0 && i < n + 1) ? xmin + st * i : (i == 0) ? xmin : xmax ];
        }else{
            rez = [for (i in 1...n + 1) xmin + st * i];
        }return rez;
    }
    /**
     repeat step multiple times.
     f(1, 5, 3, -1) return [-11, -7, -3, 1, 5]
     f(1, 5, 3, 0) return [-11, -7, -3, 1, 5, 9, 13, 17]
     f(1, 5, 3, 1) return [1, 5, 9, 13, 17]
     @param smin - step minimum border
     @param smax - step maximum border
     @param n - repeat number
     @param direction - if < 0 then from negative to minimum border direction. if > 0 then from maximum border to positive direction. if == 0 then both
    **/
    public function steps_external(
        smin:Float,
        smax:Float,
        n:Int,
        direction:Int
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (n < 1 || direction < -1 || direction > 1){ return rez; }
        var st:Float = smax - smin;
        if (direction > 0){
            rez = [for (i in 0...n + 2) smin + st * i ];
        }else if (direction < 0){
            var full:Float = smin - st * n;
            rez = [for (i in 0...n + 2) full + st * i ];
        }else{
            var full:Float = smin - st * n;
            rez = [for (b in 0...2) for (i in 0...n + 2) (b == 0) ? full + st * i : (i > 1) ? smin + st * i : continue];
        }return rez;
    }
    
    /**
     return sign of Int. if x < 0 return -1, else return 1.
     @param x - number, sign of which should be calculated
    **/
    public inline function sign_I(x:Int):Int{ return (x < 0) ? -1 : 1; }
    /**
     return sign of Float. if x < 0 return -1, else return 1.
     @param x - number, sign of which should be calculated
    **/
    public inline function sign_F(x:Float):Int{ return (x < 0) ? -1 : 1; }
    /**
     return sign of Int or 0. if x < 0 return -1, if x > 0 return 1, if x == 0 return 0.
     @param x - number, sign of which should be calculated
    **/
    public inline function sign3_I(x:Int):Int{ return (x < 0) ? -1 : (x > 0) ? 1 : 0; }
    /**
     return sign of Float or 0. if x < 0 return -1, if x > 0 return 1, if x == 0 return 0.
     @param x - number, sign of which should be calculated
    **/
    public inline function sign3_F(x:Float):Int{ return (x < 0) ? -1 : (x > 0) ? 1 : 0; }
    /**
     sin cos bonus function. Normalise sin cos, counted use vectors to -1...1 include boders.
     Need because sometimes (detected on python3 in the past) result of calculating sin cos
     uses vectors can be more then 1, or less then -1.
     For example 1.00000000001 etc. Just tiny correction, just for case.
     @param x - incoming sin cos value for check
    **/
    public inline function sin_cos_cut(x:Float):Float { return (x>1)?1:(x<-1)?-1:x; }
    /**
     convert radians angle to degrees angle value
     @param angle - radians angle for recounting
    **/
    public inline function degrees(angle:Float):Float { return angle * 180 / Math.PI; }
    /**
     convert degrees angle to radians angle value
     @param angle - degrees angle for recounting
    **/
    public inline function radians(angle:Float):Float { return angle / 180 * Math.PI; }
    /**
     return the quadrant of any angle. 0 angle return 4 quadrant.
     For example use degrees:
     ... 0 < angle <= 90 return 1 quadrant 
     ... 90 < angle <= 180 return 2 quadrant 
     ... 180 < angle <= 270 return 3 quadrant 
     ... 270 < angle <= 360 return 4 quadrant 
     @param angle - angle for quadrant calculating
     @param rad - if true then radians angle, default false (degrees angle)
    **/
    public function angle_quadrant(angle:Float, rad:Bool = false):Int {
        var k:Int=4; // 0 case
        if (rad){angle=degrees(angle);}
        var x:Float=angle%360;
        if (x > 270){ k = 4; }
        else if (x > 180){ k = 3; }
        else if (x > 90){ k = 2; }
        else if (x > 0){ k = 1; }
        else if (x <= -270){ k = 1; }
        else if (x <= -180){ k = 2; }
        else if (x <= -90){ k = 3; }
        else if (x <= 0){ k = 4; }
        return k;
    }
    
    /**
     return vector length (other names "norm" or "magnitude").
     For [2,3] return Math.sqrt((2 * 2) + (3 * 3))
     @param vecXD - incoming vector
    **/
    public function vecXDnorm(vecXD:Array<Float>):Float{
        var sum:Float = 0;
        for (i in vecXD){sum += i*i;}
        return Math.sqrt(sum);
    }
    /**
     return array of lengths of vectors
     @param vecXDfield - incoming vectors array(vector field)
    **/
    public inline function vecXDfieldnorm(vecXDfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        rez = [for (i in vecXDfield) vecXDnorm(i)];
        return rez;
    }
    public inline function zero_vector_inside(vecXDfield:Array<Array<Float>>):Null<Bool>{
        var rez:Null<Bool> = null;
        var lv:Int = vecXDfield.length;
        if (lv > 0){
            rez = false;
            for (i in 0...lv){ if (vecXDnorm(vecXDfield[i]) == 0 ) { rez = true; break; } }
        }return rez;
    }
    /**
     return Float Array element with maximum absolute value with sign.
     Each element compared as abs(element). [1, 2, -4] return -4.
     @param a - incoming array
    **/
    public function maxabs(a:Array<Float>):Float{
        var rez:Float = 0;
        for (i in a){if (Math.abs(i) > Math.abs(rez)){rez = i;}}
        return rez;
    }
    /**
     return vector builded uses two dots
     @param dotXDa - start dot
     @param dotXDb - end dot
    **/
    public function vecXD(
        dotXDa:Array<Float>,
        dotXDb:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (
            !vecXDsamesize(dotXDa, dotXDb)
            ){ return rez; }
        rez = [];
        for (i in 0...dotXDa.length){ rez.push(dotXDb[i] - dotXDa[i]); }
        return rez;
    }
    /**
     recount vector to length equal 1
     @param vecXD - incoming vector
    **/
    public function vecXDone(vecXD:Array<Float>):Array<Float>{
        var rez:Array<Float> = [];
        var lv:Float = vecXDnorm(vecXD);
        if (lv > 0){
            for (i in vecXD){ rez.push(i/lv); }
            return rez;
        }else{rez = vecXD;}
        return rez;
    }
    /**
     return vector field from first dot to each other
     @param dots - dots field for vector field. dots[0] used as first dot
    **/
    public function vecXDfield(dots:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = [];
        for (i in 1...dots.length){ rez.push(vecXD(dots[0], dots[i])); }
        return rez;
    }
    /**
     compare vectors. Returns true if vectors have equal data
     @param vecXDa - incoming vector
     @param vecXDb - incoming vector
    **/
    public inline function vecXDsame(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Null<Bool>{
        var rez:Null<Bool> = null;
        if (vecXDa.length == vecXDb.length){
            rez = same_xF([vecXDa, vecXDb]);
        }return rez;
    }
    /**
     compare vectors from vector field. Returns true if all vectors have same data
     @param vecXDfield - vector field(array of vectors)
    **/
    public inline function vecXDfieldsame(vecXDfield:Array<Array<Float>>):Null<Bool>{ return same_xF(vecXDfield); }
    /**
     return random vector with length equal 1
     @param x - number of vector dimension. For example x = 3 -> 3D vector, x = 4 -> 4D vector
    **/
    public function vecXDrandom(x:Int = 3):Array<Float>{
        var v0:Array<Float> = [for (i in 0...x) 0];
        var v1:Array<Float> = [for (i in 0...x) 0];
        while(vecXDsame(v0,v1)){
            v1 = [];
            for (i in 0...x){v1.push(Math.random() - 0.5);}
        }v1 = vecXDone(v1);
        return v1;
    }
    /**
     return vector, which is sum of two vectors
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDsum(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Array<Float>{
        return sum_xF([vecXDa, vecXDb]);
    }
    /**
     return vector, which is sum of vector field
     @param vecXDfield - vector field (array of vectors)
    **/
    public function vecXDfieldsum(vecXDfield:Array<Array<Float>>):Array<Float>{
        return sum_xF(vecXDfield);
    }
    /**
     return vector, which is diff of vectors. vecXDa - vecXDb
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDdiff(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Array<Float>{
        return diff_xF([vecXDa, vecXDb]);
    }
    /**
     return vector, which is diff of vector field. v0-v1...-vn
     @param vecXDfield - vector field(array of vectors)
    **/
    public function vecXDfielddiff(vecXDfield:Array<Array<Float>>):Array<Float>{
        return diff_xF(vecXDfield);
    }
    /**
     return opposite vector. [1, 2, -4] return [-1, -2, 4]
     @param vecXD - vector
    **/
    public function vecXDback(vecXD:Array<Float>):Array<Float>{
        return minus_F(vecXD);
    }
    /**
     return opposite vector field. [[1, 2], [3, -4]] return [[-1, -2], [-3, 4]]
     @param vecXDfield - vector field(array of vectors)
    **/
    public function vecXDfieldback(vecXDfield:Array<Array<Float>>):Array<Array<Float>>{
        return [for (i in 0...vecXDfield.length) vecXDback(vecXDfield[i])];
    }
    
    /**
     return true if vectors paralleled and have same direction
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDparalleled_sameside(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Null<Bool>{
        var rez:Null<Bool> = false;
        if (vecXDa.length != vecXDb.length){ rez = null; }
        else if (vecXDangle(vecXDa,vecXDb) == 0){ rez = true; }
        else{ rez = vecXDsame(vecXDone(vecXDa), vecXDone(vecXDb)); }
        return rez;
    }
    /**
     return true if vectors paralleled and have opposite direction
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDparalleled_opposite(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Null<Bool>{
        var rez:Null<Bool> = null;
        if (vecXDa.length != vecXDb.length){ return rez; }
        return vecXDparalleled_sameside(vecXDa,vecXDback(vecXDb));
    }
    /**
     return true if vectors paralleled
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDparalleled(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Bool{
        return vecXDparalleled_sameside(vecXDa, vecXDb) || vecXDparalleled_opposite(vecXDa, vecXDb);
    }
    
    /**
     return scalar product of vectors
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDscalar(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Null<Float>{
        var rez:Null<Float> = null;
        if (vecXDa.length == vecXDb.length){
            rez = 0;
            for (i in 0...vecXDa.length) {rez += vecXDa[i] * vecXDb[i];}
        }return rez;
    }
    /**
     return cos between vectors
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDcos(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Null<Float>{
        var rez:Null<Float> = null;
        var la:Float = vecXDnorm(vecXDa);
        var lb:Float = vecXDnorm(vecXDb);
        if (la > 0 && lb > 0){
            rez = sin_cos_cut( vecXDscalar(vecXDa,vecXDb) / (la * lb) );
        }return rez;
    }
    /**
     return angle between vectors
     @param vecXDa - vector
     @param vecXDb - vector
     @param rad - if true then return radians angle, default false(degrees angle)
    **/
    public function vecXDangle(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>,
        rad:Bool = false
        ):Null<Float>{
        var rez:Null<Float> = null;
        var la:Float = vecXDnorm(vecXDa);
        var lb:Float = vecXDnorm(vecXDb);
        if (la > 0 && lb > 0){
            rez = (rad) ? Math.acos(vecXDcos(vecXDa,vecXDb)):degrees(Math.acos(vecXDcos(vecXDa,vecXDb)));
        }return rez;
    }
    /**
     return vector 3D, which is result of cross product of vectors (normal vector of plane based on two vectors). 
     Result vector placed so if you will see from end of result vector, then the rotating direction will be 
     CCW from vec3Da to vec3Db
     @param vec3Da - vector
     @param vec3Db - vector
    **/
    public function vec3Dnormal(
        vec3Da:Array<Float>,
        vec3Db:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (vec3Da.length == 3 && vec3Db.length == 3){
            var a:Float = vec3Da[1] * vec3Db[2] - vec3Da[2] * vec3Db[1];
            var b:Float = -vec3Da[0] * vec3Db[2] + vec3Da[2] * vec3Db[0];
            var c:Float = vec3Da[0] * vec3Db[1] - vec3Da[1] * vec3Db[0];
            return vecXDone([a,b,c]);
        }return rez;
    }
    /**
     return vector 3D, which is result of step by step cross product for each next vector 3D 
     from vector field with previous cross product result vector 3D
     @param vec3Dfield - vector field 3D(array of vectors 3D)
    **/
    public function vec3Dfieldnormal(vec3Dfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if (vec3Dfield[0].length == 3 && same_size_F(vec3Dfield)){
            rez = vec3Dfield[0];
            for (i in 1...vec3Dfield.length){
                rez = vec3Dnormal(rez,vec3Dfield[i]);
            }
        }
        return rez;
    }
    /**
     return vector with middle value. Just call middle_xF([vecXDa, vecXDb])
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDmiddle(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Array<Float>{
        return middle_xF([vecXDa, vecXDb]);
    }
    /**
     return vector with middle value. Just call middle_xF(vecXDfield)
     @param vecXDfield - vector field(array of vectors)
    **/
    public function vecXDfieldmiddle(vecXDfield:Array<Array<Float>>):Array<Float>{
        return middle_xF(vecXDfield);
    }
    /**
     return true if vectors have same size. Bonus function. Just call same_size_F([vecXDa, vecXDb])
     @param vecXDa - vector
     @param vecXDb - vector
    **/
    public function vecXDsamesize(
        vecXDa:Array<Float>,
        vecXDb:Array<Float>
        ):Null<Bool>{
        return same_size_F([vecXDa, vecXDb]);
    }
    /**
     return true if vector from vector field have same size. Bonus function. Just call same_size_F(vecXDfield)
     @param vecXDfield - vector field(array of vectors)
    **/
    public function vecXDfieldsamesize(vecXDfield:Array<Array<Float>>):Null<Bool>{
        return same_size_F(vecXDfield);
    }
    
    /**
     return dot, which result of offset dotXD along vecXD to t
     @param dotXD - dot
     @param vecXD - vector
     @param t - distance
    **/
    public function dotXDoffset(
        dotXD:Array<Float>,
        vecXD:Array<Float>,
        t:Float
        ):Array<Float>{
        var rez:Array<Float> = null;
        var vnorm:Float = vecXDnorm(vecXD);
        if (t != 0 && vnorm > 0){
            var lv:Int = vecXD.length;
            if (dotXD.length == lv){
                rez = [];
                t = t / vnorm;
                for (i in 0...lv){
                    rez.push(dotXD[i] + vecXD[i] * t);
                }
            }
            return rez;
        }else{return dotXD;}
    }
    /**
     return dot 3D, which is intersection dot for line3D(dot3D0, vec3D0) and plane3D(vec3Dplane, dplane)
     @param dot3D0 - dot 3D start for line
     @param vec3D0 - vector 3D of line direction
     @param vec3Dplane - vector 3D, which is plane 3D normal vector
     @param dplane - displacement of plane 3D from [0,0,0]. default 0 ([0,0,0] dot belongs to the plane)
    **/
    public function dot3Dline3D_x_plane3D(
        dot3D0:Array<Float>,
        vec3D0:Array<Float>,
        vec3Dplane:Array<Float>,
        dplane:Float = 0
        ):Array<Float>{
        var rez:Array<Float> = null;
        var ldot:Int = dot3D0.length;
        var lvec:Int = vec3D0.length;
        var lplane:Int = vec3Dplane.length;
        if (ldot == 3 && ldot == lvec && lvec == lplane){
            var checkup:Float = - (
                vec3Dplane[0] * dot3D0[0] +
                vec3Dplane[1] * dot3D0[1] +
                vec3Dplane[2] * dot3D0[2] +
                dplane
            );
            var checkdn:Float = (
                vec3Dplane[0] * vec3D0[0] +
                vec3Dplane[1] * vec3D0[1] +
                vec3Dplane[2] * vec3D0[2]
            );
            if (checkdn == 0){return rez;}
            else if (checkup == 0){return dot3D0;}
            else {
                var t:Float = checkup / checkdn;
                rez = [for (i in 0...3) dot3D0[i] + vec3D0[i] * t];
            }
        }return rez;
    }
    /**
     return dot 3D, which is projection of dot3D to plane3D
     @param dot3D - dot 3D, which is [x, y, z]
     @param plane3D - plane 3D, which is [a, b, c, d]. 
     Where (a, b, c) - normal vector of plane 3D. (d) - distance from (0, 0, 0). 
     if d = 0, then the plane passes through the center of coordinates
    **/
    public function projection_dot3D_on_plane3D(
        dot3D:Array<Float>,
        plane3D:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        var ldot:Int = dot3D.length;
        var lplane:Int = plane3D.length;
        if (
            vecXDnorm([for (i in 0...3) plane3D[i]]) == 0 ||
            ldot != 3 ||
            lplane != 4
            ){ return rez; }
        var checkup:Float = - (multisum_xF([[for (i in 0...3) plane3D[i]], dot3D]) + plane3D[3]);
        var checkdn:Float = multisum_xF([[for (i in 0...3) plane3D[i]], [for (i in 0...3) plane3D[i]]]);
        if (checkdn == 0){return rez;}
        else if (checkup == 0){return dot3D;}
        else {
            var t:Float = checkup / checkdn;
            rez = [for (i in 0...3) dot3D[i] + plane3D[i] * t];
        }
        return rez;
    }
    
    /**
     return dot 2D (x, y) from dot3D projected on view plane, View plane determined by coordinate axes center plane 3D dot, and plane 3D normal vector. 
     View plane vector 3D of axis ox, will be projected to view plane. Incoming value can not be strictly belongs to the view plane.
     @param dot3D - dot 3D (x, y ,z) which will be projected
     @param dot3Dviewplanecenter - view plane 3D center dot. 
     Used as coordinate axes center 
     @param vec3Dviewplane - view plane normal vector 3D ()
     @param vec3Dviewplane_ox - vector 3D of axis ox. 
     Must be not parelleled view plane normal vector. 
     Second axis will be calculated automatically, 
     uses rotate projected ox around view plane normal vector
    **/
    public function dot3D_to_dot2Dviewplane(
        dot3D:Array<Float>,
        dot3Dviewplanecenter:Array<Float>, vec3Dviewplane:Array<Float>,
        vec3Dviewplane_ox:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        var dot:Array<Float> = dot3D;
        var dotc:Array<Float> = dot3Dviewplanecenter;
        var vp:Array<Float> = vec3Dviewplane;
        var vox:Array<Float> = vec3Dviewplane_ox;
        if(
            dot.length != 3 ||
            !same_size_F([dot, dotc, vp, vox]) ||
            vecXDnorm(vp) == 0 ||
            vecXDnorm(vox) == 0 ||
            vecXDparalleled(vp, vox)
        ){ return rez; }
        var p:Array<Float> = plane3D_dot3Dnormal(dotc, vp);
        var ox:Array<Float> = projection_vec3D_on_plane3D(vox, p);
        var oy:Array<Float> = vec3Dnormal(vp, ox);
        dot = projection_dot3D_on_plane3D(dot, p);
        var vdot:Array<Float> = vecXD(dotc, dot);
        var norm:Float = vecXDnorm(vdot);
        var cosox = vecXDcos(ox, vdot);
        var cosoy = vecXDcos(oy, vdot);
        rez = [norm * cosox, norm * cosoy];
        return rez;
    }
    /**
     returns dot with scaled values relative to the scaling center
     @param dotXD - dot . For 3D case [x, y, z]
     @param scaleXD - scales array . For 3D case [sx, sy, sz]
     @param dotXDc - scaling center dot . For 3D case [xc, yc, zc]
    **/
    public function dotXDscale(
        dotXD:Array<Float>,
        scaleXD:Array<Float>,
        dotXDc:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        var sdot:Array<Float> = [for(i in 0...dotXD.length) dotXD[i] * scaleXD[i]];
        var stc:Array<Float> = [for(i in 0...dotXD.length) dotXDc[i] * scaleXD[i]];
        var vec:Array<Float> = vecXD(stc, dotXDc);
        rez = dotXDoffset(sdot,vec,vecXDnorm(vec));
        return rez;
    }
    /**
     returns vector 3D, rotated around axis vector to angle
     @param vec3D - vector 3D
     @param vec3Daxis - axis of rotation . vector 3D
     @param angle - angle of rotation
     @param rad - it true then radians angle, default false (degrees angle)
    **/
    public function vec3Drotate(
        vec3D:Array<Float>,
        vec3Daxis:Array<Float>,
        angle:Float,
        rad:Bool = false
        ):Array<Float>{
        var rez:Array<Float> = vec3D;
        if (
            vecXDparalleled(vec3D, vec3Daxis) ||
            angle == 0
            ){ return rez;}
        angle = (rad) ? angle : radians(angle);
        var t:Array<Float> = [0,0,0];
        var vb:Array<Float> = vec3Dnormal(vec3Daxis, vec3D);
        var vc:Array<Float> = vec3Dnormal(vb, vec3Daxis);
        var t0:Array<Float> = dotXDoffset(t, vec3Daxis, vecXDnorm(vec3D) * vecXDcos(vec3Daxis, vec3D));
        var t1:Array<Float> = vec3D;
        var v:Array<Float> = vecXD(t0, t1);
        t1 = dotXDoffset(t0, vb, vecXDnorm(v) * Math.sin(angle));
        t1 = dotXDoffset(t1, vc, vecXDnorm(v) * Math.cos(angle));
        rez = vecXD(t, t1);
        if (vecXDnorm(rez) == 0){ rez = vec3D; }
        return rez;
    }
    /**
     returns vector 3D field, each vector of which rotated to own angle, around own axis
     @param vec3Dfield - vector 3D field(array of vectors)
     @param vec3Daxes - axes 3D field(array of vectors)
     @param angles - angles of rotating for each vector
     @param rad - if true then radians angles, default false (degrees angles)
    **/
    public function vec3Dfield_rotate_around_vec3Daxes(
        vec3Dfield:Array<Array<Float>>,
        vec3Daxes:Array<Array<Float>>,
        angles:Array<Float>,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !same_size_F(vec3Dfield) ||
            !same_size_F(vec3Daxes) ||
            vec3Dfield[0].length != 3 ||
            vec3Daxes[0].length != 3 ||
            zero_inside_F(vecXDfieldnorm(vec3Dfield)) ||
            zero_inside_F(vecXDfieldnorm(vec3Daxes)) ||
            angles.length != vec3Dfield.length ||
            angles.length != vec3Daxes.length
        ){ return rez; }
        rez = vec3Dfield;
        for (i in 0...angles.length){
            for (j in 0...vec3Dfield.length){
                rez[j] = vec3Drotate(rez[j], vec3Daxes[i], angles[i], rad);
            }
        }return rez;
    }
    /**
     returns dot 3D, rotated to angle, around center of rotation determined by dot and axis of rotation
     @param dot3D - dot 3D
     @param dot3Dc - rotation center dot 3D
     @param vec3D - rotation axis vector 3D
     @param angle - rotation angle
     @param rad - if true then radians angle, default false (degrees angle)
    **/
    public function dot3Drotate(
        dot3D:Array<Float>,
        dot3Dc:Array<Float>,
        vec3D:Array<Float>,
        angle:Float,
        rad:Bool = false
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (vecXDnorm(vec3D) == 0){ return rez; }
        rez = dot3D;
        if (
            vecXDsame(dot3D, dot3Dc) ||
            angle == 0
            ) { return rez; }
        var vdot:Array<Float> = vecXD(dot3Dc, dot3D);
        var d:Float = vecXDnorm(vdot);
        vdot = vec3Drotate(vdot, vec3D, angle, rad);
        rez = dotXDoffset(dot3Dc, vdot, d);
        return rez;
    }
    /**
     returns plane 3D (a, b, c, d) determined by dot 3D and vector 3D.
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
     @param dot3D - dot 3D
     @param vec3D - plane 3D normal vector 3D
    **/
    public function plane3D_dot3Dnormal(
        dot3D:Array<Float>,
        vec3D:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (dot3D.length != 3 ||
            vec3D.length != 3 ||
            vecXDnorm(vec3D) == 0){ return rez; }
        var d:Float = - multisum_xF([vec3D, dot3D]);
        rez = [vec3D[0], vec3D[1], vec3D[2], d];
        return rez;
    }
    /**
     returns plane 3D (a, b, c, d), determined by dot and two not paralleled vectors. 
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
     @param dot3D - dot 3D
     @param vec3Da - vector 3D
     @param vec3Db - vector 3D
    **/
    public function plane3D_dot_vec_vec(
        dot3D:Array<Float>,
        vec3Da:Array<Float>,
        vec3Db:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (
            dot3D.length != 3 ||
            vec3Da.length != 3 ||
            vec3Db.length != 3 ||
            vecXDparalleled(vec3Da, vec3Db) ||
            vecXDnorm(vec3Da) == 0 ||
            vecXDnorm(vec3Db) == 0
        ){ return rez; }
        rez = plane3D_dot3Dnormal(dot3D, vec3Dnormal(vec3Da, vec3Db));
        return rez;
    }
    /**
     returns plane 3D (a, b, c, d), determined by three not equal dots. 
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
     @param dot3D - dot 3D
     @param dot3Da - dot 3D
     @param dot3Db - dot 3D
    **/
    public function plane3D_3dots(
        dot3D:Array<Float>,
        dot3Da:Array<Float>,
        dot3Db:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (
            dot3D.length != 3 ||
            !same_size_F([dot3D, dot3Da, dot3Db]) ||
            vecXDsame(dot3D, dot3Da) ||
            vecXDsame(dot3D, dot3Db) ||
            vecXDsame(dot3Da, dot3Db)
            ){ return rez; }
        rez = plane3D_dot_vec_vec(
            dot3D,
            vecXD(dot3D, dot3Da),
            vecXD(dot3D, dot3Db)
        );
        return rez;
    }
    /**
     returns plane 3D (a, b, c, d), determined by two not equal dots. 
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
     @param dot3D - dot 3D
     @param dot3Da - dot 3D
    **/
    public function plane3D_2dots(
        dot3D:Array<Float>,
        dot3Da:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (
            !vecXDsamesize(dot3D, dot3Da) ||
            vecXDsame(dot3D, dot3Da)
        ){ return rez; }
        rez = plane3D_dot3Dnormal(dot3D, vecXD(dot3D, dot3Da));
        return rez;
    }
    /**
     returns distance from dot 3D to plane 3D
     @param dot3D - dot 3D (x, y, z)
     @param plane3D - plane 3D (a, b, c, d). 
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
    **/
    public function distance_dot3D_plane3D(
        dot3D:Array<Float>,
        plane3D:Array<Float>
        ):Null<Float>{
        var rez:Null<Float> = null;
        if (
            dot3D.length != 3 ||
            plane3D.length != 4 ||
            vecXDnorm([plane3D[0], plane3D[1], plane3D[2]]) == 0
            ) { return rez; }
        rez = Math.abs(
            multisum_xF([[plane3D[0], plane3D[1], plane3D[2]], dot3D]) + plane3D[3]
        ) / vecXDnorm([plane3D[0], plane3D[1], plane3D[2]]);
        return rez;
    }
    /**
     returns a random vector 3D paralleled to the plane 3D(lies on plane 3D)
     @param plane3D - plane 3D (a, b, c, d). 
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
    **/
    public function random_vec3D_in_plane3D(plane3D:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            plane3D.length != 4 ||
            vecXDnorm([plane3D[0], plane3D[1], plane3D[2]]) == 0
            ){ return rez; }
        var t0:Array<Float> = vecXDrandom(3);
        t0 = projection_dot3D_on_plane3D(t0, plane3D);
        var t1:Array<Float> = t0;
        while (vecXDsame(t0, t1)){
            t1 = [];
            for (i in 0...3){t1.push(t0[i] + Math.random() - 0.5);}
            t1 = projection_dot3D_on_plane3D(t1, plane3D);
        }rez = vecXD(t0, t1);
        return rez;
    }
    /**
     returns random dot 3D belongs on plane 3D
     @param plane3D - plane 3D (a, b, c, d). 
     Where (a, b, c) is plane 3D normal vector, and (d) is displacement plane from (0, 0, 0)
     @param dot3D - dot 3D . Determine start position for round area on plane 3D for calculating result. 
     If dot not in plane , then will be uesd projection this dot on plane
     @param radius - radius of round area on plane 3D. Result will be calculated inside area
    **/
    public function random_dot3D_in_plane3D(
        plane3D:Array<Float>,
        dot3D:Array<Float>,
        radius:Float
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (
            plane3D.length != 4 ||
            vecXDnorm([plane3D[0], plane3D[1], plane3D[2]]) == 0
        ){ return rez; }
        rez = projection_dot3D_on_plane3D(dot3D, plane3D);
        if (radius == 0){ return rez; }
        var vec3D:Array<Float> = random_vec3D_in_plane3D(plane3D);
        rez = dotXDoffset(dot3D, vec3D, radius * Math.random());
        return rez;
    }
    
    /**
     returns curve 3D ((x, y, z), (x, y, z), (x, y, z), (x, y, z)) 
     with internal dots, calculated use offset from border dots along levers to distances. 
     The resul curve 3D have 4 dots 3D, two border dots incoming, and two internal dots calculated. 
     Result will [dot3D1, dot3D1offset, dot3D2offset, dot3D2]
     @param dot3D1 - dot 3D (x, y, z) start curve incoming dot
     @param vec3D1 - vector 3D (a, b, c) for offset start internal dot
     @param distance1 - distance for offset start internal dot along offset vector
     @param dot3D2 - dot 3D (x, y, z) end curve incoming dot
     @param vec3D2 - vector 3D (a, b, c) for offset end internal dot
     @param distance2 - distance for offset end internal dot along offset vector
    **/
    public function curve3D_4dots(
        dot3D1:Array<Float>,
        vec3D1:Array<Float>,
        distance1:Float,
        dot3D2:Array<Float>,
        vec3D2:Array<Float>,
        distance2:Float
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !same_size_F([dot3D1, vec3D1, dot3D2, vec3D2]) ||
            dot3D1.length != 3
        ){ return rez; }
        var r1:Array<Float> = dotXDoffset(dot3D1, vec3D1, distance1);
        var r2:Array<Float> = dotXDoffset(dot3D2, vec3D2, distance2);
        rez = [dot3D1, r1, r2, dot3D2];
        return rez;
    }
    /**
     returns curve 3D ((x, y, z), (x, y, z), (x, y, z), (x, y, z)). 
     Shape of result curve will be close to arc (1/4 ellipse). 
     Allowed few variants of result curve modification(distortion).
     Default lever1 and lever2 values equal 0.55.
     The 0.55 value in case of bezier cubic 3D curve will create shape close to ellipse arc.
     @param dot3D0 - center of ellipse trajectory dot 3D (x, y, z)
     @param dot3D1 - first arc dot 3D (x, y, z)
     @param dot3D2 - last arc dot 3D (x, y, z)
     @param lever1 - length of offset the first support dot along lever1 vector (depended of a_s)
     @param lever2 - length of offset the last support dot along lever2 vector (depended of a_s)
     @param a_s - arc style. Determine of arc calculation way. 
     if a_s > 0 then lever1 vector will be directed from dot3D0 to dot3D1. lever2 vector from dot3D0 to dot3D2 
     if a_s < 0 then lever1 vector will be directed from dot3D0 to dot3D2. lever2 vector from dot3D0 to dot3D1 
     if a_s = 0 then lever1 vector will be paralleled lever2 vector and both will be directed 
     from dot3D0 to dot between dot3D1 and dot3D2 center dot
    **/
    public function curve3D_3dots(
        dot3D0:Array<Float>,
        dot3D1:Array<Float>,
        dot3D2:Array<Float>,
        lever1:Float = 0.55,
        lever2:Float = 0.55,
        a_s:Int = -1
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !same_size_F([dot3D0, dot3D1, dot3D2]) ||
            dot3D0.length != 3
            ){ return rez; }
        var v1:Array<Float> = vecXD(dot3D0, dot3D1);
        var v2:Array<Float> = vecXD(dot3D0, dot3D2);
        var v12:Array<Float> = vecXD(dot3D1, dot3D2);
        var t:Array<Float> = dotXDoffset(dot3D1, v12, vecXDnorm(v12) / 2);
        var v:Array<Float> = vecXD(dot3D0, t);
        var r1:Array<Float> = null;
        var r2:Array<Float> = null;
        if (a_s < 0){
            if (lever1 > 0){ r1 = dotXDoffset(dot3D1, v2, vecXDnorm(v2) * lever1); }
            else if (lever1 < 0){ r1 = dotXDoffset(dot3D1, v1, vecXDnorm(v1) * lever1); }
            else{ r1 = dot3D1; }
            if (lever2 > 0){ r2 = dotXDoffset(dot3D2, v1, vecXDnorm(v1) * lever2); }
            else if (lever2 < 0){ r2 = dotXDoffset(dot3D2, v2, vecXDnorm(v2) * lever2); }
            else{ r2 = dot3D2; }
        }else if (a_s > 0){
            if (lever1 > 0){ r1 = dotXDoffset(dot3D1, v1, vecXDnorm(v2) * lever1); }
            else if (lever1 < 0){ r1 = dotXDoffset(dot3D1, v2, vecXDnorm(v1) * lever1); }
            else{ r1 = dot3D1; }
            if (lever2 > 0){ r2 = dotXDoffset(dot3D2, v2, vecXDnorm(v1) * lever2); }
            else if (lever2 < 0){ r2 = dotXDoffset(dot3D2, v1, vecXDnorm(v2) * lever2); }
            else{ r2 = dot3D2; }
        }else{
            r1 = dotXDoffset(dot3D1, v, vecXDnorm(v) * lever1);
            r2 = dotXDoffset(dot3D2, v, vecXDnorm(v) * lever2);
        }rez = [dot3D1, r1, r2, dot3D2];
        return rez;
    }
    
    /**
     returns line 3D ((x, y, z), (x, y, z), (x, y, z), (x, y, z)). 
     Which is (dot3D0, 1/3 offset, 2/3 offset, dot3D1). 
     Comfort for use as bezier cubic curve 3D as straight line
     @param dot3D0 - start line dot 3D
     @param dot3D1 - end line dot 3D
    **/
    public function line3D_2dots(
        dot3D0:Array<Float>,
        dot3D1:Array<Float>
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !vecXDsamesize(dot3D0, dot3D1) ||
            dot3D0.length != 3
        ){ return rez; }
        var v:Array<Float> = vecXD(dot3D0, dot3D1);
        var lv:Float = vecXDnorm(v);
        var lever0:Array<Float> = dotXDoffset(dot3D0, v, lv * 1 / 3);
        var lever1:Array<Float> = dotXDoffset(dot3D0, v, lv * 2 / 3);
        rez = [dot3D0, lever0, lever1, dot3D1];
        return rez;
    }
    /**
     returns line 3D ((x, y, z), (x, y, z), (x, y, z), (x, y, z)). 
     Just call line3D_2dots with precalculated second dot 3D
     @param dot3D - start line dot 3D
     @param vec3D - offset start line dot vector 3D
     @param distance - offset distance for end line dot
    **/
    public function line3D_dot_offset(
        dot3D:Array<Float>,
        vec3D:Array<Float>,
        distance:Float
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if(
            distance == 0 ||
            !vecXDsamesize(dot3D, vec3D) ||
            dot3D.length != 3 ||
            vecXDnorm(vec3D) == 0
        ){ return rez; }
        rez = line3D_2dots(dot3D, dotXDoffset(dot3D, vec3D, distance));
        return rez;
    }
    /**
     returns curve 3D as 12 coordinates, recounted from 4 dots 3D. 
     [[x, y, z], [x, y, z], [x, y, z], [x, y, z]] return [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4]
     @param curve - curve 3D ((x, y, z), (x, y, z), (x, y, z), (x, y, z))
    **/
    public inline function curve3D_4to12(curve:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            curve.length == 4 &&
            curve[0].length == 3 &&
            same_size_F(curve)
        ){
            rez = [for (i in 0...4) for (ai in 0...3) curve[i][ai]];
        }return rez;
    }
    /**
     returns curve 3D as 4 dots 3D, recounted from 12 coordinates. 
     [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4] return [[x, y, z], [x, y, z], [x, y, z], [x, y, z]]
     @param curve - curve 3D data (x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    **/
    public inline function curve3D_12to4(curve:Array<Float>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (curve.length == 12){
            rez = [for (i in [0,3,6,9]) [ for (ai in 0...3) curve[ai+i]]];
        }return rez;
    }
    /**
     beziercubic3D_derivative bonus function. returns parameters for derivative calculation. 
     [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]] return [[x1,x2,x3,x4],[y1,y2,y3,y4],[z1,z2,z3,z4]]
     @param curve - bezier cubic curve 3D ((x1, y1, z1), (x2, y2, z2), (x3, y3, z3), (x4, y4, z4))
    **/
    public inline function beziercubic3D_derivativeparameters(curve:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var cl:Int = curve.length;
        if ( cl == 4 && curve[0].length == 3 && same_size_F(curve)){
            rez = [for (i in 0...3) [for (p in 0...4) curve[p][i]]];
        }return rez;
    }
    /**
     return bezier cubic curve derivative for each dimension. Usual case `x` or `y` or `z`
     @param bcp - bezier curve derivative parameters, precalculated uses `beziercubic3D_derivativeparameters(...)`
     @param p - bezier cubic curve parameter. Standart values equal range 0...1 include borders
    **/
    public inline function beziercubic_derivative(
        bcp:Array<Float>,
        p:Float
        ):Null<Float>{
        var rez:Null<Float> = null;
        if (bcp.length == 4){
            rez = 3 * (1 - p) * (1 - p) * (bcp[1] - bcp[0]) +
            6 * (1 - p) * p * (bcp[2] - bcp[1]) +
            3 * p * p * (bcp[3] - bcp[2]);
        }return rez;
    }
    /**
     returns bezier cubic curve 3D derivative
     @param curve - bezier cubic curve 3D ((x, y, z), (x, y, z), (x, y, z), (x, y, z))
     @param p - bezier cubic curve parameter. Standart values equal range 0...1 include borders
    **/
    public function beziercubic3D_derivative(
        curve:Array<Array<Float>>,
        p:Float
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (
            curve.length == 4 &&
            curve[0].length == 3 &&
            same_size_F(curve)
        ){
            rez = [for (i in beziercubic3D_derivativeparameters(curve)) beziercubic_derivative(i, p)];
        }return rez;
    }
    
    /**
     returns cubic bezier curve support dot one(first lever) paramater for each coordinate. Usual case `x` or `y` or `z`
     @param beziercubic_one_axis_coordinates - [c1,c2,c3,c4]. Where c is cubic bezier curve trajectory dots values for one of `x` or `y` or `z`
    **/
    public inline function beziercubic_support_dot_one(beziercubic_one_axis_coordinates:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var c:Array<Float> = beziercubic_one_axis_coordinates;
        if (c.length == 4){ rez = (-5 * c[0] + 18 * c[1] - 9 * c[2] + 2 * c[3]) / 6; }
        return rez;
    }
    /**
     returns dot 3D, which is bezier cubic curve 3D support dot one(first lever)
     @param curve3D_4dots - curve 3D trajectory, which is [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
    **/
    public function beziercubic3D_support_dot_one(curve3D_4dots:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        var c:Array<Array<Float>> = curve3D_4dots;
        if (c.length == 4 && same_size_F(c)){ rez = [for (i in beziercubic3D_derivativeparameters(c)) beziercubic_support_dot_one(i)]; }
        return rez;
    }
    /**
     returns cubic bezier curve support dot two(second lever) paramater for each coordinate. Usual case `x` or `y` or `z`
     @param beziercubic_one_axis_coordinates - [c1,c2,c3,c4]. Where c is cubic bezier curve trajectory dots values for one of `x` or `y` or `z`
    **/
    public inline function beziercubic_support_dot_two(beziercubic_one_axis_coordinates:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var c:Array<Float> = beziercubic_one_axis_coordinates;
        if (c.length == 4){ rez = (2 * c[0] - 9 * c[1] + 18 * c[2] - 5 * c[3]) / 6; }
        return rez;
    }
    /**
     returns dot 3D, which is bezier cubic curve 3D support dot two(second lever)
     @param curve3D_4dots - curve 3D trajectory, which is [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
    **/
    public function beziercubic3D_support_dot_two(curve3D_4dots:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        var c:Array<Array<Float>> = curve3D_4dots;
        if (c.length == 4 && same_size_F(c)){ rez = [for (i in beziercubic3D_derivativeparameters(c)) beziercubic_support_dot_two(i)]; }
        return rez;
    }
    /**
     returns bezier cubic curve 3D, calculated from 4dots 3D(curve 3D trajectory)
     @param dots - curve 3D trajectory. Must be of the form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
    **/
    public inline function beziercubic3D_follow_4dots_trajectory(dots:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (dots.length == 4 && dots[0].length == 3 && same_size_F(dots)){
            var dot_one:Array<Float> = beziercubic3D_support_dot_one(dots);
            var dot_two:Array<Float> = beziercubic3D_support_dot_two(dots);
            rez = [dots[0], dot_one, dot_two, dots[3]];
        }return rez;
    }
    /**
     returns bezier cubic coordinate for each one axis. Usual case `x` or `y` or `z`
     @param beziercubic_one_axis_coordinates - Must be of the form (c1, c2, c3, c4). 
     For case [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]] curve and x axis must be [x1, x2, x3, x4]
     @param parameter - parameter of bezier curve equation. Usual case range 0...1 include borders
    **/
    public inline function beziercubic_coordinate(
        beziercubic_one_axis_coordinates:Array<Float>,
        parameter:Float
        ):Null<Float>{
        var rez:Null<Float> = null;
        var c:Array<Float> = beziercubic_one_axis_coordinates;
        var p:Float = parameter;
        if ( c.length == 4 ){
            rez = (1 - p) * (1 - p) * (1 - p) * c[0] +
                3 * (1 - p) * (1 - p) * p * c[1] +
                3 * (1 - p) * p * p * c[2] +
                p * p * p * c[3];
        }return rez;
    }
    /**
     returns dot 3D, belongs on bezier cubic curve 3D
     @param beziercubic3D - curve 3D, which must be of the form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]. 
     Which is [dot3Dstart, lever3Dstart, lever3Dend, dot3Dend]
     @param parameter - parameter of bezier curve equation. Usual case range 0...1 include borders
    **/
    public function beziercubic3Ddot(
        beziercubic3D:Array<Array<Float>>,
        parameter:Float
        ):Array<Float>{
        var rez:Array<Float> = null;
        var c:Array<Array<Float>> = beziercubic3D;
        var p:Float = parameter;
        if (c.length == 4 && c[0].length == 3 && same_size_F(c)){
            rez = [for (i in beziercubic3D_derivativeparameters(c)) beziercubic_coordinate(i, p)];
        }return rez;
    }
    /**
     returns curve 3D, which is 4 dots 3D bezier cubic curve, recounted to 4 dots 3D curve. 
     Two internal dots belongs on bezier cubic curve trajectory, with parameter 1/3 and 2/3
     @param beziercubic3D - curve 3D, which must be of the form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
    **/
    public inline function curve3D_4dots_follow_beziercubic_trajectory(beziercubic3D:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var c:Array<Array<Float>> = beziercubic3D;
        if (
            c.length == 4 &&
            c[0].length == 3 &&
            same_size_F(c)
        ){
            c[1] = beziercubic3Ddot(c, 1 / 3);
            c[2] = beziercubic3Ddot(c, 2 / 3);
        }return c;
    }
    /**
     returns curve 3D, offsetted along vector 3D to specified distance
     @param curve3D - curve 3D, which must be of the form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
     @param vec3D - vector 3D (a, b, c)
     @param distance - displacement distance
    **/
    public inline function curve3Doffset(
        curve3D:Array<Array<Float>>,
        vec3D:Array<Float>,
        distance:Float
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            curve3D.length == 4 &&
            curve3D[0].length == 3 &&
            same_size_F(curve3D) &&
            vec3D.length == 3
        ){
            rez = [for (i in curve3D) dotXDoffset(i, vec3D, distance)];
        }return rez;
    }
    /**
     returns curve 3D, rotated around axis(determined by dot 3D and vector 3D) to specified angle
     @param curve3D - curve 3D, which must be of the form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
     @param dot3D - dot 3D. Used for rotation axis
     @param vec3D - vector 3D. Used for rotation axis
     @param angle - rotation angle
     @param rad - if true then radians angle, default false (degrees angle)
    **/
    public inline function curve3Drotate(
        curve3D:Array<Array<Float>>,
        dot3D:Array<Float>,
        vec3D:Array<Float>,
        angle:Float,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            curve3D.length == 4 &&
            curve3D[0].length == 3 &&
            same_size_F(curve3D) &&
            dot3D.length == 3 &&
            vec3D.length == 3 &&
            vecXDnorm(vec3D) > 0
        ){
            if(angle != 0){ rez = [for (i in curve3D) dot3Drotate(i, dot3D, vec3D, angle, rad)]; }
            else{ rez = curve3D; }
        }return rez;
    }
    /**
     returns curve 3D, scaled relative base dot 3D, uses own scale for each axis
     @param curve3D - curve 3D, which must be of the form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
     @param scale_xyz - scale for each axis. Must be of the form [sx, sy, sz]
     @param dot3D - scaling center(base) dot 3D
    **/
    public inline function curve3Dscale(
        curve3D:Array<Array<Float>>,
        scale_xyz:Array<Float>,
        dot3D:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            curve3D.length == 4 &&
            curve3D[0].length == 3 &&
            same_size_F(curve3D) &&
            dot3D.length == 3 &&
            scale_xyz.length == 3
        ){
        if (vecXDnorm(scale_xyz) > 0){ rez = [for (i in curve3D) dotXDscale(i, scale_xyz, dot3D)]; }
        else{rez = [for (i in 0...4) [0,0,0]];}
        }return rez;
    }
    
    //ellipse section
    /**
     returns ellipse perimeter, calculated use ramanujan method.
     Result will be max from perimeters, calculated by two ramanujan methods, with negative errors
     @param semiaxis_a - ellipse a semiaxes. Usual paralleled x axis
     @param semiaxis_b - ellipse b semiaxes. Usual paralleled y axis
    **/
    public inline function ellipse2Dperimeter_ramanujan(
        semiaxis_a:Float,
        semiaxis_b:Float
    ):Null<Float>{
        var rez:Null<Float> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        if (a > 0 && b > 0){
            var l1:Float = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
            var l2:Float = Math.PI * (a + b) *
                (
                    1 +
                    (
                        3 * (a - b) * (a - b) / (a + b) / (a + b) /
                        (
                            10 +
                            Math.sqrt(
                                4 -
                                3 * (a - b) * (a - b) / (a + b) / (a + b)
                            )
                        )
                    )
                );
            rez = Math.max(l1, l2);
        }return rez;
    }
    /**
     returns vector 2D, which is tangent of centered ellipse 2D
     @param semiaxis_a - ellipse a semiaxes. Usual paralleled x axis
     @param semiaxis_b - ellipse b semiaxes. Usual paralleled y axis
     @param ellipse_dot2D - dot 2D belongs to the ellipse perimeter
    **/
    public function tangent_centered_ellipse2Ddot(
        semiaxis_a:Float,
        semiaxis_b:Float,
        ellipse_dot2D:Array<Float>
    ):Array<Array<Float>>{
        var v:Array<Array<Float>> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        if (
            a > 0 && b > 0 && ellipse_dot2D.length == 2
        ){
            var x0:Float = ellipse_dot2D[0];
            var y0:Float = ellipse_dot2D[1];
            var x:Float;
            var y:Float;
            if (x0 != 0){
                x = 0.9 * x0;
                if (x0 > 0){
                    if (y0 == 0){ v = [[x0, y0], [x0, 1]]; }
                    else{
                        y = (1 - x * x0 / (a * a)) * b * b / y0;
                        if (y0 > 0){ v = [[x0, y0], [x, y]]; }
                        else{ v = [[x, y], [x0, y0]]; }
                    }
                }else if (x0 < 0){
                    if (y0 == 0){ v = [[x0, y0], [x0, -1]]; }
                    else{
                        y = (1 - x * x0 / (a * a)) * b * b / y0;
                        if (y0 > 0){ v = [[x, y], [x0, y0]]; }
                        else{ v = [[x0, y0], [x, y]]; }
                    }
                }
            }else{
                y = 0.9 * y0;
                if (y0 > 0){
                    if (x0 == 0){ v = [[x0, y0], [-1, y0]]; }
                    else{
                        x = (1 - y * y0 /(b * b)) * a * a / x0;
                        if (x0 > 0){ v = [[x, y], [x0, y0]]; }
                        else{ v = [[x0, y0], [x, y]]; }
                    }
                }else if (y0 < 0){
                    if (x0 == 0){ v = [[x0, y0], [1, y0]]; }
                    else{
                        x = (1 - y * y0 /(b * b)) * a * a / x0;
                        if (x0 < 0){ v = [[x, y], [x0, y0]]; }
                        else{ v = [[x0, y0], [x, y]]; }
                    }
                }
            }
        }return v;
    }
    /**
     returns ellipse e parameter (ellipse eccentricity)
     @param semiaxis_a - ellipse a semiaxes. Usual paralleled x axis
     @param semiaxis_b - ellipse b semiaxes. Usual paralleled y axis
    **/
    public inline function ellipse_e_parameter(
        semiaxis_a:Float,
        semiaxis_b:Float
    ):Null<Float>{
        var rez:Null<Float> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        if ( a >= 0 && b >= 0 && (a + b) > 0){
            rez = (a >= b) ? Math.sqrt(1 - b * b / (a * a)) : -Math.sqrt(1 - a * a / (b * b)) ;
        }return rez;
    }
    /**
     returns ellipse c parameter (elipse foci) ... фокальное расстояние (полурасстояние между фокусами)
     @param semiaxis_a - ellipse a semiaxes. Usual paralleled x axis
     @param semiaxis_b - ellipse b semiaxes. Usual paralleled y axis
    **/
    public function ellipse_c_parameter(
        semiaxis_a:Float,
        semiaxis_b:Float
    ):Null<Float>{
        var rez:Null<Float> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        var e:Null<Float> = ellipse_e_parameter(a, b);
        if (e == null){ return rez; }
        rez = (a >= b) ? a * e : b * e;
        return rez;
    }
    //done. recode bottom
    /**
     returns vector 3D, which is tangent of ellipse, belongs to the plane 3D
     @param dot3D - ellipse center dot 3D (x, y, z)
     @param vec3Dnormal_ellipse_plane - ellipse plane 3D normal vector (a, b, c)
     @param vec3Dsemiaxis_a_direction - ellipse semiaxis direction vector 3D (a, b, c). 
     Will be projected on plane, no need strictly vector in plane. enought not paralleled with 
     ellipse plane normal vector
     @param semiaxis_a - ellipse semiaxis a length
     @param semiaxis_b - ellipse semiaxis b length
     @param semiaxis_a_negative - ellipse opposite semiaxis a length. 
     Directed to negative side from projection of vec3Dsemiaxis_a_direction vector
     @param semiaxis_b_negative - ellipse opposite semiaxis b length. Same but for other semiaxis vector
     @param angle - angle for calculating dot 3D, belongs to the ellipse. 
     Calculating will be directed from positive semiaxis a to positive semiaxis b, for positive angle
     @param rad - if true then radians angle, default false(degrees angle)
    **/
    public function tangent_vec3D_in_plane_of_ellipse2D_placed_in_3Dspace(
        dot3D:Array<Float>,
        vec3Dnormal_ellipse_plane:Array<Float>,
        vec3Dsemiaxis_a_direction:Array<Float>,
        semiaxis_a:Float,
        semiaxis_b:Float,
        semiaxis_a_negative:Float,
        semiaxis_b_negative:Float,
        angle:Float,
        rad:Bool
    ):Array<Float>{
        var rez:Array<Float> = null;
        var t:Array<Float> = dot3D;
        var vn:Array<Float> = vec3Dnormal_ellipse_plane;
        var va:Array<Float> = vec3Dsemiaxis_a_direction;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        var an:Float = semiaxis_a_negative;
        var bn:Float = semiaxis_b_negative;
        if (
            t.length == 3 && vn.length == 3 && va.length == 3 &&
            vecXDnorm(vn) > 0 && vecXDnorm(va) > 0 && !vecXDparalleled(vn, va) &&
            a > 0 && b > 0 && an > 0 && bn > 0
        ){
            var ea:Null<Float> = null; var eb:Null<Float> = null;
            switch(angle_quadrant(angle, rad)){
                case 1 : ea = a; eb = b;
                case 2 : ea = an; eb = b;
                case 3 : ea = an; eb = bn;
                case 4 : ea = a; eb = bn;
            }
            var ep:Array<Float> = plane3D_dot3Dnormal(t, vn);
            var va:Array<Float> = projection_vec3D_on_plane3D(va, ep);
            var vb:Array<Float> = vec3Dnormal(vn, va);
            
            var edot:Array<Float> = ellipse2Ddot(angle, ea, eb, rad);
            var dxy0dxy1:Array<Array<Float>> = tangent_centered_ellipse2Ddot(ea, eb, edot);
            
            var te:Array<Float> = dotXDoffset(t, va, dxy0dxy1[0][0]);
            var te:Array<Float> = dotXDoffset(te, vb, dxy0dxy1[0][1]);
            var tt:Array<Float> = dotXDoffset(t, va, dxy0dxy1[1][0]);
            var tt:Array<Float> = dotXDoffset(tt, vb, dxy0dxy1[1][1]);
            rez = vecXD(te, tt);
        }return rez;
    }
    /**
     returns 9 dots 3D, ellipse center dot and 8 ellipse perimeter dots
     @param dot3D - ellipse center dot 3D
     @param vec3Dsemiaxes - array of semiaxes vectors 3D. Include 4 semiaxes vectors 3D.
     Must be of the form [[a1, b1, c1], [a2, b2, c2], [a3, b3, c3], [a4, b4, c4]]. 
     Which is [a, b, an, bn], where an and bn is negative semiaxes direction vectors 
     @param semiaxes - array of semiaxes lengths. Must be of the form [a, b, an, bn]
    **/
    public function ellipse3D_dots(
        dot3D:Array<Float>,
        vec3Dsemiaxes:Array<Array<Float>>,
        semiaxes:Array<Float>
        ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if(
            dot3D.length != 3 ||
            vec3Dsemiaxes.length != 4 ||
            !same_size_F(vec3Dsemiaxes) ||
            semiaxes.length != 4 ||
            zero_inside_F(semiaxes) ||
            zero_vector_inside(vec3Dsemiaxes)
        ){ return rez; }
        var t0:Array<Float> = dot3D;
        var va:Array<Float> = vec3Dsemiaxes[0];
        var vb:Array<Float> = vec3Dsemiaxes[1];
        var vad:Array<Float> = vec3Dsemiaxes[2];
        var vbd:Array<Float> = vec3Dsemiaxes[3];
        var a:Float = semiaxes[0];
        var b:Float = semiaxes[1];
        var ad:Float = semiaxes[2];
        var bd:Float = semiaxes[3];
        var cos45:Float = Math.cos(radians(45));
        var v:Array<Array<Float>> = [va,vb,vad,vbd];
        var d:Array<Float> = [a*cos45,b*cos45,ad*cos45,bd*cos45];
        var vv:Array<Array<Float>> = [vb,vad,vbd,va];
        var dd:Array<Float> = [b*cos45,ad*cos45,bd*cos45,a*cos45];
        rez = [t0];
        for (i in 0...4){
            rez.push(dotXDoffset(t0, vec3Dsemiaxes[i], semiaxes[i]));
            rez.push(dotXDoffset(dotXDoffset(t0, v[i], d[i]), vv[i], dd[i]));
            }
        return rez;
    }
    /**
     returns dot 2D, which belongs to ellipse perimeter
     @param angle - angle of ellipse from semiaxis a to semiaxis b direction, for positive angle
     @param semiaxis_a_ox - semiaxis a length
     @param semiaxis_b_oy - semiaxis b length
     @param rad - if true then radians angle, default false(degrees angle)
    **/
    public inline function ellipse2Ddot(
        angle:Float,
        semiaxis_a_ox:Float,
        semiaxis_b_oy:Float,
        rad:Bool = false
        ):Array<Float>{
        var u:Float = angle;
        var a:Float = semiaxis_a_ox;
        var b:Float = semiaxis_b_oy;
        if (!rad){ u = radians(u); }
        return [a * Math.cos(u), b * Math.sin(u)];
    }
    /**
     returns curve 2D, which have ellipse shape restricted to quarter
     @param angle0 - start angle from semiaxis a to semiaxis b direction
     @param angle1 - angle from semiaxis a to semiaxis b direction started from end of `angle0`
     @param semiaxis_a_ox - length of semiaxis a (ox)
     @param semiaxis_b_oy - length of semiaxis b (oy)
     @param rad - if true then radians angle, default false(degrees angle)
    **/
    public function curve2D_4dots_elliptic_shape_restricted_to_quarter(
        angle0:Float,
        angle1:Float,
        semiaxis_a_ox:Float,
        semiaxis_b_oy:Float,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var a0:Float = (rad) ? degrees(angle0) : angle0;
        var a1:Float = (rad) ? degrees(angle1) : angle1;
        a0 = (a0 > 90) ? 90 : (a0 < 0) ? 0 : a0;
        a1 = (a1 > 90) ? 90 : (a1 < 0) ? 0 : a1;
        a0 = (a0 >= a1) ? 0 : a0;
        var du:Float = a1 - a0;
        var ae:Float = semiaxis_a_ox;
        var be:Float = semiaxis_b_oy;
        rez = [for (a in [a0, a0 + du / 3, a0 + du * 2 / 3, a0 + du]) ellipse2Ddot(a, ae, be, false)];
        return rez;
    }
    /**
     returns bezier curve 3D, which have ellipse shape restricted to quarter. 
     Result will have form [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]]
     @param dot3Dc - center ellipse dot 3D
     @param vec3D_a_ox - semiaxis a direction vector 3D
     @param vec3D_b_ox - semiaxis b direction vector 3D
     @param semiaxis_a_ox - semiaxis a length
     @param semiaxis_b_oy - semiaxis b length
     @param angle0 - start angle from semiaxis a to semiaxis b direction
     @param angle1 - angle from semiaxis a to semiaxis b direction started from end of `angle0`
     @param rad - if true then radians angle, default false(degrees angle)
    **/
    public function beziercubic3D_elliptic_shape_restricted_to_quarter(
        dot3Dc:Array<Float>,
        vec3D_a_ox:Array<Float>,
        vec3D_b_oy:Array<Float>,
        semiaxis_a_ox:Float,
        semiaxis_b_oy:Float,
        angle0:Float,
        angle1:Float,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var tc:Array<Float> = dot3Dc;
        var va:Array<Float> = vec3D_a_ox;
        var vb:Array<Float> = vec3D_b_oy;
        var a:Float = semiaxis_a_ox;
        var b:Float = semiaxis_b_oy;
        if (
            tc.length == 3 &&
            va.length == 3 &&
            vb.length == 3 &&
            vecXDnorm(va) > 0 &&
            vecXDnorm(vb) > 0
        ){
            var dxdy:Array<Array<Float>> = curve2D_4dots_elliptic_shape_restricted_to_quarter(angle0, angle1, a, b, rad);
            rez = [for (i in dxdy) dotXDoffset(dotXDoffset(tc, va, i[0]), vb, i[1])];
            rez = beziercubic3D_follow_4dots_trajectory(rez);
        }return rez;
    }
    /**
     returns angle required to place curve on ellipse. 
     Max returned value is 360 degrees, or radians same value angle
     @param curve_length - length of curve for placing on ellipse
     @param semiaxis_a_ox - semiaxis a length
     @param semiaxis_b_oy - semiaxis b length
     @param angle0 - start angle from semiaxis a to semiaxis b direction. 
     Curve placing started from end of `angle0`
     @param rad - if true then radians angle, default false(degrees angle)
    **/
    public function angle_required_to_place_curve_on_ellipse(
        curve_length:Float,
        semiaxis_a_ox:Float,
        semiaxis_b_oy:Float,
        angle0:Float,
        rad:Bool = false
    ):Null<Float>{
        var rez:Null<Float> = null;
        var cl:Float = curve_length;
        var a:Float = semiaxis_a_ox;
        var b:Float = semiaxis_b_oy;
        var u:Float = angle0;
        var le:Float = 0;
        var xy:Array<Float> = null;
        if (cl > 0 && a > 0 && b > 0){
            var xy0:Array<Float> = ellipse2Ddot(u, a, b, rad);
            if (rad){ u = degrees(u);}
            for (ue in 1...361){
                xy = ellipse2Ddot(u + ue, a, b);
                le += vecXDnorm(vecXD(xy0, xy));
                if (le >= cl){ return (rad) ? radians(ue) : ue; }
                xy0 = xy;
            }rez = (rad) ? radians(360) : 360;
        }return rez;
    }
    /**
     returns polygon 3D dots array, which is poligon center dot and array of polygon perimeter dots. 
     Result will have form [`dot3D`, dot3D(1), ... ,dot3D(`angle_proportion.length`)]
     @param dot3D - polygon center dot 3D
     @param vec3Dsemiaxes - base ellipse 4 semiaxes vectors, for creating polygon inside ellipse. 
     Must be of the form [[a1, b1, c1], [a2, b2, c2], [a3, b3, c3], [a4, b4, c4]]. 
     Which is [a, b, an, bn], where an and bn is negative semiaxes direction vectors 
     @param semiaxes - array of displacement values of polygon vetexes from center dot in ellipse plane
     @param angle_proportions - proportions array for splitting 360 degrees angle(without units, not matter). 
     `[90, 90, 90, 90]` returns result same as `[1, 1, 1, 1]`, in both cases will be created quadrangle inside ellipse
    **/
    public function polygon3D_inside_ellipse(
        dot3D:Array<Float>,
        vec3Dsemiaxes:Array<Array<Float>>,
        semiaxes:Array<Float>,
        angle_proportions:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if(
            dot3D.length != 3 ||
            vec3Dsemiaxes.length != 4 ||
            !same_size_F(vec3Dsemiaxes) ||
            semiaxes.length != 4 ||
            angle_proportions.length < 1 ||
            negative_inside_F(angle_proportions) ||
            sum_F(angle_proportions) == 0
        ){ return rez; }
        var t0:Array<Float> = dot3D;
        var va:Array<Float> = vec3Dsemiaxes[0];
        var vb:Array<Float> = vec3Dsemiaxes[1];
        var vad:Array<Float> = vec3Dsemiaxes[2];
        var vbd:Array<Float> = vec3Dsemiaxes[3];
        var a:Float = semiaxes[0];
        var b:Float = semiaxes[1];
        var ad:Float = semiaxes[2];
        var bd:Float = semiaxes[3];
        var doli:Array<Float> = angle_proportions;
        var x:Float = 360 / sum_F(doli);
        var axis_a:Array<Float>;
        var axis_b:Array<Float>;
        var dlina_a:Float;
        var dlina_b:Float;
        var v:Array<Float>;
        var d:Float;
        var vv:Array<Float>;
        var dd:Float;
        rez = [t0];
        var u:Float = 0;
        for (i in doli){
            axis_a = va; dlina_a = a; axis_b = vb; dlina_b = b;
            if (u > 90 && u <= 270){ axis_a = vad; dlina_a = ad; }
            if (u > 180){ axis_b = vbd; dlina_b = bd;}
            v = axis_a; d = dlina_a * Math.abs(Math.cos(radians(u)));
            vv = axis_b; dd = dlina_b * Math.abs(Math.sin(radians(u)));
            rez.push(dotXDoffset(dotXDoffset(t0, v, d), vv, dd));
            u += i * x;
        }return rez;
    }
    /**
     polygon on vectors and displacements. Can be not belongs to one plane 3D.
     returns polygon 3D dots array, which is poligon center dot and array of polygon perimeter dots. 
     Result will have form [`dot3D`, dot3D(1), ... ,dot3D(`distances.length`)]
     @param dot3D - polygon center dot 3D
     @param vec3Dfield - polygon vertexes vector field(array of vectors 3D). 
     Each Vertex will be offsetted along own vector
     @param distances - polygon vertexes radial distances array(offset length)
    **/
    public function polygon3D_vec3Dfield_distances(
        dot3D:Array<Float>,
        vec3Dfield:Array<Array<Float>>,
        distances:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            dot3D.length != 3 ||
            !same_size_F(vec3Dfield) ||
            vec3Dfield.length != distances.length ||
            vec3Dfield[0].length != 3
        ){ return rez; }
        rez = [dot3D];
        for (i in 0...vec3Dfield.length){
            rez.push(dotXDoffset(dot3D, vec3Dfield[i], distances[i]));
        }return rez;
    }
    /**
     polygon belongs to plane 3D.
     returns polygon 3D dots array, which is poligon center dot and array of polygon perimeter dots. 
     Result will have form [`dot3D`, dot3D(1), ... ,dot3D(`angle_proportion.length`)]. 
     @param dot3D - polygon center dot 3D
     @param vec3Dplane_normal - polygon plane normal vector 3D
     @param vec3Dsemiaxis_a_direction - semiaxis a, will be used as start vector of first vertex. 
     Every next vertex will be calculated uses `vec3Dsemiaxis_a_direction` vector rotation 
     (CCW direction, if look from end of `vec3Dplane_normal` vector) to specified angle and offset to specified distance
     @param angle_proportions - proportions array for splitting 360 degrees angle(without units, not matter). 
     `[90, 90, 90, 90]` returns result same as `[1, 1, 1, 1]`, in both cases will be created quadrangle belongs to plane
     @param distances - polygon vertexes radial distances array(offset length)
    **/
    public function polygon3D_in_plane(
        dot3D:Array<Float>,
        vec3Dplane_normal:Array<Float>,
        vec3Dsemiaxis_a_direction:Array<Float>,
        angle_proportions:Array<Float>,
        distances:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var t:Array<Float> = dot3D;
        var vn:Array<Float> = vec3Dplane_normal;
        var va:Array<Float> = vec3Dsemiaxis_a_direction;
        var ap:Array<Float> = angle_proportions;
        var d:Array<Float> = distances;
        if (
            t.length != 3 ||
            vn.length != 3 ||
            va.length != 3 ||
            ap.length != d.length ||
            vecXDnorm(va) == 0 ||
            vecXDnorm(vn) == 0 ||
            vecXDparalleled(va, vn)
        ){ return rez; }
        var x:Float = 360 / sum_F(ap);
        va = projection_vec3D_on_plane3D(va, [vn[0], vn[1], vn[2], 0]);
        rez = [t];
        var u:Float = 0;
        for (i in 0...d.length){
            rez.push( dotXDoffset( t, vec3Drotate(va, vn, u), distances[i] ) );
            u += x * ap[i];
        }return rez;
    }
    /**
     returns vector field, which is vectors 3D, calculated from polygon center dot to each vertex. 
     Result will have form [[a, b, c], ... , [a, b, c]], depend of incoming data length
     @param polygon3D - must be of the form 
     [ polygon center dot 3D, polygon vertex first dot 3D , ... ,polygon vertex last dot 3D ]
    **/
    public function polygon3D_to_vec3Dfield(
        polygon3D:Array<Array<Float>>
    ):Array<Array<Float>>{
        return [for (i in 1...polygon3D.length) vecXD(polygon3D[0], polygon3D[i])];
    }
    /**
     returns vector 3D, which is `vec3D` vector projection on `plane3D` plane
     @param vec3D - vector 3D (a, b, c)
     @param plane3D - plane 3D (a, b, c, d), where (a, b, c) normal vector of plane, and (d) displacement from (0, 0, 0)
    **/
    public function projection_vec3D_on_plane3D(
        vec3D:Array<Float>,
        plane3D:Array<Float>
        ):Array<Float>{
        var rez:Array<Float> = null;
        if (vec3D.length != 3 || plane3D.length != 4){
            return rez;
        }
        var vp:Array<Float> = [for (i in 0...3) plane3D[i]];
        if(
            vecXDparalleled(vec3D, vp) ||
            vecXDnorm(vec3D) == 0 ||
            vecXDnorm(vp) == 0
            ){ return rez; }
        var t0:Array<Float> = [0,0,0];
        var t1:Array<Float> = dotXDoffset(t0, vec3D, 1);
        var p:Array<Float> = plane3D_dot3Dnormal(t0, vp);
        t1 = projection_dot3D_on_plane3D(t1, p);
        rez = vecXD(t0, t1);
        return rez;
    }
    /**
     returns angle, which is projection of angle between `vec3D1` and `vec3D2` vectors to `plane3D`.  
     Result angle, calculated from projection of `vec3D1` to projection of `vec3D2` around plane normal  
     in ccw direction, and can be negative. In this case the positive angle in ccw direction between  
     projections of vectors can be represented as `360 + result(which is negative)`.
     @param vec3D1 - vector 3D (a, b, c)
     @param vec3D2 - vector 3D (a, b, c)
     @param plane3D - plane 3D (a, b, c, d), where (a, b, c) normal vector of plane, and (d) displacement from (0, 0, 0)
     @param rad - if true then radians angle, default false(degrees angle)
    **/
    public function angle_vec3Dvec3D_projection_on_plane3D(
        vec3D1:Array<Float>,
        vec3D2:Array<Float>,
        plane3D:Array<Float>,
        rad:Bool = false
        ):Null<Float>{
        var rez:Null<Float> = null;
        var v1:Array<Float> = vec3D1;
        var v2:Array<Float> = vec3D2;
        var v1l:Int = v1.length;
        var v2l:Int = v2.length;
        var v1mod:Float = vecXDnorm(v1);
        var v2mod:Float = vecXDnorm(v2);
        if ( v1l != 3 || v2l != 3 || v1mod == 0 || v2mod == 0){ return rez; }
        var p:Array<Float> = plane3D;
        if (p.length != 4){ return rez; }
        var vn:Array<Float> = [for (i in 0...3) p[i]];
        if ( vecXDnorm(vn) == 0 ){ return rez; }
        if (vecXDparalleled_sameside(v1, v2)){ return 0;}
        var pv1:Array<Float> = projection_vec3D_on_plane3D(v1, p);
        var pv2:Array<Float> = projection_vec3D_on_plane3D(v2, p);
        var uvv:Float = vecXDangle(pv1, pv2, rad);
        var pvn:Array<Float> = (vecXDparalleled(pv1, pv2)) ? vn : vec3Dnormal(pv1, pv2);
        var uvnpvn:Float = vecXDangle(vn, pvn, rad);
        var uznak:Float = (rad) ? radians(90) : 90;
        rez = (uvnpvn > uznak) ? -uvv : uvv;
        return rez;
    }
    
}
