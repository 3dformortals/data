function tetra_double_generator(){
// вх
var n=parseFloat(document.getElementById('ina').value); //число повторения звена TETRA-DOUBLE в направлении ребра
var a=parseFloat(document.getElementById('ia').value); //длина звена сегмента TETRA-DOUBLE(м) 
var ad=parseFloat(document.getElementById('iad').value); //отношение длины звена (м) к диаметру сечения звена (м)
var ro=parseFloat(document.getElementById('iro').value); //плотность вещества из которого состоит звено TETRA-DOUBLE кг/(м^3)

//вычисляемые
var nZ=0; //число звеньев TETRA-DOUBLE
var nU=0; //число узлов TETRA-DOUBLE
var nG=0; //число граней TETRA-DOUBLE
var UG=0; // число узлов на плоских гранях TETRA-DOUBLE
var UGO=0; // число узлов на гранях основания
var UR=0; // число узлов на ребрах TETRA-DOUBLE
var URO=0; // число узлов на ребрах основания
var UV=0; // число узлов на вершинах TETRA-DOUBLE

var d=0; //диаметр сечения звена TETRA-DOUBLE
var l=0; //длина ребра TETRA-DOUBLE
var RU=0; //радиус узла TETRA-DOUBLE
var h=0; //высота сегмента отсекаемого от узла

var SG; //площадь грани сегмента
var SU; //площадь узла TETRA-DOUBLE
var SGab; //габаритная площадь TETRA-DOUBLE
var SZK; //площадь звеньев TETRA-DOUBLE
var SUK; //площадь узлов TETRA-DOUBLE
var SPov; //площадь поверхности TETRA-DOUBLE
var SPro; //площадь пропускания TETRA-DOUBLE
var SPG; //площадь пропускания грани сегмента

var VU; //объем узла TETRA-DOUBLE
var VUK; //объем узлов TETRA-DOUBLE
var VZK; //объем звеньев TETRA-DOUBLE
var VG; //габаритный объем TETRA-DOUBLE
var VK; //объем TETRA-DOUBLE

var MZ; //масса звена TETRA-DOUBLE
var MZK; //масса звеньев TETRA-DOUBLE
var MU; //масса узла TETRA-DOUBLE
var MUK; //масса узлов TETRA-DOUBLE
var MK; //масса TETRA-DOUBLE

			if(n>0){

var dnU=0;
var nU0=0;
var dnZ=0;
var dnG=0;

for (var x=1; x<n; x++){
dnU=nU0+x;
nU0=dnU;
dnZ=dnU*9;
dnG=dnU*7;
UV+=dnU;
nU+=dnU*2;
nZ+=dnZ;
nG+=dnG;
};
dnU=nU0+n;
nU0=dnU;
dnZ=dnU*6;
dnG=dnU*4;
nU+=dnU;
nZ+=dnZ;
nG+=dnG;

for (var x=1; x<=n+1; x++){
nU+=x;
};
UV+=4;
UR=3*(n-1);
URO=3*(n-1);
for(var x=3; x<n; x++){
UG+=(x-2)*3;
UGO+=(x-2)};
d=a/ad;
RU=d/2*Math.sqrt(3);
h=d/2*Math.sqrt(2);
SU=4*Math.PI*RU*RU;
SUK=(SU-Math.PI*2*RU*h*3)*UV+(SU-Math.PI*2*RU*h*7)*UR+(SU-Math.PI*2*RU*h*6)*URO +(SU-Math.PI*2*RU*h*11)*UG+(SU-Math.PI*2*RU*h*9)*UGO  +(SU-Math.PI*2*RU*h*12)*(nU-UG-UR-UV-UGO-URO);

VU=4/3*Math.PI*RU*RU*RU;
VUK=(VU-2*Math.PI*RU*RU*h)*UV+(VU-2/3*Math.PI*RU*RU*h*7)*UR+(VU-2/3*Math.PI*RU*RU*h*6)*URO+(VU-2/3*Math.PI*RU*RU*h*11)*UG+(VU-2/3*Math.PI*RU*RU*h*9)*UGO+(VU-8*Math.PI*RU*RU*h)*(nU-UG-UR-UV-UGO-URO);


l=n*a+d;
VG=l*l*l*Math.sqrt(2)/12;
SGab=l*l*Math.sqrt(3);
SG=l*l*Math.sqrt(3)/4;
VZK=Math.PI*d/2*d/2*(a-2*RU)*nZ;
SZK=2*Math.PI*d/2*(a-2*RU)*nZ;
MZK=ro*VZK;
MUK=ro*VUK;
MK=MUK+MZK;
VK=VUK+VZK;
SPov=SZK+SUK;
SPG=(a-d)*(a-d)*Math.sqrt(3)/4;
SPro=SPG*nG;
				};
//alert(SPov);
// печать результатов
var dorez = document.getElementById('result').innerHTML;
resetresult('result');
var rez = document.getElementById('result');

rez.innerHTML+='<b>Материальная площадь поверхности TETRA-DOUBLE S<sub>пов</sub> = '+SPov+' [м<sup>2</sup>]</b><br>';
rez.innerHTML+='Площадь поверхности габаритного объема TETRA-DOUBLE S<sub>габ</sub> = '+SGab+' [м<sup>2</sup>]<br>';
rez.innerHTML+='<i>Кратность увеличения площади S<sub>пов</sub>/S<sub>габ</sub> = '+SPov/SGab+'</i><br>';
rez.innerHTML+='<b>Масса TETRA-DOUBLE m = '+MK+' [кг]</b><br>';
rez.innerHTML+='Масса(возможная) габаритного объема сплошного вещества m<sub>габ</sub> = '+VG*ro+' [кг]<br>';
rez.innerHTML+='<i>Кратность уменьшения массы  m<sub>габ</sub>/m = '+VG*ro/MK+'</i><br>';
rez.innerHTML+='Габаритный размер ребра = '+l+' [м]<br>';
rez.innerHTML+='<b>Габаритный объем TETRA-DOUBLE V<sub>габ</sub> = '+VG+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<b>Материальный объем TETRA-DOUBLE V<sub>вещества</sub> = '+VK+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<i>Кратность уменьшения объема V<sub>габ</sub>/V<sub>вещества</sub> = '+VG/VK+'</i><br>';
rez.innerHTML+='Объем незанятый веществом V<sub>незанятый</sub> = '+VG-VK+' [м<sup>3</sup>]<br>';
rez.innerHTML+='Число звеньев TETRA-DOUBLE N<sub>звеньев</sub> = '+nZ+'<br>';
rez.innerHTML+='Число граней TETRA-DOUBLE N<sub>граней</sub> = '+nG+'<br>';
rez.innerHTML+='Число узлов TETRA-DOUBLE N<sub>узлов</sub> = '+nU+'<br>';
rez.innerHTML+='Число узлов на гранях U<sub>граней</sub> = '+UG+'<br>';
rez.innerHTML+='Число узлов на ребрах U<sub>ребер</sub> = '+UR+'<br>';
rez.innerHTML+='Число узлов на вершинах U<sub>вершин</sub> = '+UV+'<br>';
rez.innerHTML+='Число внутренних узлов U<sub>внутри</sub> = '+nU-UG-UR-UV-UGO-URO+'<br>';

rez.innerHTML+='<b>Вход:</b><br>';
rez.innerHTML+='Число повторений звена TETRA-DOUBLE вдоль ребра = '+n+'<br>';
rez.innerHTML+='Длина звена TETRA-DOUBLE a = '+a+' [м]<br>';
rez.innerHTML+='Отношение длины звена [м] к диаметру сечения звена [м] a/d = '+ad+'<br>';
rez.innerHTML+='Плотность вещества TETRA-DOUBLE &#961 = '+ro+'  [кг/м<sup>3</sup>]<br>';
rez.innerHTML+='<br><br><div style="height:25px; border:1px solid; width:100%"><br><br>';
rez.innerHTML+=dorez;

}
