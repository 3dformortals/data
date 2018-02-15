Attribute VB_Name = "Sub_vrawenie_koles"
Sub vrawenie_koles(j)

dim AdS#,BdS#,CdS#,DdS#

rem 

for i = 1 to n_dS_kon(j)

call ABCD_P(dS_kon(1,i,j),dS_kon(2,i,j),dS_kon(3,i,j),dS_kon(4,i,j),dS_kon(5,i,j),dS_kon(6,i,j),dS_kon(7,i,j),dS_kon(8,i,j),dS_kon(9,i,j),AdS,BdS,CdS,DdS)
cos_o_phi_L_kol_L_ko_vert(j) = cos_o_phi_L_kol_L_ko_vert(j) + sgn(M_win_kol(j)) * abs((((BdS) * (Cko(j)) - (CdS) * (Bko(j))) * A1 + ( - (AdS) * (Cko(j)) + (CdS) * (Ako(j))) * B1 + ((AdS) * (Bko(j)) - (BdS) * (Ako(j))) * C1) / ((((BdS) * (Cko(j)) - (CdS) * (Bko(j)))^2 + ( - (AdS) * (Cko(j)) + (CdS) * (Ako(j)))^2 + ((AdS) * (Bko(j)) - (BdS) * (Ako(j)))^2)^0.5 * (A1^2 + B1^2 + C1^2)^0.5)) * dS_kon(0,i,j) / S_kon(j)
cos_o_phi_L_kol_L_ko_pop(j) = cos_o_phi_L_kol_L_ko_pop(j) + sgn(M_win_kol(j)) * abs((((BdS) * (Cko(j)) - (CdS) * (Bko(j))) * A2 + ( - (AdS) * (Cko(j)) + (CdS) * (Ako(j))) * B2 + ((AdS) * (Bko(j)) - (BdS) * (Ako(j))) * C2) / ((((BdS) * (Cko(j)) - (CdS) * (Bko(j)))^2 + ( - (AdS) * (Cko(j)) + (CdS) * (Ako(j)))^2 + ((AdS) * (Bko(j)) - (BdS) * (Ako(j)))^2)^0.5 * (A2^2 + B2^2 + C2^2)^0.5)) * dS_kon(0,i,j) / S_kon(j)
cos_o_phi_L_kol_L_ko_prod(j)  = cos_o_phi_L_kol_L_ko_prod(j)  + sgn(M_win_kol(j)) * abs((((BdS) * (Cko(j)) - (CdS) * (Bko(j))) * A3 + ( - (AdS) * (Cko(j)) + (CdS) * (Ako(j))) * B3 + ((AdS) * (Bko(j)) - (BdS) * (Ako(j))) * C3) / ((((BdS) * (Cko(j)) - (CdS) * (Bko(j)))^2 + ( - (AdS) * (Cko(j)) + (CdS) * (Ako(j)))^2 + ((AdS) * (Bko(j)) - (BdS) * (Ako(j)))^2)^0.5 * (A3^2 + B3^2 + C3^2)^0.5)) * dS_kon(0,i,j) / S_kon(j)

next i
rem получили средний удельный(к треугольникам площади) косинус

rem уравнения распределения энергии внутри колеса(система колесо включает: - массу ступицы; - дополнительную вращающуюся массу, присоединенную к ступице; - массу шины(корд + камера)).

rem для вертикальной составляющей(vert)

del_E_okr_vert(j) = (del_o_alpha_wstu_0_(j) - del_o_alpha_prot_0_(j)) * cos_o_phi_L_kol_L_ko_vert(j) * C_win_okr(j)

E_okr_vert(j) = E_okr_0_vert(j) + del_E_okr_vert(j)
E_kol_vert(j) = E_kol(j) * cos_o_phi_L_kol_L_ko_vert(j)

E_torm_vert(j) = E_torm(j) * cos_o_phi_L_kol_L_ko_vert(j)
E_okr_0_vert(j) = E_okr_vert(j)


E_wstu_vert(j) = E_kol_vert(j) + E_torm_vert(j) - ((E_kol_vert(j) + E_torm_vert(j) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j) + E_tre_vert(j) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)) * 0.5 - E_okr_vert(j) + E_i_0_kord_vert(j) + E_k_0_kord_vert(j)) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j)

E_kord_vert(j) = ((E_kol_vert(j) + E_torm_vert(j) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j) + E_tre_vert(j) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)) * 0.5 - E_okr_vert(j) + E_i_0_kord_vert(j) + E_k_0_kord_vert(j))

E_prot_vert(j) = E_tre_vert(j) + ((E_kol_vert(j) + E_torm_vert(j) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j) + E_tre_vert(j) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)) * 0.5 - E_okr_vert(j) + E_i_0_kord_vert(j) + E_k_0_kord_vert(j)) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


