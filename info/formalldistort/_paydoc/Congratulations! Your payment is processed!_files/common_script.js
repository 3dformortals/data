//--- Events init;


var G_event = new Object;
G_event.x = 0;
G_event.y = 0;
G_event.is_FF = navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
G_event.is_IE = navigator.userAgent.toLowerCase().indexOf('msie') != -1;
G_event.is_IE7 = navigator.appVersion.toLowerCase().indexOf('msie 7') != -1;
G_event.is_Opera = (navigator.appName=="Opera" || navigator.userAgent.toLowerCase().indexOf('opera') != -1);
G_event.shift = false;
G_event.ctrl = false;

//--- Dynamic notifications;

var _dyn = new Array;
var Dyn = null;
var DynRefresh = new Array;
var DynURL = '/vz/cp/panel/core/task-dynamic';
var Dyn_Open = false;
var dDBG = false;
var Dyn_counter=0;
var Dyn_Max_Len = 20;
var Dyn_Timeout = 3000;
var Dyn_delimiter = '/@|';
var Dyn_TID = null;
var runDYN = false;
var Dyn_enabled = false;
var Dyn_request = null;

set_tid();

function purge_inner(d){
	if(d && d.firstChild){purge(d.firstChild);}
}

function purge(d) {
	if (!G_event.is_IE) {return;}
	if (d && typeof(d.attributes)!='undefined' ) {
		var a = d.attributes, i, l, n;
		if (a) {
			l = a.length;
			for (i = 0; i < l; i += 1) {
				n = a[i].name;
				if (typeof d[n] === 'function') { d[n] = null; }
			}
		}
		a = d.childNodes;
		if (a) {
			l = a.length;
			for (i = 0; i < l; i += 1) { purge(d.childNodes[i]); }
		}
	}
}

function set_tid() {
	purge(Dyn_request);
	if (self.name=='') {
		if (runDYN && Dyn_enabled) {
			Dyn_TID = setTimeout('DynAJAX()',Dyn_Timeout);
		} else {
			Dyn_TID = setTimeout('set_tid()',Dyn_Timeout);
		}
	}
}

function DynAJAX( ) {
	var frame = top.menu; if (!frame) return;
	var frame = top.main; if (!frame) return;

	Dyn_request = AJAXRequest();
	if (!Dyn_request) { set_tid(); return false; }
	Dyn_request.onreadystatechange = function() { DynResult( Dyn_request ); }
	Dyn_request.open( 'GET', secureURI(DynAddParams(DynURL)), true );
	Dyn_request = AJAXRequestHeader( Dyn_request, '' );
}

function DynAddParams(s){
	var frame=top.main;
	if (!frame) frame=top.workFrame;
	if (frame) {
			var id=frame.document.getElementById('dynamic-params');
			if (id) {
				if (s.indexOf('?')!=-1) {s+='&';} else {s+='?';}
				s+='params='+id.value;
			}
	}
	return s;
}

function debug_out(s){
	if (top.dDBG) {
		var frame=top.main;
		if (!frame) frame=top.workFrame;
		if (frame) {
			var op='opresult_id';
			var o=frame.document.getElementById(op);
			if (o) {
				var id=frame.document.getElementById(op+'_dbg');
				if (id) {
					var d=new Date();
					var dm=new String(d.getMinutes());
					var ds=new String(d.getSeconds());
					if(s.substr(s.length-4)!='<br>'){s+='<br>';}
					id.innerHTML='<nobr>'+(dm.length==1?'0':'')+dm+':'+(ds.length==1?'0':'')+ds+' > '+s.replace(/\/@\|/g,' | ')+id.innerHTML;
				} else {
					o.innerHTML='<table cellspacing="0" cellpadding="0" class="summaryBlock" style="width:96%;height:225px;margin:10px;"><tr><td class="summaryTitle qE" onclick="top.dDBG=!top.dDBG" style="cursor:pointer">Debug</td></tr><tr><td><div id="opresult_id_dbg" style="padding:0 5px 0 5px;height:200px;overflow:auto;"></div></td></tr></table>';
				}
				o.style.display='block';
			}
		}
	}
}

function DynResult( request ) {
	if ( request.readyState == 4 ) {
		if ( request.status == 200 ) {
			var response = request.responseText;
			if (response.indexOf('//@allow-dyn@//')==-1) { if(response.trim()!='') {runDYN=false;} }
			if (response.indexOf('[script]')!=-1&&response.indexOf('[/script]')!=-1) {
				Dyn = null;
				Dyn = new Array;
				var scr=response.substring( response.indexOf("[script]")+8,response.indexOf("[/script]",response.indexOf("[script]")+8) );
				scr=scr.trim();
				if (scr!='') {
					eval(scr);
					if (top.dDBG) {
						var b=scr.split(';');
						var s='';
						for (var i=0;i<b.length;i++) {if(b[i]!='') {s+=b[i]+'<br>';} }
						debug_out( s );
					}
				}
				DynDraw();
			}
		}
		set_tid();
	}
}

function mTA(obj,from,to) {
	if (self.name==from && obj) {obj.target=to;}
}

function getCellNum(table, str) {
	for (var i=1;i<table.rows[0].cells.length;i++) {
		if (table.rows[0].cells[i].innerHTML.indexOf(str)!=-1) { return i; }
	}
	return 0;
}

function clearForBlank(str){
	return str.replace(/\/\|blank\/\|/g,'');
}

function insertIntoA(obj, str) {
	str=clearForBlank(str);
	var html=obj.innerHTML;
	var b=html.indexOf('>');
	if (b!=-1) {
		str=html.substr(0,b+1)+str+html.substr(html.indexOf('</',b+1));
	}
	purge_inner(obj);
	obj.innerHTML=str;
}

function insertCreateA(obj,objA, str) {
	str=clearForBlank(str);
	var html=objA.innerHTML;
	var b=html.indexOf('>');
	if (b!=-1) {
		str=html.substr(0,b+1)+str+html.substr(html.indexOf('</',b+1));
	}
	purge_inner(obj);
	obj.innerHTML=str;
}

function insertImage(obj, f, cl) {
	if (cl) {cl='class="qC"';} else {cl='';}
	if (obj){
		purge_inner(obj);
		obj.innerHTML = '<nobr><img src="'+globalPATH+f+'" border="0" width="16px" height="16px" '+cl+'>';
	}
}

function insertStatus(obj, f, s, id, val) {
	s=clearForBlank(s);
	purge_inner(obj);
	obj.innerHTML = '<nobr><img src="'+globalPATH+f+'" class="qC">'+s;
	if (id!='' && val!='') {
		var menu_frame = top.main;
		if (menu_frame) {
			id=menu_frame.document.getElementById('vec_'+id);
			if (id) {id.alt=val;}
		}
	}
}

function insertPlatform(obj, s) {
	var p='';
	for(var i=0;i<_dyn['platform'].length;i++) {
		if ( s.toLowerCase().indexOf(_dyn['platform'][i][0])!=-1 ) { p=_dyn['platform'][i][1]; }
	}
	if (p!='') { insertImage(obj, p, 0); }
}

function insertTableBar(obj, p) {
	p=parseInt(p,10);
	var f=Math.round(p/10);
	var str='<nobr><img src="'+globalPATH+'images/m'+f+'.gif"> '+p+'%';
	purge_inner(obj);
	obj.innerHTML = str;
}

function insertTableBarLong(obj, b,p) {
	p=parseInt(p,10);
	var f=Math.round(p/10);
	if (f>10) {f=10;}
	var str='<img src="'+globalPATH+'images/m'+f+'.gif">';
	var s='<table border="0" cellpadding="0" cellspacing="0" width="170"><tr>'
		+'<td align="right" nowrap="nowrap" width="50%">'+b+'</td>'
		+'<td class="qD">'+str+'</td>'
		+'<td align="left" nowrap="nowrap" width="50%">'+p+'%</td>'
		+'</tr></table>';
	purge_inner(obj);
	obj.innerHTML = s;
}

function insertDetails(obj, str){
	purge_inner(obj);
	obj.innerHTML='<a href="#none" class="q4" onmouseover="callTip(\'open_details\',event)" onmouseout="callTip()"' 
	+' onclick="open_details(\'/vz/cp/core/tasks/details-popup?id='+str+'\',\'\')"><nobr>'
	+'<img src="'+globalPATH+'icons/file_16.gif" class="qC"><font class="q5">'
	+_dyn['details']+'</font></a>';
}

function insertTableText(obj, str){
	str=clearForBlank(str);
	purge_inner(obj);
	obj.innerHTML=str;
}

function insertApps(obj, str){
	var url='/vz/cp/vzdir/infrman/templates/ez/app?path=reset&type=app&app-id=%app;&hn-eid=%hid;';
	var s='';
	str=str.split('|');
	if (str.length>1) {
		url=url.replace('%hid;',str[0]);
		var name='';
		for (var i=1;i<str.length;i++) {
			if (str[i].trim()!='') {
				str[i]=str[i].trim();
				var ts=str[i].split('/');
				if (ts.length>1) {name=ts[ts.length-2];} else {name=ts[0];}
				if (s!='') {s+='<br>';}
				s+='<a href="'+url.replace('%app;',encode64(str[i]))+'">'+name+'</a>';
			}
		}
	}
	if (s=='') {s='<span class="inactive">'+_js['dyn_no_apps']+'</span>';}
	purge_inner(obj);
	obj.innerHTML=s;
}

function changeStatus(obj, s, t, eid, val) {
	if (s.trim()=='') { return; }
	var new_img = globalPATH + s;
	var new_htm = obj.innerHTML;
	var tmp;
	if (new_htm.indexOf('src=')==-1) {tmp = new_htm.split('SRC="');} else {tmp = new_htm.split('src="');}
	new_htm = tmp[0];
	var i = tmp[1].indexOf('"');
	new_htm += 'src="' + new_img + '"' + tmp[1].substr(i);
	purge_inner(obj);
	obj.innerHTML = new_htm;
	if (t) {obj.title=t;}

	//---put new state value;
	if (eid!='') {
		if (eid.substr(0,4)=='eid=') {
			eid=eid.split(',');
			eid=eid[0].split('=');
			eid=decode64(eid[1].trim());
		}
		eid = eid.trim();
		var menu_frame = top.menu;
		if (menu_frame) {
			var o = menu_frame.document.getElementsByTagName('span');
			if (o.length!='undefined') {
				for(var ii=0;ii<o.length;ii++) {
					if (o[ii].id.indexOf(eid)!=-1) {
						if (o[ii].firstChild.nextSibling) {
							purge_inner(o[ii].firstChild.nextSibling);
							o[ii].firstChild.nextSibling.innerHTML=val;
						}
					}
				}
			}
		}
		
	}
}

function DynDraw(){

	if (Dyn==null) {return false;}
	if (typeof Dyn.length == 'undefined') {return false;}

	DynDrawHead();

	if (Dyn.length < 1) {return false;}
	
	DynDrawLeft();
	DynDrawLeftAlerts()
	DynRefreshLeft();
	
	DynDrawList();

	DynInsertTask();
	DynDrawTask();

	DynLocalObject();
}


function DynDrawHead() {
	var main_frame = top.taskbar;
	var b=null;
	if ( main_frame ) {	b = main_frame.document.getElementById('task_string'); }
	if (!b) { return; }
	var str='';
	if (parseInt(Dyn_counter,10)>0) {
		str=_dyn['tasks_found'];
		str=str.replace(/%count%/g,Dyn_counter);
	} else {str=_dyn['no_tasks'];}
	purge_inner(b);
	b.innerHTML=str;
}


function convButState(p,name,state){
	var parr=p.document.getElementsByName(name);
	if (parr.length>0) {for (var zz=0;zz<parr.length;zz++) {parr[zz].style.display=state;}}
}


function DynLocalObject(){
	var frame=top.main;
	if (!frame) frame=top.workFrame;
	if (frame) {
		var ve_id='';
		var id=frame.document.getElementById('current-ve-eid');
		if (id) { ve_id=id.value; }

		var hn_id='';
		var hid=frame.document.getElementById('current-hn-eid');
		if (hid) { hn_id=hid.value; }

		var ve_sum=false;
		var id_type=frame.document.getElementById('current-summary-type');
		if (id_type) { if (id_type.value=='ve_summary') {ve_sum=true;} }

		if (ve_id!='' || hn_id!='') {
			for (var i=0;i<Dyn.length;i++) {
				if (Dyn[i]!='') {
					var d = Dyn[i].split(Dyn_delimiter);
					if (d.length<20) { for(var ii=d.length;ii<20;ii++) {d[ii]='';} }
					var d_id = d[0];
					var d_type = d[1];

					switch (d_type) {
					case 'eid':
						if (d_id==ve_id && ve_id!='') {
						
							if (d[4]!='') {
								var a='';
								var b='';
								var parr;
								//---turn off all;
								for(var z=0;z<buttons_arr.length;z++) {
									convButState(frame,buttons_arr[z][0]+'_off','block')
									convButState(frame,buttons_arr[z][0]+'_on','none')
								}
								//---turn on allowed;
								var c='|'+d[4]+'|';
								for(var z=0;z<buttons_arr.length;z++) {
									if (buttons_arr[z][1].indexOf(c)!=-1) {
										convButState(frame,buttons_arr[z][0]+'_off','none')
										convButState(frame,buttons_arr[z][0]+'_on','block')
									}
								}
							}
							
							var d_stat = '';
							if (d[4]!='' && typeof status_arr[d[4]] != 'undefined') {d_stat=status_arr[d[4]];}

							var d_status = '';
							if (d_stat!='' && typeof _dyn[d_stat] != 'undefined') {d_status=_dyn[d_stat];}

							var d_status_line = '';
							if (typeof _dyn['s'+d[4]] != 'undefined') {d_status_line=_dyn['s'+d[4]];}

							//--summary;
							if (ve_sum) {
								var d_title = d[2];
								var d_host = d[3];
								var d_cpu = d[5];
								var d_memory = d[7];
								var d_disk = d[6];
								var d_disk_before = 'before';

								var d_parent = d[10];
								var d_ve_id = d[11];
								var d_ve_ips = d[12];
								var d_ve_template = d[13];
								var d_desc = d[14];
								var d_applications = conv_toDOM(d[18]);

								var d_alert = '';
								if (typeof _dyn['a'+d[8]] != 'undefined') {d_alert=_dyn['a'+d[8]];}

								var d_enabled = '';
								if (typeof _dyn['e'+d[9]] != 'undefined') {d_enabled=_dyn['e'+d[9]];}

								var c_ve_status=frame.document.getElementById('ve_summary_status');
								var c_ve_status_disabled=frame.document.getElementById('ve_summary_status_disabled');
								var c_alert=frame.document.getElementById('ve_summary_alert');
								var c_parent=frame.document.getElementById('ve_summary_hn-link_icon-text');

								var c_title=frame.document.getElementById('ve_summary_name_text');
								var c_desc=frame.document.getElementById('ve_summary_description_text');
								var c_ve_id=frame.document.getElementById('ve_summary_id_text');
								var c_ve_template=frame.document.getElementById('ve_summary_sample_text');

								var c_host=frame.document.getElementById('ve_summary_host_text');
								var c_applications=frame.document.getElementById('ve_summary_applications_text');

								var c_cpu=frame.document.getElementById('ve_summary_cpu_text');
								var c_memory=frame.document.getElementById('ve_summary_memory_text');
								var c_disk=frame.document.getElementById('ve_summary_disk_text_meter');

								if (c_ve_status_disabled) { insertTableText( c_ve_status_disabled, d[9]==1?_dyn['disabled']:'' ); }
								if (c_ve_status && d_status!='') { insertStatus( c_ve_status, d_status, d_status_line, '', '' ); }
								if (c_alert && d_alert!='') { insertImage( c_alert, d_alert, 1 ); }
								if (c_parent && d_parent!='') { insertTableText( c_parent, d_parent ); }

								if (c_title && d_title!='') {
									parent.title = d_title;
									insertTableText( c_title, d_title );
								}
								if (c_desc && d_desc!='') { insertTableText( c_desc, d_desc ); }
								if (c_ve_id && d_ve_id!='') { insertTableText( c_ve_id, d_ve_id ); }
								if (c_ve_template && d_ve_template!='') { insertTableText( c_ve_template, d_ve_template ); }

								if (c_host && d_host!='') { insertTableText( c_host, d_host ); }
								if (c_applications && d_applications!='') { insertApps( c_applications, d_applications ); }

								if (c_cpu>0 && d_cpu!='') { insertTableBarLong( b.rows[ii].cells[c_cpu], '&nbsp;', d_cpu ); }
								if (c_memory>0 && d_memory!='') { insertTableBarLong( b.rows[ii].cells[c_memory], '&nbsp;', d_memory ); }
								if (c_disk>0 && d_disk!='') { insertTableBarLong( b.rows[ii].cells[c_disk], d_disk_before, d_disk ); }

							}
							
						} //---eid id if;
						break;
						
					case 'hid':
						if (d_id==hn_id && hn_id!='') {
								var d_stat_val = d[3];
								var d_status = '';
								if (typeof _dyn['list-hn-'+d[3]] != 'undefined') {d_status=_dyn['list-hn-'+d[3]];}

								var d_status_line = '';
								if (typeof _dyn['hn-'+d[3]] != 'undefined') {d_status_line=_dyn['hn-'+d[3]];}

								var d_alert = '';
								if (typeof _dyn['a'+d[7]] != 'undefined') {d_alert=_dyn['a'+d[7]];}
						
								var c_hn_status=frame.document.getElementById('hn_summary_status');
								var c_hn_alert=frame.document.getElementById('hn_summary_alert');

								if (c_hn_status && d_status!='') { insertStatus( c_hn_status, d_status, d_status_line, '', '' ); }
								if (c_hn_alert && d_alert!='') { insertImage( c_hn_alert, d_alert, 1 ); }

						} //---hid id if;
						break;
					}
				}
			}//--for;
		}
	}
}


