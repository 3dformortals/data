var nazad=false;
var bs=document.getElementById("backslash").value;


function testfunc(){
	a=new RegExp('abc'+'\\'+'d+','gi')
	x=/abc\d+/gi
	bf=x.toString().split('/')
	b=new RegExp(bf[1],bf[2])
	alert("string".split('').reverse())
}

function protofunc(){
	
	var b = document.getElementById('whatcheck').value
	var chuka=false;
	if (document.getElementById('czamena').checked){chuka=true}
	else{document.getElementById('czamena').click()}
	
	
	
	document.getElementById('izapros').value = ''
	document.getElementById('izamena').value = ''   
	replikant();
	
	if (chuka==false){document.getElementById('czamena').click()}
	
	}
function seehtml(){
	
	var b = document.getElementById('whatcheck').value
	var chuka=false;
	if (document.getElementById('czamena').checked){chuka=true}
	else{document.getElementById('czamena').click()}
	
	
	
	document.getElementById('izapros').value = '<'
	document.getElementById('izamena').value = '&lt;'  
	replikant();

	document.getElementById('izapros').value = '>'
	document.getElementById('izamena').value = '&gt;'   
	replikant();

	document.getElementById('izapros').value = '&lt;br&gt;'
	document.getElementById('izamena').value = '&lt;br&gt;<br>'   
	replikant();
	document.getElementById('izapros').value = '&lt;Br&gt;'
	document.getElementById('izamena').value = '&lt;Br&gt;<br>'   
	replikant();
	document.getElementById('izapros').value = '&lt;bR&gt;'
	document.getElementById('izamena').value = '&lt;bR&gt;<br>'   
	replikant();
	document.getElementById('izapros').value = '&lt;BR&gt;'
	document.getElementById('izamena').value = '&lt;BR&gt;<br>'   
	replikant();

	// document.getElementById('izapros').value = ''
	// document.getElementById('izamena').value = ''   
	// replikant();
	
	if (!chuka){document.getElementById('czamena').click()}
	
	}
	
function grek_g_name(){
	//зависает
	//var b = document.getElementById('whatcheck').value
	var chuka=false;
	if (document.getElementById('czamena').checked){chuka=true}
	else{document.getElementById('czamena').click()}
	
	greek="α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ ς τ υ φ ψ χ ω Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Ψ Χ Ω"
	trans="g_alpha g_beta g_gamma g_delta g_epsilon g_zeta g_eta g_theta g_iota g_kappa g_lambda g_mu g_nu g_xi g_omicron g_pi g_rho g_sigma g_sigmaf g_tau g_upsilon g_phi g_psi g_chi g_omega g_Alpha g_Beta g_Gamma g_Delta g_Epsilon g_Zeta g_Eta g_Theta g_Iota g_Kappa g_Lambda g_Mu g_Nu g_Xi g_Omicron g_Pi g_Rho g_Sigma g_Tau g_Upsilon g_Phi g_Psi g_Chi g_Omega"
	
	greek=greek.split(" ");
	trans=trans.split(" ");
	
	for(i=0;i<greek.length;i++){
		document.getElementById('izapros').value = greek[i];
		document.getElementById('izamena').value = trans[i];
		replikant();
	}
	
	
	if (chuka==false){document.getElementById('czamena').click()}
	
	}

function grek_visor(id){
	greek="α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ ς τ υ φ ψ χ ω Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Ψ Χ Ω";
	document.getElementById(id).value=greek;
	}

function o_O(){
	s=document.getElementById("okno2").value;
	rez=s.toUpperCase();
	document.getElementById("okno2").value=rez;
	}

function O_o(){
	s=document.getElementById("okno2").value;
	rez=s.toLowerCase();
	document.getElementById("okno2").value=rez;
	}

function Oo_oO(){
	s=document.getElementById("okno2").value;
	s=s.split("");rez="";
	for(i=0;i<s.length;i++){
		if(s[i].toLowerCase()==s[i]){rez+=s[i].toUpperCase()}
		else{rez+=s[i].toLowerCase()}
	}
	document.getElementById("okno2").value=rez;
}

