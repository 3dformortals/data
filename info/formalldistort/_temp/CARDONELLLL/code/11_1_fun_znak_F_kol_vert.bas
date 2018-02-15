Attribute VB_Name = "function_znak_F_kol_vert"
function znak_F_kol_vert(M_kol, A_dS, B_dS, C_dS, D_dS, A_ko, B_ko, C_ko, X_dS, Y_dS, Z_dS)

dim T#, A_kol#, B_kol#, C_kol#, D_kol#, X_P0_ko#

A_kol = (B_dS) * (C_ko) - (C_dS) * (B_ko)
B_kol =  - (A_dS) * (C_ko) + (C_dS) * (A_ko)
C_kol = (A_dS) * (B_ko) - (B_dS) * (A_ko)
D_kol =  - (A_kol * X_ko + B_kol * Y_ko + C_kol * Z_ko)


T =  - (A_kol * X_dS + B_kol * Y_dS + C_kol * Z_dS + D_kol)/(A_kol^2 + B_kol^2 + C_kol^2)

X_P0_ko = X_dS + A_kol * T

if M_kol > 0 then
if X_dS > X_P0_ko then 
znak_F_kol_vert = 1
elseif X_dS = X_P0_ko then 
znak_F_kol_vert = 0
elseif X_dS < X_P0_ko then 
znak_F_kol_vert = -1
end if

elseif M_kol = 0 then
if X_dS > X_P0_ko then 
znak_F_kol_vert = 0
elseif X_dS = X_P0_ko then 
znak_F_kol_vert = 0
elseif X_dS < X_P0_ko then 
znak_F_kol_vert = 0
end if

elseif M_kol < 0 then
if X_dS > X_P0_ko then 
znak_F_kol_vert = -1
elseif X_dS = X_P0_ko then 
znak_F_kol_vert = 0
elseif X_dS < X_P0_ko then 
znak_F_kol_vert = 1
end if
end if

end function

