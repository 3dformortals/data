Attribute VB_Name = "Sub_F_win_rad"
Sub F_win_rad(Xcm,Ycm,Zcm,Ako(),Bko(),Cko(),Xko(),Yko(),Zko(),Xop(),Yop(),Zop(),p1(),p2(),p3(),dPRO_win_rad(), _
F_win_rad_vert(),F_win_rad_pop(),F_win_rad_prod(), _
M_win_rad_pop(),M_win_rad_prod(),M_win_rad_gor_pop(),M_win_rad_gor_prod(), _
F_win_rad_cm_vert(),F_win_rad_cm_pop(),F_win_rad_cm_prod())

dim AdS#,BdS#,CdS#,DdS#

for j = 1 to n_ko
if n_dS_kon(j)>0 then
for i = 1 to n_dS_kon(j)

call ABCD_P(dS_kon(1,i,j),dS_kon(2,i,j),dS_kon(3,i,j),dS_kon(4,i,j),dS_kon(5,i,j),dS_kon(6,i,j),dS_kon(7,i,j),dS_kon(8,i,j),dS_kon(9,i,j),AdS,BdS,CdS,DdS)
sin_P_dS_P_ko = abs(sin(acos((AdS*Ako(j) + BdS*Bko(j) + CdS*Cko(j))/((AdS^2 + BdS^2 + CdS^2)^0.5*(Ako(j)^2 + Bko(j)^2 + Cko(j)^2)^0.5))))

X_dS1=dS_kon(1,i,j)
Y_dS1=dS_kon(2,i,j)
Z_dS1=dS_kon(3,i,j)
X_dS2=dS_kon(4,i,j)
Y_dS2=dS_kon(5,i,j)
Z_dS2=dS_kon(6,i,j)
X_dS3=dS_kon(7,i,j)
Y_dS3=dS_kon(8,i,j)
Z_dS3=dS_kon(9,i,j)
X_dS = dS_kon(10,i,j)
Y_dS = dS_kon(11,i,j)
Z_dS = dS_kon(12,i,j)

T_dS1 = (Ako(j)*(X_dS1-Xko(j))+Bko(j)*(Y_dS1-Yko(j))+Cko(j)*(Z_dS1-Zko(j)))/(Ako(j)^2+Bko(j)^2+Cko(j)^2)
X_dS1_L_ko = Xko(j) + T_dS1*Ako(j): Y_dS1_L_ko = Yko(j) + T_dS1*Bko(j): Z_dS1_L_ko = Zko(j) + T_dS1*Cko(j)
T_dS2 = (Ako(j)*(X_dS2-Xko(j))+Bko(j)*(Y_dS2-Yko(j))+Cko(j)*(Z_dS2-Zko(j)))/(Ako(j)^2+Bko(j)^2+Cko(j)^2)
X_dS2_L_ko = Xko(j) + T_dS2*Ako(j): Y_dS2_L_ko = Yko(j) + T_dS2*Bko(j): Z_dS2_L_ko = Zko(j) + T_dS2*Cko(j)
T_dS3 = (Ako(j)*(X_dS3-Xko(j))+Bko(j)*(Y_dS3-Yko(j))+Cko(j)*(Z_dS3-Zko(j)))/(Ako(j)^2+Bko(j)^2+Cko(j)^2)
X_dS3_L_ko = Xko(j) + T_dS3*Ako(j): Y_dS3_L_ko = Yko(j) + T_dS3*Bko(j): Z_dS3_L_ko = Zko(j) + T_dS3*Cko(j)
X_dS_L_ko = (X_dS1_L_ko+X_dS2_L_ko+X_dS3_L_ko)/3
Y_dS_L_ko = (Y_dS1_L_ko+Y_dS2_L_ko+Y_dS3_L_ko)/3
Z_dS_L_ko = (Z_dS1_L_ko+Z_dS2_L_ko+Z_dS3_L_ko)/3

