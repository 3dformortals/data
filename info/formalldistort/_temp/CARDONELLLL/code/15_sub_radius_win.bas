Attribute VB_Name = "Sub_radius_win"
Sub radius_win()

for j = 1 to n_ko
R_win(j) = R_win_geom(j) * V_ris(j)/(V_air(j) + V_ris(j)) + dis1(j) * V_air(j)/(V_air(j) + V_ris(j))
next j

end sub
