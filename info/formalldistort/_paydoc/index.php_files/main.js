String.prototype.trim = function() {
   return this.replace(/(^\s+|\s+$)/g, "");
}

//var undefined;

// dummy for mozilla Firebug plugin logging
if (typeof(console) == 'undefined') {
  console = {
    log : function(str) {},
    group : function(str) {},
    groupEnd : function() {},
    trace : function() {}
  }
}

// dummy for MochiKit to work in FF
if (typeof(log) == 'undefined') {
  log = function (msg) {
    console.log(msg);
  }
}

if (typeof(SW) == 'undefined') {
  SW = {
    _modules : {},
    loadStatus : {'loading' : 1, 'ok' : 2},

    _initLoadedModules : function() {
      var scripts = document.getElementsByTagName("script");

      SW._modules = {};
      for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].getAttribute("src");
        if (!src) continue;
        SW._modules[src] = {'status' : SW.loadStatus.ok};
      }
    },

    myimport : function(uri) {
      var request = false;

      if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        request = new XMLHttpRequest();
        //request.overrideMimeType("text/xml");
      } else if (window.ActiveXObject) { // IE
        try {
          request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
        }
      }

      if (!request) {
        console.log("Giving up. Cannot create an XMLHTTP instance.");
        return;
      }


      request.onreadystatechange = function () {
        if (request.readyState != 4) return;
        if (request.status == 200) {
          //document.write('<script type="text/javascript">'+request.responseText+'</script>');

          var script = document.createElement('script');
          script.type = 'text/javascript';
          //script.src = uri;
          //script.innerHTML = request.responseText;
          var theData = document.createTextNode(request.responseText);
          //script.appendChild(theData);
          //document.getElementsByTagName('head')[0].appendChild(script);

document.write('<script type="text/javascript">'+request.responseText+'</script>');

          SW._modules[uri] = {'status' : SW.loadStatus.ok};
          //console.log('loaded '+uri);
        }
      };
      request.open("GET", uri, true);
      request.send(null);
    },

    _import : function (uri) {
      if (uri in SW._modules) return;
      SW._modules[uri] = {'status' : SW.loadStatus.loading};
      //setTimeout('SW._import("'+uri+'")', 1); // do in background
      //console.log('import '+uri);
      SW._import(uri);
    }

  }
}
SW._initLoadedModules();

SW.Loader = function(waitObjects) {
  this.waitObjects = waitObjects;
}

SW.Loader.prototype = {
  objectsLoaded : function() {
    var waitObjects = this.waitObjects;
    if (typeof(waitObjects) == 'undefined') return true;
    if (typeof(waitObjects) == 'string') waitObjects = [waitObjects];
    for (var i=0; i<waitObjects.length; i++) {
      if (!eval(waitObjects[i])) return false;
    }
    return true;
  },

  execute : function(callback) {
    //console.log('SW.execute '+callback);
    var stillwait = false;
    for (m in SW._modules) {
      if (SW._modules[m].status != SW.loadStatus.ok) {
        stillwait = true;
        break;
      }
    }
    if (stillwait || !callback || !this.objectsLoaded() || !SW.Signal) {
      var self = this;
      //console.log('waiting '+callback);
      setTimeout(function () {self.execute(callback);}, 100);
    } else {
      //console.log('exec '+callback);
      SW.Signal.addLoadEvent(callback);
    }
  }
}

SW.update = function (self, obj/*, ...*/) {
  if (self === null) self = {};
  for (var i = 1; i < arguments.length; i++) {
    var o = arguments[i];
    if (typeof(o) != 'undefined' && o !== null) {
      for (var k in o) {
        if (o[k] === null) o[k] = {};
        self[k] = o[k];
      }
    }
  }
}

SW.findIdentical = function (lst, value, start/* = 0 */, /* optional */end) {
  if (typeof(end) == "undefined" || end == null) {
    end = lst.length;
  }
  if (typeof(start) == "undefined" || start == null) {
    start = 0;
  }
  for (var i = start; i < end; i++) {
    if (lst[i] === value) {
      return i;
    }
  }
  return -1;
}

