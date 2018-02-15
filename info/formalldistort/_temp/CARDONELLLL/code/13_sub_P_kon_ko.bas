Attribute VB_Name = "Sub_P_kon_ko"
Sub P_kon_ko()

dim P_kon#

for j = 1 to n_ko

b_eli(j) = dik8(j)
a_eli(j) = S_kon(j)/(PI * b_eli(j))
P_eli(j) = 2 * (a_eli(j)^(log(2)/log(PI/2)) + b_eli(j)^(log(2)/log(PI/2)))^(1/(log(2)/log(PI/2))) 
b_box(j) = dik8(j)
a_box(j) = S_kon(j)/b_box(j)
S_box(j) = a_box(j) * b_box(j)
a_kon(j) = (a_eli(j) + a_box(j))/2

rem P_kon

select case TIP_WIN(j)
case 0
rem в случае если шина не имеет шевронов протектора

if o_phi_ko(j) = 0 then
P_kon_vert(j) = (a_box(j) + P_eli(j))/2
P_kon_pop(j) = (b_box(j) + P_eli(j))/2
P_kon_prod(j) = (a_box(j) + P_eli(j))/2
else
P_kon_vert(j) = (a_box(j) + b_box(j) + P_eli(j))/2
P_kon_pop(j) = (a_box(j) + b_box(j) + P_eli(j))/2
P_kon_prod(j) = (a_box(j) + b_box(j) + P_eli(j))/2
end if

case 1
rem геометрия шины елочка

V_air(j) = PI * (R_win_geom(j)^2 - dis1(j)^2) * dik8(j) * AIR_STEP(j)/(2 * PI) * GRIP(j)/(2 * PI)
V_ris(j) = PI * (R_win_geom(j)^2 - dis1(j)^2) * dik8(j) * RIS_STEP(j)/(2 * PI) * GRIP(j)/(2 * PI)

UGOLOK(j) = dik8(j)/cos(o_phi_ris(j))
KUSOK(j) = S_kon/(dik8(j) * R_win_geom(j) * (AIR_STEP(j) + RIS_STEP(j)))

if o_phi_ris(j) = 0 then
P_kon_vert(j) = UGOLOK(j) * KUSOK(j)

if o_phi_ko(j) = 0 then
P_kon_pop(j) = RIS_STEP(j) * R_win_geom(j) * KUSOK(j)
else
P_kon_pop(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
end if

if o_phi_ko(j) = 0 then
P_kon_prod(j) = UGOLOK(j) * KUSOK(j)
else
P_kon_prod(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
end if

else

P_kon_vert(j) = UGOLOK(j) * KUSOK(j)

if o_phi_ko(j) = 0 then
P_kon_pop(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)

if o_phi_ko(j) > 0 & o_phi_ko(j) < o_phi_ris(j) then
P_kon_pop(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)

else if o_phi_ko(j) = o_phi_ris(j) then
P_kon_pop(j) = (0.5 * UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)

else if o_phi_ko(j) > o_phi_ris(j) then
P_kon_pop(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
end if

if o_phi_ko(j) = 0 then
P_kon_prod(j) = UGOLOK(j) * KUSOK(j)

else if o_phi_ko(j) > 0 & o_phi_ko(j) < o_phi_ris(j) then
P_kon_prod(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)

else if o_phi_ko(j) = o_phi_ris(j) then
P_kon_prod(j) = (0.5 * UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)

else if o_phi_ko(j) > o_phi_ris(j) then
P_kon_prod(j) = (UGOLOK(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
end if

case 2
rem геометрия шины змейка

RIS_STEP(j) = (R_ext(j) - R_int(j))/R_win_geom(j)
AIR_STEP(j) = 2 * PI/GRIP(j) - RIS_STEP(j)

V_ris(j) = PI * (R_win_geom(j)^2 - dis1(j)^2) * RIS_STEP(j)/(2 * PI) * WEVRONOV(j) * 2 * PI * (R_int(j) + 0.5 * (R_ext(j) - R_int(j))) * GRIP(j)/(2 * PI)

V_air(j) = (PI * (R_win_geom(j)^2 - dis1(j)^2) * dik8(j) - V_ris(j) * 2 * PI)/(2 * PI)

ZMEJA(j) = (2 * PI * R_ext(j)/2 + 2 * PI * R_int(j)/2) * WEVRONOV(j)

KUSOK(j) = S_kon(j)/(dik8(j) * R_win_geom(j) * (AIR_STEP(j) + RIS_STEP(j)))

P_kon_vert(j) = ZMEJA(j) * KUSOK(j)

if o_phi_ko(j) = 0 then
P_kon_pop(j) = (ZMEJA(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
else
P_kon_pop(j) = (ZMEJA(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
end if

if o_phi_ko(j) = 0 then
P_kon_prod(j) = ZMEJA(j) * KUSOK(j)
else
P_kon_prod(j) = (ZMEJA(j) + RIS_STEP(j) * R_win_geom(j)) * KUSOK(j)
end if

end select

rem нестандартная геометрия

if TIP_WIN(j)>0 & R_win_geom(j) * (1 - cos(180 * AIR_STEP(j)/(2 * PI))) >= RIS_HIGH(j) then

P_kon = 0

P_kon = ((P_kon_vert(j))^2+(P_kon_pop(j))^2+(P_kon_prod(j))^2)^0.5

P_kon_vert(j) = (P_kon * V_air + P_kon_vert(j) * V_ris)/(V_air + V_ris)

P_kon_pop(j) = (P_kon * V_air + P_kon_pop(j) * V_ris)/(V_air + V_ris)

P_kon_prod(j) = (P_kon * V_air + P_kon_prod(j) * V_ris)/(V_air + V_ris)

end if

next j

end sub
