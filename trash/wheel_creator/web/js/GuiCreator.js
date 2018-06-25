showme("preparing GuiCreator.js");
function ok_gui_creator(){
    var box = document.getElementById('div_ok');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var b_ok = document.createElement('button');
    var b_png = document.createElement('button');
    var b_save = document.createElement('button');
    var b_load = document.createElement('button');
    //need set onclick attributes later
        
    b_ok.className = "b50px";
    b_ok.textContent = "ok";
    b_ok.tabIndex = 1;
    b_ok.onclick = function() {wheel_creator();};
    
    b_png.className = "b50px";
    b_png.textContent = "png";
    b_png.onclick = function() { PNGexport(); }
    
    b_save.className = "b50px";
    b_save.textContent = "save";
    b_load.className = "b50px";
    b_load.textContent = "load";
    
    td1.appendChild(b_ok);
    td2.appendChild(b_png);
    td3.appendChild(b_save);
    td4.appendChild(b_load);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    box.appendChild(table);
}

function td_hr(colspan = 1){
    var td = document.createElement('td');
    td.colSpan = colspan;
    td.appendChild(document.createElement('hr'));
    return td;
}
function td_text(text, color = "",colspan = 1){
    var td = document.createElement('td');
    var style = "";
    if (color == ""){ style = "vertical-align:middle;"; }
    else{style = "vertical-align:middle;color:"+color+";";}
    td.setAttribute("style",style);
    td.innerHTML = text;
    td.colSpan = colspan;
    return td;
}
function text_tag(text,color){
    var t = document.createElement('text');
    t.innerHTML = text;
    t.setAttribute("style", "vertical-align:middle;color:"+color+";");
    return t;
}
function cbox_tag(id,checked = false){
    var cbox = document.createElement('input');
    cbox.type = "checkbox";
    cbox.id = id;
    cbox.defaultChecked = checked;
    return cbox;
}
function td_text_multicolor(texts = [], colors = []){
    var td = document.createElement("td");
    if (texts.length == colors.length){
        for (i=0;i<texts.length;i++){
            td.appendChild(text_tag(texts[i],colors[i]));
        }
    }
    return td;
}
function td_cbox_text_multicolor_colspan(id, checked = false, texts = [], colors = [], colspan = 1){
    var td = document.createElement("td");
    td.colSpan = colspan;
    td.appendChild(cbox_tag(id, checked));
    if (texts.length == colors.length){
        for (i=0;i<texts.length;i++){
            td.appendChild(text_tag(texts[i],colors[i]));
        }
    }
    return td;
}