SW.msg = function () {
  if (!arguments.length) return "";
  var msg = arguments[0];
  if (locale[arguments[0]] != undefined) msg = locale[arguments[0]];
  var list = msg.split('$');
  var trans = list[0];
  for (var i=1; i<list.length; i++) {
    var m = /^(\d+)(.*)/.exec(list[i]);
    if (m == null) trans += list[i];
    else {
      var arg = arguments[m[1]];
      trans += arg + m[2];
    }
  }
  return trans;
}

SW.isIE = function () {
  return 'Microsoft Internet Explorer' == navigator.appName
}


SW.selectCountry = function (obj, country) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].value != country) continue;
    obj.options[i].selected = true;
    break;
  }
}

SW.changeRatesPeriodPrices = function (obj, planID, digits, dec_sep, thousand_sep) {
	if (null == obj) return;
	if (!obj.value.length) return;
	 SW.Async.sendXMLHttpRequest('?info=planrate&PeriodID='+obj.value+'&PlanID='+planID,  function (str_rates_prices) {
	      var rates_prices = eval(str_rates_prices);
	      if (!rates_prices.length) return;
	    	  for (var i=0; i<rates_prices.length; i++) {
	    		  var obj_price_id = 'price_' + rates_prices[i].resourceCategoryID + '_' + rates_prices[i].resourceID;
	    		  var obj_price = document.getElementById(obj_price_id);
	    		  if (obj_price) {
	    			  var price_val = Number(rates_prices[i].extendedPrice).toFixed(digits);
	    			  if (isNaN(price_val)) {
	    				  obj_price.innerHTML = rates_prices[i].extendedPrice;
	    				  continue;
	    			  }   
	    			price_val = addSeparators(price_val, dec_sep, thousand_sep);
	    			obj_price.innerHTML = price_val;
	    		  }	  
	    	  }
	    });
}


SW.changeStateList = function (obj_country, obj_state, state, e) {
  if (!obj_country.options.length) return;
  if (null == obj_state) return;
  var countryCode = obj_country.options[obj_country.selectedIndex].value;

    // do not use SCRIPT_DIR as we can not determine it during synchronization and JS compression
    SW.Async.sendXMLHttpRequest('?info=statebook&CountryID='+countryCode,  function (str_states) {
      var states = eval(str_states);
      obj_state.length = 0;
      if (states.length) {
        obj_state[0] = new Option(locale["MAKE_SELECTION"], "");
        obj_state[0].selected = true;
        for (var i = 0; i < states.length; i++) {
          obj_state[i+1] = new Option(states[i].value, states[i].code);
          if (state.length && state == states[i].code) obj_state[i+1].selected = true;
        }
      }
      else {
        obj_state[0] = new Option(str_notApplicable, "");
      }

      if (obj_state.__span) {
        SW.Combo.populate(obj_state, obj_state.__span, obj_state.__ul);
      }

    }, e);

}

SW.refreshBasket = function (obj_payTool,e) {
  if (null == obj_payTool) return;
  var payToolID = obj_payTool.options[obj_payTool.selectedIndex].value;
  var paySystem = obj_payTool.options[obj_payTool.selectedIndex].attributes["system"].value;
  // do not use SCRIPT_DIR as we can not determine it during synchronization and JS compression
  SW.Async.sendXMLHttpRequest('?info=refreshbasket&PaySystemID='+paySystem,  function (str_basket) {
//      alert( str_basket );
      var basket = eval(str_basket);
      var hasInnerText = (document.getElementsByTagName("body")[0].innerText != undefined) ? true : false;

      if (!hasInnerText){ // this is not IE
        document.getElementById("totalOrderDIV").textContent = basket[0].ordertotal;
        document.getElementById("totalTaxDIV").textContent = basket[0].taxtotal;
        document.getElementById("TotalsExtraChargeDiv").textContent = basket[0].handlFee;
      }else{ // this is IE
        document.getElementById("totalOrderDIV").innerText = basket[0].ordertotal;
        document.getElementById("totalTaxDIV").innerText = basket[0].taxtotal;
        document.getElementById("TotalsExtraChargeDiv").innerText = basket[0].handlFee;
      }

//      alert( basket[0].handlFee );

      if( basket[0].handlFee > 0 ){
        document.getElementById("TotalsExtraCharge").style.display = '';
        document.getElementById("HandlingFeeWarning").style.display = '';
      }else{
        document.getElementById("TotalsExtraCharge").style.display = 'none';
        document.getElementById("HandlingFeeWarning").style.display = 'none';
      }
  }, e);
}

