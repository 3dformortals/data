var date_id='';
var date_value='';
var date_y='';
var date_d='';
var date_h='';
var date_min='';
var date_format='';
var date_h='';
var date_min='';
var date_obj= new Date();
var date_time_flag = false;	
var date_theme	= '/../skins/default'; /* To be customized later  */

var ctype = 'gregorian';



function getCalendarTime(){ //Setting global variables for time
	var time_input = document.getElementById('calendar_time');
	if (time_input){
		var t = time_input.value.split(/\W+/);
		date_h = parseInt(digitsPersian2English(t[0]), 10);
		date_min = parseInt(digitsPersian2English(t[1]), 10);		
		if(isNaN(date_h)) date_h = 0;
		if(isNaN(date_min)) date_min = 0;		
	}	
}

function calendarTimeEnter(){
	getCalendarTime();
	date_obj.setUTCHours(date_h, date_min);
	setDate(date_obj, date_format);
	hideDate();
}

function hideDate(){
	var s=document.getElementById(date_id+'_div');
	if(s){
		s.innerHTML = '';
		s.style.visibility = "hidden";
		date_id = '';
		switchCombos(true);
	}
}

//Main Entry point
//id - control unque identificator
//format - date format, like %Y-%m-%d
//ctype - calendar type (gregorian/persian)
function showDate(id, format, calendar_type){
	if (calendar_type) ctype = calendar_type;
	if (!format)  format = date_def_format;
	date_format = format; //setting global variable for a later use

	if(id==date_id){
		//clicking on the already open clandar will close it				
		hideDate();
		return false;
	}

	//if(id!=date_id && date_id!=''){hideDate();}
	hideAllPopup();
	
	var sd=document.getElementById(id);

	var d = parseDate(sd.value, date_format, ctype);
	date_obj = d; //Setting a global
	date_m = d.getLocalMonth()+1; 
	date_d = d.getLocalDate();
	date_y = d.getLocalFullYear();
	date_h = d.getUTCHours();
	date_min = d.getUTCMinutes();
	//alert('Globals '+date_y+' '+date_m+' '+date_d);
	date_id = id;				
	var s=document.getElementById(date_id+'_div');
	if(s){
		s.innerHTML=makeDateControl();
		setPopDivXY(id+'_div',sd);
		s.style.visibility = "visible";
		setVshadow('calendar_id');
		switchCombos(false);
		if(date_time_flag){
			document.getElementById('calendar_time').focus();
		}
	}
}

function todayDate(){
	var d = new Date();
	getCalendarTime();	
	date_m = d.getLocalMonth()+1; 
	date_d = d.getLocalDate();
	date_y = d.getLocalFullYear();
	d.setUTCHours(date_h, date_min);
	setDate(d, date_format);
	hideDate();
}

function resetDate(){				
	s=document.getElementById(date_id);
	s.value = '';
	hideDate();
}
function setDate(currdate, format){
	s=document.getElementById(date_id);
	s.value=datePrint(currdate, format);
	if ( checkShow(date_id) ) s.focus();
}
function selectDay(day,month,year){
	date_d = day;
	date_m = month;
	date_y = year;
	getCalendarTime();
	
	var curr_date;
	if (ctype=='persian'){
		curr_date = new solarToGregorian(date_y, date_m, date_d, date_h, date_min)
	}else{
		curr_date = newUTCDate(date_y, date_m-1, date_d, date_h, date_min);
	}
	setDate(curr_date, date_format);
	hideDate();
}

function newUTCDate(y, month, d, h, min){
	var date = new Date();
	date.setUTCFullYear(y);
	date.setUTCMonth(month);
	date.setUTCDate(d);
	date.setUTCHours(h, min);
	return date;
}

function prevMonth(){								
	if(--date_m==0){
		date_m = 12;
		--date_y;
	}
	getCalendarTime();					
	var o=document.getElementById(date_id+'_div');
	o.innerHTML=makeDateControl();
	setVshadow('calendar_id');
}

