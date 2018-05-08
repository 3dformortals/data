function column_internal(dc,nc,distance){
    distance -= dc;
    var xmax = distance / 2;
    var xmin = -xmax;
    var n = nc-1;
    var rez;
    if (n<2)
    return
}
function grip_angles_counter(s6){
    rez = [];
    var step = 360/s6;
    for (var i = 0;i < s6;i++){ rez.push(i*step); }
    return rez;
}
function grips_maker(h,w,s,g,hull=false){
    var c = [0,0,0]; // center dot
    var vn = [1, 0, 0]; // normal vector
    var va = [0, 1, 0]; // vertical direction vector for 2D shape of grip
    var vz = [0, 0, 1]; // vector for extrude grip shape
    var grips_type = g; // "g1"..."g4"
    var grips_heigh = h[1];
    var grips_width = w[1];
    var grips_center_radius = geo.sum_F([h[8],h[7],h[6],h[5],h[4],h[3],h[2]]);
    var grips_width_number = s[5];//how much per width
    var grips_around_number = s[6];//how much around
    var grip_angles = grip_angles_counter(s[6]);// may be need minus case for back direction etc
    var grips_center_dots_counter(
        c,vn,vz,
        grips_center_radius
    );
    var grip_shapes;
    var grip_paths;
    if (grip_angles){
        var bsdots = grips_sheme_dots_counter(
            c, vn, vz,
            grip_angles.length,
            grips_center_radius,
            grips_width_distance
        );
        grip_shapes = grip_shapes_for_extrusion(grip_angles, h,w,s,b);
        grip_paths = grip_paths_for_extrusion(bsdots,grip_angles,c,vn,va, h,w,s,b);
        
    }
    if (!grip_shapes){
        for (i=0;i<grip_paths.length;i++){
            grips.push(grip0_maker(grip_paths[i],b));
            
        }
    }else{
        for (i=0;i<grip_paths.length;i++){
            grips.push(grip16_maker(grip_paths[i],grip_shapes[i]));
        }
    }return grips;
}