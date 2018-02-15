// -------------------- Reordring of columns ----------------------
var def_onclick;
var def_object_to_hide;
var def_window_blur;
var def_onmouseover;
var def_onmousemove;
var def_onmouseup;
var is_ie;
var is_dragging = false;
var prestart = false;
var moving_head;
var offx;
var offy;
var srcColumn;
var ths_uri;

function check_browser()
{
  if ( /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ) return true;
  else return false;
}

function prestart_co(e,col_start,s)
{
  if ( is_ie == null ) is_ie = check_browser();
  prestart = true;
  srcColumn = col_start;
  ths_uri = s?s:window.location.href;
  is_dragging = false;
//  if (! is_ie){
   if ( e.stopPropagation != undefined ) {
	 e.preventDefault();
	 e.stopPropagation();
   }
   e.cancelBubble = true;
   e.returnValue = false;
//  }
  return true;
}

function start_co(e)
{
  if ( is_ie == null ) is_ie = check_browser();

  var el = document.getElementById(srcColumn);
  if ( el == null ) return;
  is_dragging = true;
  moving_head = document.createElement("DIV");
  moving_head.id = "moving_head";
	moving_head.className = 'movingTH';
  col_place(e,el);
  moving_head.style.visibility = "visible";
  moving_head.style.position = "absolute";
  moving_head.innerHTML = el.innerHTML;
  if ( ! is_ie ) moving_head.style.opacity = "0.5";
  //  moving_head.onmousemove = go_co;
  moving_head.onmouseup = finish_co;
  document.body.appendChild(moving_head);
  def_onmousemove = document.onmousemove;
  document.onmousemove = go_co;
  def_onmouseup = document.onmouseup;
  document.onmouseup = finish_co;
}

function go_co(e)
{
  if ( is_ie == null ) is_ie = check_browser();
  if ( ! e ) e = window.event;
  if ( prestart && (! is_dragging) ) start_co(e);
  if ( is_dragging ) {
    if ( is_ie ) {
      moving_head.style.left =  e.clientX + document.body.scrollLeft-offx+"px";
      moving_head.style.top = e.clientY + document.body.scrollTop - offy+"px";
    } else {
      moving_head.style.left = e.pageX - offx + "px";
      moving_head.style.top = e.pageY - offy + "px";
    }
    if ( e.stopPropagation != undefined ) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.cancelBubble = true;
    e.returnValue = false;
  }
}

function finish_co(e)
{
  var col_name;

  if ( ! e ) e = window.event;
  if ( def_onmousemove ) document.onmousemove = def_onmousemove;
  if ( def_onmouseup ) document.onmouseup = def_onmouseup;
  if ( moving_head ) {
    moving_head.style.visibility = "hidden";
    document.body.removeChild(moving_head);
    moving_head = null;
  }
  if ( is_dragging ) {
    col_name = find_th(e);
  }

  var hr;

  if ( col_name ) hr=create_href(col_name,srcColumn,ths_uri);
  prestart = false;
  is_dragging = false;
  srcColumn = null;
  ths_uri = null;
  if ( hr ) doSubmit(hr);
  return true;
}

function col_place(e,ele)
{
  if ( is_ie == null ) is_ie = check_browser();
  if ( ele != undefined && ele != null && e != undefined && e != null ) {
    moving_head.style.left = calc_offset(ele,"offsetLeft") + "px";
    moving_head.style.top = calc_offset(ele,"offsetTop") + "px";
    moving_head.style.width = ele.offsetWidth + "px";
    moving_head.style.height = ele.offsetHeight + "px";
    if ( is_ie ) {
      offx = e.clientX + document.body.scrollLeft - parseInt(moving_head.style.left);
      offy = e.clientY + document.body.scrollTop - parseInt(moving_head.style.top);
    } else {
      offx = e.pageX - parseInt(moving_head.style.left);
      offy = e.pageY - parseInt(moving_head.style.top);
    }
  }
}

function calc_offset(s,na) {
  var wb = 0;

  while ( s ) {
    wb += s[na];
    s = s.offsetParent;
  }
  return wb;
}

function find_th(e)
{
  var par_ele = document.getElementsByTagName("th");
  var th_num = par_ele.length;
  var i;
  var col_name;
  var X;
  var Y;

  if ( is_ie == null ) is_ie = check_browser();
  if ( is_ie ) {
    X = e.clientX + document.body.scrollLeft;
    Y = e.clientY + document.body.scrollTop;
  } else {
    X = e.pageX;
    Y = e.pageY;
  }
  for ( i = 0; i < th_num; ++i ) {
    var ele = par_ele.item(i);

    if ( ele ) {
      var x = calc_offset(ele,"offsetLeft");
      var x1 = x + ele.offsetWidth;
      var y = calc_offset(ele,"offsetTop");
      var y1 = y + ele.offsetHeight;

      if ( X > x && X < x1 && Y > y && Y < y1) {
   col_name = ele.id;
   break;
      }
    }
  }
  return col_name;
}


function create_href(col,src_col,turi)
{
  var hr;                      

  if ( col != src_col ){
    if(turi.indexOf('?') == -1){
      hr = turi + '?_reorder='+ src_col + "," + col;
    }else{
      hr = turi + '&_reorder='+ src_col + "," + col;
    }
  }
  return hr;
}
