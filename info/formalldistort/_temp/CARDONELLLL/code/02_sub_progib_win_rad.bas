Attribute VB_Name = "Sub_progib_win_rad"
Sub progib_win_rad(X_ko(),Y_ko(),Z_ko(),A_ko(),B_ko(),C_ko(),R_win(),dR_kat(),dPRO_win_rad())

for j = 1 to n_ko
R_kat_0(j)=R_kat(j)
R_kat(j)=0
for i = 1 to n_dS_kon(j)

call dS_L_ko(X_ko(j),Y_ko(j),Z_ko(j),A_ko(j),B_ko(j),C_ko(j),X_dS_L_ko(i,j),Y_dS_L_ko(i,j),Z_dS_L_ko(i,j))
dR_kat(i,j)=((X_dS_L_ko(i,j)-dS_kon(10,i,j))^2+(Y_dS_L_ko(i,j)-dS_kon(11,i,j))^2+(Z_dS_L_ko(i,j)-dS_kon(12,i,j))^2)^0.5
dPRO_win_rad(i,j)=R_win(j)-dR_kat(i,j)
R_kat(j)=R_kat(j)+dR_kat(i,j)*dS_kon(0,i,j)/S_kon(j)
next i
next j

end sub
