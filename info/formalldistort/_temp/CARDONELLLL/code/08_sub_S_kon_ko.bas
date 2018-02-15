Attribute VB_Name = "Sub_S_kon_ko"
Sub S_kon_ko()

for j =1 to n_ko
if n_dS_kon(j)>0 then
for i = 1 to n_dS_kon
S_kon(j)=S_kon(j)+dS_kon(0,i,j)
next i 
end if
next j

end sub
