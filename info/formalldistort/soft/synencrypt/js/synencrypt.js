
function splittodots(id){
	var text=document.getElementById(id).value;
	var expr = new RegExp('[,.!?;:()\\[\\]\\s/]','gi');
	//text=text.toString();
	var xsplit=text.split(expr);// /[,.!?;:]/gim
	var xmatch=text.match(expr);
	//alert("match="+xmatch+"\nsplit="+xsplit);
	text='';
	for(i=0;i<xmatch.length;i++){
		text+=xsplit[i]+xmatch[i]+'\n';
	}
	text+=xsplit[xmatch.length];
	//alert(text);
	document.getElementById(id).value=text;
}

function jointodots(id){
	var text=document.getElementById(id).value;
	var expr = new RegExp('[,.!?;:()\\[\\]\\s/][\n]','gi');
	//text=text.toString();
	//alert(text.length);
	xmatch=text.match(expr);
	xsplit=text.split(expr);
	//alert("xmatch="+xmatch+"\nxsplit="+xsplit+"\nxmatch.length="+xmatch.length+"\nxsplit.length="+xsplit.length);
	text='';
	for(i=0;i<xmatch.length;i++){
		text+=xsplit[i]+xmatch[i][0];// /[,.!?;:]/gim
	}
	text+=xsplit[xmatch.length];
	//alert(text.length);
	
	
	document.getElementById(id).value=text;
}

function saveload(fromid,toid){
	document.getElementById(toid).value=document.getElementById(fromid).value;
}

function resettext(id){
	document.getElementById(id).value=''
}

function randomsinonim(x,db){
	var xsix=db[x].split(' ');
	if(!document.getElementById('cstrogo').checked){xsix[xsix.length]=x}
	return xsix[Math.floor(Math.random() * xsix.length)]
}

function isfirstbig(x){
	if(x[0].toUpperCase()==x[0]){return true}
	return false
}

function dofirstbig(x){
	x=x.split('');
	x[0]=x[0].toUpperCase();
	x=x.join('');
	return x
}

function zamenasimvola(text,sfind,sreplace,useregexp,flags){
	var sfind=sfind || '_';
	var sreplace=sreplace || ' ';
	var useregexp=useregexp || false;
	var flags=flags || 'gi'
	
	if(useregexp){
	sfind=new RegExp(sfind,flags)
	}
	var xmatch=text.match(sfind);
	var xsplit=text.split(sfind);
	if(!xmatch){return text}
	else{
		text='';
		for(i=0;i<xmatch.length;i++){
			text+=xsplit[i]+sreplace
		}
		text+=xsplit[xmatch.length]
	}
	return text
}

function randomsinonimbl(fromid,toid){
	var text=document.getElementById(fromid).value;
	var expr=new RegExp('[,.!?;:()\\[\\]\\s/]','gi');
	
	var six={};
	if(document.getElementById('cabramov').checked){
		for(key in ab){
			six[key]=ab[key]
		}
	}
	if(document.getElementById('cfrazbl').checked){
		text=zamenafrazbl(fromid);
		//alert("text="+text+"\nsix.length="+six.length)
		for(key in fr){
			six[key]=fr[key]
		}
	}
	if(document.getElementById('csinonimbl').checked){
		for(key in si){
			six[key]=si[key]
		}
	}
	// alert("text="+text+"\nsix.length="+six.length)
	// for(var key in six){alert(key)}
	var xmatch=text.match(expr);
	// alert("text.split(' ')="+text.split(' '));
	// alert(expr);
	// alert("text.split(expr)="+text.split(expr)+"text.split.len"+text.split(expr).length);
	//alert("xmatch="+xmatch)
	//alert(expr+" 1010")
	var xsplit=text.split(expr);
	var nxsplit=xsplit.slice();
	
	for(i=0;i<xsplit.length;i++){
		
		if(six[xsplit[i].toLowerCase()]){
			//alert(six[xsplit[i]]+" 0000")
			nxsplit[i]=randomsinonim(xsplit[i].toLowerCase(),six)
			if(isfirstbig(xsplit[i])){
				nxsplit[i]=dofirstbig(nxsplit[i])
			}
			if(document.getElementById('cnounderscore').checked){
				//nxsplit[i]=zamenasimvola(nxsplit[i])
				//какой то пиздец, просто не хочет работать, хотя через кнопку все ок...вообще мрак!
				nxsplit[i]=nxsplit[i].split('_').join(' ')
			}
		}
	}
	text='';
	for(i=0;i<xmatch.length;i++){
		text+=nxsplit[i]+xmatch[i]
	}
	text+=nxsplit[xmatch.length];
	
	document.getElementById(toid).value=text
}

