Attribute VB_Name = "function_znak_dY_ko"
function znak_dY_ko(X,Y,Z,A,B,C,A2,B2,C2,D2,POLE)

dim D#,DD#,znak_dY#
znak_dY=1
call parall_P_dist(X,Y,Z,A,B,C,znak_dY,POLE,XD,YD,ZD,DX,DY,DZ)
D=abs(A2*X+B2*Y+C2*Z+D2)/(A2^2+B2^2+C2^2)^0.5
DD=abs(A2*XD+B2*YD+C2*ZD+D2)/(A2^2+B2^2+C2^2)^0.5
if DD<=D then
znak_dY_ko=-1
else
znak_dY_ko=1
end if

end function
REM X,Y,Z,A,B,C - точка плоскость колеса точка ko
REM A2,B2,C2,D2 - плоскость P2