дифференциальные уравнения вращения колеса


для вращающейся массы m_wstu включающей: - массу части шины плотно прилегающей к ступице, неэластичную в окружном направлении(края корда + камера); - массу ступицы; - дополнительную вращающуюся массу, присоединенную к ступице.



E_1_(j) = E_kol_vert(j) + E_torm_vert(j) - ((E_kol_vert(j) + E_torm_vert(j) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j) + E_tre_vert(j) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)) * 0.5 - E_okr_vert(j) + E_i_0_kord_vert(j) + E_k_0_kord_vert(j)) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j)

o_epsilon_1_(j) = E_1_(j) / J_wstu(j) 
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_wstu_vert(j) = J_wstu(j) * o_epsilon_1_(j)
E_k_1_wstu_vert(j) = J_wstu(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)

del_o_alpha_wstu_vert_1_(j) = del_o_alpha_1_(j)


для вращающейся массы m_kord включающей: - массу боковой части корда шины эластичную в окружном направлении; - массу боковой части камеры, эластичную в окружном направлении.


E_1_(j) = ((E_kol_vert(j) + E_torm_vert(j) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j) + E_tre_vert(j) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)) * 0.5 - E_okr_vert(j) + E_i_0_kord_vert(j) + E_k_0_kord_vert(j))

o_epsilon_1_(j) = E_1_(j) / J_kord(j)
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_kord_vert(j) = J_kord(j) * o_epsilon_1_(j)
E_k_1_kord_vert(j) = J_kord(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)


для вращающейся массы m_prot включающей: - массу протекторной части шины неэластичную в окружном направлении; - массу голой резиновой части шины (на которой находится протекторная часть шины), неэластичную в окружном направлении; - массу нижней части камеры, плотно прилегающей изнутри к носителю протекторной части шины.



E_1_(j) = E_tre_vert(j) + ((E_kol_vert(j) + E_torm_vert(j) + E_i_0_wstu_vert(j) + E_k_0_wstu_vert(j) + E_tre_vert(j) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)) * 0.5 - E_okr_vert(j) + E_i_0_kord_vert(j) + E_k_0_kord_vert(j)) + E_i_0_prot_vert(j) + E_k_0_prot_vert(j)

o_epsilon_1_(j) = E_1_(j) / J_prot(j)
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_prot_vert(j) = J_prot(j) * o_epsilon_1_(j)
E_k_1_prot_vert(j) = J_prot(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)

del_o_alpha_prot_vert_1_(j) = del_o_alpha_1_(j)
o_omega_prot_vert_1_(j) = o_omega_1_(j)


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


для поперечной составляющей(pop)

del_E_okr_pop(j)  = (del_o_alpha_wstu_0_(j) - del_o_alpha_prot_0_(j)) * cos_o_phi_L_kol_L_ko_pop(j) * C_win_okr(j)

E_okr_pop(j)  = E_okr_0_pop(j) + del_E_okr_pop(j) 
E_kol_pop(j) = E_kol(j) * cos_o_phi_L_kol_L_ko_pop(j)

E_torm_pop(j) = E_torm(j) * cos_o_phi_L_kol_L_ko_pop(j)
E_okr_0_pop(j) = E_okr_pop(j) 



E_wstu_pop(j)  = E_kol_pop(j) + E_torm_pop(j) - ((E_kol_pop(j) + E_torm_pop(j) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j)  + E_tre_pop(j)  + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) ) * 0.5 - E_okr_pop(j)  + E_i_0_kord_pop(j)  + E_k_0_kord_pop(j) ) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j) 

E_kord_pop = ((E_kol_pop(j) + E_torm_pop(j) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j)  + E_tre_pop(j)  + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) ) * 0.5 - E_okr_pop(j)  + E_i_0_kord_pop(j)  + E_k_0_kord_pop(j) )

E_prot_pop = E_tre_pop(j)  + ((E_kol_pop(j) + E_torm_pop(j) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j)  + E_tre_pop(j)  + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) ) * 0.5 - E_okr_pop(j)  + E_i_0_kord_pop(j)  + E_k_0_kord_pop(j) ) + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) 


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


дифференциальные уравнения вращения колеса


для вращающейся массы m_wstu включающей: - массу части шины плотно прилегающей к ступице, неэластичную в окружном направлении(края корда + камера); - массу ступицы; - дополнительную вращающуюся массу, присоединенную к ступице.



E_1_(j) = E_kol_pop(j) + E_torm_pop(j) - ((E_kol_pop(j) + E_torm_pop(j) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j)  + E_tre_pop(j)  + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) ) * 0.5 - E_okr_pop(j)  + E_i_0_kord_pop(j)  + E_k_0_kord_pop(j) ) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j) 

