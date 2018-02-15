Attribute VB_Name = "Sub_krutit_koleso"
Sub krutit_koleso()

for i = 1 to n_ko

E_okr(i) = E_0_okr(i) + del_E_okr(i)
del_E_okr(i) = (del_alf_0_wstu(i) - del_alf_0_prot(i))*C_win_okr(i)

E_wstu(i) = E_kol(i) + E_torm(i) - ((E_kol(i) + E_torm(i) + E_i_0_wstu(i) + E_k_0_wstu(i) + E_tre(i) + E_i_0_prot(i) + E_k_0_prot(i))*0.5-E_okr(i) + E_i_0_kord(i) + E_k_0_kord(i)) + E_i_0_wstu(i) + E_k_0_wstu(i)

E_kord(i) = ((E_kol(i) + E_torm(i) + E_i_0_wstu(i) + E_k_0_wstu(i) + E_tre(i) + E_i_0_prot(i) + E_k_0_prot(i))*0.5-E_okr(i) + E_i_0_kord(i) + E_k_0_kord(i))

E_prot(i) = E_tre(i) + ((E_kol(i) + E_torm(i) + E_i_0_wstu(i) + E_k_0_wstu(i) + E_tre(i) + E_i_0_prot(i) + E_k_0_prot(i))*0.5-E_okr(i) + E_i_0_kord(i) + E_k_0_kord(i)) + E_i_0_prot(i) + E_k_0_prot(i)

call krutit_vse(E_wstu(i),J_wstu(i),eps_wstu(i),ome_0_wstu(i),ome_wstu(i),del_alf_wstu(i),E_i_wstu(i),E_k_wstu(i),del_A_wstu(i))
call krutit_vse(E_kord(i),J_kord(i),eps_kord(i),ome_0_kord(i),ome_kord(i),del_alf_kord(i),E_i_kord(i),E_k_kord(i),del_A_kord(i))
call krutit_vse(E_prot(i),J_prot(i),eps_prot(i),ome_0_prot(i),ome_prot(i),del_alf_prot(i),E_i_prot(i),E_k_prot(i),del_A_prot(i))

ome_0_wstu(i) = ome_wstu(i)
ome_0_kord(i) = ome_kord(i)
ome_0_prot(i) = ome_prot(i)
E_i_0_wstu(i) = E_i_wstu(i)
E_i_0_kord(i) = E_i_kord(i)
E_i_0_prot(i) = E_i_prot(i)
E_k_0_wstu(i) = E_k_wstu(i)
E_k_0_kord(i) = E_k_kord(i)
E_k_0_prot(i) = E_k_prot(i)
del_alf_0_wstu(i) = del_alf_wstu(i)
del_alf_0_prot(i) = del_alf_prot(i)
E_0_okr(i) = E_okr(i)

next i



end sub
