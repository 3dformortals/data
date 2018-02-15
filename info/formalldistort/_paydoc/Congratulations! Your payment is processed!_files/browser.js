/*
   DynAPI Distribution
   Browser Class

   The DynAPI Distribution is distributed under the terms of the GNU LGPL license.
*/
function Browser() {
	var a	= navigator.userAgent.toLowerCase();
	var b=navigator.appName;
	if (b.indexOf('Netscape')!=-1) this.b="ns";
	else if ((b=="Opera") || (a.indexOf("Opera")>0)) this.b = "opera";
	else if (b=="Microsoft Internet Explorer") this.b="ie";
	if (!b) {this.b="invalid"; this.invalid=true;}
	this.version=navigator.appVersion;
	this.v=parseInt(this.version);
	this.ns=(this.b=="ns" && this.v>=4);
	this.ns4=(this.b=="ns" && this.v==4);
	this.ns6=(this.b=="ns" && this.v==5);
	this.ie=(this.b=="ie" && this.v>=4);
	this.ie4=(this.version.indexOf('MSIE 4')>0);
	this.ie5=(this.version.indexOf('MSIE 5')>0);
	this.ie55=(this.version.indexOf('MSIE 5.5')>0);
	this.ie6=(this.version.indexOf('MSIE 6.0')>0);
	this.ie7=(this.version.indexOf('MSIE 7.0')>0);
	this.ie8=(this.version.indexOf('MSIE 8.0')>0);
	this.ie9=(this.version.indexOf('MSIE 9.0')>0);	
	this.ff=(a.indexOf('firefox')>0)
	this.ff2=(a.indexOf('firefox/2')>0);	
	this.opera=(this.b=="opera");
	this.safari=(a.indexOf('safari') != -1);
	this.khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);
	this.dom=(document.createElement && document.appendChild && document.getElementsByTagName)?true:false;
	this.def=(this.ie||this.dom); // most used browsers, for faster if loops
	var ua=navigator.userAgent.toLowerCase();
	if (ua.indexOf("win")>-1) this.platform="win32";
	else if (ua.indexOf("mac")>-1) this.platform="mac";
	else this.platform="other";
}
is=new Browser();

