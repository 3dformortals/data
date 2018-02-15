function kvadrat_vblrez_generator(){
// вх
var nx=parseFloat(document.getElementById('inx').value); //число повторения звена кубита в направлении оси x
var ny=parseFloat(document.getElementById('iny').value); //число повторения звена кубита в направлении оси y
var nz=parseFloat(document.getElementById('inz').value); //число повторения звена кубита в направлении оси z
var a=parseFloat(document.getElementById('ia').value); //расстояние между центрами вырезаемых профилей(м) 
var ab=parseFloat(document.getElementById('iab').value); //отношение a (м) к ширине отверстия b (м)
var ro=parseFloat(document.getElementById('iro').value); //плотность вещества из которого состоит звено кубита кг/(м^3)

//вычисляемые
var b ; //ширина отверстия сегмента кубита (м)
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

var VG; //габаритный объем кубита
var VK; //объем кубита
var VPx; //объем отверстий после вырезания вдоль первой оси
var VPy; //объем отверстий после вырезания вдоль второй оси
var VPz; //объем отверстий после вырезания вдоль третьей оси

var MK; //масса кубита



b=a/ab;
SPO=b*b;
bZ=a-b;
lx=nx*a+bZ;
ly=ny*a+bZ;
lz=nz*a+bZ;
VG=lx*ly*lz;
SGab=lx*ly*2+lx*lz*2+ly*lz*2;
VPx=b*b*lx*(ny*nz);
VPy=(b*b*ly-ny*b*b*b)*(nx*nz);
VPz=(b*b*lz-nz*b*b*b)*(nx*ny);
SPx=lx*b*4*(ny*nz)-4*b*b*(nx*ny*nz);
SPy=ly*b*4*(nx*nz)-4*b*b*(nx*ny*nz);
SPz=lz*b*4*(nx*ny)-4*b*b*(nx*ny*nz);
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
rez.innerHTML+='Отношение a [м] к ширине отверстия b [м] a/b = '+ab+'<br>';
rez.innerHTML+='Плотность вещества кубита &#961 = '+ro+'  [кг/м<sup>3</sup>]<br>';
rez.innerHTML+='<br><br><div style="height:25px; border:1px solid; width:100%"><br><br>';
rez.innerHTML+=dorez;

}
