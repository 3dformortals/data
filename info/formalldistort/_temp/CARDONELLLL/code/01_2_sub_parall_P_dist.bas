Attribute VB_Name = "Sub_parall_P_dist"
Sub parall_P_dist(X,Y,Z,A,B,C,znak,POLE,XD,YD,ZD,DX,DY,DZ)
dim S#,T#
XD=X
YD=Y
ZD=Z
S=1/POLE
do while ((XD-X)^2+(YD-Y)^2+(ZD-Z)^2)^0.5 < 1
T= S*znak/B
XD = X + T*A
YD = Y + T*B
ZD = Z + T*C
S=S+1/POLE
loop
DX=XD-X
DY=YD-Y
DZ=ZD-Z

end sub

REM X,Y,Z - координаты точки центра масс колеса
REM A,B,C - составляющие направляющего вектора плоскостей
REM XD,YD,ZD - искомые координаты точки параллельной плоскости на дистанции
REM DX,DY,DZ - приращение кратно которому задаются остальные точки плоскостей, путем умножения
REM znak - направление изменения Y при поиске точки новой плоскости (1||-1)
