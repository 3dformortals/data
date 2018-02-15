function resetokno(x){
	document.getElementById(x).value='';
}

function cleaninput(){
	newstring=document.getElementById("newstring").checked;
	start=document.getElementById('start').value;
	end=document.getElementById('end').value;
	text=document.getElementById('okno1').value;
	ownsep=document.getElementById('ownsep').value;
	rez="";
	if(document.getElementById('lowercase').checked){
	start=start.toLowerCase();
	end=end.toLowerCase();
	text=text.toLowerCase();
	}
	text=text.split(start);
	if(newstring){
		for(i=1;i<text.length;i++){rez+=start+text[i].split(end,1)[0]+end+ownsep+"\n"}
		var expr = new RegExp('\n+', 'g');
		rez=rez.replace(expr,"\n")
	}else{
		for(i=1;i<text.length;i++){rez+=start+text[i].split(end,1)[0]+end+ownsep}
	}
	document.getElementById("okno1").value=rez;
	
}

function deleteinput(){
	newstring=document.getElementById("newstring").checked;
	start=document.getElementById('start').value;
	end=document.getElementById('end').value;
	text=document.getElementById('okno1').value;
	ownsep=document.getElementById('ownsep').value;
	rez="";
	if(document.getElementById('lowercase').checked){
	start=start.toLowerCase();
	end=end.toLowerCase();
	text=text.toLowerCase();
	}
	text=text.split(start);
	if(newstring){
		rez+=text[0]+ownsep+"\n";
		for(i=1;i<text.length;i++){
			if(i<text.length-1){
				rez+=text[i].split(end).slice(1).join(end)+ownsep+"\n"
			}
			else{
				part=text[i].split(end)
				if(part[1]!=undefined){
					part=part.slice(1)
				}
				else{
					part=""
				}
				rez+=part
			}
		}
		var expr = new RegExp('\n+', 'g');
		rez=rez.replace(expr,"\n")
	}else{
		rez+=text[0]+ownsep;
		for(i=1;i<text.length;i++){
			if(i<text.length-1){
				part=text[i].split(end).slice(1).join(end)+ownsep
			}
			else{
				part=text[i].split(end)
				if(part[1]!=undefined){
					part=part.slice(1)
				}
				else{
					part=""
				}
			}
			//alert("part[0]="+part[0].toString())
			//if(part[0]!="\n" && part[0]!=" "){part=" "+part}
			rez+=part}
	}
	document.getElementById("okno1").value=rez;
	
}

function saveload(fromid,toid){
	document.getElementById(toid).value=document.getElementById(fromid).value
}

function tagpreference(start,end){
	document.getElementById('start').value=start;
	document.getElementById('end').value=end;
}

function buferfig(){
	window.open('http://formalldistort.org')
	alert('СКАЗАТЬ СПАСИБО МОЖНО СЮДА:\n\n ВКонтакте:\nhttp://vk.com/kyznec_tor\n\n WebMoney:\nZ178988330396\nE114984121775\nR281783437757\n\nhttp://www.L4soft.narod.ru')
}