function conv_toDOM(s){
	s=s.replace(/&lt;/g,'<');
	return s.replace(/&gt;/g,'>');
}


function DynInsertTask(){
	var child='xsl-child.';
	var main_frame = top.taskbar;
	var b=null;
	if ( main_frame ) {	b = main_frame.document.getElementById('global_list'); }
	if (!b) { return; }

	var c_details = 5;

	for (var i=0;i<Dyn.length;i++) {
		if (Dyn[i]!='') {
			var d = Dyn[i].split(Dyn_delimiter);
			if (d.length<18) { for(var ii=d.length;ii<18;ii++) {d[ii]='';} }
			var d_id = d[0];
			var d_type = d[1];

			//---check for child;
			if (d_id.indexOf(child)!=-1) {
				Dyn[i].replace(Dyn_delimiter+'newtask'+Dyn_delimiter,Dyn_delimiter+'task'+Dyn_delimiter);
				d_type = 'task';
			}


			switch (d_type) {
			case 'newtask':
			
				var found=false;
				for (var ii=1;ii<b.rows.length;ii++) {
					//---search id in Details cells;
					if ( b.rows[ii].cells[c_details].innerHTML.indexOf( d_id )!=-1 ) {
						Dyn[i].replace(Dyn_delimiter+'newtask'+Dyn_delimiter,Dyn_delimiter+'task'+Dyn_delimiter);
						ii=b.rows.length;
						found=true;
					}
				}

				if (!found) {
					var d_started = d[2];
					var d_operation = d[3];
					if (d_operation!='' && typeof _dyn[d_operation] != 'undefined') {d_operation=_dyn[d_operation];}

					var d_message = d[4];
					if (d_message.indexOf('|')!=-1) {d_message=d_message.split('|');d_message=d_message[0];}

					var d_object = conv_toDOM(d[5]);
					var d_details = d[7];
					var d_class = 'evenrow';
					
					var d_oper_icon = _dyn['task-bar0'];
					if (d[6]!='' && typeof _dyn['task-bar'+d[6]] != 'undefined') {d_oper_icon=_dyn['task-bar'+d[6]];}

					var d_status = _dyn['stask-bar0'];
					if (d[6]!='' && typeof _dyn['stask-bar'+d[6]] != 'undefined') {d_status=_dyn['stask-bar'+d[6]];}
				
					if ( b.rows && b.rows.length>0 ) {
						//--get class;
						if (b.rows.length>1) {
							if (b.rows[1].className=='oddrow') {d_class='evenrow';} else {d_class='oddrow';}
						}

						//--insert first;
						var x = b.insertRow(1);
						var cells = b.rows[0].cells.length;
	
						newCell=x.insertCell(0); insertTableText( newCell, d_started!=''?('<nobr>'+d_started):'' ); newCell.style.paddingLeft='10px';
						newCell=x.insertCell(1); insertTableText( newCell, d_operation!=''?d_operation:'' );
						newCell=x.insertCell(2); insertTableText( newCell, d_message!=''?d_message:'' );
						newCell=x.insertCell(3); insertTableText( newCell, d_object!=''?d_object:'' );
						newCell=x.insertCell(4); insertStatus( newCell, d_oper_icon, d_status, '', '' );
						newCell=x.insertCell(5); insertDetails( newCell, d_details );
							
						b.rows[1].className = d_class;

						//--delete last;
						if (b.rows.length>Dyn_Max_Len+1) { b.deleteRow(b.rows.length-1); }
					}
				}//--found;

			}//--switch;
		}
	}
}


function DynDrawTask(){

	var main_frame = top.taskbar;
	if (main_frame) {

		var b = main_frame.document.getElementById('global_list');
		if (b) {
			if ( b.rows && b.rows.length>0 ) {

				var c_operation = 1;
				var c_message = 2;
				var c_object = 3;
				var c_status = 4;
				var c_details = 5;
				
				for (var i=0;i<Dyn.length;i++) {
					if (Dyn[i]!='') {
						var d = Dyn[i].split(Dyn_delimiter);
						if (d.length<17) { for(var ii=d.length;ii<17;ii++) {d[ii]='';} }
						var d_id = d[0];
						var d_type = d[1];

						switch (d_type) {
						case 'task':
						
							for (var ii=1;ii<b.rows.length;ii++) {
								//---search id in Details cells;
								if ( b.rows[ii].cells[c_details].innerHTML.indexOf( d_id )!=-1 ) {

									var d_operation = d[3];
									if (d_operation!='' && typeof _dyn[d_operation] != 'undefined') {d_operation=_dyn[d_operation];}

									var d_message = d[4];
									if (d_message.indexOf('|')!=-1) {d_message=d_message.split('|');d_message=d_message[0];}

									var d_object = conv_toDOM(d[5]);
				
									var d_oper_icon = '';
									if (d[6]!='' && typeof _dyn['task-bar'+d[6]] != 'undefined') {d_oper_icon=_dyn['task-bar'+d[6]];}

									var d_status = '';
									if (d[6]!='' && typeof _dyn['stask-bar'+d[6]] != 'undefined') {d_status=_dyn['stask-bar'+d[6]];}

									if (d_operation!='') { insertTableText( b.rows[ii].cells[c_operation], d_operation ); }
									if (d_message!='') { insertTableText( b.rows[ii].cells[c_message], d_message ); }
									if (d_object!='') { insertTableText( b.rows[ii].cells[c_object], d_object ); }

									if (d_oper_icon!='') {insertStatus( b.rows[ii].cells[c_status], d_oper_icon, d_status, '', '' );}
								}
							}
							break;
						}
					}
				}//--for;
			}
		}//--if (b);
	}
}


function DynDrawList(){	//---main lists;

	var main_frame = top.main;
	if (main_frame) {

		var b = main_frame.document.getElementById('global_list');
		if (b) {
			if ( b.rows && b.rows.length>0 ) {
				var c_title = getCellNum(b,'title');
				var c_host = getCellNum(b,'hostname');
				var c_ve_status = getCellNum(b,'ve-status');
				var c_hn_status = getCellNum(b,'hn-status');
				var c_task_status = getCellNum(b,'task-status');
				var c_desc = getCellNum(b,'description');
				var c_cpu = getCellNum(b,'env-cpu');
				var c_disk = getCellNum(b,'env-disk');
				var c_memory = getCellNum(b,'env-memory');
				var c_alert = getCellNum(b,'alert-type');
				var c_enabled = getCellNum(b,'ve-enabled');
				var c_parent = getCellNum(b,'env-parent');
				var c_ve_id = getCellNum(b,'id-int');
				var c_ips = getCellNum(b,'sort=ips');
				var c_ve_template = getCellNum(b,'ve-template');
				var c_platform = getCellNum(b,'platform-os');
				var c_ve_arch = getCellNum(b,'ve-arch');
				var c_base_set = getCellNum(b,'base_set');

				for (var i=0;i<Dyn.length;i++) {
					if (Dyn[i]!='') {
						var d = Dyn[i].split(Dyn_delimiter);
						if (d.length<20) { for(var ii=d.length;ii<20;ii++) {d[ii]='';} }
						var d_id = d[0];
						var d_type = d[1];

						switch (d_type) {
						case 'eid':

							//---(ii=1) - skip head in for;
							for (var ii=1;ii<b.rows.length;ii++) {
								//---search id in Checkbox cells;
								if ( b.rows[ii].cells[0].innerHTML.indexOf( d_id )!=-1 ) {

									var d_stat_val = d[4];
									var d_stat = '';
									var d_status = '';
									if (d[4]!='' && typeof status_arr[d[4]] != 'undefined') {d_stat=status_arr[d[4]];}
									if (d_stat!='' && typeof _dyn[d_stat] != 'undefined') {d_status=_dyn[d_stat];}

									var d_status_line = '';
									if (typeof _dyn['s'+d[4]] != 'undefined') {d_status_line=_dyn['s'+d[4]];}

									var d_title = d[2];
									var d_host = d[3];
									var d_cpu = d[5];
									var d_disk = d[6];
									var d_memory = d[7];
									var d_parent = d[10];
									var d_ve_id = d[11];
									var d_ve_ips = d[12];
									var d_ve_template = d[13];
									var d_desc = d[14];
									var d_platform = d[15];
									var d_ve_arch = d[16];
									var d_base_set = d[17];

									var d_alert = '';
									if (typeof _dyn['a'+d[8]] != 'undefined') {d_alert=_dyn['a'+d[8]];}

									var d_enabled = '';
									if (typeof _dyn['e'+d[9]] != 'undefined') {d_enabled=_dyn['e'+d[9]];}

									if (c_title>0 && d_title!='') { insertIntoA( b.rows[ii].cells[c_title], d_title ); }
									if (c_host>0 && d_host!='') { insertIntoA( b.rows[ii].cells[c_host], d_host ); }
								
									if (c_cpu>0 && d_cpu!='') { insertTableBar( b.rows[ii].cells[c_cpu], d_cpu ); }
									if (c_disk>0 && d_disk!='') { insertTableBar( b.rows[ii].cells[c_disk], d_disk ); }
									if (c_memory>0 && d_memory!='') { insertTableBar( b.rows[ii].cells[c_memory], d_memory ); }

									if (c_alert>0 && d_alert!='') { insertImage( b.rows[ii].cells[c_alert], d_alert, 0 ); }
									if (c_enabled>0 && d_enabled!='') { insertImage( b.rows[ii].cells[c_enabled], d_enabled, 0 ); }

									if (c_ve_status>0 && d_status!='') { insertStatus( b.rows[ii].cells[c_ve_status], d_status, d_status_line, d[0], d_stat_val ); }
									if (c_parent>0 && d_parent!='') { insertTableText( b.rows[ii].cells[c_parent], d_parent ); }

									if (c_ve_id>0 && c_title>0 && d_ve_id!='') { insertCreateA( b.rows[ii].cells[c_ve_id], b.rows[ii].cells[c_title], d_ve_id ); }
									if (c_desc>0 && d_desc!='') { insertTableText( b.rows[ii].cells[c_desc], d_desc ); }
									
									if (c_ips>0 && d_ve_ips!='') { insertTableText( b.rows[ii].cells[c_ips], d_ve_ips ); }
									if (c_ve_template>0 && d_ve_template!='') { insertTableText( b.rows[ii].cells[c_ve_template], d_ve_template ); }

									if (c_platform>0 && d_platform!='') { insertPlatform( b.rows[ii].cells[c_platform], d_platform ); }
									if (c_ve_arch>0 && d_ve_arch!='') { insertTableText( b.rows[ii].cells[c_ve_arch], d_ve_arch ); }
									if (c_base_set>0 && d_base_set!='') { insertTableText( b.rows[ii].cells[c_base_set], d_base_set ); }

								}
							} //- end for ii;
							break;
						
						case 'hid':


							//---(ii=1) - skip head in for;
							for (var ii=1;ii<b.rows.length;ii++) {
								//---search id in Checkbox cells;
								if ( b.rows[ii].cells[0].innerHTML.indexOf( d_id )!=-1 ) {

									var d_stat_val = d[3];
									var d_status = '';
									if (typeof _dyn['list-hn-'+d[3]] != 'undefined') {d_status=_dyn['list-hn-'+d[3]];}

									var d_status_line = '';
									if (typeof _dyn['hn-'+d[3]] != 'undefined') {d_status_line=_dyn['hn-'+d[3]];}

									var d_title = d[2];
									var d_cpu = d[4];
									var d_disk = d[5];
									var d_memory = d[6];
									var d_hn_ips = d[8];

									var d_alert = '';
									if (typeof _dyn['a'+d[7]] != 'undefined') {d_alert=_dyn['a'+d[7]];}

									if (c_host>0 && d_title!='') { insertIntoA( b.rows[ii].cells[c_host], d_title ); }

									if (c_cpu>0 && d_cpu!='') { insertTableBar( b.rows[ii].cells[c_cpu], d_cpu ); }
									if (c_disk>0 && d_disk!='') { insertTableBar( b.rows[ii].cells[c_disk], d_disk ); }
									if (c_memory>0 && d_memory!='') { insertTableBar( b.rows[ii].cells[c_memory], d_memory ); }

									if (c_alert>0 && d_alert!='') { insertImage( b.rows[ii].cells[c_alert], d_alert, 0 ); }
									if (c_ips>0 && d_hn_ips!='') { insertTableText( b.rows[ii].cells[c_ips], d_hn_ips ); }

									if (c_hn_status>0 && d_status!='') { insertStatus( b.rows[ii].cells[c_hn_status], d_status, d_status_line, d[0], d_stat_val ); }
								}
							} //- end for ii;
							break;

						case 'task':

							//---(ii=1) - skip head in for;
							for (var ii=1;ii<b.rows.length;ii++) {
								//---search id in Checkbox cells;
								if ( b.rows[ii].cells[0].innerHTML.indexOf( d_id )!=-1 ) {

									var d_oper_icon = '';
									if (typeof _dyn['task-bar'+d[6]] != 'undefined') {d_oper_icon=_dyn['task-bar'+d[6]];}
									var d_operation = '';
									if (typeof _dyn['stask-bar'+d[6]] != 'undefined') {d_operation=_dyn['stask-bar'+d[6]];}

									if (c_task_status>0 && d_oper_icon !='') {insertStatus( b.rows[ii].cells[c_task_status], d_oper_icon, d_operation, '', '' );}
								}
							} //- end for ii;
							break;

						} //- end switch;

					} //- end if Dyn
				} //- end for i;

			} //- end if b.tBodies

		}
	}

}


function DynDrawLeftAlerts(){ //---left menu alerts draw;

	var menu_frame = top.menu;
	if (menu_frame) {

		for (var i=0;i<Dyn.length;i++) {
			if (Dyn[i]!='') {
				var d = Dyn[i].split(Dyn_delimiter);
				if (d.length<9) { for(var ii=d.length;ii<9;ii++) {d[ii]='';} }
				var d_id = d[0].trim();
				var d_type = d[1];
				var d_alert = '';
				var d_name = '_alert_'+d_id;
					
				switch (d_type) {
					case 'eid':
						if (typeof _dyn['a_l'+d[8]] != 'undefined') {d_alert=_dyn['a_l'+d[8]];}
						if (d_alert!='' || d[8]=='0') {
							var o = menu_frame.document.getElementsByTagName('span');
							if (o.length!='undefined') {
								for(var ii=0;ii<o.length;ii++) {
									if (o[ii].id.indexOf(d_name)!=-1) {
										if (d[8]=='0') {
											purge_inner(o[ii].firstChild);
											o[ii].firstChild.innerHTML='';
										} else {insertImage(o[ii].firstChild, d_alert, 0);}
									}
								}
							}
						}
						break;

					case 'hid':
						if (typeof _dyn['a_l'+d[7]] != 'undefined') {d_alert=_dyn['a_l'+d[7]];}
						if (d_alert!='' || d[7]=='0') {
							var o = menu_frame.document.getElementsByTagName('span');
							if (o.length!='undefined') {
								for(var ii=0;ii<o.length;ii++) {
									if (o[ii].id.indexOf(d_name)!=-1) {
										if (d[7]=='0') {
											purge_inner(o[ii].firstChild);
											o[ii].firstChild.innerHTML='';
										} else {insertImage(o[ii].firstChild, d_alert, 0);}
									}
								}
							}
						}
						break;
				}
			}
		} //-- end for;
	}
}


function DynDrawLeft(){	//---left menu;

	DynRefresh.length = 0;
	var menu_frame = top.menu;
	if (menu_frame) {
	
		var ein = 0;
		var s = '';
		var o = menu_frame.document.getElementsByTagName('a');
		if (o.length!='undefined') {
			for (var i=0;i<Dyn.length;i++) {
				if (Dyn[i]!='') {
					var d = Dyn[i].split(Dyn_delimiter);
					if (d.length<5) { for(var ii=d.length;ii<5;ii++) {d[ii]='';} }
					var d_type = d[1];
					var d_title = d[2];
					var d_vt = d[18]; //VZA-type
					var d_stat = ''; //status shortname
					var d_status = ''; //path to icon
					var d_stat_val = d[4];
					if (d[4]!='' && typeof status_arr[d[4]] != 'undefined') {d_stat=status_arr[d[4]];}

					var d_status_line = '';
					if (typeof _dyn['s'+d[4]] != 'undefined') {d_status_line=_dyn['s'+d[4]];}
					switch(d_type){
					case 'hid':
						d_stat_val = d[3];
						if (typeof _dyn['lf-hn-'+d[3]] != 'undefined') {d_status=_dyn['lf-hn-'+d[3]];}
						if (typeof _dyn['hn-'+d[3]] != 'undefined') {d_status_line=_dyn['hn-'+d[3]];}
						//---no break here!
					case 'eid':
						if (d_stat!='' && typeof _dyn['lf-'+d_stat] != 'undefined') {
							d_status=icon_prefix+_dyn['lf-vt-pr-'+d_vt]+'_'+_dyn['lf-pr-'+d_stat] + icon_postfix;	
						}
						for(var ii=0;ii<o.length;ii++) {
							var ct = new String(o[ii].oncontextmenu);

							//--- VE in HN;
							if (ct.indexOf(d[0])!=-1) {
								if (o[ii].innerHTML.indexOf('<img')==-1 && o[ii].innerHTML.indexOf('<IMG')==-1) {
									//---link here;
									if (d_title!='') {
										purge_inner(o[ii]);
										o[ii].innerHTML = d_title;
									}
								} else {
									//---image here;
									if (d_status!='') {changeStatus(o[ii],d_status,d_status_line,d[0],d_stat_val);}
								}
							} else {

							//--- VE in Folder;
								ein = ct.indexOf('eid=');
								if (ein!=-1) {
									s = decode64( ct.substr( ein+4, ct.indexOf(',',ein+4)-ein-4 ) );
									if (s.indexOf(d[0])!=-1) {
										if (o[ii].innerHTML.indexOf('<img')==-1 && o[ii].innerHTML.indexOf('<IMG')==-1) {
											//---link here;
											if (d_title!='') {
												purge_inner(o[ii]);
												o[ii].innerHTML = d_title;
											}
										} else {
											//---image here;
											if (d_status!='') {changeStatus(o[ii],d_status,d_status_line,d[0],d_stat_val);}
										}
									}
								}
							
							}

						} //- end for ii;
						break;

					case 'refresh':
						//--- check for parent;
						var ref_ins=true;
						if (d[3]!='delete') {
							for(var f=0;f<DynRefresh.length;f++) {
								var df = DynRefresh[f].split(Dyn_delimiter);
								if (df.length<5) { for(var ii=df.length;ii<5;ii++) {df[ii]='';} }
								if (df[3]==d[3] && df[4]==d[4]) {ref_ins=false;}
							}
						}
						if (ref_ins) {DynRefresh[DynRefresh.length]=Dyn[i];}
						break;
						
					}
				}

			} //- end for i;
		}

	} //- end if;

}