o_epsilon_1_(j) = E_1_(j) / J_wstu(j) 
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_wstu_pop(j)  = J_wstu(j) * o_epsilon_1_(j)
E_k_1_wstu_pop(j)  = J_wstu(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)

del_o_alpha_wstu_pop(j)  = del_o_alpha_1_(j)


для вращающейся массы m_kord включающей: - массу боковой части корда шины эластичную в окружном направлении; - массу боковой части камеры, эластичную в окружном направлении.


E_1_(j) = ((E_kol_pop(j) + E_torm_pop(j) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j)  + E_tre_pop(j)  + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) ) * 0.5 - E_okr_pop(j)  + E_i_0_kord_pop(j)  + E_k_0_kord_pop(j) )

o_epsilon_1_(j) = E_1_(j) / J_kord(j)
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_kord_pop = J_kord(j) * o_epsilon_1_(j)
E_k_1_kord_pop = J_kord(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)


для вращающейся массы m_prot включающей: - массу протекторной части шины неэластичную в окружном направлении; - массу голой резиновой части шины (на которой находится протекторная часть шины), неэластичную в окружном направлении; - массу нижней части камеры, плотно прилегающей изнутри к носителю протекторной части шины.



E_1_(j) = E_tre_pop(j)  + ((E_kol_pop(j) + E_torm_pop(j) + E_i_0_wstu_pop(j)  + E_k_0_wstu_pop(j)  + E_tre_pop(j)  + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) ) * 0.5 - E_okr_pop(j)  + E_i_0_kord_pop(j)  + E_k_0_kord_pop(j) ) + E_i_0_prot_pop(j)  + E_k_0_prot_pop(j) 

o_epsilon_1_(j) = E_1_(j) / J_prot(j)
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_prot_pop(j)  = J_prot(j) * o_epsilon_1_(j)
E_k_1_prot_pop(j)  = J_prot(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)

del_o_alpha_prot_pop_1_(j) = del_o_alpha_1_(j)
o_omega_prot_pop_1_(j) = o_omega_1_(j)


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


для продольной составляющей(prod)

del_E_okr_prod(j)  = (del_o_alpha_wstu_0_(j) - del_o_alpha_prot_0_(j)) * cos_o_phi_L_kol_L_ko_prod(j)  * C_win_okr(j)

E_okr_prod(j)  = E_okr_0_prod(j)  + del_E_okr_prod(j) 
E_kol_prod(j)  = E_kol(j) * cos_o_phi_L_kol_L_ko_prod(j) 

E_torm_prod(j)  = E_torm(j) * cos_o_phi_L_kol_L_ko_prod(j) 
E_okr_0_prod(j)  = E_okr_prod(j) 



E_wstu_prod(j)  = E_kol_prod(j)  + E_torm_prod(j)  - ((E_kol_prod(j)  + E_torm_prod(j)  + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j)  + E_tre_prod(j)  + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) ) * 0.5 - E_okr_prod(j)  + E_i_0_kord_prod(j)  + E_k_0_kord_prod(j) ) + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j) 

E_kord_prod(j)  = ((E_kol_prod(j)  + E_torm_prod(j)  + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j)  + E_tre_prod(j)  + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) ) * 0.5 - E_okr_prod(j)  + E_i_0_kord_prod(j)  + E_k_0_kord_prod(j) )

E_prot_prod(j)  = E_tre_prod(j)  + ((E_kol_prod(j)  + E_torm_prod(j)  + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j)  + E_tre_prod(j)  + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) ) * 0.5 - E_okr_prod(j)  + E_i_0_kord_prod(j)  + E_k_0_kord_prod(j) ) + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) 


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


дифференциальные уравнения вращения колеса


для вращающейся массы m_wstu включающей: - массу части шины плотно прилегающей к ступице, неэластичную в окружном направлении(края корда + камера); - массу ступицы; - дополнительную вращающуюся массу, присоединенную к ступице.



E_1_(j) = E_kol_prod(j)  + E_torm_prod(j)  - ((E_kol_prod(j)  + E_torm_prod(j)  + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j)  + E_tre_prod(j)  + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) ) * 0.5 - E_okr_prod(j)  + E_i_0_kord_prod(j)  + E_k_0_kord_prod(j) ) + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j) 

o_epsilon_1_(j) = E_1_(j) / J_wstu(j) 
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_wstu_prod(j)  = J_wstu(j) * o_epsilon_1_(j)
E_k_1_wstu_prod(j)  = J_wstu(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)

del_o_alpha_wstu_prod_1_(j) = del_o_alpha_1_(j)


для вращающейся массы m_kord включающей: - массу боковой части корда шины эластичную в окружном направлении; - массу боковой части камеры, эластичную в окружном направлении.


E_1_(j) = ((E_kol_prod(j)  + E_torm_prod(j)  + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j)  + E_tre_prod(j)  + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) ) * 0.5 - E_okr_prod(j)  + E_i_0_kord_prod(j)  + E_k_0_kord_prod(j) )