function nextMonth(){								
	if(++date_m>12){
		date_m = 1;
		++date_y;
	}
	getCalendarTime();				
	var o=document.getElementById(date_id+'_div');
	o.innerHTML=makeDateControl();
	setVshadow('calendar_id');
}
function prevYear(){								
	--date_y;
	getCalendarTime();					
	var o=document.getElementById(date_id+'_div');
	o.innerHTML=makeDateControl();
	setVshadow('calendar_id');
}
function nextYear(){								
	++date_y;
	getCalendarTime();					
	var o=document.getElementById(date_id+'_div');
	o.innerHTML=makeDateControl();
	setVshadow('calendar_id');
}

function updateMonth(){													
	html = getHTMLDateMonth();
	s=document.getElementById('date_month');
	s.innerHTML=html;
}
function showDays(){													
	s=document.getElementById('date_days');
	s.innerHTML = getHTMLDateWeeks();
}
function getHTMLDateMonth(){													
	html = (ctype == 'persian'?Date_months_persian[date_m-1]:Date_months[date_m-1])+', '+(ctype=='persian'?digitsEnglish2Persian(date_y):date_y);
	return html;
}

function calcWeekDay(d, m, y){
	if(ctype =='persian'){
		var dd = solarToGregorian(y, m, d);
	}else{
 		var dd = new newUTCDate(y, m-1, d, 0, 0);
	}
	return dd.getUTCDay()+1;
}

function calcPersianMonthDays(yy, mm) {
	//alert(yy+' '+ mm);
  if (mm >= 1 && mm <= 6) return 31;
  if (mm >= 7 && mm <= 11) return 30;
  if (mm == 12){
  	if (isLeapYear(dkSolar, yy)) return 30;
		else return 29;
  }
}
function calcGregorianMonthDays(date_m_,date_y_,next_first_w){
	return 32 - new Date(date_y_, date_m_-1, 32).getDate();	
}

function calcMonthDays(date_m_,date_y_,next_first_w){
	if(ctype == 'persian'){
		return calcPersianMonthDays(date_y_, date_m_);
	}else{
		return calcGregorianMonthDays(date_m_,date_y_,next_first_w);
	}
}