function include(uri) {
//   SW.myimport(uri);

  var scripts = document.getElementsByTagName("script");

  var allScripts = {};
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute("src");
    if (!src) continue;
    allScripts[src] = true;
  }

  if (uri in allScripts) return;

//   document.write('<script src="' + uri + '" type="text/javascript"></script>');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = uri;
  document.getElementsByTagName('head')[0].appendChild(script);

  SW._modules[uri] = {'status' : SW.loadStatus.ok};
}


function loader(callback, waitObjects) {
  var l = new SW.Loader(waitObjects);
  l.execute(callback);
}


function addSeparators(nStr, decimalSep, thousandsSep)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? decimalSep + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1) && thousandsSep) {
		x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
	}
	return x1 + x2;
}

//include_once("../js/MochiKit/MochiKit.js");
//include("../js/firebug/firebug.js");

// include("../js/signal.js");
// include("../js/validate.js");
// include("../js/dom.js");
// include("../js/async.js");
// include("../js/window.js");
// include("../js/combo.js");
// include("../js/widget.js");
// include("../js/spin.js");


var countDisplay = 0;

SW.Display = function (block, showOrHide, disableWhenHidden) {
  block = SW.DOM.getElement(block);
  var _disabled = false;
  if (showOrHide) {
    block.style.display = "block";
  } else {
    block.style.display = "none";
    _disabled = true;
  }
  if (disableWhenHidden) {
    var inputs = block.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = _disabled;
    }
    var selects = block.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = _disabled;
    }
    var textareas = block.getElementsByTagName('textarea');
    for (var i = 0; i < textareas.length; i++) {
      textareas[i].disabled = _disabled;
    }
  }
}

function Display(id, usestatus, setstatus) {
  switch(usestatus) {
    case false: {
      var obj = document.getElementById(id);
      if (obj != null) {
        var status = document.getElementById(id).style.display;
        if (status == "none") {
          document.getElementById(id).style.display = "block";
          countDisplay += 1;
        } else {
          document.getElementById(id).style.display = "none";
          countDisplay -= 1;
        }
      }
      break;
    }
    case true: {
      var obj = document.getElementById(id);
      if (obj != null) {
        if(setstatus) {
          document.getElementById(id).style.display = "block";
        } else {
          document.getElementById(id).style.display = "none";
        }
      }
    } break;
    default:
      break;
  }
}


// plan_period.tpl
function InnerTextIDiv(idselect, id) {
  var str;
  var obj = document.getElementById(id);

  if (typeof idselect == "string") {
    var idselect = document.getElementById(idselect);
  }

  if (obj != null && typeof idselect == "object" && idselect != null) {
    var index = idselect.selectedIndex;
    if (index >= 0) {
      //str = idselect.options[index].label;
      str = idselect.options[index].getAttribute("description");
      if(str != null && str.length > 0) {
        document.getElementById(id).innerHTML = ""+str+"";
      }
    }
  }
}


function AddHiddenFields(obj, nameFields, valueFields) {
  if(obj != null && typeof obj == "object") {
    var newElement;
    var newElemValue = valueFields;
    if(typeof valueFields == "string" && valueFields.indexOf("%0A") != -1){
      newElement = document.createElement("textarea");
      newElement.style.visibility = "hidden";
      newElemValue = decodeURIComponent(newElemValue.replace(/\+/g, '%20'));
    } else {
      newElement = document.createElement("input");
      newElement.type = "hidden";
    }
    newElement.name = ""+nameFields+"";
    newElement.value = ""+newElemValue+"";
    obj.appendChild(newElement);
  }
}

