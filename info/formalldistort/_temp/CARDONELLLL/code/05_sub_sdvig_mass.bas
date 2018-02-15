Attribute VB_Name = "Sub_sdvig_mass"
Sub sdvig_mass(X_cm,Y_cm,Z_cm,X_prod,Y_prod,Z_prod,X_pop,Y_pop,Z_pop _
,d_S_o1,d_S_o2,d_S_o3,d_a_o1,d_a_o2,d_a_o3, _
X_ko(),Y_ko(),Z_ko(),znak_P1(),znak_P2(),znak_P3(),pplko_P1(),pplko_P2(),pplko_P3(),S_amo(),PRO_amo(),d_S_ko(),X_op(),Y_op(),Z_op())

dim m#,n#,p#,m1#,n1#,p1#,m2#,n2#,p2#,m3#,n3#,p3#,T#,i#,D_cm_ko#,D_op_ko#,D_cm_prod0#,D_cm_H#,D_H_prod#,D_cm_pop0#,D_H_pop#

rem реализация линейных перемещений
rem вертикальное перемещение вдоль оси o1
T=d_S_o1
X_cm = X_cm + T*A1
Y_cm = Y_cm + T*B1
Z_cm = Z_cm + T*C1
X_pop = X_pop + T*A1
Y_pop = Y_pop + T*B1
Z_pop = Z_pop + T*C1
X_prod = X_prod + T*A1
Y_prod = Y_prod + T*B1
Z_prod = Z_prod + T*C1
rem поперечное перемещение вдоль оси o2
T=d_S_o2
X_cm = X_cm + T*A2
Y_cm = Y_cm + T*B2
Z_cm = Z_cm + T*C2
X_pop = X_pop + T*A2
Y_pop = Y_pop + T*B2
Z_pop = Z_pop + T*C2
X_prod = X_prod + T*A2
Y_prod = Y_prod + T*B2
Z_prod = Z_prod + T*C2
rem продольное перемещение вдоль оси o3
T=d_S_o3
X_cm = X_cm + T*A3
Y_cm = Y_cm + T*B3
Z_cm = Z_cm + T*C3
X_pop = X_pop + T*A3
Y_pop = Y_pop + T*B3
Z_pop = Z_pop + T*C3
X_prod = X_prod + T*A3
Y_prod = Y_prod + T*B3
Z_prod = Z_prod + T*C3

rem реализация угловых перемещений
rem для углового перемещения вокруг оси o1 (горизонтальное угловое перемещение)
D_cm_prod0=1000
D_cm_H = D_cm_prod0*cos(d_a_o1*180/pi)
D_H_prod = (D_cm_prod0^2-D_cm_H^2)^0.5
T=D_cm_H
X_H = X_cm + T*A3
Y_H = Y_cm + T*B3
Z_H = Z_cm + T*C3

T=D_H_prod
X_prod = X_H + T*A2
Y_prod = Y_H + T*B2
Z_prod = Z_H + T*C2
call ABCD_PPP(X_cm,Y_cm,Z_cm,X_prod,Y_prod,Z_prod,X_pop,Y_pop,Z_pop)

rem для углового перемещения вокруг оси o2 (продольное угловое перемещение)
D_cm_H = D_cm_prod0*cos(d_a_o2*180/pi)
D_H_prod = (D_cm_prod0^2-D_cm_H^2)^0.5
T=D_cm_H
X_H = X_cm + T*A3
Y_H = Y_cm + T*B3
Z_H = Z_cm + T*C3

T=D_H_prod
X_prod = X_H + T*A1
Y_prod = Y_H + T*B1
Z_prod = Z_H + T*C1
call ABCD_PPP(X_cm,Y_cm,Z_cm,X_prod,Y_prod,Z_prod,X_pop,Y_pop,Z_pop)

rem для углового перемещения вокруг оси o3 (поперечное угловое перемещение)
D_cm_pop0=1000
D_cm_H = D_cm_pop0*cos(d_a_o3*180/pi)
D_H_pop = (D_cm_pop0^2-D_cm_H^2)^0.5
T=D_cm_H
X_H = X_cm + T*A2
Y_H = Y_cm + T*B2
Z_H = Z_cm + T*C2

T=D_H_pop
X_pop = X_H + T*A1
Y_pop = Y_H + T*B1
Z_pop = Z_H + T*C1
call ABCD_PPP(X_cm,Y_cm,Z_cm,X_prod,Y_prod,Z_prod,X_pop,Y_pop,Z_pop)

rem реализация перемещений масс колес

for i = 1 to n_ko

rem двигает точку от cm до op
T = D_prod_cm_op(i)*op_do_cm(i)
X_op(i) = X_cm + T*A3
Y_op(i) = Y_cm + T*B3
Z_op(i) = Z_cm + T*C3

T = D_pop_cm_op(i)*op_levee_cm(i)
X_op(i) = X_op(i) + T*A2
Y_op(i) = Y_op(i) + T*B2
Z_op(i) = Z_op(i) + T*C2


T = D_vert_cm_op(i)*op_vblwe_cm(i)
X_op(i) = X_op(i) + T*A1
Y_op(i) = Y_op(i) + T*B1
Z_op(i) = Z_op(i) + T*C1

rem вычисляет точку ko
PRO_amo(i) = PRO_amo(i)+d_S_ko(i)
D_op_ko(i) = S_amo(i)-PRO_amo(i)
T = D_op_ko(i)*(-1)
X_ko(i) = X_op(i) + T*A1
Y_ko(i) = Y_op(i) + T*B1
Z_ko(i) = Z_op(i) + T*C1

next i

end sub