function getHTMLDateWeeks(){
	//
	var fw = calcWeekDay(1,date_m,date_y);

	//
	var wday=0;
	var week=0;
	var dd=0;
	var day = 0;
	//				
	dd_prevm = date_m>1?(date_m-1):12;
	dd_prevy = date_m>1?date_y:(date_y-1);
	dd_prevd = calcMonthDays(dd_prevm,dd_prevy,fw);
	//
	//
	dd_nextm = date_m < 12?(date_m+1):1;
	dd_nexty = date_m < 12?date_y:(date_y+1);

	//
	d = calcWeekDay(1,dd_nextm,dd_nexty);
	endm = calcMonthDays(date_m,date_y,d);
	// ( d<fw?(7+d-fw):(d-fw) ) + 28;

	//
	html = "";
	html += "<table cellpadding=3 cellspacing=1 border=0 width='100%'>";
	
	html += "<tr>";
	
	for(i=0;i<(Date_weekdays.length);i++){
		html += "<td align='center' class='wd'>"+Date_weekdays[i]+"</td>";
	}
	html += "</tr>";
	// endm - days in month, fw - first day of week (1 -7)  for current month
	// endm + fw-1 - it's total days for show (include  days from prev month).
	total_days = endm + fw-1;
	if ( total_days % 7  == 0) {
			// no need one more rows for show last week.
			need_week = total_days / 7
		} else {
			// add one more rows for last week.
			need_week = Math.floor(total_days / 7) + 1;
	}
	for( i=1;i<=need_week*7;i++ ){					
		dd = 0;
		if(fw>i){
			day = (dd_prevd - fw) + i + 1;
			dd = -1;
		};
		if(i>=fw && (i-fw) < endm ){
			day = i-fw+1;
		}
		if(i>=fw && (i-fw) >= endm ){
			day = (i - fw) - endm+1;
			dd = 1;
		};
		
		if(++wday>7){
			if(week>1){
				html += '</tr>';
			}
			html += '<tr>';
			week++;
			wday = 1;
		}
		html += '<td align="center" class="';
		
		html += (day==date_d && dd==0)?'c1':(dd==0?'c2':'c3') 
		
		html += '" onClick="selectDay(';
		if(dd==0){
			html += day  +','+date_m+','+date_y;
		}
		if(dd<0){
			html += day  +','+dd_prevm+','+dd_prevy;
		}	
		if(dd>0){
			html += day  +','+dd_nextm+','+dd_nexty;
		}	
		html += ');return false"><a href="#">'+(ctype=='persian'?digitsEnglish2Persian(day):day)+'</a></td>';
	}
	if(wday>1){
		html += '</tr>';
	}
	html += "</table>";
	return html;
}
function makeDateControl(){			
	var html='';

	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);
	if(version < 7.0){ie='ie6';} else {ie='';}

	html += '<div id="calendar_id" class="popupArea" style="min-width:180px;" dir="ltr" onmouseover="overPOP=true" onmouseout="overPOP=false" onmousedown="zIndexPopup(\'calendar_id\')">';
	html += '<table cellSpacing="0" cellPadding="0" border="0">';
	html += '<tr>';
	//---left v-shadows;
	html += '<td width="8px" class="popClear">';
	html += '<table class="popClear" cellSpacing="0" cellPadding="0" border="0" width="8px" height="100%">';
	html += '<tr class="popClear" height="8px"><td width="8px" height="8px" class="dsUL'+ie+'">&#160;</td></tr>';
	html += '<tr class="popClear"><td id="calendar_id_left_shadow" width="8px" class="dsLT'+ie+'">&#160;</td></tr>';
	html += '</table>';
	html += '</td>';

	//---content;
	html += '<td valign="top" width="175px" id="calendar_id_obj_base">';
	var tdir = (ctype == 'gregorian')?'ltr':'rtl';
	//next/prev month/year icons
	var pmi = (ctype == 'gregorian')?'arr_lt':'arr_gt';
	var pyi = (ctype == 'gregorian')?'ff_lt':'ff_gt';
	var nmi = (ctype == 'gregorian')?'arr_gt':'arr_lt';
	var nyi = (ctype == 'gregorian')?'ff_gt':'ff_lt';
	var nxt = (ctype == 'gregorian')?'next':'prev';
	var prv = (ctype == 'gregorian')?'prev':'next';
	var cl = (ctype == 'gregorian')?'L':'R';
	var cr = (ctype == 'gregorian')?'R':'L';
	var al = (ctype == 'gregorian')?'left':'right';
	html += '<table cellpadding="0" cellspacing="0" border="0" width="100%" class="popDiv" dir="'+ tdir + '">';

	html += '<tr class="popDivHead">';
	html += '<td width="18px" onclick="hideDate();return false"><div class="popDivClose" alt="'+ Calendar_text['close'] +'">&#160;</div></td>';
	html += '<td width="100%" align="'+al+'" style="vertical-align:middle;">&#160;&#160;<b><span id="calendar_id_header">'+Calendar_text['title']+'</span></b>&#160;&#160;</td>';
	html += '<td width="18px"><img src="'+calendarPATH+date_theme+'/images/1x1.gif" width="18" height="18" border="0"/></td>';
	html += '</tr>';

	html += '<tr>';
	html += '<td colspan="3" class="popCalendar">';

	html += "<table cellpadding=0 cellspacing=0 border=0 width='100%'>";
	html += '<tr><td colspan="5"><img src="'+calendarPATH+date_theme+'/images/1x1.gif" width="1" height="4"></td></tr>';
	html += "<tr>";
	
	html += "<td width='15%' align='right'>&nbsp;<a href='#' onClick='"+prv+"Year();return false'><img src='"+calendarPATH+date_theme+"/icons/"+pyi+".gif' width='12' height='11' border='0'/></a>&nbsp;</td>";
	html += "<td width='15%' align='right'>&nbsp;<a href='#' onClick='"+prv+"Month();return false'><img src='"+calendarPATH+date_theme+"/icons/"+pmi+".gif' width='12' height='11' border='0'/></a>&nbsp;</td>";
	html += "<td width='40%'align='center'><span id='date_month'>"+getHTMLDateMonth()+"</span></td>";
	html += "<td width='15%' align='left'>&nbsp;<a href='#' onClick='"+nxt+"Month();return false'><img src='"+calendarPATH+date_theme+"/icons/"+nmi+".gif' width='12' height='11' border='0'/></a>&nbsp;</td>";				
	html += "<td width='15%' align='left'>&nbsp;<a href='#' onClick='"+nxt+"Year();return false'><img src='"+calendarPATH+date_theme+"/icons/"+nyi+".gif' width='12' height='11' border='0'/></a>&nbsp;</td>";	
	html += "</tr>";
	html += '<tr><td colspan="5"><img src="'+calendarPATH+date_theme+'/images/1x1.gif" width="1" height="4"/></td></tr>';
	html += "</table>";
	//////////
	html += '<span id="date_days">';
	html += getHTMLDateWeeks();
	html += '</span>';
	//////////
	html += "<table cellpadding=0 cellspacing=0 border=0 width='100%'>";
	html += '<tr><td colspan="1"><img src="'+calendarPATH+date_theme+'/images/1x1.gif" width="1" height="4"></td></tr>';
	html += "<tr><td width='100%' align='center'>";

	html += '&#160;<a href="#" onClick="todayDate();return false">'+ Calendar_text['today'] +'</a>&#160;';				
	html += '&#160;<a href="#" onClick="resetDate();return false">'+ Calendar_text['clear'] +'</a>&#160;';

	html += "</td></tr>";
	html += '<tr><td><img src="'+calendarPATH+date_theme+'/images/1x1.gif" width="1" height="4"></td></tr>';
	if(date_time_flag){
		html += '<tr><td width="100%" align="center">';
		var _date_h = (date_h < 10)? '0'+date_h : date_h;
		var _date_min = (date_min < 10)? '0'+date_min : date_min;		
		html += '<input type="text" name="calendar_time" id="calendar_time" style="margin:4px" maxlength="5" size="5" value="'+(ctype=='persian'?digitsEnglish2Persian(_date_h):_date_h)+':'+(ctype=='persian'?digitsEnglish2Persian(_date_min):_date_min)+'" onkeypress="if(event.keyCode == 13){calendarTimeEnter(this)}"/>';
		html += "</td></tr>";
	}

	html += "</table>";
	
	html += '</td>';
	html += '</tr>';
	html += '</table>';
	html += '</td>';

	//---right v-shadows;
	html += '<td class="popClear" width="8px" height="100%" valign="top">';
	html += '<table height="100%" width="8px" cellSpacing="0" cellPadding="0" border="0" class="popClear">';
	html += '<tr class="popClear"><td width="8px" height="8px" class="dsUR'+ie+'">&#160;</td></tr>';
	html += '<tr class="popClear"><td id="calendar_id_v_shadow" width="8px" class="dsRT'+ie+'">&#160;</td></tr>';
	html += '</table>';
	html += '</td>';
	html += '</tr>';
	
	//---down h-shadows;
	html += '<tr class="popClear" height="8px">';
	html += '<td height="8px" width="8px" class="dsDL'+ie+'">&#160;</td>';
	html += '<td id="calendar_id_h_shadow" height="8px" class="dsDN'+ie+'">&#160;</td>';
	html += '<td height="8px" width="8px" class="dsDR'+ie+'">&#160;</td>';
	html += '</tr>';
	html += '</table>';
	html += '</div>';
	
	return html;
}