function confirmRemove() {
  return confirm(locale["JAVASCRIPT_ALERT_REMOVE_FROM_BASKET"]);
}

var win=null;
function NewWindow(mypage,myname,w,h,scroll,pos){
  if(pos=="random"){LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;}
  if(pos=="center"){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;}
  else if((pos!="center" && pos!="random") || pos==null){LeftPosition=0;TopPosition=20}
  settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
  win=window.open(mypage,myname,settings);
}


// EditGates/searchlightning.tpl
function InsertValueInField(Value, Name, Prefix) {
  var obj = document.getElementsByName(Name);
  var objByName = obj[Name];
  if (obj != null && typeof obj == "object") {
    if (typeof objByName["defaultPrefix"] == "undefined") {
      if (Name == "URL_INPUT") {
        var str = "http://www." + Prefix + Value;
      } else {
        var str = Prefix + Value;
      }
    } else {
      var str = objByName["defaultPrefix"] + Prefix + Value;
    }
    obj[Name].value = str;
  }
}

// EditGates/searchlightning.tpl
function ValidateURL(Name) {
  var obj = document.getElementsByName(Name);
  if (obj != null && typeof obj == "object") {
    var value = obj[0].value;
    var arrayOfSplit = value.split(".");
    var lengthOfArray = arrayOfSplit.length;
    var error = false;
    if (lengthOfArray <= 1) {
      window.alert(locale["JAVASCRIPT_ERROR_INVALID_DATA"]);
      obj[0].style.backgroundColor='#ffd9d9';
      error = true;
    } else {
      var lastZone = arrayOfSplit[lengthOfArray-1];
      if (lastZone.length <= 1 || lastZone.length > 4) {
        window.alert(locale["JAVASCRIPT_ERROR_INVALID_DATA"]);
        obj[0].style.backgroundColor='#ffd9d9';
        error = true;
      }
    }
    if (!error) {
      obj[0].style.backgroundColor='#FFFFFF';
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}


// ratedomain.tpl
function AscDisabling(current) {
  try {
    var ShowAlert = false;
    var objdomainlist = document.getElementById("domainlist");

    if (objdomainlist != null && typeof objdomainlist == "object") {
      var checkbox = objdomainlist.getElementsByTagName("input");
      for(var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].getAttribute("typecontrol") == "rate") {
          if (checkbox[i].checked) {
          } else {
            ShowAlert  = true;
          }
        }
      }
    }

    if (ShowAlert && AscDisabling.alreadyCall == undefined) {
      alreadyAlert = true;
      var result  = confirm(locale["JAVASCRIPT_ALERT_DISABLING_PERFECT_PRIVACY"]);
      AscDisabling.alreadyCall = true;

      if (result) {
        current.checked = false;
      } else {
        current.checked = true;
      }
    }
  } catch(err)  {

  }

}

function sendGet(varArray, /*optional*/ actionURL) {
  for (var i=0; i < varArray.length-1; i+=2) {
    if (actionURL.indexOf('?') == -1) actionURL += '?';
    else actionURL += '&';
    actionURL += varArray[i] + '=' + encodeURIComponent(varArray[i+1]);
  }
  window.location.href = actionURL;
}

function post(varArray, /*optional*/ actionURL, /*optional*/ redirectMethod) {
  var form = document.createElement("form");
  if (null != actionURL) form.action = actionURL;
  else form.action = self.location;
  if(redirectMethod) {
    form.method = redirectMethod;
  } else {
    form.method = "post";
  }

  if (form.method.toLowerCase() == 'get') {
    sendGet(varArray, actionURL);
    return false;
  }

  for (var i=0; i < varArray.length-1; i+=2) {
    AddHiddenFields(form, varArray[i], varArray[i+1]);
  }

  document.body.appendChild(form);
  form.submit();
  
  return false;
}


