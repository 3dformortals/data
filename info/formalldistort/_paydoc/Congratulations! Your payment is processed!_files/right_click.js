//--- RC 2;
//-
//- "rc_holder" - main div for show each RC;
//- "rc_clock" - ajax-clock div;
//- ".._html" - content;
//-


var cOS = false;					//--- click over item with submenu;
var rc_obj = new Object();			//--- main rc object;
var rc_left = '';					//--- reserved for left menu;
var rc_main = self.name;			//--- main frame name;
var actionPROXY = '';
try {actionPROXY = parent.baseURL+'/panel/core/action-menu'} catch (e){}

rc_obj.init = function() {			//--- init object;
	this.static = new Array();	//--- array for store static menu content;
	this.dynamic = new Array();	//--- array for store dynamic menu last content;
	this.dyns = new Array();		//--- array for store last object dynamic state;
	this.url = parent.baseURL + '/panel/core/rc-menu';	//--- menu page constant;
	this.req = null;				//--- request var;
	this.onscreen = new Array();	//--- div now on screen;
	this.sub = '';				//--- sub menu on screen;
	this.sub_obj = null;			//--- sub menu caller pointer;
	this.sub_obj_over = null;		//--- sub menu caller pointer with mouse over;
	this.sub_obj_over_id = '';	//--- sub menu caller pointer with mouse over id;
	this.sub_obj_tic = 0;			//--- pointer mouse over time;
	this.sub_TID = null;			//--- call sub timeout;
	this.sub_obj_const = 300;		//--- show sub menu if mouse ovwe time more .millsec;

	this.last_caller = new Object(); //--- DOM object, calling rc
	
	append_div( 'rc_holder', 'rightMenu', 10000 );
	append_div( 'rc_sub', 'rightMenu', 11000 );
	append_div( 'rc_clock', 'rightMenu', 10001 );
}

rc_obj.getContextParams = function (u){ //---collecting data from selected checkboxes, adding to the url 
	//This is working only for the browse at the moment!
	var c = this.last_caller;
	if ( rc_check_selected(c)){
		var cb = c.parentNode.getElementsByTagName('INPUT');
		for ( var i=0; i<cb.length; i++ ) {
			if (cb[i].checked && !cb[i].disabled) {
				var _u = (u.indexOf('?')==-1) ? '?' : '&';
				u = u + cb[i].name + '='+ cb[i].value;
			}
		}
	}else{
		var cb = c.getElementsByTagName('INPUT');
		for ( var i=0; i<cb.length; i++ ) {
			if(cb[i].type == 'checkbox' || cb[i].type == 'radio'){
				var _u = (u.indexOf('?')==-1) ? '?' : '&';
				u = u + _u + cb[i].name + '='+ cb[i].value;
			}
		}
	}
	
	return u;	
}

rc_obj.name = function( m, s, p ) {	//--- get name;
	return 'L' + m + '-RC-L' + s + '-RC-P' + p;
}


rc_obj.stop_req = function() {
	rc_obj.req = null;
}


rc_obj.get = function( m, s, p, obj ) {		//--- open stored or load menu, m= menu id; s= ids divided by ';', p= parent, obj= caller object;
	// PIM - specific
	//m = check_menu_id( m );
	this.stop_req();
	rc_hide();
	this.last_caller = obj;
	var name = this.name( m, s, p );

	//--- check static;
	if ( typeof( this.static[ name ] ) != 'undefined' ) {
		this.onscreen = locate_rc( this.static[ name ] );
		return true;
	}
	
	//--- check last obj state;
	if ( typeof( this.dynamic[ name ] ) != 'undefined' ) {
		var state = get_state_by_obj( obj );
		if ( state != '' && typeof( this.dyns[ obj.id ] ) != 'undefined' ) {
			if ( state == this.dyns[ obj.id ] ) {
				if ( this.dynamic[ name ] != '' ) {
					this.onscreen = locate_rc( this.dynamic[ name ] );
					return true;
				}
			}
		}
	}

	//--- check dynamic;
	if ( typeof( this.dynamic[ name ] ) != 'undefined' && !G_event.is_IE ) {
		this.onscreen = locate_rc( this.dynamic[ name ] );
	} else {
		this.onscreen = locate_rc('');
	}

	//check preloaded
	var pr = document.getElementById('preloaded_'+m);
	if (pr && pr.innerHTML){
		store_rc (pr.innerHTML, this, m, s, p);
		return;
	} 
	
	
	//--- get request;
	this.request( m, s, p, obj );
}