function td_input(id, title = ""){
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.id = id;
    if(title != ""){input.title = title;}
    td.appendChild(input);
    return td;
}
function size_gui_tr(i){
    var tr = document.createElement('tr');
    if(i==9){
        var td1 = td_text('png');
        var td2 = td_input('export_resolution','export resolution');
    }else{
        var td1 = td_text('h'+ i.toString());
        var td2 = td_input('h'+ i.toString());
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    if (i < 6){
        var td3 = td_input('w'+ i.toString());
        var td4 = td_text('w'+ i.toString());
    }else{
        var td3 = td_input('b'+ (i-5).toString());
        var td4 = td_text('b'+ (i-5).toString());
    }
    tr.appendChild(td3);
    tr.appendChild(td4);
    return tr;
}
function size_gui_tbody(){
    var tbody = document.createElement('tbody');
    for (i=1;i<10;i++){tbody.appendChild(size_gui_tr(i));}
    return tbody;
}
function size_gui_creator(){
    var table = document.createElement('table');
    table.appendChild(size_gui_tbody());
    var box = document.getElementById("tab_c1");
    box.appendChild(table);
    //add sheme svg
    var img = document.createElement('img');
    img.src = "img/size200260.svg";
    box.appendChild(img);
}

function td_cbox(cboxid, checked = false, title = ""){
    var td = document.createElement('td');
    var cbox = document.createElement('input');
    cbox.id = cboxid;
    cbox.type = "checkbox";
    cbox.defaultChecked = checked;
    if (title != ""){cbox.title = title;}
    td.appendChild(cbox);
    return td;
}
function td_radio(id, name, value, checked = false){
    var td = document.createElement('td');
    var radio = document.createElement('input');
    radio.type = "radio";
    radio.className = "guiradio";
    radio.name = name;
    radio.id = id;
    radio.defaultChecked = checked;
    radio.value = value;
    td.appendChild(radio);
    return td;
}
function td_color(id, co = "#000000"){
    var td = document.createElement('td');
    var color = document.createElement('input');
    color.type = "color";
    color.className = "guicolor";
    color.id = id;
    color.value = co;
    td.appendChild(color);
    return td;
}
function balert(x){
    alert(x);//need two
}
function td_button(text, callback, title = ""){
    var td = document.createElement('td');
    var btn = "<button title=\""+title+"\" onclick=\""+callback+"\">"+text+"</button>";
    td.innerHTML = btn;
    return td;
}
function look_gui_tbody(){
    var tbody = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    tr1.appendChild(td_text("s1")); tr1.appendChild(td_input("s1"));
    var td = td_text("|||"); td.style.textAlign = "right";
    tr1.appendChild(td);
    td = td_radio("g1","grip","|||");
    tr1.appendChild(td);
    
    var tr2 = document.createElement('tr');
    tr2.appendChild(td_text("s2")); tr2.appendChild(td_input("s2"));
    td = td_text(">>>"); td.style.textAlign = "right";
    tr2.appendChild(td);
    td = td_radio("g2","grip",">>>",true);
    tr2.appendChild(td);
    
    var tr3 = document.createElement('tr');
    tr3.appendChild(td_text("s3")); tr3.appendChild(td_input("s3"));
    td = td_text(")))"); td.style.textAlign = "right";
    tr3.appendChild(td);
    td = td_radio("g3","grip",")))");
    tr3.appendChild(td);
    
    var tr4 = document.createElement('tr');
    tr4.appendChild(td_text("s4")); tr4.appendChild(td_input("s4"));
    td = td_text("ooo"); td.style.textAlign = "right";
    tr4.appendChild(td);
    td = td_radio("g4","grip","ooo");
    tr4.appendChild(td);
    
    var tr5 = document.createElement('tr');
    tr5.appendChild(td_cbox("cbox_s1",true,"metal")); tr5.appendChild(td_color("c1","#808080"));
    tr5.appendChild(td_input("s5","grips repeat by width")); tr5.appendChild(td_text("s5")); //repeat input
    
    var tr6 = document.createElement('tr');
    tr6.appendChild(td_cbox("cbox_s2",true,"bolts")); tr6.appendChild(td_color("c2","#B3B3B3"));
    tr6.appendChild(td_input("s6","grips number by lenght")); tr6.appendChild(td_text("s6")); //grips
    
    var tr7 = document.createElement('tr');
    tr7.appendChild(td_cbox("cbox_s3",true,"tire")); tr7.appendChild(td_color("c3","#000000"));
    tr7.appendChild(td_input("s7","grip % by grip + hole")); tr7.appendChild(td_text("s7")); //% grip from grip + hole = steps
    
    var tr8 = document.createElement('tr');
    tr8.appendChild(td_cbox("cbox_s4",true,"grips")); tr8.appendChild(td_color("c4","#EC8300"));
    tr8.appendChild(td_input("s8","bolt angles space separated")); tr8.appendChild(td_text("s8")); //bolt angles
    
    var tr9 = document.createElement('tr');
    tr9.appendChild(td_cbox("cbox_s5",true,"flat track")); tr9.appendChild(td_color("c5","#3D9C8C"));
    tr9.appendChild(td_button("mix","mix_bolt_angles()","mix bolt angles")); tr9.appendChild(td_text("00"));
    
    var tbox = [tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9];
    for (i=0;i<tbox.length;i++) {tbody.appendChild(tbox[i]);}
    return tbody;
}
function look_gui_creator(){
    var table = document.createElement('table');
    table.appendChild(look_gui_tbody());
    var box = document.getElementById("tab_c2");
    box.appendChild(table);
    var img = document.createElement('img');
    img.src = "img/look200260.svg";
    box.appendChild(img);
}

function td_cbox_text_colspan(cboxid, text, checked = false, colspan = 1, align = "left"){
    var td = document.createElement('td');
    td.colSpan = colspan;
    td.setAttribute('style','text-align :'+align+';');
    var cbox = document.createElement('input');
    cbox.id = cboxid;
    cbox.type = "checkbox";
    cbox.checked = checked;
    var text = document.createTextNode(text);
    td.appendChild(cbox);
    td.appendChild(text);
    return td;
}
function lamp_gui_tbody(){
    var tbody = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    tr1.appendChild(td_cbox_text_colspan("cbox_ambient","ambient",true,2));
    tr1.appendChild(td_color("color_ambient","#ffffff"));
    tr1.appendChild(td_input("intensity_ambient"));
    
    var tr2 = document.createElement('tr');
    tr2.appendChild(td_hr(4));
    
    var tr3 = document.createElement('tr');
    tr3.appendChild(td_cbox_text_colspan("cbox_directional","directional",true,2));
    tr3.appendChild(td_color("color_directional","#ffffff"));
    tr3.appendChild(td_input("intensity_directional"));
    
    
    var tr4 = document.createElement('tr');
    tr4.appendChild(td_input("x_directional","x"));
    tr4.appendChild(td_input("y_directional","y"));
    tr4.appendChild(td_input("z_directional","z"));
    tr4.appendChild(td_cbox("shadow_directional",false,"shadow"));
    
    var tr5 = document.createElement('tr');
    tr5.appendChild(td_input("smsw_directional","shadow.mapSize.width"));
    tr5.appendChild(td_input("smsh_directional","shadow.mapSize.height"));
    tr5.appendChild(td_input("scn_directional","shadow.camera.near"));
    tr5.appendChild(td_input("scf_directional","shadow.camera.far"));
    
    var tr6 = document.createElement('tr');
    tr6.appendChild(td_hr(4));
    
    var tr7 = document.createElement('tr');
    tr7.appendChild(td_cbox_text_colspan("cbox_point","point",true,2));
    tr7.appendChild(td_color("color_point","#ffffff"));
    tr7.appendChild(td_input("intensity_point","intensity"));
    
    var tr8 = document.createElement('tr');
    tr8.appendChild(td_input("x_point","x"));
    tr8.appendChild(td_input("y_point","y"));
    tr8.appendChild(td_input("z_point","z"));
    tr8.appendChild(td_cbox("marker_point",false,"show marker"));
    
    var tr9 = document.createElement('tr');
    tr9.appendChild(td_input("distance_point","distance"));
    tr9.appendChild(td_input("decay_point","decay"));
    tr9.appendChild(td_text("00"));
    tr9.appendChild(td_cbox("shadow_point",false,"shadow"));
    
    var tr10 = document.createElement('tr');
    tr10.appendChild(td_input("smsw_point","shadow.mapSize.width"));
    tr10.appendChild(td_input("smsh_point","shadow.mapSize.height"));
    tr10.appendChild(td_input("scn_point","shadow.camera.near"));
    tr10.appendChild(td_input("scf_point","shadow.camera.far"));
    
    var tr11 = document.createElement('tr');
    tr11.appendChild(td_hr(4));
    
    var tr12 = document.createElement('tr');
    tr12.appendChild(td_text("view"));
    tr12.appendChild(td_cbox_text_colspan("perspective_view","perspective",false,4,"center"));
    
    var tr13 = document.createElement('tr');
    tr13.appendChild(td_input("zoom_view","zoom"));
    tr13.appendChild(td_input("distance_view","distance"));
    tr13.appendChild(td_input("y_view","y angle degrees"));
    tr13.appendChild(td_input("z_view","z angle degrees"));
    
    var tr14 = document.createElement('tr');
    tr14.appendChild(td_hr(4));
    
    var tr15 = document.createElement('tr');
    tr15.appendChild(td_cbox_text_colspan("wireframe","wireframe",false,2));
    tr15.appendChild(td_cbox_text_multicolor_colspan("axes",true,["x","y","z"," axes"],["red","green","blue","black"],2));
    
    var tr16 = document.createElement('tr');
    tr16.appendChild(td_hr(4));
    
    var tr17 = document.createElement('tr');
    tr17.appendChild(td_text("background color","",4));
    
    var tr18 = document.createElement('tr');
    tr18.appendChild(td_color("color_background","#ffffff"));
    tr18.appendChild(td_cbox_text_colspan("transperent","render transperent",true,3));
    
    // tr17.appendChild(td_input("length_track","track length"));
    
    // var tr18 = document.createElement('tr');
    // tr18.appendChild(td_cbox_text_colspan("cbox_track","draw track",false,2));
    // tr18.appendChild(td_color("color_track","#808080"));
    // tr18.appendChild(td_input("length_track","track length"));
    
    
    
    var tbox = [tr1,tr2,tr3,tr4,tr5,tr6,tr7,tr8,tr9,tr10,tr11,tr12,tr13,tr14,tr15,tr16,tr17,tr18];
    for (i=0;i<tbox.length;i++) {tbody.appendChild(tbox[i]);}
    return tbody;
}
function lamp_gui_creator(){
    var table = document.createElement('table');
    table.appendChild(lamp_gui_tbody());
    var box = document.getElementById("tab_c3");
    box.appendChild(table);
}

function id_value(id,value){
    document.getElementById(id).value=value;
}
function start_data_writer(){
    var ids = [
        "h1","h2","h3","h4","h5","h6","h7","h8","export_resolution",
        "w1","w2","w3","w4","w5","b1","b2","b3","b4",
        "s1","s2","s3","s4","s5","s6","s7","s8",
        "intensity_ambient",
        "intensity_directional",
        "x_directional","y_directional","z_directional",
        "smsw_directional","smsh_directional","scn_directional","scf_directional",
        "intensity_point",
        "x_point","y_point","z_point",
        "distance_point","decay_point",
        "smsw_point","smsh_point","scn_point","scf_point",
        "zoom_view","distance_view","y_view","z_view",//tr13
    ];
    var values = [
        20,100,500,100,100,100,100,100,900,
        500,600,550,100,550,50,50,6,0,
        900,100,100,100,-4,60,50,0,//later back to more big numbers 1 5 10
        1,
        1,
        500,500,500,
        512,512,0.5,500,
        1,
        500,500,500,
        1000,2,
        512,512,0.5,500,
        1,1000,0,0,//tr13 lamp
    ];
    for (i=0;i<ids.length;i++){id_value(ids[i],values[i])}
}

ok_gui_creator();
size_gui_creator();
look_gui_creator();
lamp_gui_creator();
start_data_writer();
showme("GuiCreator.js ready");