function buferfig(){
	window.open('http://formalldistort.org')
	alert('СКАЗАТЬ СПАСИБО МОЖНО СЮДА:\n\n ВКонтакте:\nhttp://vk.com/kyznec_tor\n\n WebMoney:\nZ178988330396\nE114984121775\nR281783437757\n\nhttp://www.L4soft.narod.ru')
	}

function wagnazad(){
	document.getElementById('okno2').value=document.getElementById('iwagnazad').value
	}

function clicknecifra(){
	if (document.getElementById('czapros_necifra').checked){
		if (document.getElementById('czapros_cifra').checked){document.getElementById('czapros_cifra').click()}
		if (document.getElementById('cpropusk').checked){document.getElementById('cpropusk').click()}
		if (document.getElementById('cregexp').checked){document.getElementById('cregexp').click()}
		}
	}
function clickcifra(){
		if (document.getElementById('czapros_cifra').checked){
		if (document.getElementById('czapros_necifra').checked){document.getElementById('czapros_necifra').click()}
		if (document.getElementById('cregexp').checked){document.getElementById('cregexp').click()}
		}
	}
function clickpropusk(){
		if (document.getElementById('cpropusk').checked){
		if (document.getElementById('czapros_necifra').checked){document.getElementById('czapros_necifra').click()}
		if (document.getElementById('cregexp').checked){document.getElementById('cregexp').click()}
		}
	}

function clickregexp(){
	if(document.getElementById('cregexp').checked){
		if(!document.getElementById('czamena').checked){document.getElementById('czamena').click()}
		if(document.getElementById('czapros_necifra').checked){document.getElementById('czapros_necifra').click()}
		if(document.getElementById('czapros_cifra').checked){document.getElementById('czapros_cifra').click()}
		if(document.getElementById('cpropusk').checked){document.getElementById('cpropusk').click()}
	}
}

function clickzamena(){
	if(!document.getElementById('czamena').checked){
		if(document.getElementById('cregexp').checked){document.getElementById('cregexp').click()}
	}
}

function forregexp(newzapros,xvost,newflag,useregexp){
	//подготовка строки к созданию регулярного выражения
	newzapros=newzapros || '';
	var zapros=newzapros;
	xvost=xvost || '';
	newflag=newflag || 'g';
	useregexp=useregexp || false;
	//alert("newflag="+newflag)
	if(useregexp){return[newzapros,newflag]}
	else{
		special="\\()[].^$|?+{}".split('');
		//пиздец!!!... без малого 7 часов ушло чтобы заметить что переставленные в хвост \\ в special дублируют добавленные \ у спецсимволов в строке для шаблона... пиздец :-|
		//special=bs.split('');
		for(i=0;i<special.length;i++){
			//filtr=new RegExp("\\"+special[i],'g');
			newzapros=newzapros.split(special[i]);//alert("special[i]="+special[i])
			newzapros=newzapros.join(bs+special[i]).toString();//alert("newzapros="+newzapros)
		}
	}
	newzapros+=xvost;
	newzapros=newzapros.toString();
	//alert("newzapros.toString()="+newzapros);
	//var expr=new RegExp(newzapros);
	//alert("newzapros="+newzapros+"\nzapros="+zapros+"\nregexp="+'expr'+"\nspecial="+special)
	return[newzapros,newflag]
}

