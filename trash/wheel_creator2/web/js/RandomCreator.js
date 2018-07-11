function random_num(min=0,max=1){
    return Math.random()*(max - min)+min ;
}
function random_int(min=0,max=1){
    return Math.round(random_num(min,max));
}

function random_metal(){
    var id = [
        "w3","w4","w5",
        "h4","h5","h6","h7","h8",
        "s3","s4"
    ];
    var mm = [
        [1,500],[1,100],[1,500],
        [10,150],[10,150],[10,150],[10,150],[10,150],
        [0,100],[0,100]
    ];
    var rs = [];
    for (var i = 0;i < id.length;i++){ rs.push(random_int(mm[i][0],mm[i][1])); }
    for (var i = 0;i < id.length;i++){ id_value(id[i],rs[i]); }
}
function random_tire(){
    var id = [
        "w2",
        "h2","h3",
        "s1","s2"
    ];
    var mm = [
        [1,700],
        [1,100],[100,1700],
        [1,1400],[0,100]
    ];
    var rs = [];
    for (var i = 0;i < id.length;i++){ rs.push(random_int(mm[i][0],mm[i][1])); }
    for (var i = 0;i < id.length;i++){ id_value(id[i],rs[i]); }
}
function random_bolts(){
    var id = [
        "b1","b2","b3","b4"
    ];
    var mm = [
        [10,100],[50,150],[1,12],[0,8]
    ];
    var rs = [];
    for (var i = 0;i < id.length;i++){ rs.push(random_int(mm[i][0],mm[i][1])); }
    for (var i = 0;i < id.length;i++){ id_value(id[i],rs[i]); }
}
function random_grips(){
    var id = [
        "w1","h1","s5","s6","s7"
    ];
    var mm = [
        [1,700],[1,100],[-8,-1],[12,60],[10,90]
    ];
    var rs = [];
    for (var i = 0;i < id.length;i++){ rs.push(random_int(mm[i][0],mm[i][1])); }
    for (var i = 0;i < id.length;i++){ id_value(id[i],rs[i]); }
}


function random_creator(parts){
    if (parts[0] > 0){ random_metal(); }
    if (parts[1] > 0){ random_tire(); }
    if (parts[2] > 0){ random_bolts(); }
    if (parts[3] > 0){ random_grips(); }
    wheel_creator();
}