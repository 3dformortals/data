Attribute VB_Name = "function_znak_F_kol_prod"
function znak_F_kol_prod(M_kol)

if M_kol > 0 then
znak_F_kol_prod =1
elseif M_kol = 0 then 
znak_F_kol_prod =0
elseif M_kol < 0 then 
znak_F_kol_prod =-1
end if
end function
