package;

class GeometryXD{
    public static function main(){trace("GeometryXD");}
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
        var rez:Array<Float>=[];
        if (vecXDa.length == vecXDb.length){
            var lv:Int = vecXDa.length;
            for (i in 0...lv){
                rez.push(vecXDa[i] + vecXDb[i]);
            }
        }return rez;
    }
    public static function vecXDfieldsum(vecXDfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = [];
        var lv:Int = vecXDfield[0].length;
        for (i in 1...vecXDfield.length){
            if (vecXDfield[i].length != lv) {return rez;}
        }rez = vecXDfield[0];
        for (i in 1...vecXDfield.length) {rez = vecXDsum(rez, vecXDfield[i]);}
        return rez;
    }
    public static function vecXDdiff(vecXDa:Array<Float>, vecXDb:Array<Float>):Array<Float>{
        var rez:Array<Float>=[];
        if (vecXDa.length == vecXDb.length){
            var lv:Int = vecXDa.length;
            for (i in 0...lv){
                rez.push(vecXDa[i] - vecXDb[i]);
            }
        }return rez;
    }
    public static function vecXDfielddiff(vecXDfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = [];
        var lv:Int = vecXDfield[0].length;
        for (i in 1...vecXDfield.length){
            if (vecXDfield[i].length != lv) {return rez;}
        }rez = vecXDfield[0];
        for (i in 1...vecXDfield.length) {rez = vecXDdiff(rez, vecXDfield[i]);}
        return rez;
    }
    public static function vecXDback(vecXD:Array<Float>):Array<Float>{
        return [for (i in 0...vecXD.length) vecXD[i] * -1];
    }
    // next def vector_minus_vector надо проверить может нельзя
}
