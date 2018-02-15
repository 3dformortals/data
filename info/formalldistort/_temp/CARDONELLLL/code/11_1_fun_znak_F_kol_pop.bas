Attribute VB_Name = "function_znak_F_kol_pop"
function znak_F_kol_pop(M_kol, ko_do_rul)

rem колесо повернуто направо
if napravo = 1 & nalevo=0 then
    if ko_do_rul = 1 then 
        if M_kol > 0 then 
        znak_F_kol_pop =-1
        else if M_kol = 0 then 
        znak_F_kol_pop=0
        else if M_kol < 0 then 
        znak_F_kol_pop =1
        end if
    else if ko_do_rul = -1 then
        if M_kol > 0 then 
        znak_F_kol_pop=1
        else if M_kol = 0 then 
        znak_F_kol_pop=0
        else if M_kol < 0 then 
        znak_F_kol_pop=-1
        end if
    end if
rem колесо повернуто налево
else if nalevo = 1 & napravo = 0
    if ko_do_rul = 1 then
        if M_kol > 0 then 
        znak_F_kol_pop=1
        else if M_kol = 0 then 
        znak_F_kol_pop=0
        else if M_kol < 0 then 
        znak_F_kol_pop=-1
        end if
    else if ko_do_rul = -1 then
        if M_kol > 0 then 
        znak_F_kol_pop =-1
        else if M_kol = 0 then 
        znak_F_kol_pop=0
        else if M_kol < 0 then 
        znak_F_kol_pop =1
        end if
    end if
end if
end function
