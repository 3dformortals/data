showme("preparing GuiReader.js");
function inputs_reader(ids,rez = []){
	for (i=0;i<ids.length;i++){
		rez.push(parseFloat(document.getElementById(ids[i]).value));
	}return rez;
}
function hsize_reader(prefix=[]){
	var inputs = ["h1","h2","h3","h4","h5","h6","h7","h8"];
	var invals = inputs_reader(inputs,prefix);
	return invals;
}
function wsize_reader(prefix=[]){
	var inputs = ["w1","w2","w3","w4","w5"];
	var invals = inputs_reader(inputs,prefix);
	return invals;
}
function bsize_reader(prefix=[]){
	var inputs = ["b1","b2","b3","b4"];
	var invals = inputs_reader(inputs,prefix);
	return invals;
}
function s8_reader(){
	var s8 = document.getElementById("s8").value;
	s8 = geo.recounter_S_F(s8.split(" "));
	var rez=[];
	for (i=0;i<s8.length;i++){ if (s8[i] || s8[i]==0){ rez.push(s8[i]); } }
	if (rez.length == 0){ rez = [0];}
	return rez;
}
function ssize_reader(prefix=[],h){
	var inputs = ["s1","s2","s3","s4","s5","s6","s7"];
	var invals = inputs_reader(inputs,prefix);
	invals[2] *= h[3] / 100;
	invals[3] *= h[5] / 100;
	invals[4] *= h[5] / 100;
	invals.push(s8_reader());
	return invals;
}
function grip_reader(){
	var rez="";
	if (document.getElementById("g1").checked){rez = document.getElementById("g1").value;}
	else if (document.getElementById("g2").checked){rez = document.getElementById("g2").value;}
	else if (document.getElementById("g3").checked){rez = document.getElementById("g3").value;}
	else if (document.getElementById("g4").checked){rez = document.getElementById("g4").value;}
	return rez;
}
function hfull(h){
	return geo.sum_F(h);
}
function wfull(h,w,b,s){
	return geo.maxabs([s[1]+h[2]*2,w[1],w[2],w[3]+w[4]*2,w[5]+b[1]*2]);
}
function scale_counter(h,w,b,s){
	var scale = geo.maxabs([hfull(h),wfull(h,w,b,s)]);
	scale = maxsize / scale;
	return scale;
}
function rescale_h(h,scale){for (i=1;i<h.length;i++){h[i] *= scale;} return h;}
function rescale_w(w,scale){for (i=1;i<w.length;i++){w[i] *= scale;} return w;}
function rescale_b(b,scale){ b[1] *= scale; b[2] *= scale; return b; }
function rescale_s(s,scale){ for (i=1;i<5;i++){s[i] *= scale;} return s; }
function checkbox_reader(){
	var cbox_name = ["undefined"]
}
function gui_reader(){
	var h = hsize_reader(["undefined"]);
	var w = wsize_reader(["undefined"]);
	var b = bsize_reader(["undefined"]);
	var s = ssize_reader(["undefined"],h);
	var g = grip_reader();
	var scale = scale_counter(h,w,b,s);
	h = rescale_h(h,scale);
	w = rescale_w(w,scale);
	b = rescale_b(b,scale);
	s = rescale_s(s,scale);
	//sizes collected and rescaled
	console.log("scale = "+scale);
	return [h,w,b,s,g];
}
showme("GuiReader.js ready");
showme("ready");