cos_L_dPRO_win_rad_L_ko_vert = abs(((X_dS_L_ko-X_dS)*A1 + (Y_dS_L_ko-Y_dS)*B1 + (Z_dS_L_ko-Z_dS)*C1)/(((X_dS_L_ko-X_dS)^2 + (Y_dS_L_ko-Y_dS)^2 + (Z_dS_L_ko-Z_dS)^2)^0.5*(A1^2 + B1^2 + C1^2)^0.5))
cos_L_dPRO_win_rad_L_ko_pop = abs(((X_dS_L_ko-X_dS)*A2 + (Y_dS_L_ko-Y_dS)*B2 + (Z_dS_L_ko-Z_dS)*C2)/(((X_dS_L_ko-X_dS)^2 + (Y_dS_L_ko-Y_dS)^2 + (Z_dS_L_ko-Z_dS)^2)^0.5*(A2^2 + B2^2 + C2^2)^0.5))
cos_L_dPRO_win_rad_L_ko_prod = abs(((X_dS_L_ko-X_dS)*A3 + (Y_dS_L_ko-Y_dS)*B3 + (Z_dS_L_ko-Z_dS)*C3)/(((X_dS_L_ko-X_dS)^2 + (Y_dS_L_ko-Y_dS)^2 + (Z_dS_L_ko-Z_dS)^2)^0.5*(A3^2 + B3^2 + C3^2)^0.5))

dF_win_rez = dPRO_win_rad(i,j)*dS_kon(0,i,j)^2*C_win_rad(j)*sin_P_dS_P_ko

dF_win_rez_vert = dF_win_rez*cos_L_dPRO_win_rad_L_ko_vert*znak_F_rad_vert(Z_dS,Zko(j))
dF_win_rez_pop = dF_win_rez*cos_L_dPRO_win_rad_L_ko_pop*znak_F_rad_pop(X_dS,Y_dS,Z_dS,AdS,BdS,CdS,Xko(j),Yko(j),Zko(j),Ako(j),Bko(j),Cko(j),ko_do_rul(j))
dF_win_rez_prod = dF_win_rez*cos_L_dPRO_win_rad_L_ko_prod*znak_F_rad_prod(X_dS,Y_dS,Z_dS,AdS,BdS,CdS,Xko(j),Yko(j),Zko(j),Ako(j),Bko(j),Cko(j))

rem большой кусок вставить давление воздуха в шине

rem начальные условия:
rem P_NAK(j), V_NAK(j), T_NAK(j)...

T_NAK(j) = P_NAK(j) * V_NAK(j) * Mr_air/(m_air(j) * R_gaz)
const_PV(j) = P_NAK(j) * V_NAK(j)

V_NAK(j) = PI * (dis7(j)^2 - dis6(j)^2) * dis21(j)
V_PROGIB(j) = PI * (dis7(j)^2 - (dis7(j) - PRO_win_rad(j))^2) * a_box(j)/(R_win(j) * 2 * PI) * dis21(j)

V_int(j) = V_NAK(j) - V_PROGIB(j)
P_int(j) = const_PV(j)/V_int(j)
del_A_int(j) = del_PRO_win_rad(j) * (S_kon_0(j) + S_kon(j)) * 0.5 * (P_int_0(j) + P_int(j)) * 0.5

o_rho_int(j) = 356.99 * T_NAK(j)^ - 1 * P_int(j)/P_oc
n_int(j) = o_rho_int(j) * Na_xim/Mr_air

o_rho_oc = 356.99 * T_oc^ - 1
n_oc = o_rho_oc * Na_xim/Mr_air

rem обмен энергией между окружающей средой и камерой
rem abs(del_T_OBMEN(j)) = 0 then E_OBMEN(j) совершается на 0%
rem abs(del_T_OBMEN(j)) = большей из температур then E_OBMEN(j) совершается на 100%
E_OBMEN(j) = abs(P_int(j) * V_OBMEN_int(j) - P_oc * V_OBMEN_oc(j))

del_T_OBMEN(j) = T_oc - T_int(j)

if del_T_OBMEN(j) > 0 then
OBMEN(j) = abs(del_T_OBMEN(j))/T_oc
else
OBMEN(j) = abs(del_T_OBMEN(j))/T_int(j)
end if

rem время необходимое для полного обмена энергией обмена

BEG_oc = 1/(2^0.5 * GAZ_air * n_oc)
BEG_int(j) = 1/(2^0.5 * GAZ_air * n_int(j))

V_gaz_oc = (3 * R_gaz * T_oc/Mr_air)^0.5
V_gaz_int(j) = (3 * R_gaz * T_int(j)/Mr_air)^0.5
V_gaz_oba(j) = (3 * R_gaz * T_wina(j)/Mr_air)^0.5