SW._BrowserInit = function () {
  var b = navigator.appName;
  this.name = b;
  if (b.indexOf('Netscape') != -1) this.b = "ns";
  else if ((b=="Opera") || (navigator.userAgent.indexOf("Opera")>0)) this.b = "opera";
  else if (b=="Microsoft Internet Explorer") this.b="ie";
  if (!b) {this.b="invalid"; this.invalid=true;}
  this.version = navigator.appVersion;
  this.v = parseInt(this.version);
  this.ns = (this.b=="ns" && this.v>=4);
  this.ns4 = (this.b=="ns" && this.v==4);
  this.ns6 = (this.b=="ns" && this.v==5);
  this.ie = (this.b=="ie" && this.v>=4);
  this.ie4 = (this.version.indexOf('MSIE 4')>0);
  this.ie5 = (this.version.indexOf('MSIE 5')>0);
  this.ie55 = (this.version.indexOf('MSIE 5.5')>0);
  this.ie6 = (this.version.indexOf('MSIE 6.0')>0);
  this.opera = (this.b=="opera");
  this.dom = (document.createElement && document.appendChild && document.getElementsByTagName) ? true : false;
  this.def = (this.ie || this.dom); // most used browsers, for faster if loops
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("win")>-1) this.platform="win32";
  else if (ua.indexOf("mac")>-1) this.platform="mac";
  else this.platform="other";
}
SW.Browser = new SW._BrowserInit();

function logDump(obj) {
  for (prop in obj) {
    try {log(prop+" => "+obj[prop]);}
    catch (ignore) {}

    if (typeof(obj[prop]) == 'object') {
      for (prop2 in obj[prop]) {
        try {log("  |- "+prop2+" => "+obj[prop][prop2]);}
        catch (ignore) {}
      }
    }
  }
}

function logDumpDOM(obj, level) {
  if (!level) level = 0;
  var padding = "";
  for (var i=0; i<level; i++) padding += "    ";

  if (obj.nodeType == 2 &&
      (obj.nodeValue == null || obj.nodeValue.length == 0)) return;

  if (obj.nodeName) {
    nodevalue = "";
    if (obj.nodeValue != null) nodevalue = " = "+obj.nodeValue;
    log(padding+obj.nodeName+nodevalue);
  }
  if (obj.nodeType == 1) {
    log(padding+"attributes array("+obj.attributes.length+") {");
    for (var i=0; i<obj.attributes.length; i++) logDump(obj.attributes[i], level+1);
    log(padding+"}");
  }
  if (obj.length) {
    log(padding+"array("+obj.length+") {");
    for (var i=0; i<obj.length; i++) logDump(obj[i], level+1);
    log(padding+"}");
  }

}

//SW.Signal.addLoadEvent(function (e) {logger.debuggingBookmarklet();});
//createLoggingPane(true);

if (!SW.App) SW.App = {}