function refLeftItem(eid){
	if (eid=='') {return;}
	var menu_frame = top.menu;
	if (menu_frame) {
		var o = menu_frame.document.getElementsByTagName('img');
		for (var i=0;i<o.length;i++) {
			var s=new String(o[i].onclick);
			if (s.indexOf('treeClick(')!=-1) {
				var t=s.split('treeClick(');
				var lid=t[1].split(')');
				t=t[1].split(',');
				t=t[0].split('=');
				if (t[1]!=''){
					var id=decode64(t[1]);
					if (id==eid) { menu_frame.callListedJS('','','refresh_node()',eClear(lid[0],false),'','','not_open'); }
				}
			}
		}
	}
}


function delLeftItem(eid){
	if (eid=='') {return;}
	var menu_frame = top.menu;
	if (menu_frame) {
		var o = menu_frame.document.getElementsByTagName('table');
		for (var i=0;i<o.length;i++) {
			var t=o[i].id;
			var a=t.split('_');
			a=a.length>0?a[a.length-1]:'';
			t=t.split(',');
			t=t[0].split('=');
			if (t[1]!='' || a!=''){
				var id=decode64(t[1]);
				if (id==eid || a==eid) {
					var p = o[i].parentNode;
					p.removeChild(o[i]);
				}
			}
		}
	}
}


function reloadLeftGroup(tree_id){
	var menu_frame = top.menu;
	if (menu_frame) {
		var fu = menu_frame.document.getElementById('dynamic_units_'+tree_id);
		var fc = menu_frame.document.getElementById('dynamic_clock_'+tree_id);

		if (fu && fc) {
			fu.style.display='none';
			fc.style.display='block';

			var request = AJAXRequest();
			if (!request) { return false; }
			var url = '/vz/cp/farmdir/unitman/units/tree-dynamic?id='+encode64(tree_id)+'&level=1&tree-id='+tree_id;

			request.onreadystatechange = function() { receiveLeftGroup(request,tree_id) }
			request.open( 'GET', secureURI(url), true );
			request = AJAXRequestHeader( request, '' );
		}
	}
}


function receiveLeftGroup(request,tree_id){
	if ( request.readyState == 4 ) {
		if ( request.status == 200 ) {
			var response = request.responseText;
			var menu_frame = top.menu;
			if (menu_frame) {
				var fu = menu_frame.document.getElementById('dynamic_units_'+tree_id);
				var fc = menu_frame.document.getElementById('dynamic_clock_'+tree_id);
				if (fu && fc){
					purge_inner(fu);
					fu.innerHTML=response;
					fu.style.display='';
					fc.style.display='none';
					setTimeout("refreshLeftDIV('dynamic_units_"+tree_id+"')");
				}
			}
		}
	}
}


function refreshLeftDIV(id) {
	var menu_frame = top.menu;
	if (menu_frame) {
		var o = menu_frame.document.getElementById(id);
		if (o) {
			var s=o.innerHTML;
			if (s.length<100) {
				s='';
				o.style.display='none';
				purge_inner(o);
				o.innerHTML=s;
			}
		}
	}
}


function DynRefreshLeft(){	//---left menu;

	if (DynRefresh.length < 1) {return false;}

	var menu_frame = top.menu;
	if (menu_frame) {
	
		var refLeft=true;
		for (var i=0;i<DynRefresh.length;i++) {
			if (DynRefresh[i]!='') {
				var d = DynRefresh[i].split(Dyn_delimiter);
				if (d.length<5) { for(var ii=d.length;ii<5;ii++) {d[ii]='';} }
				if (d[2].trim()=='') {d[2]='virtuozzo';}

				switch (d[2]) {
					case 'virtuozzo':
						switch (d[3]) {
							case 'add': refLeftItem(d[4]); break;
							case 'delete': delLeftItem(d[0]); break;
						}
						break;
					case 'generic':
						switch (d[3]) {
							case 'refresh':
								if (refLeft) {
									var task_frame = top.taskbar;
									if (task_frame) { task_frame.location.reload(true); }
								}
								//--no break!
							case 'add':
							case 'delete':
								if (refLeft) {
									reloadLeftGroup(logicalDN);
									reloadLeftGroup(infraDN);
									refLeft=false;
								}
								break;
						}
				}

			}
		} //--- END for;
	}
}


//--- AJAX container

var IsOnWork = false;
var JavaStream = new Array;
var java_current = new Object;
var Allow_tooltips = false;

if (self.name=='') setInterval('java_monitor()',600);


function secureURI(s) {
	return s.replace(/\+/g,encodeURIComponent('+'));
}


function java_refresh(obj,info) {

	if (self.name==''&&obj.button!='') {

		var s='<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td class="StatusBar">';
		s+='<table class="';
		s+=obj.error?'ErrorBarNew':'StatusBarNew';
		s+='" border="0" cellpadding="0" cellspacing="0" width="100%"><tr>';

		var tmp=info!=1||JavaStream.length>0?'java_ind':'java_ico';
		if (obj.error) {tmp='java_err';}

		s+='<td width="28px"><div class="'+tmp+'"></div></td>';
		s+='<td class="MsgBarMsg">';

		if (!obj.error) {
			tmp=info==1?_js['js_one_scheduled']:_js['js_one_to_server'];
			if (JavaStream.length > 0) {
				tmp+=' '+_js['js_one_remain'].replace(/%count/,JavaStream.length);
			}
			tmp=tmp.replace(/%operation/,_js[obj.button]?(_js[obj.button]):obj.button);
			s+=tmp;
		}
		s+=obj.details;
		
		s+='</td></tr></table></td></tr></table>';
		obj.error=0;

		//--- refresh main screen;
		var frame=top.main;
		if (!frame) frame=top.workFrame;
		if (!frame||dDBG) return;
		
		var o=frame.document.getElementById('opresult_id');
		if (o) {
			purge_inner(o);
			o.innerHTML='<div oncontextmenu="if (G_event.ctrl) {top.dDBG=true;}">'+s+'</div>';
			o.style.display='block';
		}
	}
}

function java_monitor() {
	if (self.name=='' ) {

		//--- run next;
		if ( !IsOnWork && JavaStream.length > 0 ) {
			var a=JavaStream.shift();
			if ( a.url.indexOf('?')!=-1 ) { a.url=a.url+'&skip-redir=true'; } else { a.url=a.url+'?skip-redir=true'; }
			java_current=a;
			loadAJAX( a.url, a.req, '', a.post );
		}
	}
}

function java_put( URL, req, id, button, name, post ) {

	var a=new Object();
	a.url=URL;
	a.req=req;
	if (typeof(name)=='undefined') name='';
	a.name=name;
	a.details='';

	var d=new Date();
	a.rand=d.getTime();

	if (typeof(button)=='undefined'||button=='') button=URL;
	if (button.indexOf('?')!=-1) {
		var end=button.indexOf('=');
		button=button.substring(button.indexOf('?')+1,end);
	}

	a.post=req=='POST'?getPostData():'';
	a.button=button;

	parent.JavaStream.push(a);
	parent.java_refresh(a,0);
}

function loadAJAX( URL, req, id, post ) {

	if (IsOnWork) { return false; }

	var request = AJAXRequest();
	if (!request) { return false; }

	IsOnWork = true;

	var params = '';
	if (req=='POST') { params=post?post:getPostData(); }

	document.body.style.cursor = 'progress';
	request.onreadystatechange = function() { loadResult( request, id ); }

	if (URL.indexOf('?')!=-1) { URL+='&'; } else { URL+='?'; }
	URL += params;

	request.open( req=='POST'?'POST':'GET', secureURI(URL), true );
	request = AJAXRequestHeader( request, '' );
}

function getPostData() {

	var frame = parent.main; //---vzcc check;
	if (!frame) { frame=parent.workFrame; } //---plesk check;
	if (!frame) { return; }
	
	var params='';
	var ids='';
	var data='';

	var tags=new Array('input','select');

	for (var t=0;t<tags.length;t++) {
		ids = frame.document.getElementsByTagName( tags[t] );
		if (ids.length != 'undefined') {
			for (var i=0;i<ids.length;i++) {
				data = getInputValue(ids[i]);
				if (data!=null&&ids[i].name!='') {
					if (params!='') { params+='&'; }
					params+=ids[i].name+'='+encodeURIComponent( data );
				}
			}
		}
	}
	return params;
}

function loadResult( request, id ) {

	if ( request.readyState == 4 ) {
		document.body.style.cursor = 'default';
		id = document.getElementById(id);
		java_current.details='';
		java_current.error=0;

		if ( request.status == 200 ) {

			//--- receive details;
			var response = request.responseText;
			if (response.indexOf('[details]')!=-1&&response.indexOf('[/details]')!=-1) {
				java_current.details=response.substring( response.indexOf("[details]")+9,response.indexOf("[/details]",response.indexOf("[details]")+9) );
				var s_details=' (<a ';
				if (Allow_tooltips) {s_details+='onmouseover="callTip(\'get_op_details\',event)" onmouseout="callTip()"';}
				s_details+=' href="javascript:open_details(\'/vz/cp/core/tasks/details-popup?id='+java_current.details+'\')">'+_js['details']+'</a>)';
				java_current.details=s_details;
			}

			//--- receive refresh instructions;
			if (response.indexOf('[refresh_id]')!=-1 && response.indexOf('[/refresh_id]')!=-1) {
				var refresh_id=response.substring( response.indexOf("[refresh_id]")+12,response.indexOf("[/refresh_id]",response.indexOf("[refresh_id]")+12) );
				eval(refresh_id);
			}

			//--- set HTML for valid DOM id;
			if ( id ) {
				purge_inner(id);
				id.innerHTML = response;
				if (response.search('<script>')!=-1&&response.search('</script>')!=-1) {
					var scr=response.substring( response.indexOf("<script>")+8,response.indexOf("</script>",response.indexOf("<script>")+8) );
					eval(scr);
				}
			}

		} else {
			java_current.details=parent._js['ajax_se'];
			java_current.error = 1;
			if ( id ) {
				purge_inner(id);
				id.innerHTML = java_current.details;
			}
		}

		java_refresh(java_current,1);
		IsOnWork = false;
	}
}

//--- Event model;

document.onclick = customClick;
document.onmousedown = customClick;
document.onmousemove = customClick;


function customClick(e) {
	if (Dyn_enabled) {runDYN = true;}
	if (!e) e=window.event;
	G_event.shift = e.shiftKey;
	G_event.ctrl = e.ctrlKey;
	G_event.x = e ? e.pageX : window.event.x;
	G_event.y = e ? e.pageY : window.event.y;
	//---hide rc menu in diff frames;
	switch(self.name){
		case 'menu': var main=top.main; if (main && main.hideRightMenu) {main.hideRightMenu();} break;
		case 'main': var menu=top.menu; if (menu && menu.hideRightMenu) {menu.hideRightMenu();} break;
	}
	if(e.type=='mousedown' && !overPOP){hideAllPopup();}
}

function getMouseXY() {
	var Xpos = window.event ? window.event.x : G_event.x-document.documentElement.scrollLeft;
	var Ypos = window.event ? window.event.y : G_event.y-document.documentElement.scrollTop;
	return [Xpos,Ypos];
}

function findPos(obj) {
	obj=document.getElementById(obj);
	if (!obj) return [0,0];

	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
}

function findPosObj(obj) {
	if (!obj) return [0,0];

	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
}


//--- Common func;

var LeftRefresh = new Object;
LeftRefresh.open = '';
LeftRefresh.close = '';
LeftRefresh.x = 0;
LeftRefresh.y = 0;


String.prototype.trim = function() {
	var a = this.replace(/^\s+/, '');
	return a.replace(/\s+$/, '');
}

