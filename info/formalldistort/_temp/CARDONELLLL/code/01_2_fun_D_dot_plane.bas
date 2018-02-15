Attribute VB_Name = "function_D_dot_plane"
function D_dot_plane(X,Y,Z,A,B,C,D)

D_dot_plane = abs(A*X + B*Y + C*Z + D)/(A^2 + B^2 + C^2)^0.5

end function

REM X,Y,Z - координаты точки
REM A,B,C,D - составляющие нормального вектора плоскости
