var oldseg = 0;
	
function creator(i,x){
var x;
var y;
var tr1 ,tr2 ,tr3 ,tr4 ,td1 ,td2 ,td3 ,td4 ,td5 ,td6 ,td7 ,td8 ,td9 ,td10 ,td11 ,td12 ;
var textarea, inputot, inputdo, inputwag, table, tbody, tablefortext, tbodyfortext;
var thead;
x = document.createElement('td');
x.align = 'left';
x.id = i;

textarea= document.createElement('textarea');
textarea.id = 'kodi'+i;
textarea.cols = '30';
textarea.rows = '4';

inputot= document.createElement('input');
inputot.id='starti'+i;
inputot.type='text';
inputot.value='1';
inputot.size='1';
inputdo= document.createElement('input');
inputdo.id='endi'+i;
inputdo.type='text';
inputdo.value='0';
inputdo.size='1';
inputwag= document.createElement('input');
inputwag.id='wagi'+i;
inputwag.type='text';
inputwag.value='1';
inputwag.size='1';

td1= document.createElement('td');
td1.appendChild(textarea);

td3= document.createElement('td');
td4= document.createElement('td');
td5= document.createElement('td');
td5.innerHTML='от';
td6= document.createElement('td');
td6.appendChild(inputot);

td8= document.createElement('td');
td8.innerHTML='до';
td9= document.createElement('td');
td9.appendChild(inputdo);

td11= document.createElement('td');
td11.innerHTML='шаг';
td12= document.createElement('td');
td12.appendChild(inputwag);



tr2= document.createElement('tr');

tr2.appendChild(td5);
tr2.appendChild(td6);
tr3= document.createElement('tr');

tr3.appendChild(td8);
tr3.appendChild(td9);
tr4= document.createElement('tr');

tr4.appendChild(td11);
tr4.appendChild(td12);

table = document.createElement('table');
table.rules = 'box';
table.border = '1';
tbody=document.createElement('tbody');
thead=document.createElement('caption')
thead.innerHTML='число'
thead.align='center'
tbody.appendChild(tr2);
tbody.appendChild(tr3);
tbody.appendChild(tr4);
table.appendChild(thead);
table.appendChild(tbody);

tr1= document.createElement('tr');
tr1.appendChild(td1);

tablefortext = document.createElement('table');
tbodyfortext=document.createElement('tbody');
tbodyfortext.appendChild(tr1);
tablefortext.appendChild(tbodyfortext);

td3.appendChild(tablefortext);
td4.appendChild(table);

x.appendChild(td3);

x.appendChild(td4);

return x;
}

function addseg(){
	
//var seg =parseFloat(inputseg.value);
var x;
var seg = parseInt(document.getElementById('inputseg').value);
var y = document.getElementById('forseg');
if(seg>oldseg){
	
	for(i=oldseg+1; i<=seg;i++){
		
		x= creator(i,x);
		y.appendChild(x);
		}
		oldseg=seg;
}
else if(seg<oldseg){
	for(i=seg+1;i<=oldseg;i++){y.removeChild(y.lastChild);}
 oldseg=seg;
}

}


function kleit(){
var seg = oldseg;
var skokaraz =parseFloat(document.getElementById('raz').value);
var stroka;
var kodi;
var starti;
var wagi;
var endi;
var cifra;
stroka=''
for (var k = 0; k<skokaraz;k++){
	 
	for (var i=1;i<=seg;i++){
		
		
		kodi = document.getElementById('kodi'+i).value;
		starti = parseFloat(document.getElementById('starti'+i).value);
		wagi = parseFloat(document.getElementById('wagi'+i).value);
		endi = parseFloat(document.getElementById('endi'+i).value);
		cifra = starti + k*wagi;
		
		if (cifra <= endi){
			stroka =stroka+ ''+ kodi+cifra
			}else if (cifra>endi){
				stroka=stroka+''+kodi
				}
		
		}
	
	}
	document.getElementById('okno').value=stroka;
	}
