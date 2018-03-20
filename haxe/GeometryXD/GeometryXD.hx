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
        return [for (i in 0...vecXD.length) -vecXD[i]];
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
        var rez:Array<Float> = null;
        var lv:Int = vecXDa.length;
        if (lv == vecXDb.length){
            rez = [for (i in 0...lv) (vecXDa[i]+vecXDb[i])/2];
        }return rez;
    }
    public static function vecXDfieldsamesize(vecXDfield:Array<Array<Float>>):Bool{
        var thesize:Int = vecXDfield[0].length;
        for (i in 1...vecXDfield.length){
            if (thesize != vecXDfield[i].length) {return false;}
        }return true;
    }
    public static function vecXDfieldmiddle(vecXDfield:Array<Array<Float>>):Array<Float>{
        var rez:Array<Float> = null;
        if (vecXDfieldsamesize(vecXDfield)){
            rez = vecXDfieldsum(vecXDfield);
            rez = [for (i in 0...rez.length) rez[i] / vecXDfield.length];
        }return rez;
    }
    public static function dotXDoffset(dotXD:Array<Float>, vecXD:Array<Float>, t:Float):Array<Float>{
        var rez:Array<Float> = null;
        if (t != 0){
            var lv:Float = vecXD.length;
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
        rez:Array<Float> = null;
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
        rez:Array<Float> = null;
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
                rez = [for (i in 0...3) dot3D[i] + vec3D[i] * t];
            }
        }return rez;
    }
    
    // next recount_xyz_to_xy надо проверить может нельзя
}