SW.App.PlanRate = {
  _run : false,
  parents : new Array(),

  suit : function (wrapElem) {
    if (SW.App.PlanRate._run) return;
    SW.App.PlanRate._run = true;
    var me = SW.App.PlanRate;

    var tbodies = SW.DOM.getElementsByTagName("tbody", wrapElem);
    for (var i=tbodies.length-1; i >= 0; i--) {
      var m = /^planRateChild(\d+)(_\d+)?$/.exec(tbodies[i].id);
      if (m) me.suitChildren(wrapElem, m[1]);
    }

//     var texts = SW.DOM.getElementsByTagName("input", wrapElem);
//     for (var i=0; i < texts.length; i++) {
//       if (texts[i].getAttribute("type").toLowerCase() == "text" &&
//           texts[i].getAttribute("swWidgetType").toLowerCase() == "spin") {
//         SW.Widget.Spin.convert
//       }
//     }

    var inputs = SW.DOM.getElementsByTagName("input", wrapElem);
    for (i=0; i < inputs.length; i++) {
      var m = /^useExtRate_\d*_\d*$/.exec(inputs[i].id);
      if (inputs[i].type == 'checkbox' && m) {
        SW.Signal.connect(inputs[i], 'onclick', null, me.toggleNumbers);
      }

      var re = new RegExp('ExtRateAmount\\[\\d+\\]\\[_?\\d+_?\\]');
      if (re.exec(inputs[i].name) &&
          inputs[i].getAttribute('swWidgetType') == 'spin') {
        SW.Signal.connect(inputs[i], 'onchange',
                          null, me.positiveNumberIndicate);
        SW.Signal.dispatchEvent(inputs[i], 'onchange');
      }
      if (re.exec(inputs[i].name) &&
          (inputs[i].type == 'checkbox' || inputs[i].type == 'radio')) {
        if(inputs[i].type == 'radio' && inputs[i].value == '_0_') {
          var tbodies_matched = new Array();
          SW.App.PlanRate.addEventForRadio(tbodies_matched, inputs[i]);
        } else if(inputs[i].type == 'radio') {
          var radio_value = inputs[i].value; 
          radio_value = radio_value.replace(/_/g, "");
          var no_childs_for_radio = true;
          for (var ii=tbodies.length-1; ii >= 0; ii--) {
            var m = /^planRateChild(\d+)(_\d+)?$/.exec(tbodies[ii].id);
            if (m && m[1] == radio_value) {
              no_childs_for_radio = false;
              break;
            }
          }
          if(no_childs_for_radio) {
            var tbodies_matched = new Array();
            SW.App.PlanRate.addEventForRadio(tbodies_matched, inputs[i]);
          }
        }
        //SW.Signal.dispatchEvent(inputs[i], 'onclick');
      }
    }
  },

  addEventForRadio : function (tbodies_matched, parent) {
    // for 'none' in optional rates we need to connect event such way
    SW.Signal.connect(parent, 'onclick', null, function (e) {
      SW.App.PlanRate.toggleChildren(tbodies_matched, !parent.checked, parent);
    });
  },

  suitChildren : function (wrapElem, id) {
    //console.log('SW.App.PlanRate.suitChildren #'+id);
    var inputs = SW.DOM.getElementsByTagName('input', wrapElem);
    var parent = undefined;
    for (var i=0; i<inputs.length; i++) {
      var re = new RegExp('\\[\\d+\\]\\[_'+id+'_\\]');
      //var re2 = /useExtRate_\d+_\d+/
      var re2 = new RegExp('useExtRate_\\d+_'+id);
      if (re.exec(inputs[i].name) || re2.exec(inputs[i].name)) {
        parent = inputs[i];
        break;
      }
      if(inputs[i].getAttribute("type").toLowerCase() == "radio") {
        if(inputs[i].value == '_'+id+'_') {
          parent = inputs[i];
          break;
        }
      }
    }
//    if (parent == undefined) return;  // not found;
    if (parent.nodeName.toLowerCase() == "input") {

      // to avoid dublicate runs
      if(SW.App.PlanRate.parents[parent.id]) return;
      SW.App.PlanRate.parents[parent.id] = true;
      
      var tbodies = SW.DOM.getElementsByTagName("tbody", wrapElem);
      var tbodies_matched = new Array();
      for (var i=0; i < tbodies.length; i++) {
        var re = new RegExp('^planRateChild'+id+'(_\\d+)?$');
        if (re.exec(tbodies[i].id)) {
          tbodies_matched.push(tbodies[i]);
        }
      }
      if (tbodies_matched.length) {
        if (parent.getAttribute("swWidgetType") && parent.getAttribute("swWidgetType").toLowerCase() == "spin") {
          SW.Signal.connect(parent, 'onchange', null, function (e) {
            SW.App.PlanRate.toggleChildren(tbodies_matched, (parent.value > 0 ? false : true), parent);
          });
          SW.App.PlanRate.toggleChildren(tbodies_matched, (parent.value > 0 ? false : true), parent);
        } else {
          SW.Signal.connect(parent, 'onclick', null, function (e) {
            SW.App.PlanRate.toggleChildren(tbodies_matched, !parent.checked, parent);
          });
          SW.App.PlanRate.toggleChildren(tbodies_matched, !parent.checked, parent);
        }
      }
    }
  },

  toggleChildren : function (tbodies, disableOrEnable, parent) {
    var findChildrentbodies = function (ch) {
      var children_value = ch.value;
      children_value = children_value.replace(/_/g, "");
      return findChildrentbodiesByParentID(children_value);
    }

    var findChildrentbodiesByParentID = function (parent_id) {
      var children_tbodies = SW.DOM.getElementsByTagName("tbody", document.forms.formEdit);
      var current_children_tbody = new Array();
      var re = new RegExp('^planRateChild'+parent_id+'(_\\d+)?$');
      for (var i=0; i < children_tbodies.length; i++)
        if (re.exec(children_tbodies[i].id)) current_children_tbody.push(children_tbodies[i]);
      return current_children_tbody;
    }

    if(parent && parent.getAttribute("type").toLowerCase() == "radio") {
      var children = SW.DOM.getElementsByTagName('input', document.forms.formEdit);
      for (var i=0; i < children.length; i++) {
        if (children[i].getAttribute("type").toLowerCase() == "radio" &&
            children[i].name == parent.name && children[i].value != parent.value) {
          var current_children_tbody = findChildrentbodies(children[i]);
          if(current_children_tbody.length) {
            SW.App.PlanRate.toggleChildren(current_children_tbody, !children[i].checked);
          }
        }
      }
    }
    for (var ii=0; ii < tbodies.length; ii++) {
      var tbody = tbodies[ii];

      var children = SW.DOM.getElementsByTagName('input', tbody);
      var radio = {};
      for (var i=0; i < children.length; i++) {
        if (children[i].getAttribute("type").toLowerCase() == "checkbox") {
          if (children[i].getAttribute("included") && children[i].getAttribute("included").toLowerCase() != "included") {
            children[i].disabled = disableOrEnable;
          }
          if (children[i].getAttribute("included") && children[i].getAttribute("included").toLowerCase() == "included") {
            var hidden_field = document.getElementById('_hidden_' + children[i].name);
            hidden_field.disabled = disableOrEnable;
          }
//          SW.Signal.dispatchEvent(children[i], 'onclick');

          // for nested elements dublicate dispatchEvent by recursion calls
          var m = /^ExtRateAmount\[(\d+)\]\[_(\d+)_\]$/.exec(children[i].name);
          if(m) {
            var parent_id = m[2];
            var current_children_tbody = findChildrentbodiesByParentID(parent_id);
            if(current_children_tbody.length) {
              SW.App.PlanRate.toggleChildren(current_children_tbody, disableOrEnable ? disableOrEnable : !children[i].checked, children[i]);
            }
          }
        }
        if (children[i].getAttribute("type").toLowerCase() == "radio") {
          children[i].disabled = disableOrEnable;
          if (!radio[children[i].name]) radio[children[i].name] = false;
          if (children[i].checked) radio[children[i].name] = true;

          var current_children_tbody = findChildrentbodies(children[i]);
          if(current_children_tbody.length) {
            SW.App.PlanRate.toggleChildren(current_children_tbody, disableOrEnable);
          }

        }
        if (children[i].getAttribute("type").toLowerCase() == "text" &&
            children[i].getAttribute("swWidgetType").toLowerCase() == "spin") {
          //console.log('spin ' + children[i]);
          SW.Widget.Spin.setDisabled(children[i], disableOrEnable);
          SW.App.PlanRate.positiveNumberIndicate.call(children[i]);
      	

        }
      }
  
//      if (!disableOrEnable) {
        for (r in radio) {
          if (radio[r]) continue;
          document.getElementsByName(r)[0].checked = true;
        }
//      }
    }
  },

  toggleNumbers : function (e) {
    var checkbox = this;
    var rel_id = 'ExtRateAmount'+checkbox.id.substring(10);
    var textbox = document.getElementById(rel_id);
    SW.Widget.Spin.setDisabled(textbox, !checkbox.checked);
  },

  positiveNumberIndicate : function (e) {
    var img = SW.DOM.byId('positiveIndicator_'+this.id);
    if (!img) return;
    var myClass = SW.DOM.getClass(img);
    if (this.value > 0 && !this.disabled) {
      if (!myClass.exists('positiveIndicatorOn')) myClass.add('positiveIndicatorOn');
    } else {
      if (myClass.exists('positiveIndicatorOn')) myClass.remove('positiveIndicatorOn');
    }
  }
}


