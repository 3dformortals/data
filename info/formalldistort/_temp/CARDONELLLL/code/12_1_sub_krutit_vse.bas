Attribute VB_Name = "Sub_krutit_vse"
Sub krutit_vse(E,J,eps,ome0,ome,del_alf,E_i,E_k,del_A)


eps = E/J
ome = eps*del_t+ome0
del_alf = eps*del_t^2/2+ome0*del_t
E_i = J*eps
E_k = J*ome^2*0.5
del_A = E*del_alf


end sub