rc_obj.request = function( m, s, p, obj ) {		//--- ajax-load menu;
	rc_obj.stop_req();
	rc_obj.req = AJAXRequest();
	if ( !rc_obj.req ) { return false; }
	
	rc_obj.req.onreadystatechange = function() { rc_obj.onready( m, s, p, obj ); }
	var url = rc_obj.url + '?m=' + m + '&p=' + p + '&id=' + s;
	debug_out(url);

	rc_obj.req.open( 'GET', secureURI(url), true );
	rc_obj.req = AJAXRequestHeader( rc_obj.req, '' );
}


rc_obj.onready = function( m, s, p, obj ) {
	if ( !rc_obj.req ) { return; }

	if ( rc_obj.req.readyState == 4 ) {
		if ( rc_obj.req.status == 200 ) {
		
			var state = get_state_by_obj( obj );
			if ( state != '' ) { rc_obj.dyns[ obj.id ] = state; }
			
			var r = rc_obj.req.responseText;
			r = r.replace( /\x00/g, '' );
			r = r.trim();
			store_rc( r, this, m, s, p );
		} else {
			rc_hide();
		}
	}
}


rc_obj.sub_parent = function( s ) {	//--- switch sub menu caller highlight;
	if ( rc_obj.sub_obj ) {
		if ( s == 1 ) {
			rc_obj.sub_obj.className = 'on';
		} else {
			rc_obj.sub_obj.className = 'off';
		}
	}
}

function store_rc ( r, rc_obj, m, s, p ){
	if ( r.indexOf( '[static/]' ) != -1 ) {
		r = r.replace( /\[static\/\]/g, '' );
		r = r.trim();
		if ( r != '' ) { rc_obj.static[ rc_obj.name( m, s, p ) ] = r; }
	} else {
		if ( r != '' ) { rc_obj.dynamic[ rc_obj.name( m, s, p ) ] = r; }
	}
	if ( r != '' ) { content_rc( r ); } else { rc_hide(); }
}


function check_menu_id( m ) {
	m = m.toLowerCase();
	m = m.replace(/other/g,'_any');

	//--- check for undefined tech;
	if ( m.substr( m.length-1, 1 ) == '.' ) { m+='core.vt'; }

	return m;
}


function get_state_by_obj( obj ) {
	var s = '';
	if ( obj ) {
		if ( typeof(obj.id) != 'undefined' ) {

			if ( obj.id.indexOf('vel_') == 0 ) {
				//---main frame;
				var obj_id = obj.id.replace('vel_','vec_');
				var a = document.getElementById( obj_id );
				if ( a ) { s = a.alt; }

			} else {
				//---left frame;
				var a = document.getElementById( obj.id + '_OBJ_state' );
				if ( a ) { s = a.innerHTML;	}
			}
		}
	}
	return s.trim();				
}


function content_rc( s ) {	//--- change content for rc, s= html-content;
	if ( rc_obj.onscreen[0] !='' ) {
	
		rc_hide_sub();
		var a = document.getElementById( 'rc_holder' );
		if ( a.innerHTML == '' ) { rc_frame( 'rc_holder' ); }
		var r = document.getElementById( 'rc_holder_html' );
		
		purge_inner(r);
		r.innerHTML = '';
		setVshadow( 'rc_holder' );
		r.innerHTML = s;

		//--- position rc;
		hideDIV( 'rc_clock' );
		pos_div( 'rc_holder', rc_obj.onscreen[1], rc_obj.onscreen[2], 0 );

		if ( s.trim() == '' ) { hideDIV( 'rc_holder' ); }
	}
}