//Parsing a date from the input string, using format and calendar type
//Returning a date object
function parseDate (date_src, format, ctype, validate) {
	var today = new Date();
	var ret = new Date();
	var y = null;
	var m = null;
	var d = null;
	var hr = null;
	var min = null;
	var sec = null;
	var msec = 0;
	var is_year,is_month,is_day,is_hour, is_minute, is_second = false; //flags indicating that certain parts of dattime required by format
	
	if (ctype == 'persian') date_src = digitsPersian2English(date_src);
	var a = format.match(/%.|[^%]+/g);
	for (var i = 0; i < a.length; i++) {
		if (a[i].charAt(0) == '%') {
			switch (a[i]) {
				case '%%':
				
				case '%t':
				case '%n':
				
				case '%u':
				case '%w':
					date_src = date_src.substr(1);
					break;
					
				
					date_src = date_src.substr(1);
					break;
					
				case '%U':
				case '%W':
				case '%V':
					var wn
					if (wn = date_src.match(/^[0-5]?\d/)) {
			    		date_src = date_src.substr(wn[0].length);
			    	}
					break;
				
				case '%C':
					var century;
					if (century = date_src.match(/^\d{1,2}/)) {
						date_src = date_src.substr(century[0].length);
					}
					break;
					
				case '%A':
				case '%a':
			    	var weekdayNames = (a[i] == '%a') ? Date_weekdays : Date_weekdays_full;
					for (j = 0; j < 7; ++j) {
						if (date_src.substr(0, weekdayNames[j].length).toLowerCase() == weekdayNames[j].toLowerCase()) {
							date_src = date_src.substr(weekdayNames[j].length);
							break; 
						}
					}
					break;
					
				case "%d":
				case "%e":
					is_day = true;
			    	if (d = date_src.match(/^[0-3]?\d/)) {
			    		date_src = date_src.substr(d[0].length);
			    		d = parseInt(d[0], 10);
			    	}
					break;
	
			    case "%m":
					is_month = true;
		    		if (m = date_src.match(/^[01]?\d/)) {
			    		date_src = date_src.substr(m[0].length);
			    		m = parseInt(m[0], 10) - 1;
			    	}
					break;
		
			    case "%Y":
			    case "%y":
					is_year = true;
			    	if (y = date_src.match(/^\d{2,4}/)) {
			    		date_src = date_src.substr(y[0].length);
			    		y = parseInt(y[0], 10);
			    		if (y < 100) {
							if (ctype == 'persian') y += (y > 29) ? 1300 : 1400;
							else y += (y > 29) ? 1900 : 2000;
						}
			    	}
				break;
	
			    case "%b":
			    case "%B":
					is_month = true;
			    	if (ctype == 'persian') {
			    		var monthNames = Date_months_persian; // No short names for persian months
			    	} else {
			    		var monthNames = (a[i] == '%b') ? Date_months : Date_months_full;
			    	}
					for (j = 0; j < 12; ++j) {
						if (date_src.substr(0, monthNames[j].length).toLowerCase() == monthNames[j].toLowerCase()) {
							date_src = date_src.substr(monthNames[j].length);
							m = j;
							break; 
						}
					}
					break;
	
			    case "%H":
			    case "%I":
			    case "%k":
			    case "%l":
					is_hour = true;
			    	if (hr = date_src.match(/^[0-2]?\d/)) {
			    		date_src = date_src.substr(hr[0].length);
			    		hr = parseInt(hr[0], 10);
			    	}
			    	date_time_flag = true;
				break;
	
			    case "%P":
			    case "%p":
			    	if (date_src.substr(0, Calendar_text["LPM"].length) == Calendar_text["LPM"]) {
						date_src = date_src.substr(Calendar_text["LPM"].length);
						if (hr < 12) hr += 12;
			    	}
			    	
			    	if (date_src.substr(0, Calendar_text["PM"].length) == Calendar_text["PM"]) {
			    		str = str.substr(Calendar_text["PM"].length);
						if (hr < 12) hr += 12;
			    	}
			    	
			    	if (date_src.substr(0, Calendar_text["LAM"].length) == Calendar_text["LAM"]) {
			    		date_src = date_src.substr(Calendar_text["LAM"].length);
						if (hr >= 12) hr -= 12;
			    	}
			    	
			    	if (date_src.substr(0, Calendar_text["AM"].length) == Calendar_text["AM"]) {
			    		date_src = date_src.substr(Calendar_text["AM"].length);
						if (hr >= 12) hr -= 12;
			    	}
			    	date_time_flag = true;
					break;
	
			    case "%M":
					is_minute = true;
			    	if (min = date_src.match(/^[0-5]?\d/)) {
			    		date_src = date_src.substr(min[0].length);
			    		min = parseInt(min[0], 10);
			    	}
			    	date_time_flag = true;
					break;
					
				case "%S":
					is_second = true;
			    	if (sec = date_src.match(/^[0-5]?\d/)) {
			    		date_src = date_src.substr(sec[0].length);
			    		sec = parseInt(sec[0], 10);
			    	}
					break;
					
				case "%s":
					var time;
					if (time = date_src.match(/^-?\d+/)) {
						return new Date(parseInt(time[0], 10) * 1000);
					}
					break;
				
				default :
					date_src = date_src.substr(2);
					break;
			}
		} else {
			date_src = date_src.substr(a[i].length);
		}
	}
	if (validate){
		if ((y == null || isNaN(y)) && is_year) return true; 
		if ((m == null || isNaN(m) || m > 11 || m < 0) && is_month)  return true;
		if ((d == null || isNaN(d) || d > 31 || d < 1) && is_day)  return true;
		if ((hr == null || isNaN(hr) || hr > 24 || hr < 0) && is_hour)  return true;
		if ((min == null || isNaN(min) || min > 59 || min < 0) && is_minute)  return true;
		if ((sec == null || isNaN(sec) || sec > 59 || sec < 0) && is_second)  return true;
		return false; //no errors found
	}else{
		if (y == null || isNaN(y)) y = today.getLocalFullYear(); 
		if (m == null || isNaN(m)) m = today.getLocalMonth();
		if (d == null || isNaN(d)) d = today.getLocalDate();
		if (hr == null || isNaN(hr)) hr = today.getUTCHours();
		if (min == null || isNaN(min)) min = today.getUTCMinutes();
		if (sec == null || isNaN(sec)) sec = today.getUTCSeconds();	
	}
	ret.setLocalFullYear(y, m, d);
	
	ret.setUTCHours(hr, min, sec, msec);
	
	return ret
}	

