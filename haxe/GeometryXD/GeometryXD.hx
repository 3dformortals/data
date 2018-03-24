package;

class GeometryXD{
    public static function main(){trace("GeometryXD");}
    
    public static function sum_I(a:Array<Int>):Int{
        var rez:Int = 0;
        for (i in 0...a.length){ rez += i;}
        return rez;
    }
    public static function sum_F(a:Array<Float>):Float{
        var rez:Float = 0;
        for (i in 0...a.length){ rez += i;}
        return rez;
    }
    public static function diff_I(a:Array<Int>):Int{
        var rez:Int = a[0];
        for (i in 1...a.length){ rez -= i;}
        return rez;
    }
    public static function diff_F(a:Array<Float>):Float{
        var rez:Float = a[0];
        for (i in 1...a.length){ rez -= i;}
        return rez;
    }
    public static function middle_F(a:Array<Float>):Float{
        return sum_F(a) / a.length;
    }
    public static function multiply_FperF(a:Array<Float>, n:Float):Array<Float>{
        return [for (i in 0...a.length) a[i] * n];
    }
    public static function multiply_I(a:Array<Int>):Int{
        var rez:Int = a[0];
        for (i in 1...a.length){ rez *= i;}
        return rez;
    }
    public static function multiply_F(a:Array<Float>):Float{
        var rez:Float = a[0];
        for (i in 1...a.length){ rez *= i;}
        return rez;
    }
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
    public static function degrees(radians:Float):Float { return radians * 180 / Math.PI; }
    public static function radians(degrees:Float):Float { return degrees / 180 * Math.PI; }
    public static function angle_quadrant(angle:Float, radians:Bool = false):Int {
        var k:Int=4; // 0 case
        if (radians){angle=degrees(angle);}
        var x:Float=angle%360;
        k=(x>0)?1:(x>90)?2:(x>180)?3:(x>270)?4:(x<0)?4:(x<=-90)?3:(x<=-180)?2:(x<=-270)?1:4;
        return k;
    }
    
    
    
    public static function vecXDmod(vecXD:Array<Float>):Float{
        var sum:Float = 0;
        for (i in vecXD){sum += i*i;}
        return Math.sqrt(sum);
    }
    public static function maxabs(vecXD:Array<Float>):Float{
        var rez:Float = 0;
        for (i in vecXD){if (Math.abs(i) > Math.abs(rez)){rez = i;}}
        return rez;
    }
    public static function vecXD(dotdot:Array<Float>):Array<Float>{
        var vecXD:Array<Float> = [];
        for (i in 0...Std.int(dotdot.length / 2)){
            vecXD.push( dotdot[i + Std.int(dotdot.length / 2)] - dotdot[i] );
        }
        return vecXD;
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
        for (i in 1...dots.length){
            rez.push(vecXD(dots[0].concat(dots[i])));
        }
        return rez;
    }
    public static function vecXDcompare(vecXDa:Array<Float>,vecXDb:Array<Float>):Bool{
        if (vecXDa.length == vecXDb.length){
            var lv:Int = vecXDa.length;
            for (i in 0...lv){
                if (vecXDa[i] != vecXDb[i]) {return false;}
            }return true;
        }return false;
    }
    public static function vecXDrandom(x:Int = 3):Array<Float>{
        var v0:Array<Float> = [for (i in 0...x) 0];
        var v1:Array<Float> = [for (i in 0...x) 0];
        while(vecXDcompare(v0,v1)){
            v1 = [];
            for (i in 0...x){v1.push(Math.random()-0.5);}
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
    public static function vecXDscalar(vecXDa:Array<Float>, vecXDb:Array<Float>):Float{
        var rez:Float = null;
        if (vecXDa.length == vecXDb.length){
            rez = 0;
            for (i in 0...vecXDa.length) {rez += vecXDa[i] * vecXDb[i];}
        }return rez;
    }
    public static function vecXDcos(vecXDa:Array<Float>, vecXDb:Array<Float>):Float{
        var rez:Float = null;
        var la:Float = vecXDmod(vecXDa);
        var lb:Float = vecXDmod(vecXDb);
        if (la > 0 && lb > 0){
            rez = sin_cos_cut( vecXDscalar(vecXDa,vecXDb) / (la * lb) );
        }return rez;
    }
    public static function vecXDangle(vecXDa:Array<Float>, vecXDb:Array<Float>, radians = false):Float{
        var rez:Float = null;
        var la:Float = vecXDmod(vecXDa);
        var lb:Float = vecXDmod(vecXDb);
        if (la > 0 && lb > 0){
            rez = (radians) ? Math.acos(vecXDcos(vecXDa,vecXDb)):degrees(Math.acos(vecXDcos(vecXDa,vecXDb)));
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
    public static function vecXDmiddle(vecXDa:Array<Float>, vecXDb:Array<Float>){
        return middle_xF([vecXDa, vecXDb]);
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
    public static function dot3Dline_x_plane(dot3D0:Array<Float>, vec3D0:Array<Float>, vec3Dplane:Array<Float>, dplane:Float = 0):Array<Float>{
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
    public static function dot3Dprojection_on_plane(dot3D:Array<Float>, vec3Dplane:Array<Float>, dplane:Float):Array<Float>{
        var rez:Array<Float> = null;
        var ldot:Int = dot3D.length;
        var lplane:Int = vec3Dplane.length;
        if (ldot == 3 && ldot == lplane){
            var checkup:Float = - (
                vec3Dplane[0] * dot3D[0] +
                vec3Dplane[1] * dot3D[1] +
                vec3Dplane[2] * dot3D[2] +
                dplane
            );
            var checkdn:Float = (
                vec3Dplane[0] * vec3Dplane[0] +
                vec3Dplane[1] * vec3Dplane[1] +
                vec3Dplane[2] * vec3Dplane[2]
            );
            if (checkdn == 0){return rez;}
            else if (checkup == 0){return dot3D;}
            else {
                var t:Float = checkup / checkdn;
                rez = [for (i in 0...3) dot3D[i] + vec3Dplane[i] * t];
            }
        }return rez;
    }
    public static function dot3D_to_dot2Dviewplane(dot3D:Array<Float>, dot3Dox:Array<Float>, dot3Doz:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var t:Float = vecXDmod(dot3D);
        var cosox0t:Float = sum_F(multiply_xF([dot3Dox,dot3D])) / (t + vecXDmod(dot3Dox));
        var cosoz0t:Float = sum_F(multiply_xF([dot3Doz,dot3D])) / (t + vecXDmod(dot3Doz));
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
        var vec:Array<Float> = vecXD(stc.concat(dotXDc));
        rez = dotXDoffset(sdot,vec,vecXDmod(vec));
        return rez;
    }
    
    // next recount_xyz_to_xy надо проверить может нельзя
}
