function ravnoravno(){
	document.getElementById('rez').value='';

		
		var infavxod = document.getElementById('vxod').value;
		//alert(infavxod)
		var stroka = new Array(5);
		for(var i=0;i<=4;i++){stroka[i]=''}
		var nstrok = infavxod.split('\n');
		//alert(nstrok)
		if(nstrok.length>0){var j=0;
			
			for(var i =0;i<=nstrok.length-1;i++){
				
				if(nstrok[i]!=''){stroka[j]=nstrok[i].split(' '); j++}
				
				}
						//alert(stroka[0])
			var n = new Array(5); var v=0; var w=0; var x=0; var y=0; var z=0;  var kusok0; var kusok1; var kusok2; var kusok3; var kusok4; var kusokend;
			kusokend='){}\n';
		if(stroka[0].length>1){	
			while (v+1<stroka[0].length){v++;
			if(document.getElementById('rbel1').checked){kusok0='if('+stroka[0][0]+' == '+stroka[0][v]}
			if(document.getElementById('rbel2').checked){kusok0='else if('+stroka[0][0]+' == '+stroka[0][v]}
			
			if(stroka[1].length>1){	
				while(w+1<stroka[1].length){w++;
					kusok1=' && '+stroka[1][0]+' == '+stroka[1][w];
					if(stroka[2].length>1){	
					while(x+1<stroka[2].length){x++;
						kusok2=' && '+stroka[2][0]+' == '+stroka[2][x];
						if(stroka[3].length>1){	
						while(y+1<stroka[3].length){y++;
							kusok3=' && '+stroka[3][0]+' == '+stroka[3][y];
							if(stroka[4].length>1){	
							while(z+1<stroka[4].length){z++;
								kusok4=' && '+stroka[4][0]+' == '+stroka[4][z];
								plustroka(kusok0+kusok1+kusok2+kusok3+kusok4+kusokend);
								
								}
								z=0;
								}else{plustroka(kusok0+kusok1+kusok2+kusok3+kusokend)}
							
							}
							y=0;
							}else{plustroka(kusok0+kusok1+kusok2+kusokend)}
													
						}
						x=0;
						}else{plustroka(kusok0+kusok1+kusokend)}
					
					}
					w=0;
					}else{plustroka(kusok0+kusokend)}
			}
			v=0;
			}
}

}
	
function plustroka(x){
	
	document.getElementById('rez').value+=x;
	
	}