select case TIP_WIN(j) 
case 0
DLINA(j) = 0
S_oc_air(j) = (2 * PI * (R_win(j)^2 - dis0(j)^2) + 2 * PI * R_win(j) * dik8(j)) * (1 - a_box(j)/(R_win(j) * 2 * PI))
S_oc_tra(j) = (2 * PI * (R_win(j)^2 - dis0(j)^2) + 2 * PI * R_win(j) * dik8(j) * 2) * a_box(j)/(R_win(j) * 2 * PI) * 0.5
case 1
DLINA(j) = dik8(j)
S_oc_air(j) = PI * (dis1(j)^2 - dis0(j)^2) * 2 * (1 - a_box(j)/(R_win(j) * 2 * PI)) + GRIP(j) * (RIS_STEP(j) * R_win(j) + RIS_HIGH(j) * 2) * DLINA(j) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + (2 * PI * dis1(j) * dik8(j) - RIS_STEP(j) * dis1(j) * GRIP(j) * DLINA(j)) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + 2 * GRIP(j) * RIS_STEP(j) * (R_win(j)^2 - dis1(j)^2) * (1 - a_box(j)/(R_win(j) * 2 * PI))
S_oc_tra(j) = (PI * (dis1(j)^2 - dis0(j)^2) * 2 * a_box(j)/(R_win(j) * 2 * PI) + 2 * (GRIP(j) * (RIS_STEP(j) * R_win(j) + RIS_HIGH(j) * 2) * DLINA(j) * a_box(j)/(R_win(j) * 2 * PI) + (2 * PI * dis1(j) * dik8(j) - RIS_STEP(j) * dis1(j) * GRIP(j) * DLINA(j)) * a_box(j)/(R_win(j) * 2 * PI) + 2 * GRIP(j) * RIS_STEP(j) * (R_win(j)^2 - dis1(j)^2) * a_box(j)/(R_win(j) * 2 * PI))) * 0.5
case 2
DLINA(j) = ZMEJA(j)
S_oc_air(j) = PI * (dis1(j)^2 - dis0(j)^2) * 2 * (1 - a_box(j)/(R_win(j) * 2 * PI)) + GRIP(j) * (RIS_STEP(j) * R_win(j) + RIS_HIGH(j) * 2) * DLINA(j) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + (2 * PI * dis1(j) * dik8(j) - RIS_STEP(j) * dis1(j) * GRIP(j) * DLINA(j)) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + 2 * GRIP(j) * RIS_STEP(j) * (R_win(j)^2 - dis1(j)^2) * (1 - a_box(j)/(R_win(j) * 2 * PI))
S_oc_tra(j) = (PI * (dis1(j)^2 - dis0(j)^2) * 2 * a_box(j)/(R_win(j) * 2 * PI) + 2 * (GRIP(j) * (RIS_STEP(j) * R_win(j) + RIS_HIGH(j) * 2) * DLINA(j) * a_box(j)/(R_win(j) * 2 * PI) + (2 * PI * dis1(j) * dik8(j) - RIS_STEP(j) * dis1(j) * GRIP(j) * DLINA(j)) * a_box(j)/(R_win(j) * 2 * PI) + 2 * GRIP(j) * RIS_STEP(j) * (R_win(j)^2 - dis1(j)^2) * a_box(j)/(R_win(j) * 2 * PI))) * 0.5
end select
S_int_air(j) = (PI * (dis7(j)^2 - dis6(j)^2) * 2 + dis21(j) * 2 * PI * dis7(j)) * (1 - a_box(j)/(R_win(j) * 2 * PI))
S_int_tra(j) = ((PI * (dis7(j)^2 - dis6(j)^2) * 2 + dis21(j) * 2 * PI * dis7(j)) * a_box(j)/(R_win(j) * 2 * PI) + 2 * PI * (dis7(j) - PRO_win_rad(j)) * dis21(j) * a_box(j)/(R_win(j) * 2 * PI)) * 0.5
S_oc_int(j) = S_int_air(j) + S_int_tra(j) + S_oc_air(j) + S_oc_tra(j)