o_epsilon_1_(j) = E_1_(j) / J_kord(j)
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_kord_prod(j)  = J_kord(j) * o_epsilon_1_(j)
E_k_1_kord_prod(j)  = J_kord(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)


для вращающейся массы m_prot включающей: - массу протекторной части шины неэластичную в окружном направлении; - массу голой резиновой части шины (на которой находится протекторная часть шины), неэластичную в окружном направлении; - массу нижней части камеры, плотно прилегающей изнутри к носителю протекторной части шины.



E_1_(j) = E_tre_prod(j)  + ((E_kol_prod(j)  + E_torm_prod(j)  + E_i_0_wstu_prod(j)  + E_k_0_wstu_prod(j)  + E_tre_prod(j)  + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) ) * 0.5 - E_okr_prod(j)  + E_i_0_kord_prod(j)  + E_k_0_kord_prod(j) ) + E_i_0_prot_prod(j)  + E_k_0_prot_prod(j) 

o_epsilon_1_(j) = E_1_(j) / J_prot(j)
o_omega_1_(j) = o_epsilon_1_(j) * dt + o_omega_0_(j) 
del_o_alpha_1_(j) = o_epsilon_1_(j) * dt^2 / 2 + o_omega_0_(j) * dt 

E_i_1_prot_prod(j)  = J_prot(j) * o_epsilon_1_(j)
E_k_1_prot_prod(j)  = J_prot(j) * o_omega_1_(j)^2 * 0.5

del_A_1_(j) = E_1_(j) * del_o_alpha_1_(j)

del_o_alpha_prot_prod_1_(j) = del_o_alpha_1_(j)
o_omega_prot_prod_1_(j) = o_omega_1_(j)


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


del_o_alpha_wstu_1_(j) = (del_o_alpha_wstu_vert_1_(j) ^2 + del_o_alpha_wstu_pop_1_(j) ^2 + del_o_alpha_wstu_prod_1_(j) ^2)^0.5
del_o_alpha_prot_1_(j) = (del_o_alpha_prot_vert_1_(j) ^2 + del_o_alpha_prot_pop_1_(j)^2 + del_o_alpha_prot_prod_1_(j) ^2)^0.5


rem потом сюда внедрить формулы для определения омега ступицы как дельта альфа по дт (_0_(j) - _1_(j))dt ... если будет нужно


rem нулевые значения для следующего захода
del_o_alpha_wstu_0_(j) = del_o_alpha_wstu_1_(j)
del_o_alpha_prot_0_(j) = del_o_alpha_prot_1_(j)
E_i_0_wstu_vert(j) =E_i_1_wstu_vert(j) 
E_k_0_wstu_vert(j) =E_k_1_wstu_vert(j) 
E_i_0_kord_vert(j) =E_i_1_kord_vert(j) 
E_k_0_kord_vert(j) =E_k_1_kord_vert(j) 
E_i_0_prot_vert(j) =E_i_1_prot_vert(j) 
E_k_0_prot_vert(j) =E_k_1_prot_vert(j) 
E_i_0_wstu_pop(j)  =E_i_1_wstu_pop(j)  
E_k_0_wstu_pop(j)  =E_k_1_wstu_pop(j)  
E_i_0_kord_pop =E_i_1_kord_pop 
E_k_0_kord_pop =E_k_1_kord_pop 
E_i_0_prot_pop(j)  =E_i_1_prot_pop(j)  
E_k_0_prot_pop(j)  =E_k_1_prot_pop(j)  
E_i_0_wstu_prod(j)  =E_i_1_wstu_prod(j)  
E_k_0_wstu_prod(j)  =E_k_1_wstu_prod(j)  
E_i_0_kord_prod(j)  =E_i_1_kord_prod(j)  
E_k_0_kord_prod(j)  =E_k_1_kord_prod(j)  
E_i_0_prot_prod(j)  =E_i_1_prot_prod(j)  
E_k_0_prot_prod(j)  =E_k_1_prot_prod(j)  

E_prot(j)=(E_k_1_prot_vert(j)^2+E_k_1_prot_pop(j)^2+E_k_1_prot_prod(j)^2)^0.5
E_wstu(j)=(E_k_1_wstu_vert(j)^2+E_k_1_wstu_pop(j)^2+E_k_1_wstu_prod(j)^2)^0.5
rem для колесной силы

o_omega_prot(j) = (o_omega_prot_vert_1_(j) ^2 + o_omega_prot_pop_1_(j)^2 + o_omega_prot_prod_1_(j) ^2)^0.5
rem для сопроката шин


REM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

end sub

REM сделать объявление и образмеривание массивов global  в 00
REM и присваивание x0 = x1 там где необходимо(для следующего захода)...сделано вроде
