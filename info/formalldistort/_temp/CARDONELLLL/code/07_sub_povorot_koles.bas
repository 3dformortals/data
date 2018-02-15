Attribute VB_Name = "Sub_povorot_koles"
Sub povorot_koles(X_cm,Y_cm,Z_cm,X_ko(),Y_ko(),Z_ko(),pplko_P1(),pplko_P2(),pplko_P3(),A_ko(),B_ko(),C_ko(),D_ko())

dim ugol_kurs#,T#,X_rul1#,Y_rul1#,Z_rul1#,ugol_ko#,Y_kursa#

T=D_cm_rul*cosLL(AoX,BoX,CoX,A3,B3,C3)/A3
X_rul = X_cm + T*A3
Y_rul = Y_cm + T*B3
Z_rul = Z_cm + T*C3
rem определение т rul

T=1000*cosLL(AoZ,BoZ,CoZ,A1,B1,C1)/C1
X_rul1 = X_rul + T*A1
Y_rul1 = Y_rul + T*B1
Z_rul1 = Z_rul + T*C1
rem определение т rul1

call ABCD_P(X_rul,Y_rul,Z_rul,X_rul1,Y_rul1,Z_rul1,X_kurs,Y_kurs,Z_kurs,A_kurs,B_kurs,C_kurs,D_kurs)
rem определили ABCD плоскости kurs

ugol_kurs = abs(acos((A_kurs*A2 + B_kurs*B2 + C_kurs*C2)/((A_kurs^2 + B_kurs^2 + C_kurs^2)^0.5*(A2^2 + B2^2 + C2^2)^0.5)))
rem угол курса

if ugol_kurs<=ugol_ko_max then: ugol_ko=ugol_kurs
else: ugol_ko = ugol_ko_max
end if
rem угол колеса

Y_kursa = -(A2*X_kurs+C2*Z_kurs+D2)/B2
rem координата точки плоскости P2 и прямой параллельной oY и проходящей через kurs
    if Y_kursa >Y_kurs then

napravo=1: nalevo=0
for i = 1 to n_ko_reg_p
if ugol_povorot_pravo(i,1)<=ugol_ko & ugol_povorot_pravo(i,2)>ugol_ko then
T=(((pplko_P3(ugol_povorot_pravo(i,0))-D_cm_rul*(ko_do_cm(ugol_povorot_pravo(i,0))))/cos(ugol_ko))^2-(pplko_P3(ugol_povorot_pravo(i,0))-D_cm_rul*(ko_do_cm(ugol_povorot_pravo(i,0))))^2)^0.5*cosLL(AoY,BoY,CoY,A2,B2,C2)/B2
X_pov=X_rul+T*A2: Y_pov=Y_rul+T*B2: Z_pov=Z_rul+T*C2
end if
next i

    elseif Y_kursa <Y_kurs then

nalevo=1: napravo=0
for i = 1 to n_ko_reg_l
if ugol_povorot_levo(i,1)<=ugol_ko & ugol_povorot_levo(i,2)>ugol_ko then
T=(-1)*(((pplko_P3(ugol_povorot_levo(i,0))-D_cm_rul*(ko_do_cm(ugol_povorot_levo(i,0))))/cos(ugol_ko))^2-(pplko_P3(ugol_povorot_levo(i,0))-D_cm_rul*(ko_do_cm(ugol_povorot_levo(i,0))))^2)^0.5*cosLL(AoY,BoY,CoY,A2,B2,C2)/B2
X_pov=X_rul+T*A2
Y_pov=Y_rul+T*B2
Z_pov=Z_rul+T*C2
end if
next i

    else

nalevo=0: napravo=0
X_pov=X_rul
Y_pov=Y_rul
Z_pov=Z_rul

    end if
rem направо или налево+координата точки pov первичного колеса отсчета поворота

for i = 1 to n_ko
call ABCD_P(X_pov,Y_pov,Z_pov,X_op(i),Y_op(i),Z_op(i),X_ko(i),Y_ko(i),Z_ko(i),A_ko(i),B_ko(i),C_ko(i),D_ko(i))
next i
rem получили ABCD колес (ko)

end sub
