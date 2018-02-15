Attribute VB_Name = "Sub_ABCD_PPP"
Sub ABCD_PPP(X1,Y1,Z1,X2,Y2,Z2,X3,Y3,Z3)
dim X4#,Y4#,Z4#,T#

A1 = Y2*Z3 - Y1*Z3 - Y2*Z1 + Y1*Z1 + Y3*Z1 - Y1*Z1 - Y3*Z2 + Y1*Z2
B1 = Z2*X3 - Z1*X3 - Z2*X1 + Z1*X1 + X2*Z1 - X1*Z1 - X2*Z3 + X1*Z3
C1 = Y3*X2 - Y1*X2 - Y3*X1 + Y1*X1 + Y2*X1 - Y1*X1 - Y2*X3 + Y1*X3
D1 =X1*Y1*Z3 - X1*Y2*Z3 + X1*Y2*Z1 -X1*Y1*Z1 - Y1*Z2*X3 + Y1*Z1*X3 +Y1*Z2*X1 - Y1*Z1*X1 - Z1*Y3*X2 +Z1*Y1*X2 + Z1*Y3*X1 - Z1*Y1*X1 -Z1*Y2*X1 + Z1*Y1*X1 + Z1*Y2*X3 -Z1*Y1*X3 - Y1*X2*Z1 + Y1*X1*Z1 +Y1*X2*Z3 - Y1*X1*Z3 - X1*Y3*Z1 +X1*Y1*Z1 + X1*Y3*Z2 - X1*Y1*Z2

rem создание четвертой точки
T=1000*cosLL(AoZ,BoZ,CoZ,A1,B1,C1)/C1
X4 = X1 + T*A1
Y4 = Y1 + T*B1
Z4 = Z1 + T*C1

A2=X3-X1
B2=Y3-Y1
C2=Z3-Z1
D2 =X1*Y1*Z3 - X1*Y4*Z3 + X1*Y4*Z1 -X1*Y1*Z1 - Y1*Z4*X3 + Y1*Z1*X3 +Y1*Z4*X1 - Y1*Z1*X1 - Z1*Y3*X4 +Z1*Y1*X4 + Z1*Y3*X1 - Z1*Y1*X1 -Z1*Y4*X1 + Z1*Y1*X1 + Z1*Y4*X3 -Z1*Y1*X3 - Y1*X4*Z1 + Y1*X1*Z1 +Y1*X4*Z3 - Y1*X1*Z3 - X1*Y3*Z1 +X1*Y1*Z1 + X1*Y3*Z4 - X1*Y1*Z4

A3=X2-X1
B3=Y2-Y1
C3=Z2-Z1
D3 =X1*Y1*Z4 - X1*Y2*Z4 + X1*Y2*Z1 -X1*Y1*Z1 - Y1*Z2*X4 + Y1*Z1*X4 +Y1*Z2*X1 - Y1*Z1*X1 - Z1*Y4*X2 +Z1*Y1*X2 + Z1*Y4*X1 - Z1*Y1*X1 -Z1*Y2*X1 + Z1*Y1*X1 + Z1*Y2*X4 -Z1*Y1*X4 - Y1*X2*Z1 + Y1*X1*Z1 +Y1*X2*Z4 - Y1*X1*Z4 - X1*Y4*Z1 +X1*Y1*Z1 + X1*Y4*Z2 - X1*Y1*Z2

if C1<= 0 or B2 <=0 or A3 <=0 then 
PRIEXALI = 1
WHYSTOP = "Недопустимое отклонение от курса! Дальнейшее движение будет прекращено!" + Chr(13) _
+ "cos(LoZ(СК),Lo1(cm_vert))= " + C1 + Chr(13) + _
+ "cos(LoY(СК),Lo2(cm_pop))= " + B2 + Chr(13) + _
+ "cos(LoX(СК),Lo3(cm_prod))= " + A3 + Chr(13) + _
+ "Чем ближе косинус к 0 тем сильнее опрокидывание oZ (отклонение oY,oX)."
msgbox(WHYSTOP)
end if
end sub