function eClear(str,p) {
	str=str.replace(/\'/g,' ');
	str=str.replace(/\"/g,' ');
	if (p) {str=str.replace(/=/g,' ');}
	return str.trim();
}

function disableByIdMatch(t,m,s){
	var o = document.getElementsByTagName(t);
	if (o) {
		for (var i=0;i<o.length;i++){
				if(o[i].id.indexOf(m)!=-1){o[i].disabled=s;}
			}
	}
}

function checkShow(id) {
	var o = document.getElementById(id);
	var show = false;
	if (o) {
		show = o.style.display=='block';
		while (o.parentNode && show) {
			if (o.disabled) {show = false;}
			if (o.type && o.type=='hidden') {show = false;}
			if (o.style.display=='none') {show = false;}
			if (o.style.visibility=='hidden') {show = false;}
			o=o.parentNode;
		}
	}
	return show;
}

//"Disable"/"Enable" Browse Button
function disableBB(el, flag){
	var td = el.parentNode;
	if(!td) return false;
	var tdd = document.getElementById(td.id+'_disabled');
	if(!tdd) return false;
	if(flag){
		td.style.display='none';
		tdd.style.display='';
	}else{
		td.style.display='';
		tdd.style.display='none';	
	}
}

function hideDIV(id) {
	var el = document.getElementById(id);
	if (el) {el.style.display = 'none';}
}

function showDIV(id,val) {
	var o=document.getElementById(id);
	if (o) {
		o.style.display = 'block';
		if (val) {
			purge_inner(o);
			o.innerHTML = val;
		}
	}
}

function setDIVxy(id,x,y) {
	var o=document.getElementById(id)
	if (o) {
		if(y){o.style.top = y+"px";}
		if(x){o.style.left= x+"px";}
	}
}

function obj2id(obj){
	if (typeof(obj)=='object') {
		var str=new String(obj.id);
		return str.substr(4);
	} else {return obj;}
}

function getBrowseId(el){
	var p = findAncestor(el, 'DIV');
	if(p){
		if(p.className != 'listContentArea') p = findAncestor(p, 'DIV');
		return p.id;
	}else{
		return false;
	}
}

// find all input fields with in tr

function findRelativeInputs(el_checkbox)
{
	var childInputs = new Array();
	var k=0;
	var parentEl = el_checkbox.parentNode;
  	var parentName = 'TR';
  	
  	while(parentEl.nodeName != parentName) {
  		parentEl = parentEl.parentNode;
  	}
  	
  	var childsNodes = parentEl.getElementsByTagName('INPUT');
  	for (var i=0; i<childsNodes.length; i++) {
  		if (childsNodes[i].type!='checkbox' && childsNodes[i].type!='radio') {
  			childInputs[k] = childsNodes[i];
  			k++;
  		}  
  	}
  	
  	return childInputs;
  	
}

//set checkbox 'checked' for input area
function findObjCheckbox (obj) {
	var objTr = obj.parentNode.parentNode;
	var id=obj2id(objTr);
	if (id.length<1) return;
	var objCheckbox=document.getElementById('vec_'+id);
	return objCheckbox;
}

function selectRow(obj) {
	var objValue = obj.value;
	var objCheckbox=findObjCheckbox(obj);
	
	if (!objCheckbox) return;
	
	if (objValue!='')  objCheckbox.checked = true;
	else objCheckbox.checked = false;
}


function switchInputs(el_checkbox, el_inputs) {
	
	if (!el_checkbox.disabled) {
		if (el_inputs=='') el_inputs = findRelativeInputs(el_checkbox);
		for (var i=0; i<el_inputs.length; i++) {
			el_inputs[i].disabled = !el_checkbox.checked;
		}
	}	
}

//uncheck parent checkbox
function clearCheckAll (id)
{
	var id_checkall = id.substr(0, id.lastIndexOf('_')) + '_checkall';
	if (id!=id_checkall) 
	{
		var u=document.getElementsByName(id_checkall);
		if (u) u[0].checked=false;
	}
}

function cTR(el,check) {
	
	var id=obj2id(el);
	if (id.length<1) return;
	var o=document.getElementById('vel_'+id);
	var c=document.getElementById('vec_'+id);
	var bid = getBrowseId(o);
	var s=o.className;
	if (check && !c.disabled) { c.checked=!c.checked; }
	
	if (c.checked) {
		if (s.substr(s.length-2,2)!='Hi') {o.className=o.className+'Hi';}
		if (bid){dataBinder.BrowseLists[bid].selectedRows[id] = o}
	} else {
		if (s.substr(s.length-2,2)=='Hi') {o.className=s.substr(0,s.length-2);}
		if (bid){delete dataBinder.BrowseLists[bid].selectedRows[id] }
	}
	if (bid){constraintStart(bid)};
	
	if (!c.checked) clearCheckAll (id);
	
	var childInputs = findRelativeInputs(c); 
	//if (childInputs.length>0) switchInputs(c, childInputs);
}

//check if line is checked, if not call abstract check
function cIFTR(el){
	var id=obj2id(el);
	if (id.length<1) return;
	var c=document.getElementById('vec_'+id);
	if (c && !c.disabled && !c.checked) { cTR(el,1); }
}

function rcTR(el,check){
	id=obj2id(el);
	if (id.length<1) return;

	var o=document.getElementById('vel_'+id);
	var c=document.getElementById('vec_'+id);
	var bid = getBrowseId(o);	
	var s=o.className;
	if (!c.disabled){
		c.checked = check?true:false;
		if (c.checked) {
			if (s.substr(s.length-2,2)!='Hi') {o.className=o.className+'Hi';}
			if (bid){dataBinder.BrowseLists[bid].selectedRows[id] = o}			
		} else {
			if (s.substr(s.length-2,2)=='Hi') {o.className=s.substr(0,s.length-2);}
			if (bid){delete dataBinder.BrowseLists[bid].selectedRows[id]}			
		}		
		if (bid){constraintStart(bid)};
		var childInputs = findRelativeInputs(c); 
		//if (childInputs.length>0) switchInputs(c, childInputs);
	}	
}

//click on checkbox
var cON=true;
function cTO(el,check,id_all){
	if (cON && !G_event.ctrl && id_all!='') {
		var u=document.getElementsByName(id_all+'_checkall');
		var d=obj2id(el);
		var c=document.getElementById('vec_'+d);
		if (u && u.length && c) {
			var name=new String(c.name);
			refreshCheck(id_all+'_checkall',name);
		}
	}
	cTR(el,check);
}

//click on radiobutton
function rcTO(el, check){
	var d=obj2id(el);	
	var c=document.getElementById('vec_'+d);	
	if (c){
		data2slave(el);
		refreshRadio(c.id,c.name);
		rcTR(el,check);
	}
}

//click on row without checkbox or radio (simple pop-up)
function scTO(el){
	data2slave(el);
	try {popUpClose()} catch(err){}
		
}

function data2slave(tr){
	//check for slave controls to fill
	var Inputs = tr.getElementsByTagName('input');
	var SlaveData = new Array();
	//Collect all data in hash
	for(var i=0; i<Inputs.length; i++){
		if(Inputs[i].type=='hidden'){
			SlaveData[Inputs[i].name] = Inputs[i].value;
		}
	}
	//feed hash into methods from the caller window
	if (!opener) return false;
	opener.dataBinder.updateInputs(SlaveData);
	opener.constraintCheckAll();
}	
	

function getNameByMatch(s){
	var u=document.getElementsByTagName('input');
	if (u) {
		for (var i=0;i<u.length;i++) {
			if (u[i].name.indexOf(s)!=-1) {return u[i].name;}
		}
	}
	return '';
}


function refreshRadio(id, name){
	var u=document.getElementsByName(name);
	for (var i=0;i<u.length;i++){
		if(u[i].id != id){
			rcTR(u[i].id.substr(4),false);
		}
	}
}


//Reset all checkboxes in list, call onlick on rows
function refreshCheck(id,name) {
	var u=document.getElementsByName(id);
	if (u) {
		if (name=='') {name='id';}
		u[0].checked=false;
		for (var i=0;i<document.defaultForm.elements.length;i++){
 			if(document.defaultForm.elements[i].name==name){
			if (!document.defaultForm.elements[i].disabled)
				document.defaultForm.elements[i].checked = false;
				id=document.defaultForm.elements[i].id;
				cTR(id.substr(4),false);
			}
		}
	}
}


//--- Global Move;
//-

var G_move = new Object;
G_move.id = '';
G_move.hiLightGET = '';
G_move.hiLightGET_bg = '';
G_move.hiLightGET_c = '';

G_move.css = 3; //+- css borders (important!);
G_move.pointer = 5; // user mouse pointer precision

//--- Reset vars;
G_move.callerVEid = '';
G_move.callerId = '';
G_move.callerImg = '';
G_move.callerItem = null;
G_move.callerImage = null;
G_move.callerLink = '';
G_move.callerOper = '';
G_move.callerVE = '';
G_move.callerVEparent = '';
G_move.SelectedItem = null;
G_move.SelectedX = 0;
G_move.SelectedY = 0;
G_move.MouseX = 0;
G_move.MouseY = 0;

G_move.onMove = 0;
G_move.onFly = 0;
G_move.onAcc = 0;
G_move.found = null;
G_move.foundObj = null;

var flyObj = new Object;
flyObj.id = '';

var accObj = new Object;
accObj.id = '';

function checkFrameMouse(m){
	switch (self.name) {
	case 'menu':
		m[0]=m[0]+document.getElementById('navArea').scrollLeft;
		m[1]=m[1]+document.getElementById('navArea').scrollTop;
		break;
	}
	return [m[0],m[1]];
}

function dragGET(m) {
	var o = document.getElementsByName('drag_get');

	if ( o.length != 'undefined' ) {
		var p = '';
		var w = 0;
		var h = 0;
		var b = 0;
		var obj = '';
		var hi = '';
		var md = '';
		var clone='';
		var taro=null;
		
		for (var i=0;i<o.length;i++) {

			if ( o[i].id.indexOf('_image_')!=-1 ) {
				if ( o[i].id.indexOf('a_image_')==0 ) {
					clone=o[i].id.replace('a_image_','a_item_');
				} else {
					clone=o[i].id.replace('_image_','_title_');
				}
			} else { clone=''; }
			
			if ( o[i].id != G_move.callerId && clone != G_move.callerId ) {

				p = findPos( o[i].id );
				
				w = parseInt(o[i].offsetWidth);
				h = parseInt(o[i].offsetHeight);

				if ( m[0]>p[0] && m[0]<(p[0]+w) && m[1]>p[1] && m[1]<(p[1]+h) ) {

					md = new String(o[i].onmousedown);
					b = md.indexOf('@::');
					if (b != -1) {
						md = md.substr( b+3, md.indexOf('@::',b+3)-b-3 );
						for(var x=0;x<parent._dnd.length;x++) {
							if ( parent._dnd[x].source == G_move.callerOper && parent._dnd[x].destination == md ) {
							
								if (clone) { taro=document.getElementById( clone );	} else { taro=o[i]; }
								G_move.foundObj = new Object();
								G_move.foundObj.href = parent._dnd[x].href;
								G_move.foundObj.name = parent._dnd[x].name;
								G_move.foundObj.child = parent._dnd[x].check_child;
								G_move.foundObj.platform = parent._dnd[x].platform;
								G_move.foundObj.target = parent._dnd[x].target;
								G_move.found = taro; hi = taro.id; i=o.length;
								x = parent._dnd.length;
							}
						}
					}
				}
			}
		}
		hiLightGET( hi, 1 );
	}
}

var dragPoint=null;
function dragOver(y_tmp) {

	if (G_move.id == 'moveTip') {
		var nv=document.getElementById('navArea');
		if ( nv ) {
			var scr_y=parseInt(nv.scrollTop);
			var cli_y=parseInt(nv.clientHeight);
			var hei_y=parseInt(nv.scrollHeight)
			var tes_y=scr_y;

			if (G_event.is_IE) {

				if ((y_tmp-scr_y)<30) {
					if (nv.scrollTop>5) {
						nv.scrollTop=scr_y-5;
						if (nv.scrollTop!=tes_y) {
							var mpos=findPos( G_move.id );
							setDIVxy(G_move.id,mpos[0],mpos[1]-5);
						}
						dragPoint=setTimeout('dragOver('+(y_tmp-5)+')',5);
					}

				} else if ((y_tmp-scr_y)>cli_y-45 && (y_tmp-scr_y)<cli_y-15) {
					if (nv.scrollTop+cli_y+5<hei_y) {
						nv.scrollTop=scr_y+5;
						if (nv.scrollTop!=tes_y) {
							var mpos=findPos( G_move.id );
							setDIVxy(G_move.id,mpos[0],mpos[1]+5);
						}
						dragPoint=setTimeout('dragOver('+(y_tmp+5)+')',5);
					}
				}
				
			} else {//---moz;

				if (y_tmp<30) {
					if (nv.scrollTop>5) {
						nv.scrollTop=scr_y-5;
						if (nv.scrollTop!=tes_y) {G_move.SelectedY=G_move.SelectedY+5;}
						dragPoint=setTimeout('dragOver(0)',5);
					}

				} else if (y_tmp>cli_y-30 && y_tmp<cli_y) {
					if (nv.scrollTop+cli_y+5<hei_y) {
						nv.scrollTop=scr_y+5;
						if (nv.scrollTop!=tes_y) {G_move.SelectedY=G_move.SelectedY-5;}
						dragPoint=setTimeout('dragOver('+(cli_y-15)+')',5);
					}
				}
			}//--end main if;
		}
	}
}

function dragDIV(e) {

	if (e) { customClick(e); }

	var tmp_c = checkFrameMouse(getMouseXY());
	var x_tmp = G_move.SelectedX + ( tmp_c[0] - G_move.MouseX ) - G_move.css;
	var y_tmp = G_move.SelectedY + ( tmp_c[1] - G_move.MouseY ) - G_move.css;

	if ( x_tmp + parseInt( G_move.SelectedItem.offsetWidth ) > parseInt( document.documentElement.scrollWidth ) ) { x_tmp = document.documentElement.scrollWidth - G_move.SelectedItem.offsetWidth-1; }
	//if ( y_tmp + parseInt( G_move.SelectedItem.offsetHeight ) > parseInt( document.documentElement.scrollHeight ) ) { y_tmp = document.documentElement.scrollHeight - G_move.SelectedItem.offsetHeight-1; }
	if ( x_tmp < 0 ) { x_tmp = 0; }
	if ( y_tmp < 0 ) { y_tmp = 0; }

	if ( G_move.onMove == 1 ) {
		setDIVxy( G_move.id, x_tmp, y_tmp );
		if (dragPoint) {clearTimeout(dragPoint);}
		dragPoint=setTimeout('dragOver('+y_tmp+')',5);
	}

	if ( G_move.onMove == 0 &&
		( G_move.SelectedX-G_move.css < x_tmp - G_move.pointer || G_move.SelectedX-G_move.css > x_tmp + G_move.pointer
		|| G_move.SelectedY-G_move.css < y_tmp - G_move.pointer || G_move.SelectedY-G_move.css > y_tmp + G_move.pointer ) ) {

		if (G_move.id == 'moveTip') {
			var item=G_move.callerItem.innerHTML;
			if (G_move.callerImage) {item='<table><tr><td><img src="'+G_move.callerImage.src+'"></td><td><nobr>'+item+'</td></tr></table>';}
			setDIVxy( G_move.id, x_tmp, y_tmp );
			showDIV( G_move.id, item );
		}
		G_move.onMove = 1;
	}

	if ( G_move.id == 'moveTip' ) { dragGET(tmp_c); }
	return false;
}

function dropDIV(e) {

	clearTimeout(dragPoint);
	if ( G_move.id != '' ) {

		document.onmousemove = null;
		document.onmousedown = null;
		document.onmouseup = null;

		document.onmousedown = customClick;
		document.onmousemove = customClick;

		if (G_move.id == 'moveTip') {

			if ( G_move.hiLightGET != '' ) { acceptGET(); }
			if ( G_move.onAcc != 1 ) { flybackDIV(); }

			hiLightGET( '', 0 );
			G_move.id = '';

			if ( G_move.onMove == 0 ) {
				if (G_move.callerLink.substr(0,2)=='64') {
					var js=decode64( G_move.callerLink.substr(3) );
					eval( js );
				} else { showSelectedItem( G_move.callerLink ); }

			} else { G_move.onMove = 0;}

		} else {

			G_move.id = '';
			if ( G_move.onMove == 0 ) { return true; }
			G_move.onMove = 0;
		}
	}
	return false;
}

function moveDIV(obj_pre, img_pre, id, e, link, oper) {

	if (G_move.onFly==1) { return false; }
	if (G_move.onAcc==1) { return false; }
	if (checkShow('rightMenu')) { return false; }

	if (!e) { e = window.event; }
	if (e.button==2) { return false; }
	customClick(e);

	if ( G_move.id == '' ) {

		//--- init caller;
		G_move.found = null;

		G_move.callerVEid = id;
		G_move.callerId = obj_pre+id;
		G_move.callerImg = img_pre+id;

		G_move.callerItem = document.getElementById( G_move.callerId );
		if (img_pre!='') {G_move.callerImage = document.getElementById( G_move.callerImg );} else {G_move.callerImage=null;}
		G_move.callerLink = link;

		if (oper.indexOf('@::')!=-1) {
			oper=oper.split('@::');
			G_move.callerOper = oper[1];
			
			G_move.callerVE = oper[2]?oper[2]:'';
			if (G_move.callerVE.indexOf('linux')!=-1) {G_move.callerVE='linux';}
			if (G_move.callerVE.indexOf('windows')!=-1) {G_move.callerVE='windows';}
			
		} else { G_move.callerOper = ''; G_move.callerVE = ''; }

		if (link.indexOf('item_eid=')!=-1) {
			link=link.split('item_eid=');
			link=link[1].split(',');
			G_move.callerVEparent = decode64(link[0]);
		} else { G_move.callerVEparent = ''; }

		//--- init move;
		G_move.id = 'moveTip';
		if ( obj_pre=='' ) { G_move.id = id; } else { G_move.id = 'moveTip'; }
		G_move.SelectedItem = document.getElementById( G_move.id );

		G_move.SelectedX = parseInt( G_move.callerItem.style.left );
		G_move.SelectedY = parseInt( G_move.callerItem.style.top );

		if ( !G_move.SelectedX ) {
			var find;
			if (G_move.callerImage) {find = findPos( G_move.callerImg );} else {find = findPos( G_move.callerId );}
			G_move.SelectedX = find[0]-3;
			G_move.SelectedY = find[1];
		}
		if ( !window.event ) {
			var moz = checkFrameMouse([0,0]);
			G_move.SelectedX = G_move.SelectedX-moz[0];
			G_move.SelectedY = G_move.SelectedY-moz[1];
		}
		var tmp_c = checkFrameMouse(getMouseXY());
		G_move.MouseX = tmp_c[0];
		G_move.MouseY = tmp_c[1];

		document.onmousemove = dragDIV;
		document.onmousedown = dragDIV;
		document.onmouseup = dropDIV;

	} else {
		dropDIV();
	}
}


//--- main;

function switchStandartButton(id,sw){
//sw:true - enable;
//sw:false - disable;
	var o=document.getElementById(id);
	var b=document.getElementById(id+'Button');
	var bclass = '';
	if (o&&b){
		var str = b.className;
		bclass = str.replace(/ disabled/g,'');
		if(sw=='true' || sw==true){
			o.disabled=false;
			b.className=bclass;
		}else{
			o.disabled=true;
			b.className=bclass+' disabled';
		}
	}
}

function hideDIVGroup(cont) {
	for (var i=0;i<arguments.length;i++){hideDIV(arguments[i]);}
}

function showDIVGroup(cont) {
	for (var i=0;i<arguments.length;i++){showDIV(arguments[i]);}
}

function hideCombo(el,i) {
	if (el.style.display=='none') {return;}
	if (el.id=='') {el.id=get_kstr(12)+'_'+i;}
	var myInput = document.createElement('input');
	var myHidden = document.createElement('input');
	myHidden.setAttribute('type', 'hidden');
	myHidden.setAttribute('id', el.id+'_hidden');
	myInput.setAttribute('type', 'text');
	myInput.setAttribute('id', el.id+'_text');
	if(el.multiple) {
		myInput.setAttribute('height', el.offsetHeight);
		if (el.offsetHeight > 0) { myInput.style.height = el.offsetHeight - 8; }
	} else {
		myHidden.setAttribute('value', el.options[el.selectedIndex].value);
		myInput.setAttribute('value', el.options[el.selectedIndex].text);
	}
	myInput.setAttribute('readOnly', true);
	myInput.setAttribute('width', el.offsetWidth);
	el.parentElement.appendChild(myHidden);
	el.parentElement.appendChild(myInput);
	if (el.offsetWidth > 0) { myInput.style.width = el.offsetWidth - 6; }
	el.style.display = 'none';
	el.parentElement.insertBefore(myInput,el);
}
	
function showCombo(el) {
	var myInput = document.getElementById(el.id+'_text');
	var myHidden = document.getElementById(el.id+'_hidden');
	if (myHidden && myInput) {
		myHidden.removeNode(true);
		myInput.removeNode(true);
		el.style.display = '';
	}
}
	
function switchCombos(show) {
	if (G_event.is_IE && !G_event.is_IE7 && !is.ie8 && !is.ie9) {
		var combos = document.getElementsByTagName('select');
		if (combos[i].options){
			for(i=0;i<combos.length;i++){
				if(show) {
					showCombo(combos[i]);
				} else {
					hideCombo(combos[i],i);
				}
			}
		}
	}
}

/* XXX Old-style, to be dropped and replaced by function in Calendar.js  */
function validateDate(date) {
//---check date and set globals date_y, date_m, date_d;
	if (date=='') {
		var dat=new Date();
		date_y = dat.getFullYear();
		date_m = dat.getMonth()+1;
		date_d = dat.getDate();
		return true;
	}
	var d=new Date();
	var u=date.split('-');
	if (u.length!=3) { return false; }
	var y=parseInt(u[0],10);
	var m=parseInt(u[1],10)-1;
	var a=parseInt(u[2],10);
	d.setDate(1); d.setMonth(0); d.setYear(y); d.setMonth(m); d.setDate(a);
	var dd=d.getYear(); if (dd<1000) { dd+=1900; }
	if (dd==y && d.getMonth()==m && d.getDate()==a ) {
		date_y = d.getFullYear();					
		date_m = d.getMonth()+1; 
		date_d = d.getDate();
		return true;
	}
	return false;
}

function multiReplace(){
	if (!arguments || arguments.length < 1 || !RegExp)	
		return;
	var r = /#\{replace\}/;
	
	var str = arguments[0];			
	for(var i=1;i<arguments.length;i++){
		n = arguments[i];
		str = str.replace(r,n);
	}
	return str;	
}

//getting name+value pair from an input by id
function id2GET(id){
	var el = document.getElementById(id);
	if (!el) return '';
	var ret = el.name+'='+encodeURIComponent(el.value);
	return ret;
}

function customTitle(id,tip) {
	if (Allow_tooltips){
		var o=id;
		if (typeof(o)!='object') o=document.getElementById(id);
		if (o){
			if (o.title=='' && tip) o.title=tip;
		}
	}
}

function buttonBoxSubmit(button, formName, action) {

	newHiddenObj(button,'OpButton',1,formName);

	var myForm = eval('document.'+formName);
	if(action!=''){
		myForm.action=action;
	}
	myForm.submit();
}

function newHiddenObj(name,id,value,formName) {
	var myHidden = document.createElement('input');
	myHidden.setAttribute('type', 'hidden');
	myHidden.setAttribute('value', value);
	myHidden.setAttribute('name', name);
	myHidden.setAttribute('ID', id);          
	document.getElementById(formName).appendChild(myHidden);
}

function setVshadow(id){
	var b=document.getElementById(id+'_obj_base');
	var sv=document.getElementById(id+'_v_shadow');
	var sh=document.getElementById(id+'_h_shadow');
	var sl=document.getElementById(id+'_left_shadow');
	if(b && sv && sh){
		var d=10;
		if(sl) {d=8;}
		var h = parseInt(b.offsetHeight,10)-d;
		if (h<0){h=0;}
		sv.style.height=h+'px';
		var w = parseInt(b.offsetWidth,10)-d;
		if (w<0){w=0;}
		sh.style.width=w+'px';

		if(sl) {sl.style.height=h+'px';}
	}
}


function setPopDivXY(id,parent_obj){
//---TODO: check multiple popupdiv handler here!
	var p = findPosObj(parent_obj);
	var o = document.getElementById(id);
	var ph = parseInt(parent_obj.offsetHeight,10);
	var pw = parseInt(parent_obj.offsetWidth,10);
	var w = parseInt(o.style.width,10)+5;

	var sl = document.documentElement.scrollLeft;
	var cw = document.documentElement.clientWidth;
	var mx = cw + sl;

//	var x = p[0]-8;

	var x;
	if(rtl_mode){
		if(G_event.is_FF) {
			x = p[0] + pw - w + 10;
			if ( x+9 + w > mx ) { x = mx - w-9; }
			if ( x < sl ) { x = sl; }
		} else {
			x = p[0] + pw - (w-sl) + 10;
			//alert(p[0]+' x='+x+' :: '+sl)
			//if ( x < 0 && x > -sl ) { x = 0; }
			//x += sl;
			//if ( x < 0 ) { x = 0; }
			//if ( x < -sl ) { x = -sl; }
		}
	}else{
		x = p[0]-8;
		if ( x+9 + w > mx ) { x = mx - w-9; }
		if ( x < 0 ) { x = 0; } 
	}

	var y = p[1]+ph+3;
	var mx = document.documentElement.clientWidth + document.documentElement.scrollLeft;
	var my = document.documentElement.clientHeight + document.documentElement.scrollTop;
	
	
	//************set width and height position of pop-up************************//
		
	var popupDivID = '#'+o.id;
	var popupDivHeight = $(popupDivID).height();
	var popupDivWidth = $(popupDivID).width();
		
	if (popupDivHeight + y > my)
	y = p[1] - Math.round(popupDivHeight/2);
	
	if ((popupDivWidth + x) > mx){
		x =  mx-popupDivWidth-3; 
	}
	
	
	
	switch(swPDiv){
		case 'right-bottom':
			var oh = parseInt(o.offsetHeight,10)+8;
			x = p[0]+pw+10;
			y = my - oh;
			if ( y > p[1] ) { y = p[1]; }
			break;
	}

	//if ( x+9 + w > mx ) { x = mx - w-9; }
	if ( y < 0 ) { y = 0; }
	setDIVxy(id,x,y);
	setVshadow(id);
}


//--- fix and show position of shadowed (8x8) object
//--- after create but before first render;
function fix_POP_over(id,px,py){
	var a = document.getElementById( id );
	var b = document.getElementById( id+'_obj_base' );
	if(a && b) {
		var m = new Array(px,py);
		var x = parseInt( b.offsetWidth,10 )+16;
		var y = parseInt( b.offsetHeight,10 )+16;
		var s_l = parseInt( document.documentElement.scrollLeft );
		var s_t = parseInt( document.documentElement.scrollTop );
		var c_w = parseInt( document.documentElement.clientWidth );
		var c_h = parseInt( document.documentElement.clientHeight );

		if ( m[0]+x-s_l > c_w ) { m[0] = c_w-x+s_l; }
		if ( m[1]+y+3-s_t > c_h ) { m[1] = c_h-y-3+s_t; }
		if ( m[0] < 0 ) { m[0] = 0; }

		setDIVxy(id,m[0],m[1]);
		showDIV(id);
		a.style.visibility = 'visible';
	}
}


//---fix inheritance css colision;
function copy_css_value(id1, id2, prop){
	id1 = document.getElementById(id1);
	id2 = document.getElementById(id2);
	if(id1 && id2) {
		var cs = window.getComputedStyle(id1, '');
		var val = cs.getPropertyValue( prop );
		if(val!=null) {eval('id2.style.'+camelStr(prop)+'=val;');}
	}
}

function camelStr(prop){
	var re = /(\-([a-z]){1})/g;
	if (prop == 'float') prop = 'styleFloat';
		if (re.test(prop)) {
			prop = prop.replace(re, function () {return arguments[2].toUpperCase();});
	}
	return prop;
}

//--- getComputedStyle fix for IE 6.0
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function () {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}


//---deails popup default id;
var details_popup_id='details_popup';

var swFDiv='';
function switchFromDetails(id,header){
	if(id=='') {alert('switchFromDetails: "id" required'); return false;}

	var info_popup = 'info_popup';
	hideDIV(details_popup_id);
	swFDiv = id;

	//---check if popup already visible;
	var a = document.getElementById(id+'_cont_vis');
	if(a){
		if (checkShow(id+'_cont_vis')) {hideDIV(details_popup_id); return true;}
	}

	//---set header;
	o = document.getElementById(info_popup+'_header');
	if(o) {o.innerHTML = header;}

	hideDIV(info_popup);
	setVshadow(info_popup);

	//---insert content into new popup;
	o = document.getElementById(info_popup+'_cont');
	if(o){
		a = document.getElementById(id+'_cont');
		if(a) {o.innerHTML = '<div id="'+id+'_cont_vis" style="display:block;padding:10px">'+a.innerHTML+'</div>';}
	}
	//---show popup;
	o = document.getElementById(id+'_link');
	switchPopupDiv(info_popup,o);
}


var swPDiv='';
function switchPopupDiv(id,caller_obj){
	if(id=='') {alert('switchPopupDiv: "id" required'); return false;}
	callTip('');
	var o = document.getElementById(id);
	if (o) {
		if (o.style.display=='none'){
			hideAllPopup();
			switchCombos(false);
			setPopDivXY(id,caller_obj);
			o.style.display='';
			setPopDivXY(id,caller_obj);
			zIndexPopup(id);
		} else {
			hideDIV(id);
			switchCombos(true);
		}
	}
	swPDiv='';
}

function switchPopupLargeImage(id,caller_obj){
	if(id=='') {alert('switchPopupLargeImage: "id" required'); return false;}
	callTip('');
	var o = document.getElementById(id);
	if (o) {
		if (o.style.display=='none'){
			hideAllPopup();
			switchCombos(false);
			setPopImageXY(id);
			o.style.display='';
			setPopImageXY(id);
			zIndexPopup(id);
		} else {
			hideDIV(id);
			switchCombos(true);
		}
	}
	swPDiv='';
}

function setPopImageXY(id){
	var o = document.getElementById(id);
	var mx = document.documentElement.clientWidth + document.documentElement.scrollLeft;
	var my = document.documentElement.clientHeight + document.documentElement.scrollTop;
	
	
	//************set width and height position of pop-up************************//
		
	var popupDivID = '#'+o.id;
	var popupDivHeight = $(popupDivID).height();
	var popupDivWidth = $(popupDivID).outerWidth();
	
	y = my - Math.round(my/2)-Math.round(popupDivHeight/2);
	x =  mx-Math.round(mx/2)-Math.round(popupDivWidth/2); 
	if ( y < 0 ) { y = 0; }
	setDIVxy(id,x,y);
	setVshadow(id);
}

function switchPopupDivCont(id,caller_obj){
	if(id=='') {alert('switchPopupDiv: "id" required'); return false;}
	var o = document.getElementById(id);
	if (o) {
		var h=o.innerHTML;
		o.innerHTML='';
		switchPopupDiv(id,caller_obj)
		o.innerHTML=h;
		setVshadow(id);
	}
}


overPOP=false;

function zIndexSort(a,b){return b.style.zIndex - a.style.zIndex;}
function zIndexPopup(id){
	var o=document.getElementsByTagName('div');
	var u=document.getElementById(id);
	if(u){u.style.zIndex=1000;}
	var obj = new Array();
	for(var i=0;i<o.length;i++){ if(o[i].className=='popupArea' && o[i].id!=id){obj.push(o[i]);} }
	obj.sort(zIndexSort);
	for(var i=0;i<obj.length;i++){obj[i].style.zIndex=999-i;}
}


function hideAllPopup(){
	var o=document.getElementsByTagName('div');
	for(var i=0;i<o.length;i++){ if(o[i].className=='popupArea' && o[i]!=date_id){hideDIV(o[i].id);} }
	if(typeof(hideDate)=='function'){hideDate();}
}


function setPopDivXYold(id,parent_obj){
	var p = findPosObj(parent_obj);
	var o = document.getElementById(id);
	var ph = parseInt(parent_obj.offsetHeight,10)
	var pw = parseInt(parent_obj.offsetWidth,10)
	var w = parseInt(o.offsetWidth,10)+5;
	var sl = document.documentElement.scrollLeft;
	var cw = document.documentElement.clientWidth;
	var mx = cw + sl;
	var my = document.documentElement.clientHeight + document.documentElement.scrollTop;

	var x;
	if(rtl_mode){
		x = p[0] + pw - w + 10; 
		if(is.ff){
			if ( x + w > mx ) { x = mx - w; } 
			if(x < sl) x = sl; //(FF uses negative X for scroll in RTL)
		}else{
			if (x<0 && x > -sl ) {x = 0; }
		}
	}else{
		x = p[0];
		if ( x + w > mx ) { x = mx - w; }
		if ( x < 0 ) { x = 0; } 
	}

	var y = p[1]+ph+3;
	if ( y < 0 ) { y = 0; }
	setDIVxy(id,x,y);
	setVshadow(id);
}



function get_kstr(n) {
	var str='abcdefghijklmnopqrstuvwxyz1234567890';
	var ret='';
	for(var i=0;i<n;i++) ret+=str.substr( parseInt(Math.random()*(str.length-1)), 1);
	return ret;
}

var popupTO = false; 
function openPopup(url, windowname, height, width, is_attached) {
	if(popupTO) return;
	popupTO = true;
	if (!width)
		width = 750;
	if(!height)
		height = 500;
	windowname = windowname.replace(/=/g,'');
	var popupWindow = window.open(url,windowname,"toolbar=0,location=0,resizable=1,scrollbars=1,width="+width+",height="+height);
	setTimeout('popupTO = false', 1000);
	if (is_attached){
		if (!window.attachedPopups){
			window.attachedPopups = new Array();
			addUnLoadEvent(closeAttachedPopups);
		}
		window.attachedPopups.push(popupWindow);				
	}

	try {
		popupWindow.focus();
	} catch(err){
	}
}

function closeAttachedPopups(){
	if (!window.attachedPopups || !window.attachedPopups.length) return false;
	for (var i=0; i<window.attachedPopups.length; i++){
		if (!window.attachedPopups[i].closed) window.attachedPopups[i].close();
	}
}

function show_details (id){
	var el = document.getElementById(id);
	if (!el) return;
	
	if(el.style.display == 'none'){
		el.style.display = '';
	}else{
		el.style.display = 'none';
	}
}

function open_details(url, windowname, height, width) {
	if (!windowname)
		windowname = "task_details_"+get_kstr(22);
	openPopup(url, windowname, height, width);
}

function open_help(url) {
	helpWindow = window.open(url,"help_screen","toolbar=0,location=0,resizable=1,scrollbars=1,width=900,height=600");
	helpWindow.focus();
}

function autoFocus(){
	
	var error_control = document.getElementById('__error_control');
	if(error_control && error_control.value!=''){
		var element = document.getElementById(error_control.value);
			if( element && !element.disabled &&
	  		( 
	  			(element.type=='text') ||
					(element.type=='password')
	  		)
	  	){
	  		var err_flag=0;
	    	try {element.focus()}
	    	catch(err){err_flag=1};  				
				return true;
			}
	}
	
	if(document.forms.length){
		outer_loop:		
		for(var i=0; i<document.forms.length; i++){
			for(var j=0; j<document.forms[i].elements.length; j++){
				var element = document.forms[i].elements[j];
        if (element){
        	if((element.name == '_disable_autofocus') &&
          	(element.type == 'hidden') &&
            (element.value == 'yes'))
            return false;
                
					if((element.name) &&
	    			(element.type=='text') ||
    				(element.type=='password')){
	    			if (!element.disabled){
	    				var err_flag=0;
				    	try {element.focus()}
				    	catch(err){err_flag=1};
				    	if(!err_flag){
				    		element.focus();
					    	break outer_loop;
							}
						}
					}
				}
			}
		}
	}
	
}

////////////////////////
// cookie_functions.js //
/////////////////////////

// get the value of a cookie by name
function getCookie(name){
	var cname = name + "=";   
	var dc = document.cookie; 

	if (dc.length > 0) {  
		begin = dc.indexOf(cname);   

		if (begin != -1) {   
			begin += cname.length;   
			end = dc.indexOf(";", begin);

			if (end == -1) end = dc.length;

			return unescape(dc.substring(begin, end));
		} 
	}

	return (null);
}

// set a cookie
// accepts name, value, [expires]
// expiry time is set in milliseconds (i.e. 5 seconds = (5*1000))
// if expiry is not set, the cookie will last the life of the session
function setCookie(name, value, expires) {
	var expDate = new Date();
	expDate.setTime(expDate.getTime() + expires);

	document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expDate.toGMTString());
}

// delete a cookie by name
function eatCookie(name) {
	document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" +  ";	path=/";
}


function flipBlock(id, isrc){
	if (typeof callTip == 'function') {callTip();}
	if(isrc){
		//toggble rows, with arrow image
		var h=document.getElementById('webgate__rows_hidden_'+id);
		h.value=h.value==1?0:1;
		var i=document.getElementById('webgate__rows_img_'+id);
		i.src=isrc+(h.value==1?'opened':'gt')+'.gif';
		var _v=h.value==1?'none':'block';
		var v=h.value==1?'block':'none';
		document.getElementById('webgate__show_'+id).style.display=v;
		document.getElementById('webgate__hide_'+id).style.display=_v;
	}else{
	//rows with checkbox
		var c=document.getElementById('webgate__rows_check_'+id);
		var v=c.checked?'block':'none';
		document.getElementById('webgate__show_'+id).style.display=v;
	}
}

function isObjVisible(id){
	return document.getElementById(id).style.display=='block';
}

function showObj(id){
	document.getElementById(id).style.display='block';
}

function hideObj(id){
	document.getElementById(id).style.display='none';
}

function showObjExt(id,show){
	showHideObj(document.getElementById(id),show);
}

function showHideObj(obj,show){
	obj.style.display=show?'block':'none';
}

function enableObjExt(id,enable){
	document.getElementById(id).disabled=!enable;
}


function addEventToObject(obj, evt, func) {
	var oldhandler = obj[evt];
	obj[evt] = (typeof obj[evt] != 'function') ? func : function(){oldhandler();func();};
}

function requestContent(url,func,ticket,ticketid, data, callbackParams) {
	var method = data? "POST" : "GET";
  if (window.XMLHttpRequest) {
      var req = new XMLHttpRequest();
      if (func) {req.onreadystatechange = function() {func(req, callbackParams);}}
      req.open(method, secureURI(url), true);

			var cookieContent = 'vzcpSession='+ticket+';vzcpTicket='+ticketid+';vzcpLang=en;';
      req.setRequestHeader('Cookie',cookieContent);
      //if (is.safari) {req.setRequestHeader('If-Modified-Since','Wed, 15 Nov 1995 00:00:00 GMT');}
      if (data){
      	req.send(data)
      }else{
      	req.send(null)
    	}
  } else if (window.ActiveXObject) {
      isIE = true;
	try {var req = new ActiveXObject("Msxml2.XMLHTTP");}
	catch(e) {req = new ActiveXObject("Microsoft.XMLHTTP");}
      if (req) {
          if (func) {req.onreadystatechange = function() {func(req, callbackParams);}}
          req.open(method, url, true);
          if(data){
          	req.send(data);
        	}else{
        		req.send();
      	}
      }
  }
}
	
function browseCheckAll(element,id){
	for (var i=0;i<document.defaultForm.elements.length;i++){
  	if(document.defaultForm.elements[i].name==id){
			if (!document.defaultForm.elements[i].disabled)
				document.defaultForm.elements[i].checked = element.checked;
				eid=document.defaultForm.elements[i].id;
				if (eid.length>4) cTR(eid.substr(4),false);
  	}
	}
}

function addURLGetParam(url,add){
	if (url.indexOf('?')!=-1) { url+='&'; } else { url+='?'; }
	return url + add;
}


function fillCollector(){
	var collector = document.getElementById('collector');
	if(collector){
		var list_inputs = document.getElementsByTagName('input');
		var list_selects = document.getElementsByTagName('select');
		fillCollectorList(list_inputs);
		fillCollectorList(list_selects);
	}
}

function fillCollectorList(list){
	var o;
	var new_list = new Array();
	
	for (var i=0;i<list.length;i++){
		o = list[i];
		if(o.name!='collector'){
			var h = document.createElement('input');
			h.setAttribute('name', '__'+o.name);
	    h.setAttribute('ID', '__'+o.id);          		    		    
	    h.setAttribute('type', 'hidden');		    		    
			
			if(o.type=='checkbox'){
				h.setAttribute('value', o.checked?o.value:'');
			}
			if(o.type=='radio'){
				h.setAttribute('value', o.checked?o.value:'');
			}
			if(o.type=='select-one'){
				h.setAttribute('value', o.selectedIndex>=0?o.options[ o.selectedIndex].value:'');
			}
			if(o.type=='hidden'){
				h.setAttribute('value', o.value);					
			}
			new_list[new_list.length]=h;
		}	
	}			  	
	
	for (var i=0;i<new_list.length;i++){
		document.defaultForm.appendChild(new_list[i]); 
	}
}

function intAddCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

	function moveLeftUp(control_id){
	 item_list_move_up(control_id+'_left')
	 return false;
	}
				
	function moveLeftDown(control_id){
	 item_list_move_down(control_id+'_left')
	 return false;
	}	

	function moveRightUp(control_id){
	 item_list_move_up(control_id+'_right')
	 return false;
	}
			
	function moveRightDown(control_id){
	 item_list_move_down(control_id+'_right')
	 return false;
	}					

	function listAdd(control_id, name, value){
		var list = document.getElementById(control_id);
		for(var i=0;i<list.length;i++){
			if (list.options[i].text == name && list.options[i].value == value)  return  //do nothing
		}		
		list.options[list.length] = new Option(name, value);

	}
	
	function listDelete(control_id){
		var list = document.getElementById(control_id);
		var o;			

		for(var i=0;i<list.length;i++){
			o = list.options[i];
			if(o.selected){
				list.options[i]=null;
				i--;
			}
		} 
	}			
				
	function moveLeft (control_id,arr_name){
		var oRight = document.getElementById(control_id+'_right');
		var oLeft = document.getElementById(control_id+'_left');    
		var o;			

		var Arr = eval(arr_name);
		var flag = (Arr.length > 0);	
		var operate = false;

		for(var i=0;i<oRight.length;i++){
			o = oRight.options[i];
			if(o.selected && o.value){
				if (flag){
					for(var j=0;j<Arr.length;j++){
						if(o.value == Arr[j][1])  Arr[j][0] = 0;
					}
				}else{				
					oLeft.options[oLeft.length] = new Option(o.text,o.value);
				}
				oRight.options[i]=null;
				operate = true;
				i--;
			}else{
				if(flag){
					for(var j=0;j<Arr.length;j++){
						if(o.value == Arr[j][1])
							Arr[j][0] = 1;
					}				
				}
			}

		} 
		if (flag&&operate){
			for(var i=(oLeft.length-1);i>=0;i--){
				oLeft.options[i] = null;
			}
			for(var i=0;i<Arr.length;i++){
				if(Arr[i][0] != 1){
					oLeft.options[oLeft.length] = new Option(Arr[i][2],Arr[i][1]);
					if(!oLeft.options[oLeft.length - 1].value){
						oLeft.options[oLeft.length - 1].style.color = "#555555";
					}
				}
			}
		}
		moveCheckLR(control_id);
	}

	function moveRight(control_id){
		var oRight = document.getElementById(control_id+'_right');
		var oLeft = document.getElementById(control_id+'_left');
		var o;
	
		for(var i=0;i<oLeft.length;i++){
			o = oLeft.options[i];
			if(o.selected  && o.value){
				oRight.options[oRight.length] = new Option(o.text,o.value);
				oLeft.options[i]=null;
				i--;			
			}
		}
		moveCheckLR(control_id);
	}				

	function moveCheckLR(control_id){
		var oRight = document.getElementById(control_id+'_right');
		var oLeft = document.getElementById(control_id+'_left');

		var oRightBut = document.getElementById(control_id+'_right_button');
		var oLeftBut = document.getElementById(control_id+'_left_button');

		oRightBut.disabled = oLeft.length>0?'':'disabled';
		oLeftBut.disabled = oRight.length>0?'':'disabled';
		
		oRightBut.style.color = oLeft.length>0?'#000000':'#999999';
		oLeftBut.style.color = oRight.length>0?'#000000':'#999999';

		oRightBut.style.cursor = oLeft.length>0?'pointer':'default';
		oLeftBut.style.cursor = oRight.length>0?'pointer':'default';
	}
			

function item_list_move_up(object_name){
    var obj	= eval(document.getElementById(object_name));

	if (obj	== null || typeof(obj)	!= 'object'){
		alert('item_list_move_up: vidget ' + object_name + ' not found :((');
		return false;
	}
	switch (obj.type){
		case 'select-one'	:
		case 'select-multiple'	:
		if (typeof obj.options.length != "undefined" && obj.options.length > 0) {
			if (obj.options[0].selected)
				return false;
			for (var i = 0; i < obj.options.length; i++){
				if (!obj.options[i].selected)
					continue;
				var text	= obj.options[i - 1].text;
				var value	= obj.options[i - 1].value;
				obj.options[i - 1].text		= obj.options[i].text
				obj.options[i - 1].value	= obj.options[i].value
				obj.options[i].selected		= false;
				obj.options[i].text		= text;
				obj.options[i].value		= value;
				obj.options[i - 1].selected	= true;				
			}
		}
		break;
		default			:
			alert('Something is wrong');
			return false;
	}
	return false;
}

function item_list_move_down(object_name){
    var obj	= eval(document.getElementById(object_name));
	if (obj	== null || typeof(obj)	!= 'object'){
		alert('item_list_move_down: vidget ' + object_name + ' not found :((');
		return false;
	}
	switch (obj.type){
		case 'select-one'	:
		case 'select-multiple'	:
		if (typeof obj.options.length != "undefined" && obj.options.length > 0) {
			if (obj.options[obj.options.length - 1].selected)
				return false;
			for (var i	= obj.options.length; i > 0; i--){
				if (!obj.options[i - 1].selected)
					continue;
				var text	= obj.options[i].text;
				var value	= obj.options[i].value;
				obj.options[i].text		= obj.options[i - 1].text
				obj.options[i].value		= obj.options[i - 1].value
				obj.options[i - 1].selected	= false;
				obj.options[i - 1].text		= text;
				obj.options[i - 1].value	= value;
				obj.options[i].selected		= true;				

			}
		}
		break;
		default			:
			alert('Something is wrong');
			return false;
	}
	return false;
}

function fillMultiSelects(){
	var list_selects = document.getElementsByTagName('select');
       	for (var i=0;i<list_selects.length;i++){
		s = list_selects[i];		
		if (s.type == 'select-multiple'){
			for(var j=0;j<s.length;j++){
				o = s.options[j];
				o.selected = true;
			}
		}
	} 	
}

function switchDBox(boxId){
	var obj	= eval(document.getElementById(boxId));
	if (obj.className == 'DesktopRows'){
		obj.className = 'DesktopRowsClosed';
		setCookie("vzcp-desktop-"+boxId, "closed", 2E12);
	}else{
		obj.className = 'DesktopRows';
		setCookie("vzcp-desktop-"+boxId, "open", 2E12);		
	}
}

function getTabId(tab)
{
	return tab.getElementsByTagName("a")[0].id;
}

function setTab(tab){
	var favId = getCookie("vzcp-favorites-tab");
	var current_tabs = tab.parentNode.getElementsByTagName("li");
	
	for (var i = 0; i < current_tabs.length; i++) {
		current_tabs[i].id="";
	}
	tab.id = 'current';
	
	var element = eval(document.getElementById('content_'+favId));
	if (element){
		element.className = 'favoritesBlockHidden';	
	}

	element = eval(document.getElementById('content_'+getTabId(tab)));
	element.className = 'favoritesBlock';
	
	var footer = eval(document.getElementById('footer_'+favId));
	if (footer){
		footer.style.display='none'	;
		document.getElementById('footer_'+getTabId(tab)).style.display = 'block';
	}
	setCookie("vzcp-favorites-tab",getTabId(tab), 2E12);
}

function initTree(id, open_children){
	
	var el = document.getElementById(id);
	if(!el) return false;
	if (open_children){
		el.className = 'TreeBranchOpen';
		var img = document.getElementById('img-'+el.id);
		if (img) img.src = img_close.src;
	}
	var elParent = el.parentNode;
	if(!elParent) return false;	
			
	if (elParent.className == 'TreeBranchClosed' || elParent.className == 'TreeBranchOpen'){
		elParent.className = 'TreeBranchOpen';
		var img = document.getElementById('img-'+elParent.id);
		if (img){
			img.src = img_close.src;
			initTree(elParent.id);
		}
	}
}

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   if (!String(input).length) return false;
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

function decode64(input) {
   if (!input) return false;
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}


//--- NEW left tree model;
var menuRead = new Array();
var menuLoad = new String();
var menuTID = null;
var menuLive = false;

function treeClick(id){
	var img = document.getElementById('img-'+id);
	if(img){
		if (img.src == img_closed.src){
			img.src = img_opened.src;
			openTree(id);
		} else {
			img.src = img_closed.src;
			closeTree(id);
		}
	}
}			


function openByClick(id){
	var img = document.getElementById('img-'+id);
	if(img){
			img.src = img_opened.src;
			openTree(id);
	}
}


function openTree(id){
//--- open tree (if present) or load it's content;
	var o=document.getElementById('cont_'+id);
	var f=document.getElementById('dynamic_folders_'+id);
	if(o && f){
		showDIV('cont_'+id);
		if(f.innerHTML.trim()==''){nt_load(id,'');} else {nt_open(id);}
	}
}


function closeTree(id){
	hideDIV('cont_'+id);
}


function nt_load(id,param){
//---load tree content by id;
	var f = document.getElementById('dynamic_folders_'+id);
	var c = document.getElementById('dynamic_clock_'+id);
	var i = document.getElementById('img-'+id);
	if(c && f && i){
		f.innerHTML='';
		f.style.display='none';
		c.style.display='block';
		if(param!='bg'){i.src=img_opened.src;}
		var url=location.href.split('?');
		url=url[0]+'?menu-id='+id;
		AJAXCall( url, nt_req, param);
	}
}


function nt_req(req,param){
	var h = req.readyState==4?req.responseText:'';
	if(h!=''){
		var expired = h.indexOf('[key]') == -1;
		if(expired){
			window.location.reload();
			return;
		}		
		var id = h.substring(h.indexOf('[key]')+5,h.indexOf('[/key]'));
		var menu = h.substring(h.indexOf('[menu]')+6,h.indexOf('[/menu]'));
		var f = document.getElementById('dynamic_folders_'+id);
		var c = document.getElementById('dynamic_clock_'+id);
		if (f && c){
			f.innerHTML=menu.trim();
			c.style.display='none';
			f.style.display='block';
		}
		nt_open(id);
		update_nt_data(id,menu); //---update ids data from response;
		update_nt_upload(id);
	}					
}


function nt_open( id ){
	if( typeof( iLeftMenu_nt_req ) != 'undefined' ) { iLeftMenu_nt_req( id ); }
}


function update_nt_data(id,n){
	menuLoad=menuLoad.replace('['+id+']','');
	n=n.split('dynamic_folders_');
	for(var i=0;i<n.length;i++){
		var s=n[i].substring(0,n[i].indexOf('"')).trim();
		var ss='['+s+']';
		if(typeof(menuRead[ss]) == 'undefined'){
			var f=document.getElementById('dynamic_folders_'+s);
			if(f){
				if(f.innerHTML.trim()==''){menuLoad+=ss;}
			}		
			menuRead[ss]=1;
		}
	}
}


function update_nt_background(){

	var b=menuLoad.indexOf('[')+1;
	var id=menuLoad.substring( b, menuLoad.indexOf(']',b) );
	id=id.trim();

	var f=document.getElementById('dynamic_folders_'+id);
	if(f){
		if(f.innerHTML.trim()==''){
			nt_load(id,'bg');
		} else {
			if(menuTID) {clearTimeout(menuTID);}
			menuTID=setTimeout('update_nt_upload("'+id+'")',1000);
		}
	} else {
		if(menuTID) {clearTimeout(menuTID);}
		menuTID=setTimeout('update_nt_upload()',1000);
	}
}


function update_nt_upload(id){
	if(self.name!='menu'){return false;}
	menuLoad=menuLoad.replace('['+id+']','');

	//---first data init (from screen);
	if(menuRead=='') {
		var n=document.getElementsByName('dyn-menu');
		for(var i=0;i<n.length;i++){
			var ss='['+n[i].value+']';
			if(typeof(menuRead[ss]) == 'undefined'){
				var f=document.getElementById('dynamic_folders_'+n[i].value);
				if(f){
					if(f.innerHTML.trim()==''){menuLoad+=ss;}
				}		
				menuRead[ss]=1;
			}
		}
	}
	menuLoad=menuLoad.trim()
	
	//--call load next;
	if(menuLoad!=''){
		if(menuTID) {clearTimeout(menuTID);}
		menuTID=setTimeout('update_nt_background()',1000);
	}
}


function menuLiveInit(){
	menuLive=true;
	update_nt_upload('');
}


//--- NEW AJAX model;
var activeRequests = 0;

function AJAXCall( url, func, params ) {
	var req = AJAXRequest();
	if (!req) { return false; }
	req.onreadystatechange = function() { func( req, params ); AJAXRequestStateChangeHandler( req ); }
	req.open( 'GET', secureURI(url), true );
	req = AJAXRequestHeader( req, '' );
}


function AJAXRequestHeader(request,requestbody) {
	request.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
	request.setRequestHeader('Content-Type', 'multipart/form-data; boundary=');
	request.setRequestHeader('Content-Length', requestbody.length);
	request.send( requestbody );
	activeRequests++;
	return request;
}


function AJAXRequestStateChangeHandler( req ) {
        if (req.readyState == 4) { activeRequests--; }
}


function AJAXRequest() {
	var request = null;
	if(!request) try {
		request=new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e){}
	if(!request) try {
		request=new ActiveXObject('Microsoft.XMLHTTP');
	} catch (e){}
	if(!request) try {
		request=new XMLHttpRequest();
	} catch (e){}
	if(!request) {
		alert('Server Error');
	}
	return request;
}


//----



function openFromPopup(href,name){
	if (window == window.top){
		//find parent;
		if (window.opener && !window.opener.closed && typeof(window.opener.window)=='object') {
			//find parents MAIN;
			if (typeof(window.opener.top.main)=='object'){
				window.opener.top.main.location.href = secureURI(href);
			} else {
				//find next parent;
				if (typeof(window.opener.top.openFromPopup)!='undefined') {
					window.opener.top.openFromPopup(href,name);
				} else {
					//parent lost, open new window;
					window.open(href,name);
				}
			}
		}else{
			window.open(href,name)
		}
	}else{
		if (self.name=='taskbar') {	window.top.main.location.href = secureURI(href);} else { window.location.href = secureURI(href); }
	}
}

		function actionString2hiddenInputs(f,clearAction){
			if (!f || !f.action || f.action.indexOf('?') == -1) return false;
			var searchString = f.action.substr(f.action.indexOf('?')+1);
			if(clearAction){
				f.action = f.action.substr(0,f.action.indexOf('?'));
			}
			var pairs = searchString.split('&');
			for(var i=0;i<pairs.length; i++){
				var splitIndex = pairs[i].indexOf('=');
				var paramName = pairs[i].substr(0,splitIndex);
				var paramValue = pairs[i].substr(splitIndex+1);
				var myHidden = document.createElement('input');
				myHidden.setAttribute('type', 'hidden');
				myHidden.setAttribute('name',decodeURIComponent(paramName));				
				myHidden.setAttribute('value',decodeURIComponent(paramValue));
				f.appendChild(myHidden);
			}
		}
		
		function url2form(url,target,method){
			var f = document.createElement('FORM');
			document.documentElement.appendChild(f);
			method = method || 'get';
			f.method = method;
			f.target = target;
			f.action = url;
			actionString2hiddenInputs(f,method.toUpperCase()=='POST');
			f.submit();
			try{f.parentNode.removeChild(f)}
			catch(e){}
			f = null;
		}


    var fadingTips = { 
      xCord : 0,	
      yCord : 0,
      tip : Object,
      text : 0,
      windowObj : Object,
      tipOver : function(text, e){
	    fadingTips.obj = this;
	    this.text = text;
		this.tip =  document.getElementById('toolTip');
		this.windowObj = window;
		tID = window.setTimeout("fadingTips.tipShow()",250);
		fadingTips.updateXY(e);
	  },
	  
	  updateXY : function(e){
	  if(e){
	    if (document.captureEvents ) {
          this.xCord = e.pageX;
          this.yCord = e.pageY;
        }else if (this.windowObj.event.clientX ) {
          this.xCord = this.windowObj.event.clientX + this.windowObj.document.documentElement.scrollLeft;
          this.yCord = this.windowObj.event.clientY + this.windowObj.document.documentElement.scrollTop;
        }
       } else {
		  var m=getMouseXY();
          this.xCord = m[0];
          this.yCord = m[1];
       }
	  },

      tipShow : function() {
        if(this.tip){
          var scrX = Number(this.xCord);
          var scrY = Number(this.yCord);
          var tp = parseInt(scrY+20);
          var lt = parseInt(scrX+10);
		  purge_inner(this.tip);
          this.tip.innerHTML = '<span class="hint">'+this.text+'</span>';

          if (parseInt(this.windowObj.document.documentElement.clientWidth+this.windowObj.document.documentElement.scrollLeft) < parseInt(this.tip.offsetWidth+lt) ) {
		    var x = parseInt(lt-(this.tip.offsetWidth+10));
            this.tip.style.left = x<0?5:x+'px';
          } else {
            this.tip.style.left = lt+'px';
          }
          if ( parseInt(this.windowObj.document.documentElement.clientHeight+this.windowObj.document.documentElement.scrollTop) < parseInt(this.tip.offsetHeight+tp) ) {
            this.tip.style.top = parseInt(tp-(this.tip.offsetHeight+10))+'px';
          } else {
            this.tip.style.top = tp+'px';    
          }    
          this.tip.style.visibility = 'visible';
          this.tip.style.opacity = '.1';
          this.tipFade(10);
		}
      },
	  tipFade : function (opac) {
        if (self.name=='main' && opac==10) {
			var p=px=py=px1=py1=0;
			var tx=parseInt(this.tip.style.left);
			var ty=parseInt(this.tip.style.top);
			var tx1=tx+parseInt(this.tip.offsetWidth);
			var ty1=ty+parseInt(this.tip.offsetHeight);
			var tags=new Array('input','select');
			var calc=1;
			while(calc==1) {
				calc=0;
				for (var t=0;t<tags.length;t++) {
					o = document.getElementsByTagName( tags[t] );
					if (o.length != 'undefined') {
						for (var i=0;i<o.length;i++) {
				
							p = findPosObj( o[i] );
							px = p[0];
							py = p[1];
							px1= px+parseInt(o[i].offsetWidth);
							py1= py+parseInt(o[i].offsetHeight);

							if ( ( tx>px && tx<px1 && ty>py && ty<py1 ) || ( tx>px && tx<px1 && ty1>py && ty1<py1 ) || ( tx1>px && tx1<px1 && ty>py && ty<py1 ) || ( tx1>px && tx1<px1 && ty1>py && ty1<py1 ) ||
								 ( px>tx && px<tx1 && py>ty && py<ty1 ) || ( px>tx && px<tx1 && py1>ty && py1<ty1 ) || ( px1>tx && px1<tx1 && py>ty && py<ty1 ) || ( px1>tx && px1<tx1 && py1>ty && py1<ty1 ) ) {
								ty=ty+(py-parseInt(this.tip.offsetHeight)-2-ty);
								this.tip.style.top=ty+'px';
								ty1=ty+parseInt(this.tip.offsetHeight);
								i=o.length;
								t=tags.length;
								calc=1;
							}
						}
					}
				}
			}//---end while;
		}
        var passed = parseInt(opac);
        var newOpac = parseInt(passed+10);
        if ( newOpac < 90 ) {
          this.tip.style.opacity = '.'+newOpac;
          this.tip.style.filter = "alpha(opacity:"+newOpac+")";
          opacityID = window.setTimeout("fadingTips.tipFade('"+newOpac+"')",20);
        }else{ 
          this.tip.style.opacity = '.90';
          this.tip.style.filter = "alpha(opacity:90)";
        }	  
      },
      tipOut : function (){
        if(this.tip && this.text){  
          if ( window.tID ) {
            clearTimeout(tID);
          }
          if ( window.opacityID ) {
            clearTimeout(opacityID);
          }		
          this.tip.style.visibility = 'hidden';
		}
	  }
	};

/*--- ui:cell-list-switcher engine ---*/
var switcherData = new Array();


function switcherOverItem(el){
	if(el.className != 'listSwitcherItemSelected') el.className = 'listSwitcherItemOver';
}

function switcherOutItem(el){
	if(el.className != 'listSwitcherItemSelected') el.className = 	'listSwitcherItem';		
}
			
function switcherChangeItem(control_id, new_item_id, unselect_old){
	var storage = document.getElementById(control_id);
	var old_item_id = storage.value;
	if(unselect_old && old_item_id!=''){
		switcherRedrawItem(control_id,old_item_id,false);
		switcherRedrawBlock(control_id,old_item_id,false);
	}
	if(new_item_id!=''){
		switcherRedrawItem(control_id,new_item_id,true);
		switcherRedrawBlock(control_id,new_item_id,true);
	}
	var allow_delete = switcherData['item_'+ control_id+'_'+new_item_id][2];
	switchStandartButton(switcherData['delete_id_'+control_id],allow_delete);
	storage.value = new_item_id;
}			
			
function switcherRedrawItem(control_id, item_id, selected){
	var el = document.getElementById('item_'+ control_id + '_' + item_id);
	el.className = selected?'listSwitcherItemSelected':'listSwitcherItem';
}

function switcherRedrawBlock(control_id, item_id, selected){
	var el = document.getElementById('block_'+control_id+'_'+item_id);
	el.style.display = selected?'':'none';
}

function initSwitcher(control_id){
	var storage = document.getElementById(control_id);
	switcherChangeItem(control_id, storage.value, false );
}

function switcherDeleteItems(control_id){
		var storage = document.getElementById(control_id);
		var id = 'item_'+control_id+'_'+storage.value;
		if (switcherData[id][2] == 'true'){
			var el = document.getElementById(id);
			el.style.display = 'none';
			switcherData[id][3] = true;
			//storing all deleted items in hidden
			var deleted_storage = document.getElementById('switcher_deleted_items');
			var str = deleted_storage.value;
			if (str != ''){
				str = str +','+ storage.value;	
			}else{
				str = storage.value;
			}
			deleted_storage.value = str;
			//finding next not deleted item
			var selIndex = switcherData[id][0];
			var posOffset = 0;
			var negOffset = 0;
			var is_brother_found = false;
			var posKey; 
			var negKey;
			
			for (i in switcherData){
				if(!switcherData[i][3]){
					//item is not deleted, check for brother (item in same category)
					if (switcherData[i][4] == switcherData[id][4]){
						is_brother_found = true;
					}	 
					//lets check it proximity to the current item
					if(switcherData[i][0] > selIndex){
						var o = switcherData[i][0] - selIndex;
						if (posOffset == 0 || o < posOffset) {
							posOffset = o;
							posKey = i;
						}	
					}else{
						var o = selIndex - switcherData[i][0];					
						if (negOffset == 0 || o < negOffset){
							negOffset = o;
							negKey = i;
						}
					}
				}
			}
			if(!is_brother_found){
				//delete category header
				var cat = document.getElementById(switcherData[id][4]);
				cat.style.display = 'none';
			}
			if(posOffset != 0){
				switcherChangeItem(control_id,switcherData[posKey][1],true );
			}else{
				if(negOffset !=0){
					switcherChangeItem(control_id,switcherData[negKey][1],true );
				}else{
					//NO MORE ITEMS!
				}
			}

		}else{
			//do nothing
		}
}	

function condGetValue(id){
//IE<8.0 fix;
	var el = null;
	var o = document.getElementsByTagName('SPAN');
	for ( var i=0; i<o.length; i++ ){ if( o[i].id == id ) { el=o[i]; } }
	if ( el==null ){ el = document.getElementById(id); }
	if (!el) return 0;
	var data = getInputValue(el);
	if (!data) data = 0;
	return data;
}

//Storing some value in the hidden storage 
function storeValue(value, id){
//IE<8.0 fix;
	var o = document.getElementsByTagName('SPAN');
	for( var i=0; i<o.length; i++ ){ if(o[i].id==id ) { o[i].innerHTML = value; } }
}

function getInputValue(el){
	var data = '';

	if(el.tagName == 'SPAN'){
		return el.innerHTML;
	}

	switch (el.type) {
		case 'checkbox': if (el.checked) { data=el.value; } else { data=null; } break;
		case 'radio': if (el.checked) { data=el.value; } else { data=null; } break;
		case 'hidden': if (el.value!='') { data=el.value; } else { data=null; } break;
		case 'password':
		case 'textarea':
		case 'text':
			data=el.value;
			data=data.replace(/\&/g,String.fromCharCode(22));
			if(data=='') data = null;
			break;
		case 'select-one':
			data=el.options[el.selectedIndex].value;
			data=data.replace(/\&/g,String.fromCharCode(22));
			if(data=='') data = null;
			break;
		default: data=null;
	}
	return data;			
}

//cancelling event bubble - for links in browse
function cb(ev){
	ev.cancelBubble = true;
}

//Data binding object - passing values from popup to inputs in main frame, holding constraints and other stuff

var dataBinder = {
	Constraints : {},
	BrowseLists : {},
	ModeSwitchers:{},
	Inputs : {},
	EmptyHintInputs : [],	
	EmptyValueInputs : [],
	ValidateFields: {},


	getConstrByTarget : function(el){
		var ret = [];
		for(i in this.Constraints){
			for (t in this.Constraints[i].targets){
				if(t == el.id) ret.push(this.Constraints[i]);
			}
		}
		return (ret.length>0)?ret:false;
	},
	
	addInput : function(id){
		if(typeof(this.Inputs[id])=='undefined') this.Inputs[id] = [];
	},
	initInput : function (id){
		var el = document.getElementById(id);
		if (!el) return false;
		if (this.Inputs[id] && this.Inputs[id].length > 0) return false;
		var def_value = getInputValue(el);
		this.Inputs[id] = [el, def_value];
	},
	updateInputs : function (PopupData){
		for (i in PopupData){
			if(this.Inputs[i]){
				this.updateInput(i, PopupData[i])
			}
		}
	},
	initInputs : function(){
		for (i in this.Inputs){
			this.initInput(i);
		}
	},
	resetInputs : function (){
		for (i in this.Inputs){
			this.resetInput(i)
		}
	},
	dropEmptyHints : function (){
		for (var i=0; i<this.EmptyHintInputs.length; i++){
			var id = this.EmptyHintInputs[i];
			var el = this.Inputs[id][0];
			if(el.value == this.Inputs[id][1]) this.clearInput(id);
		}
	},
	restoreEmptyHints : function (){
		for (var i=0; i<this.EmptyHintInputs.length; i++){
			var id = this.EmptyHintInputs[i];
			var el = this.Inputs[id][0];
			if(el.value == '') this.resetInput(id);
		}
	},	
	dropEmptyValues : function (){
		for (var i=0; i<this.EmptyValueInputs.length; i++){
			var id = this.EmptyValueInputs[i];
			var el = this.Inputs[id][0];
			if(el.value == this.Inputs[id][1]) this.clearInput(id);
		}
	},	
	updateInput : function (id, value){
		var el = this.Inputs[id][0];
		if (!el) return false;
		switch (el.type){
			case 'hidden':
			case 'password':
			case 'textarea':
			case 'text':
				el.value = value;
				break;
			case 'select-one':
				for (var i=0; i<el.options.length; i++){
					if (el.options[i].value == value){
						el.selectedIndex = i;
						return;
					}
				}
				break;
		}
		
	},
	resetInput : function (id) {
		var el = this.Inputs[id][0];
		if (!el) return false;				
		switch (el.type){
			case 'hidden':
			case 'password':
			case 'textarea':
			case 'text':
				el.value = this.Inputs[id][1];
				break;
			case 'select-one':
				for (var i=0; i<el.options.length; i++){
					if (el.options[i].value == this.Inputs[id][1]){
						el.selectedIndex = i;
						return;
					}
				}
				break;
		}
	},
	clearInput : function(id) {
		var el = this.Inputs[id][0];		
		switch (el.type){
			case 'hidden':
			case 'password':
			case 'textarea':
			case 'text':
				el.value = '';
				break;
			case 'select-one':
				el.selectedIndex = 0;
				break;
		}		
		constraintStart(id);
	}
}

//Constraints lib
function constraintCheckAll(){
	var i;
	for(i in dataBinder.Constraints){
		dataBinder.Constraints[i].checkCond();
	}
}
function constraintStart(id){
	var i;
	for(i in dataBinder.Constraints){
		for (var j=0; j < dataBinder.Constraints[i].starters.length; j++){
			if(dataBinder.Constraints[i].starters[j] == id){
				dataBinder.Constraints[i].checkCond();
				break
			} 
		}
	}
}

//initing error/note placeholder row
function initErrow(id,prefix){
	var starWidth, endWidth;
	var rowInputs = document.getElementById(id);
	var rowError = document.getElementById(prefix+id);
	var grid = rowInputs.parentNode.parentNode;
	if (!rowError) return false;
	if(grid){
		starWidth = grid.clientWidth;
	}
	rowError.style.display = '';
	if (rowInputs && grid){
		var cells = rowInputs.getElementsByTagName('TD');
		var c = cells[cells.length-1];
		if (c.className == 'endspacer'){
			endWidth = grid.clientWidth;
			var delta = endWidth - starWidth;
			var new_width = c.clientWidth + delta;
			c.style.width = new_width+'px';
		}
	}
	if (rowInputs.style.display=='none') rowError.style.display='none';
	var constr = dataBinder.getConstrByTarget(rowInputs);
	if (constr){
		//Add error row to the targets
		for(var i=0; i<constr.length; i++ ){
			if(!constr[i].targets[rowError.id]) {
				constr[i].targets[rowError.id] = {eid : rowError.id}
				constr[i].targets[rowError.id].action = constr[i].targets[rowInputs.id].action;				
			}
		}
	}	
}

//
function initBrowse(id){
	var container = document.getElementById(id);
	if (!container) return;
	var cells = container.getElementsByTagName('TD');
	for(var i=0; i<cells.length; i++ ){
		var td = cells[i];
		var tr = td.parentNode;
		//check for td id is strated with 'webgate__' and ends with '_ctd';
		if(td.id.substring(0,9)=='webgate__' && td.id.substring(td.id.length-4,td.id.length)=='_ctd'){
			if(td.getElementsByTagName('INPUT').length == 1){
				var controlElement = td.getElementsByTagName('INPUT')[0];
				if(controlElement.type=='radio' || controlElement.type=='checkbox'){
					if (controlElement.id.substring(0,4)=='vec_' && controlElement.checked){
						tr.className=tr.className+'Hi';
						dataBinder.BrowseLists[id].selectedRows[obj2id(tr)] = tr;					
					}
				}
			}
		}
	}
}

function condGetRowsCount(bid){
	var c = 0;
	for (i in dataBinder.BrowseLists[bid].selectedRows){
		c++;
	}
	return c
}

function findAncestor(el, tagname){
	 var p = el.parentNode;
	 if (!p) return false;
 	if(p.tagName == tagname){
		return p;
 	}else{
 		return findAncestor(p, tagname);
 	}
}

function constrActHide(el, flag){
	if(el.type && (el.type == 'submit' || el.type == 'button')){
		el.disabled = flag;
		if(is.ff){
			//changing type of disabled button so pressing Enter key will work properly in FireFox
			if(el.disabled && el.type=='submit'){
				el.className=el.className+' typeSubmit';
				el.type = 'button';
			}
			if(!el.disabled && el.className.match(' typeSubmit')){
				el.type = 'submit';
				el.className=el.className.replace(' typeSubmit','');
			}
		}
		el = findAncestor(el, 'TABLE');
		td_el = findAncestor(el, 'TD');
		if(td_el.className = 'uiButton') el=td_el;		
	}
	el.style.display = flag?'none' : '';
}

function constrActDisable(el, flag){
	if(el.type == 'submit'){
		switchStandartButton(el.id,!flag);
	}else{
		if(el.tagName == 'DIV' && el.className.indexOf('listActionItem')!=-1){
			disableBB(el, flag);
		}else{
			if (el.tagName == 'DIV') { el.style.display = flag?'none' : ''; }
			el.disabled = flag;
		}
	}
}
//Recusively checks if elemnt or any of his acestors is hidden by constraint
function isElementHidden(el){
	var is_target = false;
	for (c in dataBinder.Constraints){
		if (dataBinder.Constraints[c].targets && dataBinder.Constraints[c].targets[el.id]) is_target = true;
	}
	if (el.style && el.style.display == 'none' && is_target) {
		return true
	}else{
		if (!el.parentNode || el.parentNode.tagName=='BODY' || !isElementHidden(el.parentNode)) {
			return false
		}else{
			return true
		}
	}
	return false
}

function isEQ(){
	for(var i = 1; i<arguments.length; i++){  if(arguments[i] != arguments[0]) return false; }
	return true;
}
function isNE(){
	for(var i = 1; i<arguments.length; i++){  if(arguments[i] == arguments[0]) return false;}
	return true;
}
function isGE(){
	for(var i = 1; i<arguments.length; i++){  if(!(parseInt(arguments[i-1],10) >= parseInt(arguments[i],10))) return false; }
	return true;
}
function isLE(){
	for(var i = 1; i<arguments.length; i++){  if(!(parseInt(arguments[i-1],10) <= parseInt(arguments[0],10))) return false;}
	return true;
}
function isGT(){
	for(var i = 1; i<arguments.length; i++){  if(!(parseInt(arguments[i-1],10) > parseInt(arguments[i],10))) return false; }
	return true;
}
function isLT(){
	for(var i = 1; i<arguments.length; i++){  if(!(parseInt(arguments[i-1],10) < parseInt(arguments[0],10))) return false;}
	return true;
}

function toggleHiddenCheckbox(id){
	var hiddenEl = document.getElementById(id);
	if (!hiddenEl) return;
	if (hiddenEl.value==0) {hiddenEl.value=1} else {hiddenEl.value=0};
	constraintStart(id);
}

function correctButtonsFF2(id){
	var tableEl = document.getElementById(id);
	var buttons = tableEl.getElementsByTagName('INPUT');
	for(var i=0; i<buttons.length; i++ ){
		if(buttons[i].clientWidth > buttons[i].parentNode.clientWidth) buttons[i].style.minWidth = 0;
	}
}		


//--- PNG fix for IE 6.0
function PNG_fix(){
var arVersion = navigator.appVersion.split("MSIE");
var version = parseFloat(arVersion[1]);

if( (version >= 5.5) && (version < 7.0) && (document.body.filters) )
{
	for(var i=0; i<document.images.length; i++)
	{
		var img = document.images[i];
		var imgName = img.src.split('?');
		imgName = imgName[0].toUpperCase();
		var idName = img.id.toUpperCase();

		if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
		{
			var imgID = (img.id) ? "id='" + img.id + "' " : "";
			var imgClass = (img.className) ? "class='" + img.className + "' " : "";
			var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
			var imgStyle = "display:inline-block;" + img.style.cssText;
			if (img.align == "left") imgStyle = "float:left;" + imgStyle;
			if (img.align == "right") imgStyle = "float:right;" + imgStyle;
			if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
			if (img.width>0 && img.height>0) {var wh="width:" + img.width + "px;height:" + img.height + "px;";} else {var wh='';}
			var strNewHTML = "<span " + imgID + imgClass + imgTitle
			+ " style=\"" + wh + imgStyle + ";"
			+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
			+ "(src=\'" + img.src + "\');\"></span>";//, sizingMethod='scale'
			img.outerHTML = strNewHTML;
			i = i-1;
		}
	}
}

}//--PNG end;

function switchModeAll(id){
	switchMode(id, 'webgate__mode_all');
}

function switchMode(id, mode){
	var container = document.getElementById('webgate__switcher_popup_'+id+'_cont');
	var controlLink = document.getElementById('webgate__mode-link_'+id+'_'+mode);
	var controlSpan = document.getElementById('webgate__mode-current_'+id+'_'+mode);
	if (mode == 'webgate__mode_all'){
		controlLink = document.getElementById('webgate__mode-all-link_'+id);
		controlSpan = document.getElementById('webgate__mode-all-span_'+id);
	}
	if (!container || !controlLink || !controlSpan) return;

	var all_links = container.getElementsByTagName('A');
	var all_spans = container.getElementsByTagName('SPAN');
	//show all links
	for(var i=0;i<all_links.length;i++){
		all_links[i].style.display='';
	}
	//hide all spans
	for(var i=0;i<all_spans.length;i++){
		all_spans[i].style.display='none';
	}

	//show active span, hide active link
	controlLink.style.display='none';	
	controlSpan.style.display='';

	
	var switcherInputs = dataBinder.ModeSwitchers[id];
	for (var i in switcherInputs){
		var containerEl = document.getElementById('webgate__switcher_container_'+id+'_'+i);
		if (!containerEl) break;
		var subElements = containerEl.getElementsByTagName('DIV');
		for(var ii=0;ii<subElements.length;ii++){
			var s = subElements[ii];
			if('webgate__switcher_value_'+mode == s.id || mode == 'webgate__mode_all'){
				s.style.display = '';
			}else{
				s.style.display = 'none';
			}
		}
	}
}
function emptyHintFocus(elem){
	if(!dataBinder.Inputs[elem.id]) return;
	def_value = dataBinder.Inputs[elem.id][1];
	var s = elem.className;
	s=s.replace(/EmptyHint/g,'');
	elem.className = s;	
	if(elem.value==def_value) {
		if(is.ie){
			
		}else{
		
			if (elem.selectionStart)
		 	{
		  	elem.setSelectionRange(0,elem.value.length);
		  }
		
		}
		//dataBinder.clearInput(elem.id);
	}
}

function emptyHintBlur(elem){
	if(elem.value=='') {
		dataBinder.resetInput(elem.id);
	}
	def_value = dataBinder.Inputs[elem.id][1];
	if(elem.value==def_value) {
		elem.className = elem.className + ' EmptyHint';		
	}else{
		var s = elem.className;
		s=s.replace(/EmptyHint/g,'');
		elem.className = s;		
	}
}



function emptyValueFocus(elem){
	if(!dataBinder.Inputs[elem.id]) return;
	def_value = dataBinder.Inputs[elem.id][1];
	if(elem.value==def_value) dataBinder.clearInput(elem.id);
}

function emptyValueBlur(elem){
	if(elem.value=='') dataBinder.resetInput(elem.id);
}

//********** RESELLER WIZARD*********//
function checkValidPriceValue(value) {
	if (value<0) return false;
	
	value = value.toString();
	var dec_sep = fvalidate.i18n.decimal; // localized decimal separator
	var th_sep = fvalidate.i18n.thousand; // localized thousand separator 
	var regexp = new RegExp('^[0-9' + dec_sep + th_sep + ']*$');
	
	return value.match(regexp);
}

function checkInputs(elem) {
	var value = elem.value;
	isvalid = checkValidPriceValue(value);
	var errMsg = (isvalid) ? '' : fvalidate.i18n.reseller_wizard.errorMsg;
	setClass(elem, isvalid, errMsg);
}


function setClass(elem, isvalid, str) {
	var elemT = document.getElementById(elem.id + '_text');
	var classElemT = (isvalid)? 'black' : 'red-bold';
	var classElem = elem.className.replace(' fieldError', '');
	
	classElem = (isvalid) ? classElem : classElem+' fieldError';
	
	elemT.className = classElemT;
	elemT.innerHTML = str;
	elem.className = classElem;
	
}

function formatNumbers(value, type) {
	var dec_sep = fvalidate.i18n.decimal; // localized decimal separator
	var th_sep = fvalidate.i18n.thousand; // localized thousand separator 
	var str = value.toString();

	if (type=='js') {
		if (th_sep) str = str.split(th_sep).join('');
		if (dec_sep!='.') str = str.replace(dec_sep, '.');
		
		return str;
	}
	
	x = str.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? dec_sep + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (th_sep && rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + th_sep + '$2');
	}
	str =  x1 + x2;
	
	return str;
}

