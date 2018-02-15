Attribute VB_Name = "function_znak_F_rad_prod"
function znak_F_rad_prod(XdS,YdS,ZdS,AdS,BdS,CdS,Xko,Yko,Zko,Ako,Bko,Cko)

dim Akol#,Bkol#,Ckol#,Dkol#,T#,XP0ko#

Akol = (BdS)*(Cko)-(CdS)*(Bko)
Bkol = -(AdS)*(Cko)+(CdS)*(Ako)
Ckol = (AdS)*(Bko)-(BdS)*(Ako)
Dkol = -(Akol*Xko+Bkol*Yko+Ckol*Zko)

T = -(Akol*XdS+Bkol*YdS+Ckol*ZdS+Dkol)/(Akol^2+Bkol^2+Ckol^2)
XP0ko = XdS+Akol*T

if XdS > XP0ko then znak_F_rad_prod=-1
elseif XdS = XP0ko then znak_F_rad_prod=0
elseif XdS < XP0ko then znak_F_rad_prod=1
end if

end function