function nounderscore(id){
	text=document.getElementById(id).value;
	text=zamenasimvola(text);
	document.getElementById(id).value=text
}

function click_cea_all(){
	var ckeys="cea_a cea_o cea_e cea_y cea_u cea__a cea__o cea__e cea__y cea__u".split(' ');
	for(i=0;i<ckeys.length;i++){
		if(document.getElementById('cea_all').checked!=document.getElementById(ckeys[i]).checked){document.getElementById(ckeys[i]).click()}
	}
	
}

function click_cex_all(){
	var ckeys="cex_b cex_c cex_g cex_k cex_m cex_n cex_p cex_r cex_w cex_x cex_z cex__b cex__c cex__h cex__k cex__m cex__p cex__t cex__w cex__x cex__z cex__3 cex__6".split(' ');
	for(i=0;i<ckeys.length;i++){
		if(document.getElementById('cex_all').checked!=document.getElementById(ckeys[i]).checked){document.getElementById(ckeys[i]).click()}
	}
	
}

function click_cg_all(){
	var ckeys="cg_a cg_b cg_g cg_d cg_e cg_k cg_o cg_p cg_r cg_t cg_u cg_f cg_x cg_w".split(' ');
	for(i=0;i<ckeys.length;i++){
		if(document.getElementById('cg_all').checked!=document.getElementById(ckeys[i]).checked){document.getElementById(ckeys[i]).click()}
	}
	
}

function click_cg__all(){
	var ckeys="cg__a cg__b cg__g cg__d cg__e cg__z cg__h cg__k cg__l cg__m cg__o cg__p cg__r cg__t cg__u cg__f cg__x".split(' ');
	for(i=0;i<ckeys.length;i++){
		if(document.getElementById('cg__all').checked!=document.getElementById(ckeys[i]).checked){document.getElementById(ckeys[i]).click()}
	}
	
}


function zamenasimvolov(fromid,toid){
	text=document.getElementById(fromid).value;
	var ckeys="cea_a cea_o cea_e cea_y cea_u cea__a cea__o cea__e cea__y cea__u "
	var newvalues="a o e y u A O E Y U "
	var old_values="а о е у и А О Е У И "
	
	ckeys+="cex_b cex_c cex_g cex_k cex_m cex_n cex_p cex_r cex_w cex_x cex_z cex__b cex__c cex__h cex__k cex__m cex__p cex__t cex__w cex__x cex__z cex__3 cex__6 "
	newvalues+="b c g k m n p r w x z B C H K M P T W X Z 3 6 "
	old_values+="Ь с д к т п р г ш х г В С Н К М Р Т Ш Х Г З б "
	
	ckeys+="cg_a cg_b cg_g cg_d cg_e cg_k cg_o cg_p cg_r cg_t cg_u cg_f cg_x cg_w "
	newvalues+="α β γ δ ε κ ο π ρ τ υ φ χ ω "
	old_values+="а в у б е к о п р т и ф х ш "
	
	ckeys+="cg__a cg__b cg__g cg__d cg__e cg__z cg__h cg__k cg__l cg__m cg__o cg__p cg__r cg__t cg__u cg__f cg__x"
	newvalues+="Α Β Γ Δ Ε Ζ Η Κ Λ Μ Ο Π Ρ Τ Υ Φ Χ"
	old_values+="А В Г Д Е Г Н К Л М О П Р Т У Ф Х"
	
	ckeys=ckeys.split(' ');
	newvalues=newvalues.split(' ');
	old_values=old_values.split(' ');
	for(i=0;i<ckeys.length;i++){
		if(document.getElementById(ckeys[i]).checked){
			text=text.split(old_values[i]).join(newvalues[i])
		}
	}
	document.getElementById(toid).value=text
}