WINA(j) = (dik2(j) + dik7(j)) * ((2 * PI * dis1(j) * dik8(j) - RIS_STEP(j) * dis1(j) * GRIP(j) * DLINA(j) + 2 * GRIP(j) * AIR_STEP(j) * (dis1(j)^2 - dis7(j)^2)) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + (2 * PI * dis1(j) * dik8(j) - RIS_STEP(j) * dis1(j) * GRIP(j) * DLINA(j) + 2 * GRIP(j) * AIR_STEP(j) * (dis1(j)^2 - dis7(j)^2)) * (a_box(j)/(R_win(j) * 2 * PI)) + (2 * PI * dis7(j) * dis21(j) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + S_int_tra(j)) * V_air(j)/(V_ris(j) + V_air(j)))/S_oc_int(j)
ZACEP(j) = (dik1(j) + dik2(j) + dik7(j)) * (GRIP(j) * (RIS_STEP(j) * R_win(j) + RIS_HIGH(j) * 2 * DLINA(j)) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + 2 * GRIP(j) * RIS_STEP(j) * (R_win(j)^2 - dis7(j)^2) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + GRIP(j) * (RIS_STEP(j) * R_win(j) + RIS_HIGH(j) * 2) * DLINA(j) * (a_box(j)/(R_win(j) * 2 * PI)) + 2 * GRIP(j) * RIS_STEP(j) * (R_win(j)^2 - dis7(j)^2) * (a_box(j)/(R_win(j) * 2 * PI)) + (2 * PI * dis7(j) * dis21(j) * (1 - a_box(j)/(R_win(j) * 2 * PI)) + S_int_tra(j)) * V_ris(j)/(V_ris(j) + V_air(j)))/S_oc_int(j)
LKORD(j) = (dik10(j) + dik12(j)) * (PI * (dis7(j)^2 - dis0(j)^2) + PI * (dis7(j)^2 - dis6(j)^2)) * (1 - a_box(j)/(R_win(j) * 2 * PI))/S_oc_int(j)
RKORD(j) = (dik11(j) + dik13(j)) * (PI * (dis7(j)^2 - dis0(j)^2) + PI * (dis7(j)^2 - dis6(j)^2)) * (1 - a_box(j)/(R_win(j) * 2 * PI))/S_oc_int(j)
STENKA(j) = WINA(j) + ZACEP(j) + LKORD(j) + RKORD(j)

dt_OBMEN(j) = 2 * BEG_oc/V_gaz_oc + 2 * BEG_int(j)/V_gaz_int(j) + (STENKA(j) * o_rho_win(j) * o_rho_kam(j)/(o_rho_oc * o_rho_int(j)) * (S_oc_air(j) + S_int_air(j))/S_oc_int(j) + STENKA(j) * o_rho_win(j) * o_rho_kam(j)/(o_rho_tra * o_rho_int(j)) * (S_oc_tra(j) + S_int_tra(j))/S_oc_int(j))/V_gaz_oba(j)

del_A_oc_int(j) = dt/dt_OBMEN(j) * E_OBMEN(j) * OBMEN(j)

V_OBMEN_oc(j) = (S_oc_air(j) + S_oc_tra(j)) * BEG_oc
V_OBMEN_int(j) = (S_int_air(j) + S_int_tra(j)) * BEG_int(j)
V_OBMEN_sum(j) = V_OBMEN_oc(j) + V_OBMEN_int(j)
T_wina(j) = T_oc * V_OBMEN_oc(j)/V_OBMEN_sum(j) + T_int(j) * V_OBMEN_int(j)/V_OBMEN_sum(j)

if del_T_OBMEN(j) < = 0 then
P_OBMEN(j) = P_oc
else
P_OBMEN(j) = P_int(j)
end if

V_NAK(j) = PI * (dis7(j)^2 - dis6(j)^2) * dis21(j)
V_PROGIB(j) = PI * (dis7(j)^2 - (dis7(j) - PRO_win_rad(j))^2) * a_box(j)/(R_win(j) * 2 * PI) * dis21(j)
V_int(j) = V_NAK(j) - V_PROGIB(j)

if del_T < = 0 then
V_OBMEN(j) = (S_oc_air(j) + S_oc_tra(j)) * BEG_oc
else
V_OBMEN(j) = (S_int_air(j) + S_int_tra(j)) * BEG_int(j)
end if

const_PV(j) = const_PV(j) + del_A_int(j) + del_A_oc_int(j)

P_int(j) = const_PV(j)/V_int(j)
T_int(j) = const_PV(j) * Mr_air/(m_air(j) * R_gaz)

rem F_win_PV - часть силы радиальной дефрмации шины образуемая давлением воздуха в шине

dF_win_PV = (P_int(j) - P_oc) * dS_kon(0,i,j)

dF_win_PV_vert = dF_win_PV * dF_win_rez_vert/dF_win_rez
dF_win_PV_pop = dF_win_PV * dF_win_rez_pop/dF_win_rez
dF_win_PV_prod = dF_win_PV * dF_win_rez_prod/dF_win_rez

rem большой кусок закончен давление воздуха в шине

F_win_rad_vert(j) = F_win_rad_vert(j)+dF_win_rez_vert + dF_win_PV_vert
F_win_rad_pop(j) = F_win_rad_pop(j)+dF_win_rez_pop + dF_win_PV_pop
F_win_rad_prod(j) = F_win_rad_prod(j)+dF_win_rez_prod + dF_win_PV_prod

next i