function replikant(){
var i;
var j;
var k;
var doptext;
var necifra;
var cifra;
var propusk;
var peremenajaot = parseFloat(document.getElementById('iperemenajaot').value);
var peremenajado= parseFloat(document.getElementById('iperemenajado').value);
var peremenajawag = parseFloat(document.getElementById('iperemenajawag').value);
var peremenaja;
var zamena = '';
var zapros =''+ document.getElementById('izapros').value;
var fragment = document.getElementById('okno2').value;
var textposle='';

if(!zapros){rez=fragment;return null}

if (!nazad){
document.getElementById('iwagnazad').value=document.getElementById('okno2').value; nazad=true;
}

necifra=document.getElementById('czapros_necifra').checked;
cifra=document.getElementById('czapros_cifra').checked;
useregexp=document.getElementById('cregexp').checked;


if (document.getElementById('czamena').checked){
zamena = document.getElementById('izamena').value
}else{zamena = document.getElementById('izapros').value}

propusk=document.getElementById('cpropusk').checked

if (document.getElementById('cperemenaja').checked){
peremenajaot=parseFloat(document.getElementById('iperemenajaot').value); peremenaja=true
}else{peremenaja=false}

if (document.getElementById('ctextposle').checked){
doptext = document.getElementById('itextposle').value;
}

var rez='';

if(cifra){
	//alert("zapros="+zapros)
	newforregexp=forregexp(zapros,bs+'d+', 'g',useregexp)
	newzapros=newforregexp[0];newflag=newforregexp[1];
	var expr = new RegExp(newzapros,newflag)
	xsplit=fragment.split(expr);
	//alert("newzapros="+newzapros+"\nexpr="+expr)
	xmatch=fragment.match(expr);
	//alert("expr="+expr+"\nxsplit="+xsplit+"\nxmatch="+xmatch)
	if(xmatch==null){document.getElementById('okno2').value = fragment;return null}
	//alert("\nexpr="+expr+"\nfragment="+fragment+"\nxsplit="+xsplit+"\nxmatch="+xmatch);
	
	if(propusk && doptext && peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+xmatch[i].split(zapros)[1]+doptext+(peremenajaot+i*peremenajawag).toString()
		}
	}else if(propusk && doptext){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+xmatch[i].split(zapros)[1]+doptext
		}
	}else if(propusk && peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+xmatch[i].split(zapros)[1]+(peremenajaot+i*peremenajawag).toString()
		}
	}else if(doptext && peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+doptext+(peremenajaot+i*peremenajawag).toString()+xmatch[i].split(zapros)[1]
		}
	}else if(peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+(peremenajaot+i*peremenajawag).toString()+xmatch[i].split(zapros)[1]
		}
	}else if(doptext){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+doptext+xmatch[i].split(zapros)[1]
		}
	}else if(propusk){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+xmatch[i].split(zapros)[1]+zamena
		}
	}else{
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+xmatch[i].split(zapros)[1]
		}
	}
}
	
else if(necifra){
	
	newforregexp=forregexp(zapros,bs+'D', 'g',useregexp)
	newzapros=newforregexp[0];newflag=newforregexp[1];
	var expr = new RegExp(newzapros,newflag)
	xsplit=fragment.split(expr);
	xmatch=fragment.match(expr);
	if(xmatch==null){document.getElementById('okno2').value = fragment;return null}
	//alert("\nexpr="+expr+"\nfragment="+fragment+"\nxsplit="+xsplit+"\nxmatch="+xmatch);
	if(doptext && peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+(peremenajaot+i*peremenajawag).toString()+doptext+xmatch[i].split(zapros)[1]
		}
	}else if(doptext){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+doptext+xmatch[i].split(zapros)[1]
		}
	}else if(peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+(peremenajaot+i*peremenajawag).toString()+xmatch[i].split(zapros)[1]
		}
	}else{
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+xmatch[i].split(zapros)[1]
		}
	}
}
else{//alert("else")
	newforregexp=forregexp(zapros,'', 'g',useregexp)
	newzapros=newforregexp[0];newflag=newforregexp[1];
	var expr = new RegExp(newzapros,newflag)
	xsplit=fragment.split(expr);
	xmatch=fragment.match(expr);
	if(xmatch==null){document.getElementById('okno2').value = fragment;return null}
	//alert("\nexpr="+expr+"\nfragment="+fragment+"\nxsplit="+xsplit+"\nxmatch="+xmatch);
	if(doptext && peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+(peremenajaot+i*peremenajawag).toString()+doptext
		}
	}else if(doptext){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+doptext
		}
	}else if(peremenaja){
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena+(peremenajaot+i*peremenajawag).toString()
		}
	}else{//alert("elseelse");alert("xmatch="+xmatch)
		for(i=0;i<xmatch.length;i++){
			rez+=xsplit[i]+zamena
		}
	}
}
//alert("xsplit="+xsplit+"\nxmatch="+xmatch+"\nxmatch.length="+xmatch.length+"\nxsplit.length="+xsplit.length)
rez+=xsplit[xmatch.length]

