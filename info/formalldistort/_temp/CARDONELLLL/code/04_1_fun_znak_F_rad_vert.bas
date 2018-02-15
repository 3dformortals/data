Attribute VB_Name = "function_znak_F_rad_vert"
function znak_F_rad_vert(ZdS,Zko)

if ZdS<Zko then: znak_F_vert=1
elseif ZdS>Zko then: znak_F_vert=-1
else: znak_F_vert=0
end if

end function