// difference between costs towards provider and reseller's selling pricing 
function calcMargin(elem, src_amount) {
	var objMargin = document.getElementById(elem.id+'_text');
	if (!objMargin) return;
	var srcMsg = fvalidate.i18n.reseller_wizard.srcMsg;
	var srcMsgInvalid = fvalidate.i18n.reseller_wizard.srcInvalid;
	var errMsg = fvalidate.i18n.reseller_wizard.errorMsg;
	var zeroMsg = fvalidate.i18n.reseller_wizard.srcZero;
	

	var value = Number(formatNumbers(elem.value.trim(), 'js'));
	
	var src_amount_f = formatNumbers(src_amount, 'js');

	
	//check, if input value is valid
	if ( isNaN(value) || !checkValidPriceValue(elem.value.trim()) ) {
		var str = (elem.value!=src_amount) ? errMsg : srcMsgInvalid.replace('@1@', src_amount);
		setClass(elem, false, str); 
		return;
	}
	
	if (src_amount=='') return; // don't calculate margin, if src_amount=''
	
	var src_number = Number(src_amount_f);
	//check, if src_amount is valid
	if (isNaN(src_number) || !checkValidPriceValue(src_amount)) {
		setClass(elem, true, srcMsgInvalid.replace('@1@', src_amount));
		return;
	}
	
	elem.className = elem.className.replace(' fieldError', '');
	var new_value;
	
	if (value!=0) {
		new_value = ((value-src_number)/value)*100;
	}
	else 	{
		if (value==0) {
			new_value = Number(value);
		}
		else {
			new_value = zeroMsg + ' ' + srcMsgInvalid.replace('@1@', src_amount);
			setClass(elem, true, new_value);
			return;
		}	
	}	
	
	if (new_value>0) {
		objMargin.className = 'green';
	}	
	else if (new_value<0) {
		objMargin.className = 'red';
	}	
	else {
		objMargin.className = 'black';
	}	
		
	//format new value with localized decimal and thousand separators
	
	
	
	var newMarginStr = srcMsg.replace('@1@', formatNumbers(Number(new_value).toFixed(1), 'locale'));
	
	objMargin.innerHTML = newMarginStr.replace('@2@', src_amount);
	
}

