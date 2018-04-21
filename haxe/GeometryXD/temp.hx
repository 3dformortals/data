/**
 Copyright (c) 2018 llll
**/
package geometryxd;
/**
  GeometryXD - multidimensional geometry manipulations. Primarily targeted for 3D objects (points, vectors, curves). Not pro level library.
**/
class GeometryXD{
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
    public static function dot3D_to_dot2Dviewplane(
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
}