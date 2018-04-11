/*
 * Copyright (c) 2018 llll
*/
package geo;
/**
  GeometryXD - multidimensional geometry manipulations. Primarily targeted for 3D objects (points, vectors, curves). Not pro level library.
 */
class GeometryXD{
    /**
      trace "GeometryXD" message in time of initialisation
     */
    public static function main(){trace("GeometryXD");}
    
    /**
      return true if incoming Int Array have at least one positive element
      @param a - incoming array
      @return Bool
     */
    public static function positive_inside_I(a:Array<Int>):Bool{
        for (i in a){ if (i > 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Int Array have at least one zero element
      @param a - incoming array
      @return Bool
     */
    public static function zero_inside_I(a:Array<Int>):Bool{
        for (i in a){ if (i == 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Int Array have at least one negative element
      @param a - incoming array
      @return Bool
     */
    public static function negative_inside_I(a:Array<Int>):Bool{
        for (i in a){ if (i < 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Float Array have at least one positive element
      @param a - incoming array
      @return Bool
     */
    public static function positive_inside_F(a:Array<Float>):Bool{
        for (i in a){ if (i > 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Float Array have at least one zero element
      @param a - incoming array
      @return Bool
     */
    public static function zero_inside_F(a:Array<Float>):Bool{
        for (i in a){ if (i == 0){ return true; } }
        return false;
    }
    /**
      return true if incoming Float Array have at least one negative element
      @param a - 
      @return Bool
     */
    public static function negative_inside_F(a:Array<Float>):Bool{
        for (i in a){ if (i < 0){ return true; } }
        return false;
    }
    
    /**
      return sum of Int Array elements
      @param a - incoming array
      @return Null<Int>
     */
    public static function sum_I(a:Array<Int>):Null<Int>{
        var rez:Null<Int> = null;
        if (a.length > 0){ rez = 0; for (i in 0...a.length){ rez += i; } }
        return rez;
    }
    /**
      return sum of Float Array elements
      @param a - incoming array
      @return Null<Float>
     */
    public static function sum_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        if (a.least > 0){ rez = 0; for (i in 0...a.length){ rez += i; } }
        return rez;
    }
    /**
      return diff between first and other Int Array elements
      @param a - incoming array
      @return Null<Int>
     */
    public static function diff_I(a:Array<Int>):Null<Int>{
        var rez:Null<Int> = null;
        var al:Int = a.length;
        if (al > 0){
            if (al == 1){ rez = a[0]; }
            else{ rez = a[0] - sum_I([for (i in 1...al)] i); }
        }return rez;
    }
    /**
      return diff between first and other Float Array elements
      @param a - incoming array
      @return Null<Float>
     */
    public static function diff_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            if (al == 1){ rez = a[0]; }
            else{ rez = a[0] - sum_F([for (i in 1...al)] i); }
        }return rez;
    }
    /**
      return middle value of Float Array
      @param a - incoming array
      @return Null<Float>
     */
    public static function middle_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = sum_F(a) / al; }
        return rez;
    }
    /**
      multiplies each element of the Float Array by a Float
      @param a - incoming array
      @param n - multiplier of each element
      @return Array<Float>
     */
    public static function multiply_FperF(a:Array<Float>, n:Float):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) a[i] * n]; }
        return rez;
    }
    /**
      multiplies all elements of an Int Array. [1, 2, 3] return 1 * 2 * 3
      @param a - incoming array
      @return Null<Int>
     */
    public static function multiply_I(a:Array<Int>):Null<Int>{
        var rez:Null<Int> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = a[0];
            for(i in 1...al){ rez *= a[i]; }
        }return rez;
    }
    /**
      multiplies all elements of an Float Array. [1.1, 2.0, 3.0] return 1.1 * 2.0 * 3.0
      @param a - incoming array
      @return Null<Float>
     */
    public static function multiply_F(a:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = a[0];
            for(i in 1...al){ rez *= a[i]; }
        }return rez;
    }
    //done before
    public static function minus_I(a:Array<Int>):Array<Int>{
        return [for (i in 0...a.length) -a[i]];
    }
    public static function minus_F(a:Array<Float>):Array<Float>{
        return [for (i in 0...a.length) -a[i]];
    }
    
    public static function sum_xI(a:Array<Array<Int>>):Array<Int>{
        return [for (i in 0...a[0].length) sum_I([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function sum_xF(a:Array<Array<Float>>):Array<Float>{
        return [for (i in 0...a[0].length) sum_F([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function diff_xI(a:Array<Array<Int>>):Array<Int>{
        return [for (i in 0...a[0].length) diff_I([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function diff_xF(a:Array<Array<Float>>):Array<Float>{
        return [for (i in 0...a[0].length) diff_F([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function middle_xF(a:Array<Array<Float>>):Array<Float>{
        return [for (i in 0...a[0].length) middle_F([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function multiply_xFperF(a:Array<Array<Float>>, n:Float):Array<Array<Float>>{
        return [for (i in 0...a.length) multiply_FperF(a[i], n) ];
    }
    public static function multiply_xI(a:Array<Array<Int>>):Array<Int>{
        return [for (i in 0...a[0].length) multiply_I([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function multiply_xF(a:Array<Array<Float>>):Array<Float>{
        return [for (i in 0...a[0].length) multiply_F([for (ai in 0...a.length) a[ai][i] ]) ];
    }
    public static function multisum_xI(a:Array<Array<Int>>):Int{
        return sum_I(multiply_xI(a));
    }
    public static function multisum_xF(a:Array<Array<Float>>):Float{
        return sum_F(multiply_xF(a));
    }
    
    
    public static function sum_previous_I(a:Array<Int>):Array<Int>{
        return [for (i in 0...a.length) (i == 0) ? a[i] : a[i] + a[i - 1]];
    }
    public static function diff_previous_I(a:Array<Int>):Array<Int>{
        return [for (i in 0...a.length) (i == 0) ? a[i] : a[i] - a[i - 1]];
    }
    public static function sum_before_I(a:Array<Int>):Array<Int>{
        var rez:Array<Int> = [];
        var x:Int = 0;
        for (i in 0...a.length){
            x += a[i];
            rez.push(x);
        }return rez;
    }
    public static function diff_before_I(a:Array<Int>):Array<Int>{
        var rez:Array<Int> = [a[0]];
        for (i in 1...a.length){
            rez.push(a[i] - a[i-1]);
        }return rez;
    }
    
    public static function sum_previous_F(a:Array<Float>):Array<Float>{
        return [for (i in 0...a.length) (i == 0) ? a[i] : a[i] + a[i - 1]];
    }
    public static function diff_previous_F(a:Array<Float>):Array<Float>{
        return [for (i in 0...a.length) (i == 0) ? a[i] : a[i] - a[i - 1]];
    }
    public static function sum_before_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = [];
        var x:Float = 0;
        for (i in 0...a.length){
            x += a[i];
            rez.push(x);
        }return rez;
    }
    public static function diff_before_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = [a[0]];
        for (i in 1...a.length){
            rez.push(a[i] - a[i-1]);
        }return rez;
    }
    
    public static function recounter_I_F(what:Array<Int>):Array<Float>{
        var rez:Array<Float> = [];
        return [for (i in 0...what.length) rez.push(what[i])];
    }
    public static function recounter_F_I(what:Array<Float>):Array<Int>{
        var rez:Array<Int> = [];
        return [for (i in 0...what.length) rez.push(Std.int(what[i]))];
    }
    public static function recounter_I_S(what:Array<Int>):Array<String>{
        var rez:Array<String> = [];
        rez = [for (i in 0...what.length) Std.string(what[i])];
        return rez;
    }
    public static function recounter_F_S(what:Array<Float>):Array<String>{
        var rez:Array<String> = [];
        rez = [for (i in 0...what.length) Std.string(what[i])];
        return rez;
    }
    public static function recounter_S_I(what:Array<String>):Array<Int>{
        var rez:Array<Int> = [];
        rez = [for (i in 0...what.length) Std.parseInt(what[i])];
        return rez;
    }
    public static function recounter_S_F(what:Array<String>):Array<Float>{
        var rez:Array<Float> = [];
        rez = [for (i in 0...what.length) Std.parseFloat(what[i])];
        return rez;
    }
    
    public static function repeater_F_F(n:Int, what:Array<Float>, full:Bool = false):Array<Float>{
        var rez:Array<Float> = null;
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_I_I(n:Int, what:Array<Int>, full:Bool = false):Array<Int>{
        var rez:Array<Int> = null;
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_S_S(n:Int, what:Array<String>, full:Bool = false):Array<String>{
        var rez:Array<String> = null;
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_F_I(n:Int, what_:Array<Float>, full:Bool = false):Array<Int>{
        var rez:Array<Int> = null;
        var what:Array<Int> = recounter_F_I(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_S_I(n:Int, what_:Array<String>, full:Bool = false):Array<Int>{
        var rez:Array<Int> = null;
        var what:Array<Int> = recounter_S_I(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_I_F(n:Int, what_:Array<Int>, full:Bool = false):Array<Float>{
        var rez:Array<Float> = null;
        var what:Array<Float> = recounter_I_F(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_S_F(n:Int, what_:Array<String>, full:Bool = false):Array<Float>{
        var rez:Array<Float> = null;
        var what:Array<Float> = recounter_S_F(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_I_S(n:Int, what_:Array<Int>, full:Bool = false):Array<String>{
        var rez:Array<String> = null;
        var what:Array<String> = recounter_I_S(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    public static function repeater_F_S(n:Int, what_:Array<Float>, full:Bool = false):Array<String>{
        var rez:Array<String> = null;
        var what:Array<String> = recounter_F_S(what_);
        if (n == 0){ return rez; }
        var wl:Int = what.length;
        rez = [];
        if (wl == 0){ return rez; }
        if (n < 0){ what.reverse(); n = Std.int(Math.abs(n));}
        var ind:Int =(full) ? n : Math.ceil(n / wl);
        rez = [for (_ in 0...ind) for (i in 0...wl) what[i]];
        if(!full){rez = rez.slice(0,n);}
        return rez;
    }
    
    public static function an_in_b_S(a:Array<String>, b:Array<String>):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        for (ia in 0...a.length){
            for (ib in 0...b.length){
                if (a[ia] == b[ib]) { rez.push([ia, ib]); }
            }
        }return rez;
    }
    public static function an_in_bn_S(a:Array<String>, b:Array<Array<String>>):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        for (ia in 0...a.length){
            for (ib in 0...b.length){
                for (ibn in 0...b[ib].length){
                    if (a[ia] == b[ib][ibn]) { rez.push([ia, ib, ibn]); }
                }
            }
        }return rez;
    }
    public static function an_in_b_I(a:Array<Int>, b:Array<Int>):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        for (ia in 0...a.length){
            for (ib in 0...b.length){
                if (a[ia] == b[ib]) { rez.push([ia, ib]); }
            }
        }return rez;
    }
    public static function an_in_bn_I(a:Array<Int>, b:Array<Array<Int>>):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        for (ia in 0...a.length){
            for (ib in 0...b.length){
                for (ibn in 0...b[ib].length){
                    if (a[ia] == b[ib][ibn]) { rez.push([ia, ib, ibn]); }
                }
            }
        }return rez;
    }
    public static function an_in_b_F(a:Array<Float>, b:Array<Float>):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        for (ia in 0...a.length){
            for (ib in 0...b.length){
                if (a[ia] == b[ib]) { rez.push([ia, ib]); }
            }
        }return rez;
    }
    public static function an_in_bn_F(a:Array<Float>, b:Array<Array<Float>>):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        for (ia in 0...a.length){
            for (ib in 0...b.length){
                for (ibn in 0...b[ib].length){
                    if (a[ia] == b[ib][ibn]) { rez.push([ia, ib, ibn]); }
                }
            }
        }return rez;
    }
    public static function chain_indexes(a_l:Int, n:Int, ring:Bool):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Int> = [];
        if (ring){
            ind = [for (b in 0...2) for (i in 0...a_l) (b < 1)? i : (i < n - 1) ? i : continue];
        }else{
            ind = [for (i in 0...1 + a_l - n) i];
        }return rez;
    }
    public static function chain_S(a:Array<String> ,n:Int ,ring:Bool = false):Array<Array<String>>{
        var rez:Array<Array<String>> = null;
        var a_l:Int = a.length;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Array<Int>> = chain_indexes(a_l, n, ring);
        rez = [for (i in 0...ind.length) [for (j in 0...n) a[ind[i][j]]]];
        return rez;
    }
    public static function chain_I(a:Array<Int> ,n:Int ,ring:Bool = false):Array<Array<Int>>{
        var rez:Array<Array<Int>> = null;
        var a_l:Int = a.length;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Array<Int>> = chain_indexes(a_l, n, ring);
        rez = [for (i in 0...ind.length) [for (j in 0...n) a[ind[i][j]]]];
        return rez;
    }
    public static function chain_F(a:Array<Float> ,n:Int ,ring:Bool = false):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var a_l:Int = a.length;
        if (n > a_l || n < 1){ return rez; }
        var ind:Array<Array<Int>> = chain_indexes(a_l, n, ring);
        rez = [for (i in 0...ind.length) [for (j in 0...n) a[ind[i][j]]]];
        return rez;
    }
    public static function steps_internal(xmin:Float, xmax:Float, n:Int, borders:Bool = false):Array<Float>{
        var rez:Array<Float> = null;
        if (n < 1){ return rez; }
        var st:Float = (xmax - xmin) / (n + 1);
        if (borders){
            rez = [for (i in 0...n + 2) (i > 0 && i < n + 1) ? xmin + st * i : (i == 0) ? xmin : xmax ];
        }else{
            rez = [for (i in 1...n + 1) xmin + st * i];
        }return rez;
    }
    public static function steps_external(smin:Float, smax:Float, n:Int, direction:Int):Array<Float>{
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
    
    public static function sin_cos_cut(x:Float):Float { return (x>1)?1:(x<-1)?-1:x; }
    public static function degrees(angle:Float):Float { return angle * 180 / Math.PI; }
    public static function radians(angle:Float):Float { return angle / 180 * Math.PI; }
    public static function angle_quadrant(angle:Float, rad:Bool = false):Int {
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
    
    
    
    public static function vecXDmod(vecXD:Array<Float>):Float{
        var sum:Float = 0;
        for (i in vecXD){sum += i*i;}
        return Math.sqrt(sum);
    }
    public static function vecXDfieldmod(vecXDfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        rez = [for (i in vecXDfield) vecXDmod(i)];
        return rez;
    }
    public static function maxabs(vecXD:Array<Float>):Float{
        var rez:Float = 0;
        for (i in vecXD){if (Math.abs(i) > Math.abs(rez)){rez = i;}}
        return rez;
    }
    public static function vecXD(dot3Da:Array<Float>, dot3Db:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            !vecXDsamesize(dot3Da, dot3Db) ||
            vecXDsame(dot3Da, dot3Db)
            ){ return rez; }
        rez = [];
        for (i in 0...dot3Da.length){ rez.push(dot3Db[i] - dot3Da[i]); }
        return rez;
    }
    public static function vecXDone(vecXD:Array<Float>):Array<Float>{
        var rez:Array<Float> = [];
        var lv:Float = vecXDmod(vecXD);
        if (lv > 0){
            for (i in vecXD){ rez.push(i/lv); }
            return rez;
        }else{rez = vecXD;}
        return rez;
    }
    public static function vecXDfield(dots:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = [];
        for (i in 1...dots.length){ rez.push(vecXD(dots[0], dots[i])); }
        return rez;
    }
    public static function vecXDsame(vecXDa:Array<Float>,vecXDb:Array<Float>):Bool{
        if (vecXDa.length == vecXDb.length){
            var lv:Int = vecXDa.length;
            for (i in 0...lv){
                if (vecXDa[i] != vecXDb[i]) {return false;}
            }return true;
        }return false;
    }
    public static function vecXDfieldsame(vecXDfield:Array<Array<Float>>):Bool{
        if (vecXDfieldsamesize(vecXDfield)){
            for (i in 1...vecXDfield.length){
                if (!vecXDsame(vecXDfield[0], vecXDfield[i])) { return false; }
            }return true;
        }return false;
    }
    public static function vecXDrandom(x:Int = 3):Array<Float>{
        var v0:Array<Float> = [for (i in 0...x) 0];
        var v1:Array<Float> = [for (i in 0...x) 0];
        while(vecXDsame(v0,v1)){
            v1 = [];
            for (i in 0...x){v1.push(Math.random() - 0.5);}
        }v1 = vecXDone(v1);
        return v1;
    }
    public static function vecXDsum(vecXDa:Array<Float>, vecXDb:Array<Float>):Array<Float>{
        return sum_xF([vecXDa, vecXDb]);
    }
    public static function vecXDfieldsum(vecXDfield:Array<Array<Float>>):Array<Float>{
        return sum_xF(vecXDfield);
    }
    public static function vecXDdiff(vecXDa:Array<Float>, vecXDb:Array<Float>):Array<Float>{
        return diff_xF([vecXDa, vecXDb]);
    }
    public static function vecXDfielddiff(vecXDfield:Array<Array<Float>>):Array<Float>{
        return diff_xF(vecXDfield);
    }
    public static function vecXDback(vecXD:Array<Float>):Array<Float>{
        return minus_F(vecXD);
    }
    public static function vecXDfieldback(vecXDfield:Array<Array<Float>>):Array<Array<Float>>{
        return [for (i in 0...vecXDfield.length) vecXDback(vecXDfield[i])];
    }
    public static function vecXDparalleled_sameside(vecXDa:Array<Float>, vecXDb:Array<Float>):Null<Bool>{
        var rez:Null<Bool> = null;
        if (vecXDa.length != vecXDb.length){ return rez; }
        return vecXDsame(vecXDone(vecXDa), vecXDone(vecXDb));
    }
    public static function vecXDparalleled_opposite(vecXDa:Array<Float>, vecXDb:Array<Float>):Null<Bool>{
        var rez:Null<Bool> = null;
        if (vecXDa.length != vecXDb.length){ return rez; }
        return vecXDparalleled_sameside(vecXDa,vecXDback(vecXDb));
    }
    public static function vecXDparalleled(vecXDa:Array<Float>, vecXDb:Array<Float>):Bool{
        return vecXDparalleled_sameside(vecXDa, vecXDb) || vecXDparalleled_opposite(vecXDa, vecXDb);
    }
    
    public static function vecXDscalar(vecXDa:Array<Float>, vecXDb:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        if (vecXDa.length == vecXDb.length){
            rez = 0;
            for (i in 0...vecXDa.length) {rez += vecXDa[i] * vecXDb[i];}
        }return rez;
    }
    public static function vecXDcos(vecXDa:Array<Float>, vecXDb:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var la:Float = vecXDmod(vecXDa);
        var lb:Float = vecXDmod(vecXDb);
        if (la > 0 && lb > 0){
            rez = sin_cos_cut( vecXDscalar(vecXDa,vecXDb) / (la * lb) );
        }return rez;
    }
    public static function vecXDangle(vecXDa:Array<Float>, vecXDb:Array<Float>, rad:Bool = false):Null<Float>{
        var rez:Null<Float> = null;
        var la:Float = vecXDmod(vecXDa);
        var lb:Float = vecXDmod(vecXDb);
        if (la > 0 && lb > 0){
            rez = (rad) ? Math.acos(vecXDcos(vecXDa,vecXDb)):degrees(Math.acos(vecXDcos(vecXDa,vecXDb)));
        }return rez;
    }
    public static function vec3Dnormal(vec3Da:Array<Float>, vec3Db:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (vec3Da.length == 3 && vec3Db.length == 3){
            var a:Float = vec3Da[1] * vec3Db[2] - vec3Da[2] * vec3Db[1];
            var b:Float = -vec3Da[0] * vec3Db[2] + vec3Da[2] * vec3Db[0];
            var c:Float = vec3Da[0] * vec3Db[1] - vec3Da[1] * vec3Db[0];
            return vecXDone([a,b,c]);
        }return rez;
    }
    public static function vec3Dfieldnormal(vec3Dfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if (vec3Dfield[0].length == 3){
            var rez:Array<Float> = vec3Dfield[0];
            for (i in 1...vec3Dfield.length){
                rez = vec3Dnormal(rez,vec3Dfield[i]);
            }
        }
        return rez;
    }
    public static function vecXDmiddle(vecXDa:Array<Float>, vecXDb:Array<Float>):Array<Float>{
        return middle_xF([vecXDa, vecXDb]);
    }
    public static function vecXDsamesize(vecXDa:Array<Float>, vecXDb:Array<Float>):Bool{
        return vecXDa.length == vecXDb.length;
    }
    public static function vecXDfieldsamesize(vecXDfield:Array<Array<Float>>):Bool{
        var thesize:Int = vecXDfield[0].length;
        for (i in 1...vecXDfield.length){
            if (thesize != vecXDfield[i].length) {return false;}
        }return true;
    }
    public static function vecXDfieldmiddle(vecXDfield:Array<Array<Float>>):Array<Float>{
        return middle_xF(vecXDfield);
    }
    public static function dotXDoffset(dotXD:Array<Float>, vecXD:Array<Float>, t:Float):Array<Float>{
        var rez:Array<Float> = null;
        if (t != 0){
            var lv:Int = vecXD.length;
            if (dotXD.length == lv){
                rez = [];
                t = t / vecXDmod(vecXD);
                for (i in 0...lv){
                    rez.push(dotXD[i] + vecXD[i] * t);
                }
            }
            return rez;
        }else{return dotXD;}
    }
    public static function dot3Dline3D_x_plane3D(dot3D0:Array<Float>, vec3D0:Array<Float>, vec3Dplane:Array<Float>, dplane:Float = 0):Array<Float>{
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
    public static function projection_dot3D_on_plane3D(dot3D:Array<Float>, plane3D:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var ldot:Int = dot3D.length;
        var lplane:Int = plane3D.length;
        if (
            vecXDmod(plane3D.slice(0,3)) == 0 ||
            ldot != 3 ||
            lplane != 4
            ){ return rez; }
    
        var checkup:Float = - multisum_xF([plane3D.slice(0,3), dot3D]) + plane3D[3];
        var checkdn:Float = multisum_xF([plane3D.slice(0,3), plane3D.slice(0,3)]);
        if (checkdn == 0){return rez;}
        else if (checkup == 0){return dot3D;}
        else {
            var t:Float = checkup / checkdn;
            rez = [for (i in 0...3) dot3D[i] + plane3D[i] * t];
        }
        return rez;
    }
    public static function dot3D_to_dot2Dviewplane(dot3D:Array<Float>, dot3Dox:Array<Float>, dot3Doz:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var t:Float = vecXDmod(dot3D);
        var cosox0t:Float = multisum_xF([dot3Dox,dot3D]) / (t + vecXDmod(dot3Dox));
        var cosoz0t:Float = multisum_xF([dot3Doz,dot3D]) / (t + vecXDmod(dot3Doz));
        // var cosox0t:Float = (
        //     dot3Dox[0] * dot3D[0] +
        //     dot3Dox[1] * dot3D[1] +
        //     dot3Dox[2] * dot3D[2]
        //     ) / (
        //         t + vecXDmod(dot3Dox)
        //     );
        // var cosoz0t:Float = (
        //     dot3Doz[0] * dot3D[0] +
        //     dot3Doz[1] * dot3D[1] +
        //     dot3Doz[2] * dot3D[2]
        //     ) / (
        //         t + vecXDmod(dot3Doz)
        //     );
        rez = [t * cosox0t, t * cosoz0t];
        return rez;
    }
    public static function dotXDscale(dotXD:Array<Float>, scaleXD:Array<Float>, dotXDc:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var sdot:Array<Float> = [for(i in 0...dotXD.length) dotXD[i] * scaleXD[i]];
        var stc:Array<Float> = [for(i in 0...dotXD.length) dotXDc[i] * scaleXD[i]];
        var vec:Array<Float> = vecXD(stc, dotXDc);
        rez = dotXDoffset(sdot,vec,vecXDmod(vec));
        return rez;
    }
    public static function vec3Drotate(vec3D:Array<Float>, vec3Daxis:Array<Float>, angle:Float, rad:Bool = false):Array<Float>{
        var rez:Array<Float> = vec3D;
        if (
            vecXDparalleled(vec3D, vec3Daxis) ||
            angle == 0
            ){ return rez;}
        angle = (rad) ? angle : radians(angle);
        var t:Array<Float> = [0,0,0];
        var vb:Array<Float> = vec3Dnormal(vec3Daxis, vec3D);
        var vc:Array<Float> = vec3Dnormal(vb, vec3Daxis);
        var t0:Array<Float> = dotXDoffset(t, vec3Daxis, vecXDmod(vec3D) * vecXDcos(vec3Daxis, vec3D));
        var t1:Array<Float> = vec3D;
        var v:Array<Float> = vecXD(t0, t1);
        t1 = dotXDoffset(t0, vb, vecXDmod(v) * Math.sin(angle));
        t1 = dotXDoffset(t1, vc, vecXDmod(v) * Math.cos(angle));
        rez = vecXD(t, t1);
        return rez;
    }
    public static function vec3Dfield_rotate_around_vec3Daxes(
        vec3Dfield:Array<Array<Float>>,
        vec3Daxes:Array<Array<Float>>,
        angles:Array<Float>,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !vecXDfieldsamesize(vec3Dfield) ||
            !vecXDfieldsamesize(vec3Daxes) ||
            vec3Dfield[0].length != 3 ||
            vec3Daxes[0].length != 3 ||
            zero_inside_F(vecXDfieldmod(vec3Dfield)) ||
            zero_inside_F(vecXDfieldmod(vec3Daxes)) ||
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
    public static function dot3Drotate(dot3D:Array<Float>, dot3Dc:Array<Float>, vec3D:Array<Float>, angle:Float, rad:Bool = false):Array<Float>{
        var rez:Array<Float> = null;
        if (vecXDmod(vec3D) == 0){ return rez; }
        rez = dot3D;
        if (
            vecXDsame(dot3D, dot3Dc) ||
            angle == 0
            ) { return rez; }
        var vdot:Array<Float> = vecXD(dot3Dc, dot3D);
        var d:Float = vecXDmod(vdot);
        vdot = vec3Drotate(vdot, vec3D, angle, rad);
        rez = dotXDoffset(dot3Dc, vdot, d);
        return rez;
    }
    public static function plane3D_dot3Dnormal(dot3D:Array<Float>, vec3D:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (vecXDmod(vec3D) == 0){ return rez; }
        var d:Float = - multisum_xF([vec3D, dot3D]);
        rez = [vec3D[0], vec3D[1], vec3D[2], d];
        return rez;
    }
    public static function plane3D_dot_vec_vec(dot3D:Array<Float>, vec3Da:Array<Float>, vec3Db:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            vecXDsame(vec3Da, vec3Db) ||
            vecXDmod(vec3Da) == 0 ||
            vecXDmod(vec3Db) == 0
        ){ return rez; }
        rez = plane3D_dot3Dnormal(dot3D, vec3Dnormal(vec3Da, vec3Db));
        return rez;
    }
    public static function plane3D_3dots(dot3D:Array<Float>, dot3Da:Array<Float>, dot3Db:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            !vecXDfieldsamesize([dot3D, dot3Da, dot3Db]) ||
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
    public static function plane3D_2dots(dot3D:Array<Float>, dot3Da:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            !vecXDsamesize(dot3D, dot3Da) ||
            vecXDsame(dot3D, dot3Da)
        ){ return rez; }
        rez = plane3D_dot3Dnormal(dot3D, vecXD(dot3D, dot3Da));
        return rez;
    }
    public static function distance_dot3D_plane3D(dot3D:Array<Float>, plane3D:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        if (vecXDmod(plane3D.slice(0,3)) == 0) { return rez; }
        rez = Math.abs(
            multisum_xF([plane3D.slice(0,3), dot3D]) + plane3D[3]
        ) / vecXDmod(plane3D.slice(0,3));
        return rez;
    }
    public static function random_vec3D_in_plane3D(plane3D:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (vecXDmod(plane3D.slice(0,3)) == 0){ return rez; }
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
    public static function random_dot3D_in_plane3D(plane3D:Array<Float>, dot3D:Array<Float>, radius:Float):Array<Float>{
        var rez:Array<Float> = null;
        if (
            plane3D.length != 4 ||
            vecXDmod(plane3D.slice(0,3)) == 0
        ){ return rez; }
        rez = dot3D;
        if (radius == 0){ return rez; }
        var vec3D:Array<Float> = random_vec3D_in_plane3D(plane3D);
        rez = dotXDoffset(dot3D, vec3D, radius * Math.random());
        return rez;
    }
    
    
    public static function curve3Dbeziercubic(dot3D1:Array<Float>, vec3D1:Array<Float>, distance1:Float, dot3D2:Array<Float>, vec3D2:Array<Float>, distance2:Float):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !vecXDfieldsamesize([dot3D1, vec3D1, dot3D2, vec3D2]) ||
            dot3D1.length != 3
        ){ return rez; }
        var r1:Array<Float> = dotXDoffset(dot3D1, vec3D1, distance1);
        var r2:Array<Float> = dotXDoffset(dot3D2, vec3D2, distance2);
        rez = [dot3D1, r1, r2, dot3D2];
        return rez;
    }
    public static function curve3Dbeziercubic_3dots(dot3D0:Array<Float>, dot3D1:Array<Float>, dot3D2:Array<Float>, lever1:Float = 0.55, lever2:Float = 0.55, a_s:Int = -1):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !vecXDfieldsamesize([dot3D0, dot3D1, dot3D2]) ||
            dot3D0.length != 3
            ){ return rez; }
        var v1:Array<Float> = vecXD(dot3D0, dot3D1);
        var v2:Array<Float> = vecXD(dot3D0, dot3D2);
        var v12:Array<Float> = vecXD(dot3D1, dot3D2);
        var t:Array<Float> = dotXDoffset(dot3D1, v12, vecXDmod(v12) / 2);
        var v:Array<Float> = vecXD(dot3D0, t);
        var r1:Array<Float> = null;
        var r2:Array<Float> = null;
        if (a_s < 0){
            if (lever1 > 0){ r1 = dotXDoffset(dot3D1, v2, vecXDmod(v2) * lever1); }
            else if (lever1 < 0){ r1 = dotXDoffset(dot3D1, v1, vecXDmod(v1) * lever1); }
            else{ r1 = dot3D1; }
            if (lever2 > 0){ r2 = dotXDoffset(dot3D2, v1, vecXDmod(v1) * lever2); }
            else if (lever2 < 0){ r2 = dotXDoffset(dot3D2, v2, vecXDmod(v2) * lever2); }
            else{ r2 = dot3D2; }
        }else if (a_s > 0){
            if (lever1 > 0){ r1 = dotXDoffset(dot3D1, v1, vecXDmod(v2) * lever1); }
            else if (lever1 < 0){ r1 = dotXDoffset(dot3D1, v2, vecXDmod(v1) * lever1); }
            else{ r1 = dot3D1; }
            if (lever2 > 0){ r2 = dotXDoffset(dot3D2, v2, vecXDmod(v1) * lever2); }
            else if (lever2 < 0){ r2 = dotXDoffset(dot3D2, v1, vecXDmod(v2) * lever2); }
            else{ r2 = dot3D2; }
        }else{
            r1 = dotXDoffset(dot3D1, v, vecXDmod(v) * lever1);
            r2 = dotXDoffset(dot3D2, v, vecXDmod(v) * lever2);
        }rez = [dot3D1, r1, r2, dot3D2];
        return rez;
    }
    public static function line3Dbeziercubic_2dots(dot3D0:Array<Float>, dot3D1:Array<Float>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            !vecXDsamesize(dot3D0, dot3D1) ||
            dot3D0.length != 3
        ){ return rez; }
        var v:Array<Float> = vecXD(dot3D0, dot3D1);
        var lv:Float = vecXDmod(v);
        var lever0:Array<Float> = dotXDoffset(dot3D0, v, lv * 1 / 3);
        var lever1:Array<Float> = dotXDoffset(dot3D0, v, lv * 2 / 3);
        rez = [dot3D0, lever0, lever1, dot3D1];
        return rez;
    }
    public static function line3Dbeziercubic(dot3D:Array<Float>, vec3D:Array<Float>, distance:Float):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if(
            distance == 0 ||
            !vecXDsamesize(dot3D, vec3D) ||
            dot3D.length != 3 ||
            vecXDmod(vec3D) == 0
        ){ return rez; }
        rez = line3Dbeziercubic_2dots(dot3D, dotXDoffset(dot3D, vec3D, distance));
        return rez;
    }
    public static function beziercubic3D_4to12(curve:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if (
            curve.length == 4 &&
            curve[0].length == 3 &&
            vecXDfieldsamesize(curve)
        ){
            rez = [for (i in 0...4) for (ai in 0...3) curve[i][ai]];
        }return rez;
    }
    public static function beziercubic3D_12to4(curve:Array<Float>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (curve.length == 12){
            rez = [for (i in [0,3,6,9]) [ for (ai in 0...3) curve[ai+i]]];
        }return rez;
    }
    public static function beziercubic3D_derivativeparameters(curve:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var cl:Int = curve.length;
        if ( cl == 4 && curve[0].length == 3 && vecXDfieldsamesize(curve)){
            rez = [for (i in 0...3) [for (p in 0...4) curve[p][i]]];
        }return rez;
    }
    public static function beziercubic_derivative(bcp:Array<Float>, p:Float):Null<Float>{
        var rez:Null<Float> = null;
        if (bcp.length == 4){
            rez = 3 * (1 - p) * (1 - p) * (bcp[1] - bcp[0]) +
            6 * (1 - p) * p * (bcp[2] - bcp[1]) +
            3 * p * p * (bcp[3] - bcp[2]);
        }return rez;
    }
    public static function beziercubic3D_derivative(curve:Array<Array<Float>>, p:Float):Array<Float>{
        var rez:Array<Float> = null;
        if (
            curve.length == 4 &&
            curve[0].length == 3 &&
            vecXDfieldsamesize(curve)
        ){
            rez = [for (i in beziercubic3D_derivativeparameters(curve)) beziercubic_derivative(i, p)];
        }return rez;
    }
    public static function beziercubic_support_dot_one(beziercubic_one_axis_coordinates:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var c:Array<Float> = beziercubic_one_axis_coordinates;
        if (c.length != 4){ return rez;}
        return (-5 * c[0] + 18 * c[1] - 9 * c[2] + 2 * c[3]) / 6;
    }
    public static function beziercubic3D_support_dot_one(curve3D_4dots:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        var c:Array<Array<Float>> = curve3D_4dots;
        if (c.length != 4 || !vecXDfieldsamesize(c)){ return rez; }
        rez = [for (i in beziercubic3D_derivativeparameters(c)) beziercubic_support_dot_one(i)];
        return rez;
    }
    public static function beziercubic_support_dot_two(beziercubic_one_axis_coordinates:Array<Float>):Null<Float>{
        var rez:Null<Float> = null;
        var c:Array<Float> = beziercubic_one_axis_coordinates;
        if (c.length != 4){ return rez;}
        return (2 * c[0] - 9 * c[1] + 18 * c[2] - 5 * c[3]) / 6;
    }
    public static function beziercubic3D_support_dot_two(curve3D_4dots:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        var c:Array<Array<Float>> = curve3D_4dots;
        if (c.length != 4 || !vecXDfieldsamesize(c)){ return rez; }
        rez = [for (i in beziercubic3D_derivativeparameters(c)) beziercubic_support_dot_two(i)];
        return rez;
    }
    public static function beziercubic3D_follow_4dots_trajectory(dots:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (dots.length != 4 || !vecXDfieldsamesize(dots)){ return rez; }
        var dot_one:Array<Float> = beziercubic3D_support_dot_one(dots);
        var dot_two:Array<Float> = beziercubic3D_support_dot_two(dots);
        rez = [dots[0], dot_one, dot_two, dots[3]];
        return rez;
    }
    public static function beziercubic_coordinate(beziercubic_one_axis_coordinates:Array<Float>, parameter:Float):Null<Float>{
        var rez:Null<Float> = null;
        var c:Array<Float> = beziercubic_one_axis_coordinates;
        var p:Float = parameter;
        if (c.length != 4){ return rez; }
        rez = (1 - p) * (1 - p) * (1 - p) * c[0] +
            3 * (1 - p) * (1 - p) * p * c[1] +
            3 * (1 - p) * p * p * c[2] +
            p * p * p * c[3];
        return rez;
    }
    public static function beziercubic3Ddot(beziercubic3D:Array<Array<Float>>, parameter:Float):Array<Float>{
        var rez:Array<Float> = null;
        var c:Array<Array<Float>> = beziercubic3D;
        var p:Float = parameter;
        if (c.length != 4 || c[0].length != 3 || !vecXDfieldsamesize(c)){ return rez; }
        rez = [for (i in beziercubic3D_derivativeparameters(c)) beziercubic_coordinate(i, p)];
        return rez;
    }
    public static function curve3D_4dots_follow_beziercubic_trajectory(beziercubic3D:Array<Array<Float>>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var c:Array<Array<Float>> = beziercubic3D;
        if (c.length != 4 || !vecXDfieldsamesize(c)){ return rez; }
        c[1] = beziercubic3Ddot(c, 1 / 3);
        c[2] = beziercubic3Ddot(c, 2 / 3);
        return c;
    }
    public static function curve3Doffset(
        curve3D:Array<Array<Float>>,
        vec3D:Array<Float>,
        distance:Float
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            curve3D.length != 4 ||
            curve3D[0].length != 3 ||
            !vecXDfieldsamesize(curve3D) ||
            vec3D.length != 3
        ){ return rez; }
        return [for (i in curve3D) dotXDoffset(i, vec3D, distance)];
    }
    public static function curve3Drotate(
        curve3D:Array<Array<Float>>,
        dot3D:Array<Float>,
        vec3D:Array<Float>,
        angle:Float,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            curve3D.length != 4 ||
            curve3D[0].length != 3 ||
            !vecXDfieldsamesize(curve3D) ||
            dot3D.length != 3 ||
            vec3D.length != 3 ||
            vecXDmod(vec3D) == 0
        ){ return rez; }
        if (angle == 0){return curve3D;}
        return [for (i in curve3D) dot3Drotate(i, dot3D, vec3D, angle, rad)];
    }
    public static function curve3Dscale(
        curve3D:Array<Array<Float>>,
        scale_xyz:Array<Float>,
        dot3D:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            curve3D.length != 4 ||
            curve3D[0].length != 3 ||
            !vecXDfieldsamesize(curve3D) ||
            dot3D.length != 3 ||
            scale_xyz.length != 3
        ){ return rez; }
        if (vecXDmod(scale_xyz) == 0){return [for (i in 0...4) [0,0,0]];}
        return [for (i in curve3D) dotXDscale(i, scale_xyz, dot3D)];
    }
    
    
    //ellipse section
    public static function ellipse2Dperimeter_ramanujan(
        semiaxis_a:Float,
        semiaxis_b:Float
    ):Null<Float>{
        var rez:Null<Float> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        if (a < 0 || b < 0){ return rez; }
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
        return rez;
    }
    public static function tangent_centered_ellipse2Ddot(
        semiaxis_a:Float,
        semiaxis_b:Float,
        ellipse_dot2D:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        var x0:Float = ellipse_dot2D[0];
        var y0:Float = ellipse_dot2D[1];
        
        var x:Float;
        var y:Float;
        var v:Array<Array<Float>> = null;
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
        }return v;
    }
    public static function ellipse_e_parameter(
        semiaxis_a:Float,
        semiaxis_b:Float
    ):Null<Float>{
        var rez:Null<Float> = null;
        var a:Float = semiaxis_a;
        var b:Float = semiaxis_b;
        if (
            a < 0 ||
            b < 0 ||
            a <= 0 && b <= 0
        ){ return rez; }
        rez = (a >= b) ? Math.sqrt(1 - b * b / (a * a)) : -Math.sqrt(1 - a * a / (b * b)) ;
        return rez;
    }
    public static function ellipse_c_parameter(
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
    public static function tangent_vec3D_in_plane_of_ellipse2D_placed_in_3Dspace(
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
        return rez;
    }
    public static function ellipse3D_dots(dot3D:Array<Float>, vec3Dsemiaxes:Array<Array<Float>>, semiaxes:Array<Float>):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if(
            dot3D.length != 3 ||
            vec3Dsemiaxes.length != 4 ||
            !vecXDfieldsamesize(vec3Dsemiaxes) ||
            semiaxes.length != 4
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
    public static function ellipse2Ddot(angle:Float, semiaxis_a_ox:Float, semiaxis_b_oy:Float, rad:Bool = false):Array<Float>{
        var u:Float = angle;
        var a:Float = semiaxis_a_ox;
        var b:Float = semiaxis_b_oy;
        if (!rad){ a = radians(a); }
        return [a * Math.cos(u), b * Math.sin(u)];
    }
    public static function curve2D_4dots_elliptic_shape_restricted_to_quarter(
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
        rez = [for (a in [a0, a0 + du / 3, a0 + du * 2 / 3, a0 + du]) ellipse2Ddot(a, ae, be, rad)];
        return rez;
    }
    public static function beziercubic3D_elliptic_shape_restricted_to_quarter(
        dot3Dc:Array<Float>,
        vec3D_a_ox:Array<Float>,
        vec3D_b_ox:Array<Float>,
        semiaxis_a_ox:Float,
        semiaxis_b_oy:Float,
        angle0:Float,
        angle1:Float,
        rad:Bool = false
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        var tc:Array<Float> = dot3Dc;
        var va:Array<Float> = vec3D_a_ox;
        var vb:Array<Float> = vec3D_b_ox;
        var a:Float = semiaxis_a_ox;
        var b:Float = semiaxis_b_oy;
        var dxdy:Array<Array<Float>> = curve2D_4dots_elliptic_shape_restricted_to_quarter(angle0, angle1, a, b, rad);
        rez = [for (i in dxdy) dotXDoffset(dotXDoffset(tc, va, i[0]), vb, i[1])];
        rez = beziercubic3D_follow_4dots_trajectory(rez);
        return rez;
    }
    public static function angle_required_to_place_curve_on_ellipse(
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
                le += vecXDmod(vecXD(xy0, xy));
                if (le >= cl){ return (rad) ? radians(ue) : ue; }
                xy0 = xy;
            }rez = (rad) ? radians(360) : 360;
        }return rez;
    }
    public static function polygon3D_inside_ellipse(
        dot3D:Array<Float>,
        vec3Dsemiaxes:Array<Array<Float>>,
        semiaxes:Array<Float>,
        angle_proportions:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if(
            dot3D.length != 3 ||
            vec3Dsemiaxes.length != 4 ||
            !vecXDfieldsamesize(vec3Dsemiaxes) ||
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
        var u:Float = 0;
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
        for (i in doli){
            axis_a = va; dlina_a = a; axis_b = vb; dlina_b = b;
            u += i * x;
            if (u > 90 && u <= 270){ axis_a = vad; dlina_a = ad; }
            if (u > 180){ axis_b = vbd; dlina_b = bd;}
            v = axis_a; d = dlina_a * Math.abs(Math.cos(radians(u)));
            vv = axis_b; dd = dlina_b * Math.abs(Math.sin(radians(u)));
            rez.push(dotXDoffset(dotXDoffset(t0, v, d), vv, dd));
        }return rez;
    }
    public static function polygon3D_vec3Dfield_distance(
        dot3D:Array<Float>,
        vec3Dfield:Array<Array<Float>>,
        distances:Array<Float>
    ):Array<Array<Float>>{
        var rez:Array<Array<Float>> = null;
        if (
            dot3D.length != 3 ||
            !vecXDfieldsamesize(vec3Dfield) ||
            vec3Dfield.length != distances.length ||
            vec3Dfield[0].length != 3
        ){ return rez; }
        rez = [dot3D];
        for (i in 0...vec3Dfield.length){
            rez.push(dotXDoffset(dot3D, vec3Dfield[i], distances[i]));
        }return rez;
    }
    public static function polygon3D_in_plane(
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
            vecXDparalleled(va, vn)
        ){ return rez; }
        var x:Float = 360 / sum_F(ap);
        va = projection_vec3D_on_plane3D(va, [vn[0], vn[1], vn[2], 0]);
        rez = [t];
        for (i in 0...d.length){
            rez.push( dotXDoffset( t, vec3Drotate(va, vn, x * ap[i]), distances[i] ) );
        }return rez;
    }
    public static function polygon3D_to_vec3Dfield(
        polygon3D:Array<Array<Float>>
    ):Array<Array<Float>>{
        return [for (i in 1...polygon3D.length) vecXD(polygon3D[0], polygon3D[i])];
    }
    
    public static function projection_vec3D_on_plane3D(vec3D:Array<Float>, plane3D:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        if (vec3D.length != 3 || plane3D.length != 4){
            return rez;
        }
        var vp:Array<Float> = [for (i in 0...3) plane3D[i]];
        if(
            vecXDparalleled(vec3D, vp) ||
            vecXDmod(vec3D) == 0 ||
            vecXDmod(vp) == 0
            ){ return rez; }
        rez = vec3D;
        var t0:Array<Float> = [0,0,0];
        var t1:Array<Float> = dotXDoffset(t0, vec3D, 1);
        t1 = projection_dot3D_on_plane3D(t1, plane3D);
        rez = vecXD(t0, t1);
        return rez;
    }
    public static function angle_vec3Dvec3D_projection_on_plane3D(vec3D1:Array<Float>, vec3D2:Array<Float>, plane3D:Array<Float>, rad:Bool = false):Null<Float>{
        var rez:Null<Float> = null;
        var v1:Array<Float> = vec3D1;
        var v2:Array<Float> = vec3D2;
        var v1l:Int = v1.length;
        var v2l:Int = v2.length;
        var v1mod:Float = vecXDmod(v1);
        var v2mod:Float = vecXDmod(v2);
        if ( v1l != 3 || v2l != 3 || v1mod == 0 || v2mod == 0){ return rez; }
        var p:Array<Float> = plane3D;
        if (p.length < 3){ return rez; }
        var vn:Array<Float> = [for (i in 0...3) p[i]];
        if ( vecXDmod(vn) == 0 ){ return rez; }
        rez = 0;
        if (vecXDparalleled_sameside(v1, v2)){ return rez;}
        var pv1:Array<Float> = projection_vec3D_on_plane3D(v1, vn);
        var pv2:Array<Float> = projection_vec3D_on_plane3D(v2, vn);
        var pvn:Array<Float> = (vecXDparalleled(pv1, pv2)) ? vn : vec3Dnormal(pv1, pv2);
        var uvnpvn:Float = vecXDangle(vn, pvn, rad);
        var uvv:Float = vecXDangle(v1, v2, rad);
        var uznak:Float = (rad) ? radians(90) : 90;
        rez = (uvnpvn > uznak) ? -uvv : uvv;
        return rez;
    }
    
    
    
    // ugol_vector_vector_znak -> angle_vec3Dvec3D_projection_on_plane3D
}