//find all not disabled inputs in selected rows with reseller prices 
function findInputs() {
	var inputElements = document.defaultForm.getElementsByTagName('INPUT');
	var priceElements = new Array();
	var parentName = 'TR';
	var k=0;
	
	for (var i=0; i<inputElements.length; i++) {
		if (inputElements[i].attributes['source-amount'] && !inputElements[i].disabled ) {
			var elCh = findObjCheckbox (inputElements[i]);
			if (elCh.checked) {
				priceElements[k] = inputElements[i];
				k++;
			}	
		}	
	}
	return priceElements;
}


// Reset Selected Prices To Provider Default
function resetPrices() {
	var priceElements = findInputs();
	if (priceElements.length==0) {
		alert('Fields not found!');
		return;
	}
	for (var i=0; i<priceElements.length; i++) {
		var srcVal = priceElements[i].attributes['source-amount'].value;
		if (srcVal!='') {
			priceElements[i].value = srcVal;  
			calcMargin(priceElements[i], srcVal);
		}	
	}
	
	
}

//adjust reseller prices
function adjustPrices(el, popDivId, parentObj) {
	var value = formatNumbers(el.value, 'js');
	var errMsg = fvalidate.i18n.reseller_wizard.errorMsg;
	var isvalid = checkValidPriceValue(value);
	if (!checkValidPriceValue(el.value) || isNaN(value)) {
		alert(errMsg);
		return;
	}
		
	var priceElements = findInputs();
	
	if (priceElements.length==0) {
		alert('Fields not found!');
		return;
	}
	
	for (var i=0; i<priceElements.length; i++) {
		var priceEl;
		var validPrice=false;
		validPrice = checkValidPriceValue(priceElements[i].value);
		if (!validPrice) continue;
		priceEl =  Number(formatNumbers(priceElements[i].value, 'js'));
		var inc_val = 0;
		inc_val = priceEl + (value * priceEl) / 100;
		priceElements[i].value = formatNumbers(inc_val.toFixed(4), 'locale');
		calcMargin(priceElements[i], priceElements[i].attributes['source-amount'].value);
	}
	switchPopupDiv(popDivId, parentObj);
}
//********** /RESELLER WIZARD*********//



