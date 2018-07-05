/**create BABYLON.Vector3 from list [number,number,number] */
function vec_maker(vec){ var vec3 = new BABYLON.Vector3(vec[0],vec[1],vec[2]); return vec3; }

/**create BABYLON.Curve3.CreateCubicBezier() from x4 BABYLON.Vector3 list [vec,vec,vec,vec] */
function bez_maker_from_vectors(arc,mass=4){ var bez = BABYLON.Curve3.CreateCubicBezier(arc[0],arc[1],arc[2],arc[3],mass); return bez; }

/**create BABYLON.Curve3.CreateCubicBezier() from x4 3D dots list [dot,dot,dot,dot]. Each dot = [x,y,z] = [number,number,number].
 * Use later .getPoints() to take data for generate geometry trajectory etc.
 * - arc - [[x,y,z],[x,y,z],[x,y,z],[x,y,z]] - bezier curve support points [dot1, lever1, lever2, dot2]
 * - mass - number of result bezier curve dots
 */
function bez_maker(arc,mass=4){ var bez = BABYLON.Curve3.CreateCubicBezier(vec_maker(arc[0]),vec_maker(arc[1]),vec_maker(arc[2]),vec_maker(arc[3]),mass); return bez; }

/**create array of BABYLON.Curve3.CreateCubicBezier() uses array of arcs. Each arc is array of 4 dots [x,y,z] 
 * - mass - number of result dots of each bezier curve
*/
function bez_array_maker(arrarc, mass=4){
    var rez=[];
    for(var i=0;i<arrarc.length;i++){
        var arc = arrarc[i];
        // console.log("i=",JSON.stringify( i),JSON.stringify(arc));
        rez.push( bez_maker(arc,mass) );
    }
    return rez;
}

/**create array of BABYLON.Curve3.CreateCubicBezier().getPoints() uses array of arcs. Each arc is array of 4 dots [x,y,z]
 * - mass - number of result dots of each bezier curve
*/
function bez_array_getPoints_maker(arrarc,mass=4){ var rez=[]; for(var i=0;i<arrarc.length;i++){ rez.push( bez_maker(arrarc[i],mass).getPoints() ); } return rez; }

/**just make array uses .getPoints() command for each BABYLON.Curve3.CreateCubicBezier() curve from bez_array */
function bez_array_getPoints(bez_array){ var rez=[]; for(var i=0;i<bez_array.length;i++){ rez.push( bez_array[i].getPoints() ); } return rez; }

/**create mono BABYLON bezier from array of BABYLON.Curve3.CreateCubicBezier() curves */
function bez_array_to_one_bez(bez_array){
    var rez_bez = bez_array[0];
    for (var i = 1;i < bez_array.length;i++){ rez_bez = rez_bez.continue(bez_array[i]); }
    return rez_bez;
}

/**create bezier trajectory close to ring shape uses contiues BABYLON.Curve3.CreateCubicBezier() syntax, than return bez.getPoints()
 * - dot - center dot = [x,y,z] = [number,number,number]
 * - vn - normal vector of trajectory plane = [a,b,c] = [number,number,number]
 * - va - radial vector for first dot of trajectory = [a,b,c] = [number,number,number]
 * - r - trajectory radius
 * - mass - BABYLON.Curve3.CreateCubicBezier() parameter which determine number of result dots for bezier curve
 */
function ring_trajectory(dot,vn,va,r,mass=4){
	//vn=ox at this moment va = -oz
	var vb = geo.vec3Drotate(va,vn,90);
	var vad = geo.vecXDback(va);
	var vbd = geo.vecXDback(vb);
	var ta = geo.dotXDoffset(dot,va,r);
	var tb = geo.dotXDoffset(dot,vb,r);
	var tad = geo.dotXDoffset(dot,vad,r);
	var tbd = geo.dotXDoffset(dot,vbd,r);
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	
	var ac1 = geo.curve3D_3dots(dot,ta,tb);
	var ac2 = geo.curve3D_3dots(dot,tb,tad);
	var ac3 = geo.curve3D_3dots(dot,tad,tbd);
	var ac4 = geo.curve3D_3dots(dot,tbd,ta);
	
	//bezier curves from dots array
	var arc1 = bez_maker(ac1,mass);
	var arc2 = bez_maker(ac2,mass);
	var arc3 = bez_maker(ac3,mass);
	var arc4 = bez_maker(ac4,mass);
	
	var arc14 = arc1.continue(arc2.continue(arc3.continue(arc4)));
	// var arc14mesh = BABYLON.Mesh.CreateLines("cbezier1", arc14.getPoints(), scene); arc14mesh.color = new BABYLON.Color3(1, 0.6, 0);
	return arc14.getPoints();
}

