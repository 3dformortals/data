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
    b_png.className = "b50px";
    b_png.textContent = "png";
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
function td_text(text){
    var td = document.createElement('td');
    td.innerHTML = text;
    return td;
}
function td_input(id){
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.id = id;
    td.appendChild(input);
    return td;
}

function size_gui_tr(i){
    var tr = document.createElement('tr');
    var td1 = td_text('h'+ i.toString());
    tr.appendChild(td1);
    var td2 = td_input('h'+ i.toString());
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
}

ok_gui_creator();
size_gui_creator();