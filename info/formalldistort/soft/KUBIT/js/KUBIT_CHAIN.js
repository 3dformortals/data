function china_generator(){
// вх
var d=parseFloat(document.getElementById('izd').value); //диаметр звена цепи
var ld=parseFloat(document.getElementById('ild').value); //отношение длины звена [м] к диаметру звена [м] 
var shagd=parseFloat(document.getElementById('ishagd').value); //отношение расстояния между цепями [м] одной пластины к диаметру сечения звена [м]
var distd=parseFloat(document.getElementById('idistd').value); //отношение дистанции между пластинами [м] к диаметру сечения звена [м]
var zv=parseFloat(document.getElementById('izv').value); //число звеньев цепи
var ch=parseFloat(document.getElementById('ich').value); //число цепей в пластине
var pl=parseFloat(document.getElementById('ipl').value); //число пластин
var ro=parseFloat(document.getElementById('iro').value); //плотность вещества из которого состоит звено KUBIT-CHINA кг/(м^3)

//вычисляемые
var nZ=0; //число звеньев KUBIT-CHINA
var l=0; //длина ребра KUBIT-CHINA
var shag; //шаг между цепями
var dist; //дистанция между слоями

var SZ; //площадь звена цепи
var SZK; //площадь звеньев KUBIT-CHINA
var SPov; //площадь поверхности KUBIT-CHINA
var SPro; //площадь пропускания KUBIT-CHINA
var SPG; //площадь пропускания грани звена цепи
var SGab; //габаритная площадь

var VZ; //объем звена цепи
var VG; //габаритный объем KUBIT-CHINA
var VK; //объем KUBIT-CHINA

var MK; //масса KUBIT-CHINA

			if(zv>0){
	
l=ld*d;
shag=shagd*d;
dist=distd*d;
SZ=Math.PI*Math.PI*2*d*d+Math.PI*2*d*l;
VZ=Math.PI*d*d/4*(Math.PI*2*d+2*l);
nZ=zv*ch*pl;
SZK=VZ*nZ;
VG=(d*3+l+(d+l)*(zv-1))*(d*3*ch+shag*(ch-1))*(d*3*pl+dist*(pl-1));
SGab=(d*3+l+(d+l)*(zv-1))*(d*3*ch+shag*(ch-1))*2+(d*3*ch+shag*(ch-1))*(d*3*pl+dist*(pl-1))*2+(d*3+l+(d+l)*(zv-1))*(d*3*pl+dist*(pl-1))*2;
if((zv%2)==0){
VK=VZ*nZ+Math.PI*d*d/4*(d*3*ch+shag*(ch-1))*pl+Math.PI*d*d/4*(d*3*pl+dist*(pl-1))*ch;
SPov=SZ*nZ+2*Math.PI*d*d/4+Math.PI*d*(d*3*ch+shag*(ch-1))*pl+2*Math.PI*d*d/4+Math.PI*d*(d*3*pl+dist*(pl-1))*ch;
SPro=(d*3+l+(d+l)*(zv-1))*(d*3*ch+shag*(ch-1))-(d*l-d*d)*zv/2*ch-((Math.PI*3*d*3*d/4+3*d*l)-(Math.PI*d*d/4+d*l)-(Math.PI*d*d/2))*zv/2*ch-((d*3+l+(d+l)*(zv-1))*d-d*d*ch) +(d*3+l+(d+l)*(zv-1))*(d*3*pl+dist*(pl-1))-(d*l-d*d)*zv/2*pl-((Math.PI*3*d*3*d/4+3*d*l)-(Math.PI*d*d/4+d*l)-(Math.PI*d*d/2))*zv/2*pl - ((d*3*pl+dist*(pl-1))*d-d*d*pl) +(d*3*ch+shag*(ch-1))*(d*3*pl+dist*(pl-1))-  (d*3*ch+shag*(ch-1))*d*pl - ((d*3*pl+dist*(pl-1))*d*ch-d*d*ch*pl)
}
else{
VK=VZ*nZ+Math.PI*d*d/4*(d*3*ch+shag*(ch-1))*pl*2;
SPov=SZ*nZ+(2*Math.PI*d*d/4+Math.PI*d*(d*3*ch+shag*(ch-1)))*pl*2
SPro = (d*3+l+(d+l)*(zv-1))*(d*3*ch+shag*(ch-1))-(d*l-d*d)*((zv-1)/2+1)*ch-((Math.PI*3*d*3*d/4+3*d*l)-(Math.PI*d*d/4+d*l)-(Math.PI*d*d/2))*((zv-1)/2)*ch-((d*3+l+(d+l)*(zv-1))*d-d*d*ch)+(d*3+l+(d+l)*(zv-1))*(d*3*pl+dist*(pl-1))-(d*l-d*d)*((zv-1)/2)*pl-((Math.PI*3*d*3*d/4+3*d*l)-(Math.PI*d*d/4+d*l)-(Math.PI*d*d/2))*((zv-1)/2+1)*pl+(d*3*ch+shag*(ch-1))*(d*3*pl+dist*(pl-1))-(d*3*ch+shag*(ch-1))*d*pl-(d*d+Math.PI*d*d/4)*ch*pl
};

MK=VK*ro;



				};
//alert(SPov);
// печать результатов
var dorez = document.getElementById('result').innerHTML;
resetresult('result');
var rez = document.getElementById('result');

rez.innerHTML+='<b>Материальная площадь поверхности KUBIT-CHINA S<sub>пов</sub> = '+SPov+' [м<sup>2</sup>]</b><br>';
rez.innerHTML+='Площадь поверхности габаритного объема KUBIT-CHINA S<sub>габ</sub> = '+SGab+' [м<sup>2</sup>]<br>';
rez.innerHTML+='<i>Кратность увеличения площади S<sub>пов</sub>/S<sub>габ</sub> = '+SPov/SGab+'</i><br>';
rez.innerHTML+='<b>Масса KUBIT-CHINA m = '+MK+' [кг]</b><br>';
rez.innerHTML+='Масса(возможная) габаритного объема сплошного вещества m<sub>габ</sub> = '+VG*ro+' [кг]<br>';
rez.innerHTML+='<i>Кратность уменьшения массы  m<sub>габ</sub>/m = '+VG*ro/MK+'</i><br>';
rez.innerHTML+='длина цилиндрической части звена цепи = '+l+' [м]<br>';
rez.innerHTML+='<b>Габаритный объем KUBIT-CHINA V<sub>габ</sub> = '+VG+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<b>Длина KUBIT-CHINA GREEN<sub>line</sub> = '+(d*3*ch+shag*(ch-1))+' [м]</b><br>';
rez.innerHTML+='<b>Ширина KUBIT-CHINA GOLD<sub>line</sub> = '+(d*3*pl+dist*(pl-1))+' [м]</b><br>';
rez.innerHTML+='<b>Высота KUBIT-CHINA BLUE<sub>line</sub> = '+(d*3+l+(d+l)*(zv-1))+' [м]</b><br>';
rez.innerHTML+='<b>Материальный объем KUBIT-CHINA V<sub>вещества</sub> = '+VK+' [м<sup>3</sup>]</b><br>';
rez.innerHTML+='<i>Кратность уменьшения объема V<sub>габ</sub>/V<sub>вещества</sub> = '+VG/VK+'</i><br>';
rez.innerHTML+='Объем незанятый веществом V<sub>незанятый</sub> = '+VG-VK+' [м<sup>3</sup>]<br>';
rez.innerHTML+='Число звеньев цепи KUBIT-CHINA N<sub>звеньев</sub> = '+nZ+'<br>';
rez.innerHTML+='Шаг между цепями KUBIT-CHINA T<sub>цепей</sub> = '+shag+' [м]<br>';
rez.innerHTML+='Дистанция между пластинами KUBIT-CHINA D<sub>пластин</sub> = '+dist+' [м]<br>';
rez.innerHTML+='Площадь пропускания KUBIT-CHINA SPro = '+SPro+' [м<sup>2</sup>]<br>';
rez.innerHTML+='Отношение площади пропускания к габаритной площади SPro/SGab<sub>пластин</sub> = '+2*SPro/SGab+'<br>';

rez.innerHTML+='<b>Вход:</b><br>';
rez.innerHTML+='Диаметр сечения звена цепи d = '+d+' [м]<br>';
rez.innerHTML+='Отношение длины звена [м] к диаметру звена [м] l/d = '+ld+'<br>';
rez.innerHTML+='Отношение расстояния между цепями [м] одной пластины к диаметру сечения звена [м] shag/d = '+shagd+'<br>';
rez.innerHTML+='Отношение дистанции между пластинами [м] к диаметру сечения звена [м] dist/d = '+distd+'<br>';
rez.innerHTML+='Число звеньев в цепи zv = '+zv+'<br>';
rez.innerHTML+='Число цепей в пластине ch = '+ch+'<br>';
rez.innerHTML+='Число пластин pl = '+pl+'<br>';
rez.innerHTML+='Плотность вещества KUBIT-CHINA &#961 = '+ro+'  [кг/м<sup>3</sup>]<br>';
rez.innerHTML+='<br><br><div style="height:25px; border:1px solid; width:100%"><br><br>';
rez.innerHTML+=dorez;

}
