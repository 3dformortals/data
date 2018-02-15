
function summcount(){
	var k=parseInt(document.getElementById('input_k').value);
	var n=document.getElementById('input_n').value; n=n.split(document.getElementById('input_s').value); n= n.length-1;
	document.getElementById('input_summcount').value = factorial(n)/factorial(k)/factorial(n-k);
	
	}

  function factorial (n) {
       if (n==0)
            return 1;
       else
            return n*factorial(n-1);
  }
//document.getElementById('pokus').focus();

function MAXIMAGENERATOR(){

	var tabla= document.createElement('text');
	//var resultatbox;
	var c = new Array();
	var s =document.getElementById('input_s').value;
	
	var nmassiv=document.getElementById('input_n').value;
	var nmassiv=nmassiv.split(s);
	var n=nmassiv.length-1;
	
	var textstart1 =document.getElementById('text_start1').value;
	var textstart2 =document.getElementById('text_start2').value;
	var textmid1 =document.getElementById('text_mid1').value;
	var textmid2 =document.getElementById('text_mid2').value;
	var textend1 =document.getElementById('text_end1').value;
	var textend2 =document.getElementById('text_end2').value;
	
	var inkrestart=false; if (document.getElementById('inkre_start').checked){inkrestart=true};
	var inkremid=false; if (document.getElementById('inkre_mid').checked){inkremid=true};
	var inkreend=false; if (document.getElementById('inkre_end').checked){inkreend=true};
	
	var k = parseInt(document.getElementById('input_k').value);
		
	var iism0;
	var ignoriism=false;
	var ignorthis=false;
	if(document.getElementById('ignor_iism').checked){
	ignoriism=true;
	iism0 = document.getElementById('input_iism0').value;
	iism0=iism0.split(',');
	}
	
	var iism1 = parseInt(document.getElementById('input_iism1').value);
	var iism2 = parseInt(document.getElementById('input_iism2').value);
	var out1 = parseInt(document.getElementById('input_out1').value);
	var out2 = parseInt(document.getElementById('input_out2').value);
	
	for(var i=1;i<=k;i++){c[i]=i;}
	var inkrement=1;
	if(inkrement>=out1 && inkrement<=out2){
	printc(c,k,nmassiv,iism1,iism2,textstart1,textstart2,textmid1,textmid2,textend1,textend2,inkrestart,inkremid,inkreend,inkrement,iism0,ignoriism,ignorthis,tabla)
	}
	while(c[1]<n-k+1){
			i = k;
		
		    while (c[i] + k - i + 1 > n){i--}
		        
		
		    c[i]++;
		
		    for (var j = i + 1; j <= k; j++){c[j] = c[j-1] + 1;}
		    inkrement++;
		    if(inkrement>=out1 && inkrement<=out2){
			printc(c,k,nmassiv,iism1,iism2,textstart1,textstart2,textmid1,textmid2,textend1,textend2,inkrestart,inkremid,inkreend,inkrement,iism0,ignoriism,ignorthis,tabla)
			}
	}
	document.getElementById('tabladiv').value=tabla.innerHTML;
	
}

function printc(c,k,nmassiv,iism1,iism2,textstart1,textstart2,textmid1,textmid2,textend1,textend2,inkrestart,inkremid,inkreend,inkrement,iism0,ignoriism,ignorthis,tabla){
printstarttext(textstart1,textstart2,inkrestart,inkrement,tabla);

	

for(var iism=iism1;iism<=iism2;iism++){
	
	if(ignoriism==true){
		var j=0; 
		while(j < iism0.length){ j++;
			
			if(iism==parseInt(iism0[j])){
				ignorthis=true; break;
			}
		}
	}
	
	if(ignorthis==false){
	

		tabla.innerHTML+='[';
	
		for(var i=1;i<=k;i++){
			
			
			if(i<k){
			

				tabla.innerHTML+=''+nmassiv[c[i]]+''+iism+',';
			
			}
			else if(i==k && iism<iism2){
			

				tabla.innerHTML+=''+nmassiv[c[i]]+''+iism+'],';
			
			}
			else if(i==k && iism==iism2){
				
				tabla.innerHTML+=''+nmassiv[c[i]]+''+iism+']';
				
			}
			
			}
		var br=document.createElement('text');
		br.innerHTML='<br>';
		tabla.innerHTML+=''+'\n';
	
	}else if(ignorthis==true){ignorthis=false}

}
printmidtext(textmid1,textmid2,inkremid,inkrement,tabla);
printendtext(textend1,textend2,inkreend,inkrement,tabla);


}

function printstarttext(textstart1,textstart2,inkrestart,inkrement,tabla){
	
		tabla.innerHTML+=''+textstart1;
		
	if(inkrestart==true){
	
		tabla.innerHTML+=''+inkrement;
	
	}
			
		tabla.innerHTML+=''+textstart2;
		
	}
	
function printmidtext(textmid1,textmid2,inkremid,inkrement,tabla){
	
		tabla.innerHTML+=''+textmid1;

if(inkremid==true){
	
		tabla.innerHTML+=''+inkrement;	
	
	}
			
		tabla.innerHTML+=textmid2;
	
	}	
	
function printendtext(textend1,textend2,inkreend,inkrement,tabla){
	
		

		tabla.innerHTML+=''+textend1;
		
	if(inkreend==true){

		tabla.innerHTML+=''+inkrement;	
	
	}

		tabla.innerHTML+=''+textend2;
	
	}

function clearresult(){
	
	document.getElementById('tabladiv').value='';
	
	}