function datePrint(dateObj, format_str) {
	var m = dateObj.getLocalMonth();
	var d = dateObj.getLocalDate();
	var y = dateObj.getLocalFullYear(); 
	
	//var wn = dateObj.getLocalWeekNumber();
	
	var w = dateObj.getUTCSeconds();
	var s = {};
	var hr = dateObj.getUTCHours();
	var pm = (hr >= 12);
	var ir = (pm) ? (hr - 12) : hr;
	var dy = dateObj.getUTCDayOfYear();
	if (ir == 0)
		ir = 12;
	var min = dateObj.getUTCMinutes();
	var sec = dateObj.getUTCSeconds();
	s["%a"] = Date_weekdays[w];
	s["%A"] = Date_weekdays_full[w];
	s["%b"] = (ctype == 'persian'?Date_months_persian[m] : Date_months[m]); 
	s["%B"] = (ctype == 'persian'?Date_months_persian[m] : Date_months_full[m]); 
	s["%C"] = 1 + Math.floor(y / 100); // the century number
	s["%d"] = (d < 10) ? ("0" + d) : d; // the day of the month (range 01 to 31)
	s["%e"] = d; // the day of the month (range 1 to 31)
	s["%H"] = (hr < 10) ? ("0" + hr) : hr; // hour, range 00 to 23 (24h format)
	s["%I"] = (ir < 10) ? ("0" + ir) : ir; // hour, range 01 to 12 (12h format)
	s["%j"] = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy; // day of the year (range 001 to 366)
	s["%k"] = hr;		// hour, range 0 to 23 (24h format)
	s["%l"] = ir;		// hour, range 1 to 12 (12h format)
	s["%m"] = (m < 9) ? ("0" + (1+m)) : (1+m); // month, range 01 to 12
	s["%M"] = (min < 10) ? ("0" + min) : min; // minute, range 00 to 59
	s["%n"] = "\n";		// a newline character
	s["%p"] = pm ? "PM" : "AM";
	s["%P"] = pm ? "pm" : "am";
	s["%s"] = Math.floor(dateObj.getTime() / 1000);
	s["%S"] = (sec < 10) ? ("0" + sec) : sec; // seconds, range 00 to 59
	s["%t"] = "\t";		// a tab character
	//s["%U"] = s["%W"] = s["%V"] = (wn < 10) ? ("0" + wn) : wn;
	s["%u"] = w + 1;	// the day of the week (range 1 to 7, 1 = MON)
	s["%w"] = w;		// the day of the week (range 0 to 6, 0 = SUN)
	s["%y"] = ('' + y).substr(2, 2); // year without the century (range 00 to 99)
	s["%Y"] = y;		// year with the century
	s["%%"] = "%";		// a literal '%' character

	var re = /%./g;
	if (!is.ie5 && !is.khtml){
		ret_str = format_str.replace(re, function (par) { return s[par] || par; });
	}else{
		var a = format_str.match(re);
		var ret_str = format_str;
		for (var i = 0; i < a.length; i++) {
			var tmp = s[a[i]];
			if (tmp) {
				re = new RegExp(a[i], 'g');
				ret_str = ret_str.replace(re, tmp);
			}
		}
	}
	return (ctype == 'persian'? digitsEnglish2Persian(ret_str) : ret_str);
}