document.getElementById('okno2').value = rez;
}



function htmlvbasic(){
	//странные дела с точкой * при многократном нажатии
	var b = document.getElementById('whatcheck').value
	var chuka=false;
	if (document.getElementById('czamena').checked){chuka=true}
	else{document.getElementById('czamena').click()}
	document.getElementById('izapros').value = b //&#149; :)
	document.getElementById('izamena').value = '*'
	replikant();
	document.getElementById('izapros').value = '&#149;'
	document.getElementById('izamena').value = '*'
	replikant();
	document.getElementById('izapros').value = '\\+'
	document.getElementById('izamena').value = ' + '	
	replikant();
	
	document.getElementById('izapros').value = '='
	document.getElementById('izamena').value = ' = '	
	replikant();
	
	document.getElementById('izapros').value = '-'
	document.getElementById('izamena').value = ' - '	
	replikant();
	
	document.getElementById('izapros').value = '&amp;'
	document.getElementById('izamena').value = ' & '	
	replikant();		

	document.getElementById('izapros').value = '&gt;'
	document.getElementById('izamena').value = ' > '	
	replikant();		

	document.getElementById('izapros').value = '&lt;'
	document.getElementById('izamena').value = ' < '	
	replikant();		
	
	document.getElementById('izapros').value = '&ge;'
	document.getElementById('izamena').value = ' >= '	
	replikant();		
	
	document.getElementById('izapros').value = '&le;'
	document.getElementById('izamena').value = ' <= '	
	replikant();		
	
	document.getElementById('izapros').value = '&ne;'
	document.getElementById('izamena').value = ' <> '	
	replikant();		
	
	document.getElementById('izapros').value = '\\*'
	document.getElementById('izamena').value = ' * '	
	replikant();	
	
	//document.getElementById('izapros').value = '^'
	//document.getElementById('izamena').value = ' ^ '  
	//replikant();  
	
	document.getElementById('izapros').value = '< '
	document.getElementById('izamena').value = '<'  
	replikant();
	
	document.getElementById('izapros').value = ' >'
	document.getElementById('izamena').value = '>'  
	replikant();

	document.getElementById('izapros').value = '<sup>'
	document.getElementById('izamena').value = '^'  
	replikant();

	document.getElementById('izapros').value = '<r>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '</r>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '<R>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '</R>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '<sub>'
	document.getElementById('izamena').value = '_'  
	replikant();
	
	document.getElementById('izapros').value = '</sup>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</sub>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<br>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '<BR>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '<Br>'
	document.getElementById('izamena').value = ''   
	replikant();	

	document.getElementById('izapros').value = '<bR>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<span>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<SPAN>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '</span>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</SPAN>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<p>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</p>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '<P>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</P>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<b>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</b>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '<B>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</B>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '\\/'
	document.getElementById('izamena').value = ' / '  
	replikant();  
		
	document.getElementById('izapros').value = 'α'
	document.getElementById('izamena').value = 'o_alpha'
	replikant();
	document.getElementById('izapros').value = 'β'
	document.getElementById('izamena').value = 'o_beta'
	replikant();
	document.getElementById('izapros').value = 'γ'
	document.getElementById('izamena').value = 'o_gamma'
	replikant();
	document.getElementById('izapros').value = 'δ'
	document.getElementById('izamena').value = 'o_delta'
	replikant();
	document.getElementById('izapros').value = 'ε'
	document.getElementById('izamena').value = 'o_epsilon'
	replikant();	
	document.getElementById('izapros').value = 'λ'
	document.getElementById('izamena').value = 'o_lambda'
	replikant();
	document.getElementById('izapros').value = 'μ'
	document.getElementById('izamena').value = 'o_mu'
	replikant();
	document.getElementById('izapros').value = 'ν'
	document.getElementById('izamena').value = 'o_nu'
	replikant();
	document.getElementById('izapros').value = 'π'
	document.getElementById('izamena').value = 'PI'
	replikant();
	document.getElementById('izapros').value = 'ρ'
	document.getElementById('izamena').value = 'o_rho'
	replikant();
	document.getElementById('izapros').value = 'σ'
	document.getElementById('izamena').value = 'o_sigma'
	replikant();
	document.getElementById('izapros').value = 'τ'
	document.getElementById('izamena').value = 'o_tau'
	replikant();
	document.getElementById('izapros').value = 'φ'
	document.getElementById('izamena').value = 'o_phi'
	replikant();
	document.getElementById('izapros').value = 'ω'
	document.getElementById('izamena').value = 'o_omega'
	replikant();
	document.getElementById('izapros').value = 'Δ'
	document.getElementById('izamena').value = 'del_'
	replikant();
	
	document.getElementById('izapros').value = '\\]'
	document.getElementById('izamena').value = ''   
	replikant();	
	
	document.getElementById('izapros').value = '\\['
	document.getElementById('izamena').value = '_'  
	replikant();	
	
	document.getElementById('izapros').value = '__'
	document.getElementById('izamena').value = '_'  
	replikant();	
	
	document.getElementById('izapros').value = '  '
	document.getElementById('izamena').value = ' '  
	replikant();

	// document.getElementById('izapros').value = ''
	// document.getElementById('izamena').value = ''   
	// replikant();
	
	if (chuka==false){document.getElementById('czamena').click()}
	
	}

