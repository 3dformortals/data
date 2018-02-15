function resetokno(x){
	document.getElementById(x).value='';
}

function htmltableinverter(){
	trinvert=document.getElementById("trinvert").checked;
	tdinvert=document.getElementById("tdinvert").checked;
	data=document.getElementById('okno1').value;
	newdata="";newtrdata="";newtddata="";trdata="";tddata="";
	trdata=data.split("<tr");
	//alert("trdata="+trdata);
	//переставить строки
	//alert("trinvert="+trinvert);
	if(trinvert){
		for(i=trdata.length-1;i>0;i--){
			newtrdata+="<tr"+trdata[i];
		}
	}else{
		for(i=1;i<trdata.length;i++){
			newtrdata+="<tr"+trdata[i];
		}
	}
	newdata=newtrdata;newtrdata="";
	//alert("ПЕРЕД ЯЧЕЙКАМИ newdata="+newdata);
	//переставить ячейки в строках
	//alert("tdinvert="+tdinvert);
	if(tdinvert){
		trdata=newdata.split("<tr");
		for(i=1;i<trdata.length;i++){
			//alert("trdata[i]="+trdata[i]);
			tddata=trdata[i].split("</tr")[0];
			//alert("перед split('<td') tddata="+tddata);
			tddata=tddata.split("<td");
			//alert("after split('<td') tddata="+tddata);
			newtddata+="<tr"+tddata[0];
			for(j=tddata.length-1;j>0;j--){
				newtddata+="<td"+tddata[j];
			}
			newtrdata+=newtddata+"</tr>"+"\n";
			newtddata="";
		}
		newdata=newtrdata;
	}
	document.getElementById("okno2").value=newdata;
}

function buferfig(){
	window.open('http://formalldistort.org')
	alert('СКАЗАТЬ СПАСИБО МОЖНО СЮДА:\n\n ВКонтакте:\nhttp://vk.com/kyznec_tor\n\n WebMoney:\nZ178988330396\nE114984121775\nR281783437757\n\nhttp://www.L4soft.narod.ru')
	}
