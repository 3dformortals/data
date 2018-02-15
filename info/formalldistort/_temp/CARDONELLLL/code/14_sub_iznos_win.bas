Attribute VB_Name = "Sub_iznos_win"
Sub iznos_win()

if RIS_HIGH> 0 then S_sre_kon = R_win_geom * 2 * PI * V_ris/(V_ris + V_air) * dik8
if RIS_HIGH < = 0 then S_sre_kon = R_win_geom * 2 * PI * dik8

число срезанных конусов при проскальзывании(для одного колеса) в случае, 
когда дорожная поверхность(например асфальт, бетон,...) более прочная, 
чем колесная поверхность(шина) или такая же прочная(например резина,...) как колесная поверхность(шина)

K_TW_vert = ((S_tre/(PI * L_TW^2) + (L_tre_vert - 2 * L_TM)/(2 * L_TW) * (P_kon_vert)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_0) + (S_tre/(PI * L_TW^2) - (P_kon_vert)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_1))
K_TW_pop = ((S_tre/(PI * L_TW^2) + (L_tre_pop - 2 * L_TM)/(2 * L_TW) * (P_kon_pop)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_0) + (S_tre/(PI * L_TW^2) - (P_kon_pop)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_1))
K_TW_prod = ((S_tre/(PI * L_TW^2) + (L_tre_prod - 2 * L_TM)/(2 * L_TW) * (P_kon_prod)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_0) + (S_tre/(PI * L_TW^2) - (P_kon_prod)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_1))

число срезанных конусов при проскальзывании в процессе буксования(для одного колеса) в случае, 
когда дорожная поверхность(например асфальт, бетон,...) более прочная, 
чем колесная поверхность(шина) или такая же прочная(например резина,...) как колесная поверхность(шина)

K_TW_vert = (L_tre_vert/(2 * L_TW) * (P_kon_vert)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_0) + (S_tre/(&pi; * L_TW^2) - (P_kon_vert)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_1)

K_TW_pop = (L_tre_pop/(2 * L_TW) * (P_kon_pop)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_0) + (S_tre/(&pi; * L_TW^2) - (P_kon_pop)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_1)

K_TW_prod = (L_tre_prod/(2 * L_TW) * (P_kon_prod)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_0) + (S_tre/(&pi; * L_TW^2) - (P_kon_prod)/(2 * L_TW)) * (L_TM^2 * H_TM)/(L_TW^2 * H_TW) * (GEO_1)

число срезаемых конусов
K_TW = (K_TW_vert^2 + K_TW_pop^2 + K_TW_prod^2)^0.5

RUBBERGONE = H_TW * K_TW * PI * L_TW^2/S_sre_kon
R_win_geom = R_win_geom - RUBBERGONE
далее идет пересчет:

if RIS_HIGH> 0 then m14,J14,J_prot,R_win,RIS_HIGH(...dik1),V_ris,V_air
RIS_HIGH = dik1 - RUBBERGONE

else
 m13,J13,J_prot,R_win,dik2
dik2 = dik2 - RUBBERGONE
if dik2 < = 0 then "движение прекращается - критический износ шины"
end if

end sub
REM доделать потом, после работы буксования...чтобы знать чем определять