function htmlpython(){
	//зависает
	var b = document.getElementById('whatcheck').value
	var chuka=false;
	if (document.getElementById('czamena').checked){chuka=true}
	else{document.getElementById('czamena').click()}
	document.getElementById('izapros').value = b //&#149; :)
	document.getElementById('izamena').value = '*'
	replikant();
	document.getElementById('izapros').value = '&#149;'
	document.getElementById('izamena').value = '*'
	replikant();
	
	document.getElementById('izapros').value = '&amp;'
	document.getElementById('izamena').value = ' & '	
	replikant();		

	document.getElementById('izapros').value = '&gt;'
	document.getElementById('izamena').value = ' > '	
	replikant();		

	document.getElementById('izapros').value = '&lt;'
	document.getElementById('izamena').value = ' < '	
	replikant();		
	
	document.getElementById('izapros').value = '&ge;'
	document.getElementById('izamena').value = ' >= '	
	replikant();		
	
	document.getElementById('izapros').value = '&le;'
	document.getElementById('izamena').value = ' <= '	
	replikant();		
	
	document.getElementById('izapros').value = '&ne;'
	document.getElementById('izamena').value = ' != '	
	replikant();		
	
	document.getElementById('izapros').value = '<r>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '</r>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '<R>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '</R>'
	document.getElementById('izamena').value = ''  
	replikant();

	document.getElementById('izapros').value = '<sub>'
	document.getElementById('izamena').value = '_'  
	replikant();
	
	document.getElementById('izapros').value = '</sup>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</sub>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = ' *<br> *'
	document.getElementById('izamena').value = '\n'   
	replikant();

	document.getElementById('izapros').value = ' *<BR> *'
	document.getElementById('izamena').value = '\n'   
	replikant();

	document.getElementById('izapros').value = ' *<Br> *'
	document.getElementById('izamena').value = '\n'   
	replikant();	

	document.getElementById('izapros').value = ' *<bR> *'
	document.getElementById('izamena').value = '\n'   
	replikant();
	
	document.getElementById('izapros').value = '<span>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<SPAN>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '</span>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</SPAN>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<p>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</p>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '<P>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</P>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	document.getElementById('izapros').value = '<b>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</b>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '<B>'
	document.getElementById('izamena').value = ''   
	replikant();

	document.getElementById('izapros').value = '</B>'
	document.getElementById('izamena').value = ''   
	replikant();
	
	grek_g_name();
	
	document.getElementById('izapros').value = ' *<sup> *'
	document.getElementById('izamena').value = '**'  
	replikant();
	
	document.getElementById('izapros').value = ' *\\* *'
	document.getElementById('izamena').value = '*'
	replikant();
	
	document.getElementById('izapros').value = ' *\/ *'
	document.getElementById('izamena').value = '/'
	replikant();
	
	document.getElementById('izapros').value = ' *\\+ *'
	document.getElementById('izamena').value = '+'
	replikant();
	
	document.getElementById('izapros').value = ' *- *'
	document.getElementById('izamena').value = '-'
	replikant();
	
	document.getElementById('izapros').value = ' *= *'
	document.getElementById('izamena').value = '='
	replikant();
	
	
	document.getElementById('izapros').value = ' *\\] *'
	document.getElementById('izamena').value = ''   
	replikant();	
	
	document.getElementById('izapros').value = ' *\\[ *'
	document.getElementById('izamena').value = '_'  
	replikant();	
	
	document.getElementById('izapros').value = '_+'
	document.getElementById('izamena').value = '_'  
	replikant();	
	
	document.getElementById('izapros').value = '  '
	document.getElementById('izamena').value = ' '  
	replikant();

	// document.getElementById('izapros').value = ''
	// document.getElementById('izamena').value = ''   
	// replikant();
	
	if (chuka==false){document.getElementById('czamena').click()}
	
	}

