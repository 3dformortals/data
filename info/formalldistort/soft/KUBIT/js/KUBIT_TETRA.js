function tetra_generator(){
// вх
var n=parseFloat(document.getElementById('ina').value); //число повторения звена TETRA в направлении ребра
var a=parseFloat(document.getElementById('ia').value); //длина звена сегмента TETRA(м) 
var ad=parseFloat(document.getElementById('iad').value); //отношение длины звена (м) к диаметру сечения звена (м)
var ro=parseFloat(document.getElementById('iro').value); //плотность вещества из которого состоит звено TETRA кг/(м^3)

//вычисляемые
var nZ=0; //число звеньев TETRA
var nU=0; //число узлов TETRA
var nG=0; //число граней TETRA
var UG=0; // число узлов на плоских гранях TETRA
var UR=0; // число узлов на ребрах TETRA
var UV=0; // число узлов на вершинах TETRA

var d=0 ; //диаметр сечения звена TETRA
var l=0; //длина ребра TETRA
var RU=0; //радиус узла TETRA
var h=0; //высота сегмента отсекаемого от узла

var SG; //площадь грани сегмента
var SGab; //габаритная площадь TETRA
var SZK; //площадь звеньев TETRA
var SUK; //площадь узлов TETRA
var SPov; //площадь поверхности TETRA
var SPro; //площадь пропускания TETRA
var SPG; //площадь пропускания грани сегмента

var VUK; //объем узлов TETRA
var VZK; //объем звеньев TETRA
var VG; //габаритный объем TETRA
var VK; //объем TETRA

var MZ; //масса звена TETRA
var MZK; //масса звеньев TETRA
var MU; //масса узла TETRA
var MUK; //масса узлов TETRA
var MK; //масса TETRA

var dnU=0;
var nU0=0;
var dnZ=0;
var dnG=0;

for (var x=1; x<=n; x++){
dnU=nU0+x;
nU0=dnU;
dnZ=dnU*6;
dnG=dnU*4;
nU+=dnU;
nZ+=dnZ;
nG+=dnG;
};
for (var x=1; x<=n+1; x++){
nU+=x;
};

UV=4;
UR=6*(n-1);
for(var x=3; x<=n; x++){
UG+=(x-2)*4};
d=a/ad;
RU=d/2*Math.sqrt(3);
h=d/2*Math.sqrt(2);
SUK=(4*Math.PI*RU*RU-Math.PI*2*RU*h*3)*UV+(4*Math.PI*RU*RU-Math.PI*2*RU*h*6)*UR+(4*Math.PI*RU*RU-Math.PI*2*RU*h*9)*UG+(4*Math.PI*RU*RU-Math.PI*2*RU*h*12)*(nU-UG-UR-UV);
VUK=(4/3*Math.PI*RU*RU*RU-2*Math.PI*RU*RU*h)*UV+(4/3*Math.PI*RU*RU*RU-4*Math.PI*RU*RU*h)*UR+(4/3*Math.PI*RU*RU*RU-6*Math.PI*RU*RU*h)*UG+(4/3*Math.PI*RU*RU*RU-8*Math.PI*RU*RU*h)*(nU-UG-UR-UV);
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

//alert(SPov);
// печать результатов
var dorez = document.getElementById('result').innerHTML;
resetresult('result');
var rez = document.getElementById('result');

rez.innerHTML+='<b>Материальная площадь поверхности TETRA S<sub>пов</sub> = '+SPov+' [м<sup>2</sup>]</b><br>';
rez.innerHTML+='Площадь поверхности габаритного объема TETRA S<sub>габ</sub> = '+SGab+' [м<sup>2</sup>]<br>';
rez.innerHTML+='<i>Кратность увеличения площади S<sub>пов</sub>/S<sub>габ</sub> = '+SPov/SGab+'</i><br>';
rez.innerHTML+='<b>Масса TETRA m = '+MK+' [кг]</b><br>';
rez.innerHTML+='Масса(возможная) габаритного объема сплошного вещества m<sub>габ</sub> = '+VG*ro+' [кг]<br>';
rez.innerHTML+='<i>Кратность уменьшения массы  m<sub>габ</sub>/m = '+VG*ro/MK+'</i><br>';
rez.innerHTML+='Габаритный размер ребра = '+l+' [м]<br>';
rez.innerHTML+='<b>Габаритный объем TETRA V<sub>габ</sub> = '+VG+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<b>Материальный объем TETRA V<sub>вещества</sub> = '+VK+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<i>Кратность уменьшения объема V<sub>габ</sub>/V<sub>вещества</sub> = '+VG/VK+'</i><br>';
rez.innerHTML+='Объем незанятый веществом V<sub>незанятый</sub> = '+VG-VK+' [м<sup>3</sup>]<br>';
rez.innerHTML+='Число звеньев TETRA N<sub>звеньев</sub> = '+nZ+'<br>';
rez.innerHTML+='Число граней TETRA N<sub>граней</sub> = '+nG+'<br>';
rez.innerHTML+='Число узлов TETRA N<sub>узлов</sub> = '+nU+'<br>';
rez.innerHTML+='Число узлов на гранях U<sub>граней</sub> = '+UG+'<br>';
rez.innerHTML+='Число узлов на ребрах U<sub>ребер</sub> = '+UR+'<br>';
rez.innerHTML+='Число узлов на вершинах U<sub>вершин</sub> = '+UV+'<br>';
rez.innerHTML+='Число внутренних узлов U<sub>внутри</sub> = '+nU-UG-UR-UV+'<br>';

rez.innerHTML+='<b>Вход:</b><br>';
rez.innerHTML+='Число повторений звена TETRA вдоль ребра = '+n+'<br>';
rez.innerHTML+='Длина звена TETRA a = '+a+' [м]<br>';
rez.innerHTML+='Отношение длины звена [м] к диаметру сечения звена [м] a/d = '+ad+'<br>';
rez.innerHTML+='Плотность вещества TETRA &#961 = '+ro+'  [кг/м<sup>3</sup>]<br>';
rez.innerHTML+='<br><br><div style="height:25px; border:1px solid; width:100%"><br><br>';
rez.innerHTML+=dorez;

}