//--- input selector;
var ISreq = null;
var ACTIONroot = '/servlet/Turbine/';
var ISlast = '';
var ISid = 'info_popup';
function popupInputSelector( id, url ){
	if (ISreq) { ISreq = null; }
	ISreq = AJAXRequest();
	if (!ISreq) { return false; }

	if( !checkShow( ISid ) ) {
		hideDIV( ISid ); setWaitBox( ISid );
		showPopupDiv( ISid, 'wait' ); setVshadow( ISid );
	}

	//--- AJAX signature;
	ISlast = url;
	docCursor( 'progress' );
	if ( url.indexOf( '?' )!=-1 ){ url+='&'; } else { url+='?'; }
	url += 'ajax_mode=true';
	ISreq.onreadystatechange = function() { inp_sel_req( ISreq, ISid ); }
	ISreq.open( 'GET', secureURI(ACTIONroot + url), true );
	ISreq = AJAXRequestHeader( ISreq, '' );
}


function docCursor( s ){ document.body.style.cursor = s; }


function inp_sel_req( request, param ){
	if ( request.readyState == 4 ) {
		if ( request.status == 200 && param != '') {
			var r = request.responseText;
			var o = document.getElementById( param + '_cont' );
			if (o){
				//---avoid form using;
				r=r.replace(/<form /g,'<span '); r=r.replace(/form>/g,'span>');
				o.innerHTML = r;
				var p = document.getElementById( param );
				if (p && p.style.display!='none') {showPopupDiv( param, '' );}
				showPopupDiv( param, '' );
				setVshadow( param );
			} else { hideDIV( param ); }
		} else { hideDIV( param ); }
		docCursor( 'default' );
	}
}