/**create array of bezier arcs from rotation of copy of `arc` around vector `vr` from dot `cdot` with angle step 360 / `mass`.
 * That later convert to BABYLON.Curve3.CreateCubicBezier() array, use bez_array_maker(result_of_this_function).
 * - arc - rotated bezier arc = [dot,dot,dot,dot], where dot = [x,y,z]
 * - cdot - rotation center dot [x,y,z] = [number,number,number]
 * - vr - rotation vector [a,b,c] = [number,number,number]
 * - mass - integer number, how many copies will be around `vr` with permanent angle step rotation
 * - close_karkas - if `true` then first element of result array will be duplicated at the end of result array
 */
function bezier_rotated_karkas_maker(arc,cdot,vr,mass,close_karkas=true){
    var rez = [];
    var steps = Math.ceil(mass);
    var step = 360 / steps;
    for (var i=0;i<steps;i++) { rez.push( geo.curve3Drotate(arc,cdot,vr,-step * i) ); } //need - u or internal material
    if (close_karkas) { rez.push(rez[0]); }
    return rez;
}

function createRibbon(mesh, pathArray, close) {
    var positions = [];
    var indices = [];
    var normals = [];
    var lg = [];        // array of path lengths : nb of vertex per path
    var idx = [];       // array of path indexes : index of each path (first vertex) in positions array
  
    // traiter ici le cas un seul path avec le offset
  
    // positions
    var idc = 0;
    for(var p = 0; p < pathArray.length; p++) {
      var path = pathArray[p];
      var l = path.length;
      lg[p] = l;
      idx[p] = idc;
      var j = 0;
      while (j < l) {
        positions.push(path[j].x, path[j].y, path[j].z);
        j++;
      }
      idc += l;
    }
  
    // indices
    var p = 0;                    // path index
    var i = 0;                    // positions array index
    var l1 = lg[p] - 1;           // path1 length
    var l2 = lg[p+1] - 1;         // path2 length
    var min = ( l1 < l2 ) ? l1 : l2 ;   // index d'arrêt de i dans le path en cours
    while ( i <= min && p < lg.length -1 ) { // on reste sur le min des deux paths et on ne va pas au delà de l'avant-dernier
      var shft = idx[p+1] - idx[p];          // shift 
        // draw two triangles between path1 (p1) and path2 (p2) : (p1.i, p2.i, p1.i+1) and (p2.i+1, p1.i+1, p2.i) clockwise
        indices.push(i, i+shft, i+1);
        indices.push(i+shft+1, i+1, i+shft);  
      i += 1;
      if ( i == min  ) {                      // dès qu'on atteint la fin d'un des deux paths consécutifs, on passe au suivant s'il existe
        if (close) {                          // if close, add last triangles between start and end of the paths
          indices.push(i, i+shft, idx[p]);
          indices.push(idx[p]+shft, idx[p], i+shft);
        }
        p++;
        l1 = lg[p] - 1;
        l2 = lg[p+1] - 1;
        i = idx[p];
        min = ( l1 < l2 ) ? l1 + i : l2 + i;
      }
    }  
  
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
  
    mesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, false);
    mesh.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals, false);
    mesh.setIndices(indices);
}

function showPathArray(apath){
    for (var i=0;i<apath.length;i++){ showPath(apath[i]); }
}
function showPath(path) {
    var line = BABYLON.Mesh.CreateLines("line", path, scene )
};