function locate_rc( s ) {	//--- locate rc on screen, s= html-content;
	if ( !document.getElementById( 'rc_holder' ) ) { rc_obj.init(); }
	var id = 'rc_holder';
	
	if ( s == '' ) {	//--- ajax-clock;
		id = 'rc_clock';
		s = '<nobr/>'
		+ '<div style="margin:10px">'
		+ '<img src="'+parent.globalPATH+'/icons/indicator.gif" border="0" height="16" width="16"/>'
		+ '&nbsp;'+parent._js['loading']+'&nbsp;'
		+ '</div>';
	}
	hideDIV( id );
	setDIVxy( id, 0, 0 );

	//--- html;
	rc_frame( id );
	var r = document.getElementById( id + '_html' );
	if ( r ) { purge_inner(r); r.innerHTML = s; }

	//--- remove visibility;
	var a = document.getElementById( id );
	if ( !a ) { return ''; }

	//--- calc location;
	var m = getMouseXY();
	
	return pos_div( id, m[0], m[1], 0 );
}


function pos_div( id, x, y, sub ){	//--- position rc div;
	var a = document.getElementById( id );
	if (id=='' || !a || !rc_obj) { return [ '', 0, 0 ]; }

	var m = new Array( x, y );
	a.style.visibility = 'hidden';
	showDIV( id );

	if ( window.event ) {
		switch ( self.name ) {
		case rc_left:
			if ( sub != 1 ) { m[0] = 2; }
		break;
		case rc_main:
			m[0] = m[0]+document.documentElement.scrollLeft;
			m[1] = m[1]+document.documentElement.scrollTop;
			break;
		}
	} else {
		switch ( self.name ) {
		case rc_left:
			if ( sub != 1 ) { m[0] = 2; }
			break;
		}
	}
	
	var x=0;
	var y=0;
	switch ( self.name ) {

		case rc_left:
			var nv = document.getElementById( 'navArea' );
			if ( window.event && sub != 1) {
				var nh = nv.innerHTML;
				purge_inner(nv);
				nv.innerHTML = nh;
			}
			var nv_sl = parseInt( nv.scrollLeft );
			var nv_st = parseInt( nv.scrollTop );
			var pre_x = parseInt( nv.offsetWidth );
			var pre_y = parseInt( nv.offsetHeight );
			m[1] += nv_st;

			//--- render and re-object a;
			rc_recalc( id, a.innerHTML );
			a = document.getElementById( id );

			x = parseInt( a.offsetWidth );
			y = parseInt( a.offsetHeight );
			
			if ( sub == 1 ) {
				var a_x = G_event.is_IE?8:1;
				if ( m[0]+x+a_x > pre_x ) { m[0] = pre_x-x-a_x; }
			} else {
				if ( nv_sl > 0 ) { m[0] = m[0]-nv_sl; }
			}

			if ( nv_st > 0 ) { m[1] = m[1]-nv_st; }
			if ( m[1]+y+3 > pre_y ) { m[1] = pre_y-y-3; }
			if ( m[0] < 2 ) { m[0] = 2; }
			break;

		case rc_main:
			//--- render and re-object a;
			rc_recalc( id, a.innerHTML );
			a = document.getElementById( id );

			x = parseInt( a.offsetWidth );
			y = parseInt( a.offsetHeight );

			var s_l = parseInt( document.documentElement.scrollLeft );
			var s_t = parseInt( document.documentElement.scrollTop );
			if( !G_event.is_IE ) {
				if ( s_l > 0 ) { m[0] = m[0]+s_l; }
				if ( s_t > 0 ) { m[1] = m[1]+s_t; }
			}

			var c_w = parseInt( document.documentElement.clientWidth );
			var c_h = parseInt( document.documentElement.clientHeight );

			if ( m[0]+x-s_l > c_w ) { m[0] = c_w-x+s_l; }
			if ( m[1]+y+3-s_t > c_h ) { m[1] = c_h-y-3+s_t; }
			if ( m[0] < 0 ) { m[0] = 0; }
			break;
	}
	if ( m[1] < 0 ) { m[1] = 0; }
	
	//--- locate menu;
	setDIVxy( id, m[0], m[1] );

	showDIV( id );
	setVshadow( id );

	//--- return visibilty;
	a.style.visibility = 'visible';
	document.onmousedown = rc_click;
	
	return [ id, m[0], m[1] ];
}