function setValueFromPopup( id, val ){
	hideDIV( ISid );
	dataBinder.updateInput( id, val );
}


function setWaitBox( id ){
	var o = document.getElementById( id + '_cont' );
	if ( top.leftFrame ) {
		var c = top.leftFrame.document.getElementById( 'dynamic_clock_root' );
		if( c && o ){
			o.innerHTML = '<div style="margin: 10px 50px 10px 10px;">' + c.innerHTML + '</div>';
			setVshadow( id );
		}
	}
}


function get_win_env(){
	var sx=parseInt(document.documentElement.clientWidth,10);
	var sy=parseInt(document.documentElement.clientHeight,10);
	var ox=parseInt(document.documentElement.scrollLeft,10);
	var oy=parseInt(document.documentElement.scrollTop,10);
	var m=getMouseXY();
	return[sx,sy,ox,oy,m[0],m[1]];
}


function centerDIV(id,cx,cy){
	var o = document.getElementById(id);
	if(o){
		var c=get_win_env();
		var x=parseInt((c[0]-cx)/2+c[2],10);
		var y=parseInt((c[1]-cy)/2+c[3],10)-9;
		if(x<10){x=10;}
		if(y<10){y=10;}
		setDIVxy(id,x,y);
		showDIV(id);
	}
}


function showPopupDiv(id,w){
	callTip('');
	var o = document.getElementById(id);
	if (o) {
		if (o.style.display=='none'){
			var vb = o.style.visibility;
			o.style.visibility='hidden';
			showDIV(id);

			//--- set div width (wait or 80% from visual area);
			var obj = document.getElementById( id + '_obj_table' );
			var c = get_win_env();
			var ox = 200;
			if( w != 'wait' ) {ox = parseInt(c[0]*0.8,10);}
			if(obj){obj.style.width = (ox-16)+'px';}
			o.style.width = ox+'px';

			var cx = parseInt(o.offsetWidth,10);
			var cy = parseInt(o.offsetHeight,10);
			hideDIV(id);
			setVshadow(id);
			o.style.visibility = vb;

			hideAllPopup();
			switchCombos(false);

			setVshadow(id);
			centerDIV(id,cx,cy);
			zIndexPopup(id);

		} else {

			hideDIV(id);
			switchCombos(true);
		}
	}
	swPDiv='';
}

function getPopupFilters(){
	var p='';
	var o=document.getElementsByTagName('input');
	for(i=0;i<o.length;i++){
		if(o[i].name && o[i].name.indexOf( 'webgate__ajax_filter_' )!=-1) {
			if(p!=''){p+='&';}
			p+=o[i].name.substr(21)+'='+o[i].value;
		}
	}
	var o=document.getElementsByTagName('select');
	for(i=0;i<o.length;i++){
		if(o[i].name && o[i].name.indexOf( 'webgate__ajax_filter_' )!=-1) {
			if(p!=''){p+='&';}
			p+=o[i].name.substr(21)+'='+o[i].selectedIndex;
		}
	}
	return p;
}


function submitFilter(href){
	//--ajax reload;
	if(href=='#') {
		var url = ISlast;
		if ( url.indexOf( '?' )!=-1 ){ url+='&'; } else { url+='?'; }
		popupInputSelector( '', url+getPopupFilters() );

	//--ajax reset;
	} else if(href=='reset') {
		popupInputSelector( '', ISlast );

	//--normal submit;
	} else {
		document.defaultForm.action = href;
		doSubmit();
	}
}	

function sortBrowse(url, shift_url, shift, method, shift_method){
	if(url=='#') {
		popupInputSelector( '', ISlast );
	} else {
		var _method = document.defaultForm.method;
		if(shift){
			document.defaultForm.method = shift_method;
			doSubmit(shift_url);
		}else{
			document.defaultForm.method = method;
			doSubmit(url);
		}
	}
}

/*
* PEM to BM integration
*/

function to_bm( url )
{
	url=url.replace(/Turbineaction/g,'Turbine/action');
	storeCookies();
	top.mainFrame.location.href=url + '/bw_id/' + top.BW_ID + '/mainFrame/true';
	top.leftFrame.location.href=url + '/bw_id/' + top.BW_ID + '/mainFrame/false';
	setTop('pem');
}

function to_pem( url )
{
	url=url.replace(/Turbineaction/g,'Turbine/action');
	deleteCookie("pem_nav"+top.BW_ID, "", "");
	deleteCookie("pem_url"+top.BW_ID, "", "");
	top.location.href=url;
	setTop('bm');
}

var serviceBMname = 'Billing'; //<- TODO: localize / or use constants.js;
var servicePEMname = 'POA';
function setTop( t ){
	var o = document.getElementById( 'to_bm' );
	if (o) {
		o.onclick='';
		if( t == 'bm' ){
			 o.href = "javascript:top.mainFrame.showSandclock();to_bm('/servlet/Turbine/action/pcp.billing_manager.ToBMHandler/');";
			var s = o.innerHTML.replace(/to\_pem\.gif/g,'to_bm.gif').split('<');
			o.innerHTML = '<' + s[1] + '<br/>' + serviceBMname;
			o.title = serviceBMname;
		} else {
			o.href = "javascript:to_pem('/servlet/Turbine/action/pcp.ToPEMHandler/bw_id/" + top.BW_ID + "');";
			var s = o.innerHTML.replace(/to\_bm\.gif/g,'to_pem.gif').split('<');
			o.innerHTML = '<' + s[1] + '<br/>' + servicePEMname;
			o.title = servicePEMname
		}
	}
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

function storeCookies()
{
	try {
		pem_url=top.mainFrame.location.href;
		pem_nav=top.leftFrame.location.href;

		deleteCookie("pem_nav"+top.BW_ID, "", "");
		deleteCookie("pem_url"+top.BW_ID, "", "");

		document.cookie = "pem_nav"+top.BW_ID+"=" + escape(pem_nav);
		document.cookie = "pem_url"+top.BW_ID+"=" + escape(pem_url);
	} catch (err) { /* ignore */ }
}