//Utilities and patches

function digitsPersian2English(str) {
	str = str.toString();

	for (var i = 0; i < calendar_digits.length; i++) {
		str = str.replace(new RegExp(calendar_digits[i], 'g'), i);
	}
	return str;
}

function digitsEnglish2Persian(str) {
	str = str.toString();

	for (var i = 0; i < calendar_digits.length; i++) {
		str = str.replace(new RegExp(i, 'g'), calendar_digits[i]);
	}
	return str;
}


Date.prototype.getWeekNumber = function() {
	var d = newUTCDate(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), 0, 0, 0);
	var DoW = d.getUTCDay();
	d.setUTCDate(d.getUTCDate() - (DoW + 6) % 7 + 3); // Nearest Thu
	var ms = d.valueOf(); // GMT
	d.setUTCMonth(0);
	d.setUTCDate(4); // Thu in Week 1
	return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
};

Date.prototype.getUTCDayOfYear = function() {
	var now = newUTCDate(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), 0, 0, 0);
	var then = newUTCDate(this.getUTCFullYear(), 0, 0, 0, 0, 0);
	var time = now - then;
	return Math.floor(time / Date.DAY);
};

Date.prototype.setLocalFullYear = function(y, m, d) {
	if (ctype == 'persian') {
//		if (m == undefined) m = UTC ? this.getJalaliUTCMonth() : this.getJalaliMonth();
//		if (d == undefined) d = UTC ? this.getJalaliUTCDate() : this.getJalaliDate();
 		return this.setPersianFullYear(y, m, d);
	} else {
//		if (m == undefined) m = UTC ? this.getUTCMonth() : this.getMonth();
//		if (d == undefined) d = UTC ? this.getUTCDate() : this.getUTCDate();
 		return this.setUTCFullYear(y, m, d);
	}
}