M_win_rad_pop(j) = F_win_rad_pop(j)*p1*znak_M(1,3,F_win_rad_pop(j),ko_vblwe_cm(j))
M_win_rad_prod(j) = F_win_rad_prod(j)*p1*znak_M(1,2,F_win_rad_prod(j),ko_vblwe_cm(j))
M_win_rad_gor_pop(j) = F_win_rad_pop(j)*p3*znak_M(3,1,F_win_rad_pop(j),ko_do_cm(j))
M_win_rad_gor_prod(j) = F_win_rad_prod(j)*p2*znak_M(2,1,F_win_rad_prod(j),ko_levee_cm(j))

cos_L_ko_cm_L_ko_pop = abs(((Xcm-Xko(j))*A2 + (Ycm-Yko(j))*B2 + (Zcm-Zko(j))*C2)/(((Xcm-Xko(j))^2 + (Ycm-Yko(j))^2 + (Zcm-Zko(j))^2)^0.5*(A2^2 + B2^2 + C2^2)^0.5))
cos_L_ko_cm_L_ko_prod = abs(((Xcm-Xko(j))*A3 + (Ycm-Yko(j))*B3 + (Zcm-Zko(j))*C3)/(((Xcm-Xko(j))^2 + (Ycm-Yko(j))^2 + (Zcm-Zko(j))^2)^0.5*(A3^2 + B3^2 + C3^2)^0.5))

 rem F_win_rad_cm = F_win_rad_pop(j)*cos_L_ko_cm_L_ko_pop+F_win_rad_prod(j)*cos_L_ko_cm_L_ko_prod

cos_L_ko_cm_L_cm_vert = abs(((Xcm-X_dS_L_ko)*A1 + (Ycm-Y_dS_L_ko)*B1 + (Zcm-Z_dS_L_ko)*C1)/(((Xcm-X_dS_L_ko)^2 + (Ycm-Y_dS_L_ko)^2 + (Zcm-Z_dS_L_ko)^2)^0.5*(A1^2 + B1^2 + C1^2)^0.5))
cos_L_ko_cm_L_cm_pop = abs(((Xcm-X_dS_L_ko)*A2 + (Ycm-Y_dS_L_ko)*B2 + (Zcm-Z_dS_L_ko)*C2)/(((Xcm-X_dS_L_ko)^2 + (Ycm-Y_dS_L_ko)^2 + (Zcm-Z_dS_L_ko)^2)^0.5*(A2^2 + B2^2 + C2^2)^0.5))
cos_L_ko_cm_L_cm_prod = abs(((Xcm-X_dS_L_ko)*A3 + (Ycm-Y_dS_L_ko)*B3 + (Zcm-Z_dS_L_ko)*C3)/(((Xcm-X_dS_L_ko)^2 + (Ycm-Y_dS_L_ko)^2 + (Zcm-Z_dS_L_ko)^2)^0.5*(A3^2 + B3^2 + C3^2)^0.5))

F_win_rad_cm_vert(j) = (F_win_rad_pop(j)*cos_L_ko_cm_L_ko_pop*znak_pop_cm(F_win_rad_pop(j),1)+F_win_rad_prod(j)*cos_L_ko_cm_L_ko_prod*znak_prod_cm(F_win_rad_prod(j),1))*cos_L_ko_cm_L_cm_vert
F_win_rad_cm_pop(j) = (F_win_rad_pop(j)*cos_L_ko_cm_L_ko_pop*znak_pop_cm(F_win_rad_pop(j),2)+F_win_rad_prod(j)*cos_L_ko_cm_L_ko_prod*znak_prod_cm(F_win_rad_prod(j),2))*cos_L_ko_cm_L_cm_pop
F_win_rad_cm_prod(j) = (F_win_rad_pop(j)*cos_L_ko_cm_L_ko_pop*znak_pop_cm(F_win_rad_pop(j),3)+F_win_rad_prod(j)*cos_L_ko_cm_L_ko_prod*znak_prod_cm(F_win_rad_prod(j),3))*cos_L_ko_cm_L_cm_prod
else

F_win_rad_vert(j) = 0
F_win_rad_pop(j) = 0
F_win_rad_prod(j) = 0

M_win_rad_pop(j) = 0
M_win_rad_prod(j) = 0
M_win_rad_gor_pop(j) = 0
M_win_rad_gor_prod(j) = 0

F_win_rad_cm_vert(j) = 0
F_win_rad_cm_pop(j) = 0
F_win_rad_cm_prod(j) = 0

end if
next j

end sub

REM СДЕЛАТЬ C WIN RAD КАК ФУНКЦИЮ ОТ PRO
REM нет массивов для давления воздуха в шине!!!
