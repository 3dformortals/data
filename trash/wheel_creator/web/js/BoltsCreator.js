function bolt7_shape(){}
function bolt6_shape(){}
function bolt5_shape(){}
function bolt4_shape(){}
function bolt3_shape(){}
function bolt2_shape(){}
function bolt1_shape(){}
function bolt0_shape(){
    //just need halfsphere
}
function bolt_shape( h,w,s,b ){
    var bolt = b[4];
    var shape;
    if(bolt == 1){ shape = bolt1_shape(vn,va,u,b1,b2); }
    else if(bolt == 2){ shape = bolt2_shape(vn,va,u,b1,b2); }
    else if(bolt == 3){ shape = bolt3_shape(vn,va,u,b1,b2); }
    else if(bolt == 4){ shape = bolt4_shape(vn,va,u,b1,b2); }
    else if(bolt == 5){ shape = bolt5_shape(vn,va,u,b1,b2); }
    else if(bolt == 6){ shape = bolt6_shape(vn,va,u,b1,b2); }
    else if(bolt == 7){ shape = bolt7_shape(vn,va,u,b1,b2); }
    return shape;
}
function bolts_shape_for_extrusion(){
    
}
function bolts_maker(h,w,s,b,hull=false){
	
}