Date.prototype.setPersianFullYear = function (y, m, d) {
	//alert('Persian '+y+' '+m+' '+d);
	var gD = solarToGregorian(y, m+1, d);
	//alert(gD);
	return this.setUTCFullYear(gD.getUTCFullYear(), gD.getUTCMonth(), gD.getUTCDate());
}

Date.prototype.getLocalFullYear = function() {
	if (ctype == 'persian') {
 		return this.persianDate().getFullYear();
	} else {
 		return this.getUTCFullYear();
	}
}

Date.prototype.getLocalMonth = function() {
	if (ctype == 'persian') {
 		return this.persianDate().getMonth()
	} else {
 		return this.getUTCMonth();
	}
}

Date.prototype.getLocalDate = function() {
	if (ctype == 'persian') {
 		return this.persianDate().getDate();
	} else {
 		return this.getUTCDate();
	}
}

/*
Date.prototype.getLocalDay = function() {
	if (ctype == 'persian') {
 		return UTC ? this.getJalaliUTCDay() : this.getJalaliDay();
	} else {
 		return UTC ? this.getUTCDay() : this.getUTCDay();
	}
}
*/
Date.prototype.persianDate = function() {
	p = new gregorianToSolar(this.getUTCFullYear(), this.getUTCMonth()+1, this.getUTCDate());
	return p;
}

//Persian calendar calculations (requires calendar_astro.js)
var dkSolar = 0;
var dkGregorian = 1;

function isLeapYear(DateKind, Year)
{
	if (DateKind == dkSolar)
		return leapPersian(Year);
	else
		return leapGregorian(Year);
}

//  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?

function leapPersian(year)
{
    return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
}

//  persianToJd  --  Determine Julian day from Persian date
var PERSIAN_EPOCH = 1948320.5;