function zamenafrazbl(fromid){
	text=document.getElementById(fromid).value
	//alert(text)
	for(var key in fr){
		//alert(key)
		var x=key.split('_').join(' ');
		//alert(text==x)
		var expr=new RegExp(x,'gi');
		if(text.match(expr)){
			//alert("text.match(expr)");
			//y=randomsinonim(key,fr);
			xmatch=text.match(expr);
			xsplit=text.split(expr);
			//alert("xmatch="+xmatch+"\nxsplit="+xsplit+"\nxmatch.length="+xmatch.length+"\nxsplit.length="+xsplit.length);
			text='';
			for(i=0;i<xmatch.length;i++){
				text+=xsplit[i];
				if(isfirstbig(xmatch[i])){
					text+=dofirstbig(xmatch[i]).split(' ').join('_')
				}else{
					text+=xmatch[i].split(' ').join('_')
				}
			}
			text+=xsplit[xmatch.length]
		}
		
	}
	return text
}

function clickzamenafrazbl(fromid){
	//alert("внутри клик замена")
	document.getElementById(fromid).value=zamenafrazbl(fromid)
}
//------------------

var nazad=false;
//var bs=document.getElementById("backslash").value;


function testfunc(){
	var a={}
	var b={}
	a["0"]=2
	b["0"]=a["0"]
	a["0"]=4
	alert(b["0"])
}


function grek_visor(){
	greek="α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ ς τ υ φ ψ χ ω Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Ψ Χ Ω";
	document.getElementById("grekvisor").value=greek;
	}

function o_O(id){
	s=document.getElementById(id).value;
	rez=s.toUpperCase();
	document.getElementById(id).value=rez;
	}

function O_o(id){
	s=document.getElementById(id).value;
	rez=s.toLowerCase();
	document.getElementById(id).value=rez;
	}

function Oo_oO(id){
	s=document.getElementById(id).value;
	s=s.split("");rez="";
	for(i=0;i<s.length;i++){
		if(s[i].toLowerCase()==s[i]){rez+=s[i].toUpperCase()}
		else{rez+=s[i].toLowerCase()}
	}
	document.getElementById(id).value=rez;
}

function buferfig(){
	window.open('http://formalldistort.org')
	alert('СКАЗАТЬ СПАСИБО МОЖНО СЮДА:\n\n ВКонтакте:\nhttp://vk.com/kyznec_tor\n\n WebMoney:\nZ178988330396\nE114984121775\nR281783437757\n\nhttp://www.L4soft.narod.ru')
	}

function showhelp(){
	var text="\n\nsynencrypt - замена слов и фраз синонимами из изменяемых словарей, расположенных в файлах frazbl.js sinonimbl.js slovar_abramova.js и замена кириллических букв похожими латинскими и греческими"+
	"\n\n-вставить в левое текстовое поле текст, который будем менять"+
	"\n\n-нажать кнопку 'синонимы' (можно несколько раз), в центральном текстовом поле появится резуьтат"+
	"\n\n-выделить внизу галочками те буквы(латинские и греческие + две цифры), которые будем использовать для замены кириллицы"+
	"\n\n-нажать кнопку 'заменить символы', в правом текстовом поле появится результат"+
	"\n\n"+
	"\n\nsave/load-сохраняет/загружает центральное текстовое поле"+
	"\n\nсклеить/разбить-разбивает/склеивает текст по словам"+
	"\n\nO_o-строчные буквы синонимов. o_O-заглавные буквы синонимов. Oo_oO-поменять регистр синонимов"+
	"\n\n-заменить подчеркивание на пробел - нужно для использвания нескольких слов в словаре, как одного синонима. Например, если в словаре - si['медведь']='мишка_косолапый', после замены будет 'мишка косолапый'"+
	"\n\n-чтобы найти синоним для одного слова, после него нужен пробел"+
	"\n\n-собственные словари заполнять аккуратно, как заполнено. Слова во фразах соединяются нижним подчеркиванием _ . Слева находится оригинал, справа синонимы через пробел. Пользовательский словарь синонимов в файле sinonimbl.js. Пользовательский словарь фраз в файле frazbl.js. В оригинале использовать строчные буквы. Программа сделает первую букву синонима или фразы заглавной, если в оригинале первая буква заглавная. Пример заполнения словаря фраз:\nfr[\"супер_пупер\"]=\"очень_клево зашибенно лучше_не_бывает\""
	alert(text)
	}

