function circle_vblrez_generator(){
// вх
var nx=parseFloat(document.getElementById('inx').value); //число повторения звена кубита в направлении оси x
var ny=parseFloat(document.getElementById('iny').value); //число повторения звена кубита в направлении оси y
var nz=parseFloat(document.getElementById('inz').value); //число повторения звена кубита в направлении оси z
var a=parseFloat(document.getElementById('ia').value); //расстояние между центрами вырезаемых профилей(м) 
var ad=parseFloat(document.getElementById('iad').value); //отношение a (м) к диаметру отверстия d (м)
var ro=parseFloat(document.getElementById('iro').value); //плотность вещества из которого состоит звено кубита кг/(м^3)

//вычисляемые
var d; //диаметр отверстия сегмента кубита (м)
var lx; //габаритный размер кубита вдоль оси x (м)
var ly; //габаритный размер кубита вдоль оси y (м)
var lz; //габаритный размер кубита вдоль оси z (м)
var bZ; //ширина звена (м)

var SGab; //габаритная площадь кубита
var SPO; //площадь профиля отверстия
var SPov; //площадь поверхности кубита
var SPx; //площадь отверстий после вырезания вдоль первой оси
var SPy; //площадь отверстий после вырезания вдоль второй оси
var SPz; //площадь отверстий после вырезания вдоль третьей оси
var VU; //объем пересечения вычетаемых объемов

var VG; //габаритный объем кубита
var VK; //объем кубита
var VPx; //объем отверстий после вырезания вдоль первой оси
var VPy; //объем отверстий после вырезания вдоль второй оси
var VPz; //объем отверстий после вырезания вдоль третьей оси

var MK; //масса кубита



d=a/ad;
SPO=Math.PI*d*d/4;
bZ=a-d;
lx=nx*a+bZ;
ly=ny*a+bZ;
lz=nz*a+bZ;
VG=lx*ly*lz;
SGab=lx*ly*2+lx*lz*2+ly*lz*2;
VU=Math.PI/6*Math.pow((d*Math.sqrt(2)),3)-Math.PI*(d/Math.sqrt(2)-d/2)*(3*Math.pow((d/2),2)+Math.pow((d/Math.sqrt(2)-d/2),2));

VPx=SPO*lx*(ny*nz);
VPy=(SPO*ly-ny*VU)*(nx*nz);
VPz=(SPO*lz-nz*VU)*(nx*ny);
SU=Math.PI*Math.pow((d*Math.sqrt(2)),2)-2*Math.PI*d/Math.sqrt(2)*(d/Math.sqrt(2)-d/2)*6+4*Math.PI*d/2*d/2;

SPx=lx*Math.PI*d*(ny*nz)-SU*(nx*ny*nz);
SPy=ly*Math.PI*d*(nx*nz)-SU*(nx*ny*nz);
SPz=lz*Math.PI*d*(nx*ny)-SU*(nx*ny*nz);
VK=VG-VPx-VPy-VPz;
MK=VK*ro;
SPov=SPx+SPy+SPz+SGab-SPO*(nx*ny*2+nx*nz*2+ny*nz*2);

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

rez.innerHTML+='<b>Вход:</b><br>';
rez.innerHTML+='Число отверстий вдоль оси x = '+nx+'<br>';
rez.innerHTML+='Число отверстий вдоль оси y = '+ny+'<br>';
rez.innerHTML+='Число отверстий вдоль оси z = '+nz+'<br>';
rez.innerHTML+='Расстояние между отверстиями a = '+a+' [м]<br>';
rez.innerHTML+='Плотность вещества кубита &#961 = '+ro+'  [кг/м<sup>3</sup>]<br>';
rez.innerHTML+='<br><br><div style="height:25px; border:1px solid; width:100%"><br><br>';
rez.innerHTML+=dorez;

}