function rc_frame( id ) {	//--- create rc frame in div;
	var a = document.getElementById( id );
	if ( !a ) { return; }

	var s = '<table cellSpacing="0" cellPadding="0" border="0" onmouseover="cOS=true;" onmouseout="cOS=false;">'
	+'<tr>'
	+'<td valign="top" class="rMenuBorder" id="'+id+'_obj_base">'
	+'<div id="'+id+'_html"></div>'
	+'</td>'
	+'<td height="100%" valign="top">'
		+'<table width="5px" cellSpacing="0" cellPadding="0" border="0">'
		+'<tr><td class="rU"></td></tr>'
		+'<tr><td class="rR" id="'+id+'_v_shadow" height="100%">&#160;</td></tr>'
		+'</table>'
	+'</td>'
	+'</tr>'
	+'<tr>'
	+'<td>'
		+'<table width="100%" cellSpacing="0" cellPadding="0" border="0">'
		+'<tr>'
		+'<td class="rL"></td>'
		+'<td class="rD" id="'+id+'_h_shadow">&#160;</td>'
		+'</tr>'
		+'</table>'
	+'</td>'
	+'<td class="rC"></td>'
	+'</tr>'
	+'</table>';
	purge_inner(a);
	a.innerHTML = s;
}


function rc_resub() { //--- recall last sub menu;
	rc_show_sub( rc_obj.sub_obj_over_id, rc_obj.sub_obj_over );
}

function rc_show_sub( id, o ) {	//--- show sub menu div, id= html content source-id;

		var d = new Date();
		if(typeof(rc_obj.sub_TID)!='undefined') {clearTimeout(rc_obj.sub_TID);}

		if ( rc_obj.sub_obj_over == o ) { //--- the same obj
			//debug_out( String( d.valueOf()-rc_obj.sub_obj_tic ) );
			if ( d.valueOf()-rc_obj.sub_obj_tic < rc_obj.sub_obj_const) {
				rc_obj.sub_TID = setTimeout('rc_resub()',50);
				return;
			} else { rc_clear_TID(); }
		
		} else {
			rc_obj.sub_obj_over = o;
			rc_obj.sub_obj_over_id = id;
			rc_obj.sub_obj_tic = d.valueOf();
			rc_obj.sub_TID = setTimeout('rc_resub()',50);
			return;
		}

		hideDIV( 'rc_clock' );
		if ( id == rc_obj.sub ) { return; }

		rc_obj.sub_parent( 0 );
		rc_obj.sub = id;
		rc_obj.sub_obj = o;

		var c = document.getElementById( id );
		var a = document.getElementById( 'rc_sub' );
		if ( !a || !c || !o ) { return; }

		rc_frame( 'rc_sub' );
		var r = document.getElementById( 'rc_sub_html' );
		if ( !r || c.innerHTML == '' ) { return; }
		r.innerHTML = c.innerHTML;

		//--- position rc;
		var m = findPosObj( o );
		m[0] += o.clientWidth - 3;
		if ( G_event.is_IE ) { m[1] -= 2; } else { m[1] -= 3; }

		pos_div( 'rc_sub', m[0], m[1], 1 );
}


function rc_clear_TID() {	//--- clear sub TID;
	if(rc_obj){
		if(typeof(rc_obj.sub_TID)!='undefined') {clearTimeout(rc_obj.sub_TID);}
		rc_obj.sub_obj_over = null;
	}
}


function rc_hide_sub() {	//--- hide sub menu;
	if(rc_obj){
		rc_clear_TID();
		hideDIV( 'rc_sub' );
		rc_obj.sub_parent( 0 );
		rc_obj.sub = '';
		rc_obj.sub_obj = null;
	}
}


function rc_recalc( id, s ) {
	document.getElementById( id ).style.visibility = 'hidden';
	setDIVxy( id, 0, 0 );
	showDIV( id, s );
}


function rc( m, s, p, obj, g ) {		//--- oncontext call;
	if ( !document.getElementById( 'rc_holder' ) ) { rc_obj.init(); }

	if ( rc_check_selected(obj)) {	
		rc_obj.get( g, s, p, obj ); 
	} else { rc_obj.get( m, s, p, obj ); }
}


function rc_check_selected(obj) {

	var c = 0;
	var o = obj.getElementsByTagName('INPUT'); //inner checkbox
	for ( var i=0; i<o.length; i++ ) {
		if ( o[i].checked && !o[i].disable){ c++; }
	}
	if (c == 0) return false; // current row not checked - menu for single
		
		
	var c = 0;
	o = obj.parentNode.getElementsByTagName('INPUT'); //other checkboxes
	for ( var i=0; i<o.length; i++ ) {
		if (o[i].checked && !o[i].disabled) { c++; }
	}
	
	return c>1;
}


