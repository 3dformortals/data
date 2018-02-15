Attribute VB_Name = "sub_razmerbl"
sub razmerbl()

Set DOCELL_GLA = Workbooks("CARDONELLLL.xls").Worksheets( "ГЛАВНАЯ")
Set DOCELL_DSU = Workbooks("CARDONELLLL.xls").Worksheets( "НАБОР_ДСУ")
Set DOCELL_KOL = Workbooks("CARDONELLLL.xls").Worksheets( "НАБОР_КОЛЕС")
Set DOCELL_AMO = Workbooks("CARDONELLLL.xls").Worksheets( "НАБОР_АМОРТИЗАТОРОВ")
Set DOCELL_KOR = Workbooks("CARDONELLLL.xls").Worksheets( "НАБОР_КОРПУСОВ")
Set DOCELL_NABDOR = Workbooks("CARDONELLLL.xls").Worksheets( "НАБОР_ДОРОГ")
Set DOCELL_MATDOR = Workbooks("CARDONELLLL.xls").Worksheets( "МАТЕРИАЛЫ_ДОРОГ")
Set DOCELL_NER = Workbooks("CARDONELLLL.xls").Worksheets( "НАБОР_НЕРОВНОСТЕЙ")
rem ссылки на листы в рабочей книге

call VXOD_GLA()
rem входные данные с листа"ГЛАВНАЯ"

call VXOD_DSU()
rem входные данные с листа"НАБОР_ДСУ"

call VXOD_KOL()
rem входные данные с листа"НАБОР_КОЛЕС"

call VXOD_AMO()
rem входные данные с листа"НАБОР_АМОРТИЗАТОРОВ"

call VXOD_KOR()
rem входные данные с листа"НАБОР_КОРПУСОВ"

call VXOD_NABDOR()
rem входные данные с листа"НАБОР_ДОРОГ"
rem входные данные с листа"МАТЕРИАЛЫ_ДОРОГ"
rem входные данные с листа"НАБОР_НЕРОВНОСТЕЙ"

redim R_kat_0(n_ko)
redim R_kat(n_ko)

redim X_op#(n_ko),Y_op#(n_ko),Z_op#(n_ko),X_ko#(n_ko),Y_ko#(n_ko),Z_ko#(n_ko),X_ko_0#(n_ko),Y_ko_0#(n_ko),Z_ko_0#(n_ko)
redim D_vert_cm_op#(n_ko),D_pop_cm_op#(n_ko),D_prod_cm_op#(n_ko)



rem образмеривание массивов для вращения колеса


X_cm= zadok+1

if del_Y_kurs>0 then
    Y_cm = 2*abs(pravobok)
elseif del_Y_kurs=0 
    Y_cm = 2*abs(pravobok)
elseif del_Y_kurs<0 
    Y_cm = abs(del_Y_kurs)+2*abs(pravobok)
end if

Y_kurs=Y_cm+del_Y_kurs

redim ko_vblwe_cm(n_ko)
posadka=0
for i = 1 to n_ko
    if del_Z_ko(i)<0 then
        ko_vblwe_cm=-1
    elseif del_Z_ko(i)=0 then
        ko_vblwe_cm=0
    elseif del_Z_ko(i)>0 then
        ko_vblwe_cm=1
    end if
    
    if del_Z_ko(i)<0 and del_Z_ko(i)<posadka then posadka = del_Z_ko(i)

next i

Z_cm=abs(posadka)+1
rem начальное положение cm

for i = 1 to n_ko

    X_ko(i)=X_cm+del_X_ko(i)
    Y_ko(i)=Y_cm+del_Y_ko(i)
    Z_ko(i)=Z_cm+del_Z_ko(i)

next i
rem начальное положение ko

rem определение размеров для redim

redim n_dS_kon(n_ko),S_kon(n_ko)

dim n_dS_kon_do#
n_dS_kon_do=0
for i = 1 to n_ko
    n_dS_kon(i)=(dik8(i)+2)*(2*Rwin_geom(i)+2)*2
    if n_dS_kon(i)>n_dS_kon_do then
        redim dR_kat(n_dS_kon(i),n_ko), dPRO_win_rad(n_dS_kon(i),n_ko)
        n_dS_kon_do=n_dS_kon(i)
    end if
next i
rem образмериваем элементарные радиусы и прогибы



redim POLE(n_ko)
for i = 1 to n_ko
POLE(i)=FIX((dik8(i)^2+R_win(i)^2)^0.5+1)
next i

D_cm_rul = del_X_rul

rem однократное вычисление

for i = 1 to n_ko
D_vert_cm_op(i)=abs(Z_op(i) - Z_cm)
D_pop_cm_op(i)=abs(Y_op(i) - Y_cm)
D_prod_cm_op(i)=abs(X_op(i) - X_cm)
next i
rem однократное вычисление

redim ko_do_cm(n_ko)
for i = 1 to n_ko
    if X_ko(i)>X_cm then
        ko_do_cm(i)=1
    elseif X_ko(i)<X_cm then
        ko_do_cm(i)=-1
    else
        ko_do_cm(i)=0
    end if
next i
rem однокр просчет нах.кол. до cm или после

redim ko_levee_cm(n_ko)
for i = 1 to n_ko
    if Y_ko(i)>Y_cm then
        ko_levee_cm(i)=1
    elseif Y_ko(i)<Y_cm then
        ko_levee_cm(i)=-1
    else
        ko_levee_cm(i)=0
    end if
next i
rem однокр просчет нах.кол. левее cm (+1) или правее (-1)

X_rul= X_cm + del_X_rul
Y_rul= Y_cm
Z_rul= Z_cm

redim ko_do_rul(n_ko)
for i = 1 to n_ko
    if X_ko(i)>X_rul then
        ko_do_rul(i)=1
    elseif X_ko(i)<X_rul then
        ko_do_rul(i)=-1
    else
        ko_do_rul(i)=0
    end if
next i
rem однократный простчет нах.кол до rul или после rul точки нулевой поворачиваемости колес


redim op_vblwe_cm(n_ko)
for i = 1 to n_ko
    if Z_op(i)>Z_cm then
        op_vblwe_cm(i)=1
    elseif Z_op(i)<Z_cm then
        op_vblwe_cm(i)=-1
    else
        op_vblwe_cm(i)=0
    end if
next i
rem однокр просчет нах.опора выше cm или ниже

call rulevoe(X_rul,Y_rul,Z_rul,X_ko(),Y_ko(),Z_ko())
rem однократный просчет параметров регулирующих поворот колес

call poexali()
rem прозвон в основную программу расчета-сделать условный, для режимов движения

end sub
