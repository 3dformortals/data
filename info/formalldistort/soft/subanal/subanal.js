function resetokno(x){
	document.getElementById(x).value='';
}
function counttime(){
	time1=parseInt(document.getElementById("time1").value);
	time2=parseInt(document.getElementById("time2").value);
	pausa=time1-time2;
	bukva=parseInt(time2/35);
	document.getElementById("pausa").value=pausa;
	document.getElementById("bukva").value=bukva;

}
	
function analiz(){
	
	resetokno("okno2");
	bukva=parseInt(document.getElementById('bukva').value);
	pausa=parseInt(document.getElementById('pausa').value);
	text=document.getElementById('okno1').value;
	text=text.split("\n\n");
	//alert(bukva+" | "+pausa);
	
	for(var i=0;i<text.length;i++){
		subone=text[i].split("\n");
		subname=subone[0];
		subtime=recount_subtime(subone[1],"srt");
		subtext="";
		for(j=2;j<subone.length;j++){subtext+=subone[j]}
		talktime=recount_subtext(subtext,bukva,pausa);
		if(talktime=="цифра"){document.getElementById("okno2").value+="\n"+subname+"	"+talktime}
		else{
			if(subtime<talktime){document.getElementById("okno2").value+="\n"+subname+"	"+"мало времени"}
		}
		//alert("subname="+subname+"\n subtime="+subtime+"\n subtext="+subtext);
		
	}
	
}
	
function recount_subtime(time,subformat){
	
	rez=0;
	if(subformat=="srt"){
		time=time.split("");
		//alert("timesplit="+time);
		msec=parseInt(time[9]+time[10]+time[11]);
		sec=10000*parseInt(time[6])+1000*parseInt(time[7]);
		min=600000*parseInt(time[3])+60000*parseInt(time[4]);
		hour=36000000*parseInt(time[0])+3600000*parseInt(time[1]);
		rez-=(msec+sec+min+hour);
		//alert("rez0="+rez);
		msec=parseInt(time[26]+time[27]+time[28]);
		sec=10000*parseInt(time[23])+1000*parseInt(time[24]);
		min=600000*parseInt(time[20])+60000*parseInt(time[21]);
		hour=36000000*parseInt(time[17])+3600000*parseInt(time[18]);
		rez+=(msec+sec+min+hour);
		//alert("rez="+rez);
	}
	
	return (rez);
}

function recount_subtext(text,bukva,pausa){
	
	rez=0;
	text=text.split("");
	//alert("textsplit="+text);
	for(var i=0;i<text.length;i++){
		if(text[i]=="0" || text[i]=="1" || text[i]=="2" || text[i]=="3" || text[i]=="4" || text[i]=="5" || text[i]=="6" || text[i]=="7" || text[i]=="8" || text[i]=="9"){
			rez="цифра"; break;
		}
		else if(text[i]=="!" || text[i]=="?" || text[i]=="," || text[i]==":" || text[i]=="."){
			rez+=pausa;
			if(text[i+1]=="."){i++; if (text[i+1]=="."){i++}}
		}
		else{rez+=bukva}
	}
	return rez;
}