function rc_menu_from_list() {	//--- create from list on screen;
	if ( self.name != rc_main ) { return false; }
	var s = '';
	var o = document.getElementsByTagName( 'td' );
	for ( var i=0; i<o.length; i++ ) {
		if ( o[i].id.indexOf( 'bb_td_' )!=-1 && o[i].style.display != 'none' ) {
			s += '<tr><td onmouseover="this.className=\'on\';" onmouseout="this.className=\'off\';" class="off" onclick="rc_hide()">';
			s += '<nobr/><table width="100%" cellSpacing="0" cellPadding="0" border="0"><tr><td class="text">';
			s += o[i].innerHTML;
			s += '</td></tr></table>';
			s += '</td></tr>';
		}
	}
	s = s.replace(/listActionItemOver/g,'-');
	s = s.replace(/listActionItem/g,'-');
	s = s.replace(/browseButtonOver/g,'-');
	s = s.replace(/browseButton/g,'-');
	s = s.replace(/listButton/g,'listMenuButton');

	if ( s != '') {
		s = '<table cellSpacing="0" cellPadding="0" border="0" class="rMenu">' + s + '</table>';
		locate_rc( s );
	}
}


function rc_click( e ) {
	customClick(e);
	if ( cOS ) { return false; }
	document.onmousedown = customClick;
	rc_hide();
	rc_obj.stop_req();
}


function rc_hide() {	//--- hide rc object;
	rc_hide_sub();
	hideDIV( 'rc_holder' );
	hideDIV( 'rc_clock' );
	cOS = false;
}


function append_div( id1, id2, z ) {
	var a1 = document.getElementById( id1 );
	var a2 = document.getElementById( id2 );
	if (!a1 && a2) {
		var d = document.createElement( 'div' );
		d.setAttribute( 'id', id1 );
		d.style.position = 'absolute';
		d.style.display = 'none';
		d.style.zIndex = z;
		a2.parentNode.appendChild( d );
	}
}


function get_rc_eid( eid ) {
	var b = eid.indexOf( 'eid=' );
	if ( b != -1 ) {
		var new_eid = eClear( eid.substr( b+4, eid.indexOf( ',', b+4 )-b-4 ), 0);
		eid = decode64( new_eid );
	}
	return eid;
}


function get_rc_path( eid ) {
	var b = eid.indexOf( 'eid=' );
	if ( b != -1 ) {
		var new_eid = eClear( eid.substr( eid.indexOf( ',' )+1 ), 0);
		eid = new_eid;
	}
	return eid;
}


function rcc(url, target, confi, oper, par ) {

	if ( url == '') return;
	rc_hide();
	
	if (!target)  target = self.name;
	url = rc_obj.getContextParams(url);

	//---check for confirm;
	//if ( confi != '' && parent._js[confi] ) { if ( !confirm( parent._js[confi] ) ) { return; } }

	//---manage variables;
	//if ( mid.indexOf( '.ve.' ) != -1 ) { eid = get_rc_eid( eid ); }

	try {
		eval('top.'+target+'.location.href = "'+ url +'";');
	}catch(err){}
}


function rc_listed( mid, id, url, eid, setId, confi ) {
	var s = url.toLowerCase().split( '(' );
	switch( s[0] ) {
		case 'refresh_node':
			var menu_frame = top.menu;
			if ( menu_frame ) {
				var o = menu_frame.document.getElementsByTagName( 'img' );
				for (var i=0;i<o.length;i++) {
					var cs = new String( o[i].onclick );
					if ( cs.indexOf( 'treeClick(' ) != -1 && cs.indexOf( eid ) != -1 ) {
						var eid = o[i].id.replace( 'img-', '' );
						var f = menu_frame.document.getElementById( 'dynamic_folders_' + eid );
						var c = menu_frame.document.getElementById( 'dynamic_clock_' + eid );
						if ( f && c ) {
							purge_inner(f);
							f.innerHTML = '';
							f.style.display = 'none';
							c.style.display = 'block';
							var s = o[i].src;
							o[i].src = s.replace( 'opened_node', 'closed_node' );
							o[i].onclick();
						}
					}
				}
			}
			break;
	}
}
