// on load multiplexer

function onLoadMux() {
  dataBinder.initInputs();
  checkClick(); // check mouse clicks for toolbar (to hide dropdowns)
  if (typeof(this.onLoad) == 'function') {
    onLoad(); // call onLoad() function if defined
  }	
  else {
    autoFocus(); // otehrwise call autofocus
  }	

	if (window.relocate_dropdowns) relocate_dropdowns();	
	try {
		callPageTitle();
     } catch(e){};
   constraintCheckAll();
   defaultFocus();

  if (ttl_notify > 0) {
     setTimeout('showSesWarn();', ttl_notify*1000);
  }
}

function defaultFocus(){
	var o=document.getElementsByName('webgate__deff_holder');
	if(o && o.length>0) {
		o=document.getElementById(o[0].value);
		if(o){o.focus();}
	}
}


function addLoadEvent(func) { 
	var oldonload = window.onload; 
	if (typeof window.onload != 'function') { 
		window.onload = func; 
	} else { 
		window.onload = function() { 
			if (oldonload) { 
				oldonload(); 
			} 
			func(); 
		} 
	} 
}

function addUnLoadEvent(func) { 
	var oldonunload = window.onunload; 
	if (typeof window.onunload != 'function') { 
		window.onunload = func; 
	} else { 
		window.onunload = function() { 
			if (oldonunload) { 
				oldonunload(); 
			} 
			func(); 
		} 
	}
}  

// Check "click" event - to hide current dropdown of TOOLBAR
function checkClick() {
	document.onclick = function(ee) { 
		if(!ee) ee = event; 
		clicka++;
			if (current_bar != null) {
				divx = getImagePageLeft(document.getElementById(current_bar.id));
				divy = getImagePageTop(document.getElementById(current_bar.id));
				divxx = divx + current_bar.clientWidth;
				divyy = divy + current_bar.clientHeight;
				mouse_x = ee.clientX;
				mouse_y = ee.clientY;

				space = (((mouse_x > divx) && (mouse_x < divxx)) && ((mouse_y > divy) && (mouse_y < divyy)));
				if (!space && (clicka > 1) ) {
					if(is.ie && !is.ie7 && current_bar.style.visibility != 'hidden'){
						switchCombos(true);
					}
					current_bar.style.visibility = 'hidden';
					if (current_id) {
						document.getElementById(current_id).className = 'actionPassive';
					}
					current_bar = null;
					clicka = 0;
				}
			}
	}
}
