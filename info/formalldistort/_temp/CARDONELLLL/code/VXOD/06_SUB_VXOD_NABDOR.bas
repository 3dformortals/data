Attribute VB_Name = "Sub_VXOD_NABDOR"
Sub VXOD_NABDOR()

dim Z_last#,i#,j#,n_seg#

n_seg=0
do while val(DOCELL_NABDOR.CELLS(DOROGA*5-4,n_seg+1).value) = 1 and n_seg+1<=256 or val(DOCELL_NABDOR.CELLS(DOROGA*5-4,n_seg+1).value) = 0 and n_seg+1<=256
n_seg=n_seg+1
loop

redim tip_seg(n_seg)
redim lin_seg(n_seg)
redim par_seg(n_seg)

for i = 1 to n_seg

tip_seg(i)=val(DOCELL_NABDOR.CELLS(DOROGA*5-4,i).value)
lin_seg(i)=val(DOCELL_NABDOR.CELLS(DOROGA*5-3,i).value)
par_seg(i)=val(DOCELL_NABDOR.CELLS(DOROGA*5-2,i).value)

next i

X_tra=0

call NASTART()
rem вычисление и добавление горизонтальной площадки до и после координат трассы(на ней условно располагается авто в момент старта)

Z_last=0
if n_seg>0 then
    for j = 1 to n_seg
    
        if tip_seg(j) = 1 then
        
            for i = 1 to abs(lin_seg(j))
            
                X_tra=X_tra+1
                redim preserve Z_tra(X_tra)
                call VXOD_MATDOR(j)
                Z_tra(X_tra)=Z_last+i*tan(par_seg(j))
            
            next i
            Z_last=Z_tra(X_tra)
        
        elseif tip_seg(j)=0 and lin_seg(j) <0 then
        
            for i = 1 to abs(lin_seg(j))
            
                X_tra=X_tra+1
                redim preserve Z_tra(X_tra)
                call VXOD_MATDOR(j)
                Z_tra(X_tra)=Z_last+par_seg(j)*(1-(abs(lin_seg(j))-i)^2/lin_seg(j)^2)^0.5
            
            next i
            Z_last=Z_tra(X_tra)
        
        elseif tip_seg(j)=0 and lin_seg(j) >0 then
        
            for i = 1 to abs(lin_seg(j))
            
                X_tra=X_tra+1
                redim preserve Z_tra(X_tra)
                call VXOD_MATDOR(j)
                Z_tra(X_tra)=Z_last-(par_seg(j)-par_seg(j)*(1-i^2/lin_seg(j)^2)^0.5)
            
            next i
            Z_last=Z_tra(X_tra)
        
        end if
    
    next j
end if
rem наполнение массива координатами высоты дороги без неровностей и установка материала участков дороги

call VXOD_NER()
rem добавление к координатам высоты дороги высоты неровностей

call NAFINISH()
rem вычисление и добавление горизонтальной площадки до и после координат трассы(на ней условно располагается авто после финиша)

END SUB

Sub NASTART()

dim i#

redim del_X_ko(n_ko)
redim del_Y_ko(n_ko)
redim del_Z_ko(n_ko)

zadok =0
peredok=0
levobok=0
pravobok=0

for i = 1 to n_ko

    if del_X_ko(i)+Rwin_geom(i)>peredok then peredok=del_X_ko(i)+Rwin_geom(i)
    if del_X_ko(i)-Rwin_geom(i)<zadok then zadok=del_X_ko(i)-Rwin_geom(i)

next i

X_tra= zadok+peredok+2
redim Z_tra(X_tra)

for i = 1 to X_tra
    Z_tra(i)=0
next i

for i = 1 to n_ko

    if del_Y_ko(i)+Rwin_geom(i)>levobok then levobok=del_Y_ko(i)+Rwin_geom(i)
    if del_Y_ko(i)-Rwin_geom(i)<pravobok then pravobok=del_Y_ko(i)-Rwin_geom(i)

next i

END SUB

Sub NAFINISH()

redim preserve Z_tra(X_tra+zadok+peredok+2)

for i = X_tra to X_tra+zadok+peredok+2
    Z_tra(i)=Z_tra(X_tra)
next i

X_kurs=X_tra+zadok+peredok+2
Z_kurs=Z_tra(X_tra)

END SUB
