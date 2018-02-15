// --------------------------------------------------

function getLayer(name) {
	if (is.ns4)
		return findLayer(name, document);
	if (is.ie && !is.dom)
		return eval('document.all.' + name);
	if (is.dom)
		return document.getElementById(name);
	return null;
}

function findLayer(name, doc) {
	var i, layer;

	for (i = 0; i < doc.layers.length; i++) {
		layer = doc.layers[i];
		if (layer.name == name)
			return layer;
		if (layer.document.layers.length > 0)
			if ((layer = findLayer(name, layer.document)) != null)
				return layer;
	}
	return null;
}

//--------------------------------------------------

function hideLayer(layer) {
	if (is.ns4){
		layer.visibility = "hide"
	}else{
		layer.style.visibility = "hidden"
	};
}

function showLayer(layer) {
	if (is.ns4){
		layer.visibility = "show"
	}else{
		layer.style.visibility = "visible"
	};
}

function getVisibility(layer) {

	if (is.ns4) {
		if (layer.visibility == "show")
			return "visible";
		if (layer.visibility == "hide")
			return "hidden";
		return layer.visibility;
	}else{
		return layer.style.visibility
	};
	return "";
}

//--------------------------------------------------

function moveLayerTo(layer, x, y) {
	if (is.ns4){
		layer.moveTo(x, y);
	}else{
		layer.style.left = x;
		layer.style.top  = y
	};
}

//--------------------------------------------------

function getImage(name) {
	if (is.ns4){
		return findImage(name, document)
	};
	if (is.ie && !is.dom){
		return eval('document.all.' + name)
	};
	if (is.dom){
		return document.getElementById(name);
	}
	return null;
}

function findImage(name, doc) {
	var i, img;

	for (i = 0; i < doc.images.length; i++)
		if (doc.images[i].name == name)
			return doc.images[i];
	for (i = 0; i < doc.layers.length; i++)
		if ((img = findImage(name, doc.layers[i].document)) != null) {
			img.container = doc.layers[i];
			return img;
		}
	return null;
}

function getImagePageLeft(img) {
	var x, obj;

	if (is.ns4) {
		if ('') //img.container != null
			return img.container.pageX + img.x;
		else
			return img.x;
	}else{
		x = 0;
		obj = img;
		while (obj.offsetParent != null) {
			x += obj.offsetLeft;
			obj = obj.offsetParent;
		}
		x += obj.offsetLeft;
		return x;
	};
	return -1;
}

function getImagePageTop(img) {
	var y, obj;
	if (is.ns4) {
		if (img.container != null)
			return img.container.pageY + img.y;
		else
			return img.y;
	}else{
		y = 0;
		obj = img;
		while (obj.offsetParent != null) {
			y += obj.offsetTop;
			obj = obj.offsetParent;
		}
		y += obj.offsetTop;
		return y;
	};
	return -1;
}

function disableToolbarItem(id){
	var cell = document.getElementById(id);
	var img = document.getElementById('img_'+id);
	var text = document.getElementById('text_'+id);	
	if (!cell || !img || !text) return false;
	if (text.className == 'actionLabelDisabled') return false;

	text.className = 'actionLabelDisabled';

	var new_src = img.src.substr(0,img.src.indexOf('_16.gif'))+'_disabled_16.gif';
	img.src = new_src;

	cell.onclick = dummyEvent;
	cell.onmouseover = dummyEvent;
	cell.onmouseout = dummyEvent;		
}

function dummyEvent(){
	return false;
}

		topbar_buttons = new Array();
		ii = 0;
		current_bar = null;
		current_id  = null;
		prev_tab = null;
		clicka = 0;	
		var stop_act;
		
