Attribute VB_Name = "function_D_dot_line"
function D_dot_line(X,Y,Z,I,J,K,A,B,C)
dim XL#,YL#,ZL#,T#
T = (A*(X-I)+B*(Y-J)+C*(Z-K))/(A2+B2+C2)
XL = I + T*A
YL = J + T*B
ZL = K + T*C
D_dot_line = ((XL-X)^2+(YL-Y)^2+(ZL-Z)^2)^0.5
end function

REM X,Y,Z - ���������� ����� ��������� �� ������

REM I,J,K - ���������� ����� ������������� ������� ������

REM A,B,C - ������������ ������������� ������� ������

REM XL,YL,ZL - ���������� ����� ����������� ���������� �� ������

REM T -  ��������
