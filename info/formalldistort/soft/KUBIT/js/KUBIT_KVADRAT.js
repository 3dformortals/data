function kvadrat_generator(){
// вх
var nx=parseFloat(document.getElementById('inx').value); //число повторения звена кубита в направлении оси x
var ny=parseFloat(document.getElementById('iny').value); //число повторения звена кубита в направлении оси y
var nz=parseFloat(document.getElementById('inz').value); //число повторения звена кубита в направлении оси z
var a=parseFloat(document.getElementById('ia').value); //длина звена сегмента кубита(м) 
var ab=parseFloat(document.getElementById('iab').value); //отношение длины звена (м) к ширине звена (м)
var ro=parseFloat(document.getElementById('iro').value); //плотность вещества из которого состоит звено кубита кг/(м^3)

//вычисляемые
var zvenja=new Array(); //число звеньев которое вносит новый сегмент при добавлении
var uzlbl=new Array(); //число узлов которое вносит новый сегмент при добавлении
var grani=new Array(); //число граней которое вносит новый сегмент при добавлении
var nZ=0; //число звеньев кубита
var nU=0; //число узлов кубита
var nG=0; //число граней кубита
var UG; // число узлов на плоских гранях кубита
var UR; // число узлов на ребрах кубита
var UV; // число узлов на вершинах кубита

var b; //ширина звена сегмента кубита
var lx; //габаритный размер кубита вдоль оси x
var ly; //габаритный размер кубита вдоль оси y
var lz; //габаритный размер кубита вдоль оси z
var Lpro; //сторона пропускной площади

var SG; //площадь грани сегмента
var SGab; //габаритная площадь кубита
var SZ; //площадь звена
var SZK; //площадь звеньев кубита
//var SU; //площадь узла кубита
//var SUK; //площадь узлов кубита
var SUG; // площадь узлов на гранях кубита (дополнительная)
var SUR; // площадь узлов на ребрах кубита (дополнительная)
var SUV; //площадь узлов на вершинах кубита (дополнительная)
var SPov; //площадь поверхности кубита
var SPro; //площадь пропускания кубита
var SPG; //площадь пропускания грани сегмента

var VU; //объем узла кубита
var VUK; //объем узлов кубита
var VZ; //объем звена
var VZK; //объем звеньев кубита
var VG; //габаритный объем кубита
var VK; //объем кубита

var MZ; //масса звена кубита
var MZK; //масса звеньев кубита
var MU; //масса узла кубита
var MUK; //масса узлов кубита
var MK; //масса кубита

nZ=(nx+1)*(ny+1)*nz+(nx+1)*(nz+1)*ny+(nz+1)*(ny+1)*nx;
nU=(nx+1)*(ny+1)*(nz+1);
nG=nx*ny*(nz+1)+nx*nz*(ny+1)+nz*ny*(nx+1);

b=a/ab;
lx=nx*a+b;
ly=ny*a+b;
lz=nz*a+b;
VG=lx*ly*lz;
SGab=lx*ly*2+lx*lz*2+ly*lz*2;
SG=a*a;
VU=b*b*b;
VZ=a*b*b-b*b*b;
SZ=4*a*b-4*b*b;

MZ=ro*VZ;
MU=ro*VU;
VZK=VZ*nZ;
MZK=MZ*nZ;
VUK=VU*nU;
MUK=MU*nU;
SZK=SZ*nZ;

MK=MUK+MZK;
VK=VUK+VZK;
UG=(nx-1)*(ny-1)*2+(nx-1)*(nz-1)*2+(ny-1)*(nz-1)*2;
SUG=UG*b*b;
UR=(nx-1)*4+(ny-1)*4+(nz-1)*4;
SUR=UR*b*b*2;
UV=8;
SUV=UV*b*b*3;

SPov=SZK+SUG+SUR+SUV;
SPG=(a-b)*(a-b);
SPro=SPG*nG;
Lpro=a-b;
//alert("SPov="+SPov+ " " + "VKB="+VKB+" " + "VG="+VG+" "+ "MK="+MK+" " );
// печать результатов
var dorez = document.getElementById('result').innerHTML;
resetresult('result');
var rez = document.getElementById('result');

rez.innerHTML+='<b>Материальная площадь поверхности кубита S<sub>пов</sub> = '+SPov+' [м<sup>2</sup>]</b><br>';
rez.innerHTML+='Площадь поверхности габаритного объема кубита S<sub>габ</sub> = '+SGab+' [м<sup>2</sup>]<br>';
rez.innerHTML+='<i>Кратность увеличения площади S<sub>пов</sub>/S<sub>габ</sub> = '+SPov/SGab+'</i><br>';
rez.innerHTML+='<b>Масса кубита m = '+MK+' [кг]</b><br>';
rez.innerHTML+='Масса(возможная) габаритного объема сплошного вещества m<sub>габ</sub> = '+VG*ro+' [кг]<br>';
rez.innerHTML+='<i>Кратность уменьшения массы  m<sub>габ</sub>/m = '+VG*ro/MK+'</i><br>';
rez.innerHTML+='Габаритный размер вдоль оси x = '+lx+' [м]<br>';
rez.innerHTML+='Габаритный размер вдоль оси y = '+ly+' [м]<br>';
rez.innerHTML+='Габаритный размер вдоль оси z = '+lz+' [м]<br>';
rez.innerHTML+='<b>Габаритный объем кубита V<sub>габ</sub> = '+VG+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<b>Материальный объем кубита V<sub>вещества</sub> = '+VK+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<i>Кратность уменьшения объема V<sub>габ</sub>/V<sub>вещества</sub> = '+VG/VK+'</i><br>';
rez.innerHTML+='Объем незанятый веществом V<sub>незанятый</sub> = '+VG-VK+' [м<sup>3</sup>]<br>';
rez.innerHTML+='Число звеньев кубита N<sub>звеньев</sub> = '+nZ+'<br>';
rez.innerHTML+='Число граней кубита N<sub>граней</sub> = '+nG+'<br>';
rez.innerHTML+='Число узлов кубита N<sub>узлов</sub> = '+nU+'<br>';
rez.innerHTML+='Число узлов на гранях U<sub>граней</sub> = '+UG+'<br>';
rez.innerHTML+='Число узлов на ребрах U<sub>ребер</sub> = '+UR+'<br>';
rez.innerHTML+='Число узлов на вершинах U<sub>вершин</sub> = '+UV+'<br>';
rez.innerHTML+='Число внутренних узлов U<sub>внутри</sub> = '+nU-UG-UR-UV+'<br>';

rez.innerHTML+='<b>Вход:</b><br>';
rez.innerHTML+='Число повторений звена кубита вдоль оси x = '+nx+'<br>';
rez.innerHTML+='Число повторений звена кубита вдоль оси y = '+ny+'<br>';
rez.innerHTML+='Число повторений звена кубита вдоль оси z = '+nz+'<br>';
rez.innerHTML+='Длина звена кубита a = '+a+' [м]<br>';
rez.innerHTML+='Отношение длины звена [м] к диаметру сечения звена [м] a/b = '+ab+'<br>';
rez.innerHTML+='Плотность вещества кубита &#961 = '+ro+'  [кг/м<sup>3</sup>]<br>';
rez.innerHTML+='<br><br><div style="height:25px; border:1px solid; width:100%"><br><br>';
rez.innerHTML+=dorez;

}