function htmltablecolumn(){
	if (!nazad){
		document.getElementById('iwagnazad').value=document.getElementById('okno2').value; nazad=true;
	}
	if(document.getElementById('cspliter').checked){
		var spliter=document.getElementById('ispliter').value
	}else{
		var spliter="	"
	}
	fragment=document.getElementById("okno2").value;
	//alert("fragment="+fragment)
	stolbik=parseInt(document.getElementById("stolbik").value);
	//alert("stolbik="+stolbik)
	var rez="";
	s=fragment.split("\n");
	//alert("s="+s)
	for(i=0;i<s.length;i++){
		//alert("s[i]="+s[i]);
		tr=s[i].split(spliter);
		//alert("tr="+tr)
		if(tr.length && tr.length>=stolbik){rez+=tr[stolbik-1]+"\n"}
	}
	document.getElementById("okno2").value=rez;
}

function multiplestring(mid,textid,cspliterid,ispliterid){
	var m=parseInt(document.getElementById(mid).value);
	if(document.getElementById(cspliterid).checked){
		var spliter=document.getElementById(ispliterid).value;
	}else{
		var spliter="	"
	}
	var text=document.getElementById(textid).value;
	text=text.split('\n');
	var newtext='';
	if(m>1){
		for(i=0;i<text.length;i++){
			for(j=0;j<m;j++){
				newtext+=text[i]+spliter;
			}
			newtext+='\n'
		}
	}
	
	document.getElementById(textid).value=newtext
}

function saveload(fromid,toid){
	document.getElementById(toid).value=document.getElementById(fromid).value;
}

function resettext(id){
	document.getElementById(id).value=''
}

function tabplustext(id){
	document.getElementById(id).value="	"+document.getElementById(id).value
}

function textplustab(id){
	document.getElementById(id).value=document.getElementById(id).value+"	"
}

function textsort(id){
	document.getElementById(id).value=document.getElementById(id).value.split('\n').sort().join('\n')
}

function textreverse(id){
	document.getElementById(id).value=document.getElementById(id).value.split('\n').reverse().join('\n')
}

function textinvert(id){
	text=document.getElementById(id).value.split('\n')
	
	for(i=0;i<text.length;i++){
		text[i]=text[i].split('').reverse().join('')
	}
	//alert("text="+text+"\ntext.length="+text.length)
	text=text.join("\n")
	document.getElementById(id).value=text
}

function djfx_preference(){
	document.getElementById("izapros").value=","
	document.getElementById("izamena").value="\"]),f(x[\""
}

function r_l_preference(){
	document.getElementById("izapros").value="\"r_"
	document.getElementById("izamena").value="\"l_"
}

function l_r_preference(){
	document.getElementById("izapros").value="\"l_"
	document.getElementById("izamena").value="\"r_"
}