function persianToJd(year, month, day)
{
    var epbase, epyear;

    epbase = year - ((year >= 0) ? 474 : 473);
    epyear = 474 + mod(epbase, 2820);

    return day +
            ((month <= 7) ?
                ((month - 1) * 31) :
                (((month - 1) * 30) + 6)
            ) +
            Math.floor(((epyear * 682) - 110) / 2816) +
            (epyear - 1) * 365 +
            Math.floor(epbase / 2820) * 1029983 +
            (PERSIAN_EPOCH - 1); 
}

//  JD_TO_PERSIAN  --  Calculate Persian date from Julian day
function jdToPersian(jd)
{
    var year, month, day, depoch, cycle, cyear, ycycle,
        aux1, aux2, yday;

    jd = Math.floor(jd) + 0.5;

    depoch = jd - persianToJd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = mod(depoch, 1029983);
    if (cyear == 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = mod(cyear, 366);
        ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
                    aux1 + 1;
    }
    year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
        year--;
    }
    yday = (jd - persianToJd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (jd - persianToJd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

//  leapGregorian  --  Is a given year in the Gregorian calendar a leap year ?

function leapGregorian(year)
{
    return ((year % 4) == 0) &&
            (!(((year % 100) == 0) && ((year % 400) != 0)));
}

//  gregorianToJd  --  Determine Julian day number from Gregorian calendar date

var GREGORIAN_EPOCH = 1721425.5;

function gregorianToJd(year, month, day)
{
    return (GREGORIAN_EPOCH - 1) +
           (365 * (year - 1)) +
           Math.floor((year - 1) / 4) +
           (-Math.floor((year - 1) / 100)) +
           Math.floor((year - 1) / 400) +
           Math.floor((((367 * month) - 362) / 12) +
           ((month <= 2) ? 0 : (leapGregorian(year) ? -1 : -2) ) + day);
}

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day
function jdToGregorian(jd) {
    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
        yindex, dyindex, year, yearday, leapadj;

    wjd = Math.floor(jd - 0.5) + 0.5;
    depoch = wjd - GREGORIAN_EPOCH;
    quadricent = Math.floor(depoch / 146097);
    dqc = mod(depoch, 146097);
    cent = Math.floor(dqc / 36524);
    dcent = mod(dqc, 36524);
    quad = Math.floor(dcent / 1461);
    dquad = mod(dcent, 1461);
    yindex = Math.floor(dquad / 365);
    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent == 4) || (yindex == 4))) {
        year++;
    }
    yearday = wjd - gregorianToJd(year, 1, 1);
    leapadj = ((wjd < gregorianToJd(year, 3, 1)) ? 0
                                                  :
                  (leapGregorian(year) ? 1 : 2)
              );
    month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    day = (wjd - gregorianToJd(year, month, 1)) + 1;

    return new Array(year, month, day);
}

function gregorianToSolar(gYear, gMonth, gDay) {
  var dDate = new Date();
  if (gDay == 0 && gMonth == 0 && gYear == 0)	{
			gDay = dDate.getUTCDate();
			gMonth = dDate.getUTCMonth() + 1;
			gYear = dDate.getUTCFullYear();
			gWeekDay = dDate.getUTCDay();
  } else {
			dDate = newUTCDate(gYear, gMonth, gDay, 0, 0);
			gWeekDay = dDate.getUTCDay();
  }
  
  var persianDate = jdToPersian(gregorianToJd(gYear, gMonth, gDay));
	this.pYear = persianDate[0];
	this.pMonth = persianDate[1]-1;
	this.pDay = persianDate[2];
	//alert('gregorianToSolar '+gYear+' '+ gMonth+' '+gDay+' | '+this.pYear+' '+this.pMonth+' '+this.pDay);
	this.getDate  = function () { return this.pDay; };
	this.getMonth = function () { return this.pMonth; };
	this.getYear  = function () { return this.pYear; };
	this.getFullYear = function () { return this.pYear; };
}

function solarToGregorian(sYear, sMonth, sDay) {

    if (sDay == 0 && sMonth == 0 && sYear == 0) {
			dDate = new Date();

			return dDate;
    }
    
    var gregorianDate = jdToGregorian(persianToJd(sYear, sMonth, sDay));
    
    d = new newUTCDate(gregorianDate[0], gregorianDate[1]-1, gregorianDate[2],0,0);
    //alert('solarToGregorian '+sYear+' '+ sMonth+' '+ sDay+'|' + d);
	return d;
}

