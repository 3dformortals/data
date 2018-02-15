Attribute VB_Name = "Sub_M_dvigaet"
Sub M_dvigaet()
dim i#


rem движущий момент M_dvi колеса(протектора шины)

for i = 1 to n_ko

M_dvi_vert(i) =0
M_dvi_pop(i) =0
M_dvi_prod(i) =0
rem обнуление... на всякий случай

rem - для вертикальной составляющей(vert)

if del_S_ko_vert(i) > 0  then

    if L_tre_okr(i) > 0 then
    
        if L_tre_vert(i) > 0 then M_dvi_vert(i) =  - E_tre_vert(i)
        if L_tre_vert(i) = 0 then M_dvi_vert(i) = E_prot_vert(i)
        if L_tre_vert(i) < 0 then M_dvi_vert(i) =  - E_tre_vert(i)
    
    elseif L_tre_okr(i) = 0 then
    
        if L_tre_vert(i) > 0 then M_dvi_vert(i) =  - E_tre_vert(i)
    
    elseif L_tre_okr(i) < 0 then
        
        if L_tre_vert(i) > 0 then M_dvi_vert(i) =  - E_tre_vert(i)
    
    end if
    
elseif del_S_ko_vert(i) = 0  then
    
    if L_tre_okr(i) > 0 then
    
        if L_tre_vert(i) < 0 then M_dvi_vert(i) =  - E_tre_vert(i)
    
    elseif L_tre_okr(i) = 0 then

        if L_tre_vert(i) = 0 then M_dvi_vert(i) = E_prot_vert(i)

    elseif L_tre_okr(i) < 0 then
    
        if L_tre_vert(i) > 0 then M_dvi_vert(i) =  - E_tre_vert(i)
        
    end if

elseif del_S_ko_vert(i) < 0  then

    if L_tre_okr(i) > 0 then
    
        if L_tre_vert(i) < 0 then M_dvi_vert(i) =  - E_tre_vert(i)
    
    elseif L_tre_okr(i) = 0 then
    
        if L_tre_vert(i) < 0 then M_dvi_vert(i) =  - E_tre_vert(i)

    elseif L_tre_okr(i) < 0 then
    
        if L_tre_vert(i) > 0 then M_dvi_vert(i) =  - E_tre_vert(i)
        if L_tre_vert(i) = 0 then M_dvi_vert(i) = E_prot_vert(i)
        if L_tre_vert(i) < 0 then M_dvi_vert(i) =  - E_tre_vert(i)

    end if

end if

rem - для поперечной составляющей(pop)

if nalevo=1 & ko_do_rul(i)=1 or napravo=1 & ko_do_rul(i)=-1 then
rem колесо повернуто налево


    if del_S_ko_pop(i) > 0  then
        if L_tre_okr(i) > 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)    
            if L_tre_pop(i) = 0 then M_dvi_pop(i) = E_prot_pop(i)
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) = 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
    
        elseif L_tre_okr(i) < 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            
        end if
    
    elseif del_S_ko_pop(i) = 0  then
    
        if L_tre_okr(i) > 0 then
        
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) = 0 then
        
            if L_tre_pop(i) = 0 then M_dvi_pop(i) = E_prot_pop(i)
        
        elseif L_tre_okr(i) < 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            
        end if
    
    elseif del_S_ko_pop(i) < 0  then
    
        if L_tre_okr(i) > 0 then
        
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        if L_tre_okr(i) = 0 then
        
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            
        if L_tre_okr(i) < 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            if L_tre_pop(i) = 0 then M_dvi_pop(i) = E_prot_pop(i)
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)

        end if

    end if

elseif napravo=1 & ko_do_rul(i)=1 or nalevo=1 & ko_do_rul(i)=-1 then
rem колесо повернуто направо

    if del_S_ko_pop(i) > 0  then
    
        if L_tre_okr(i) > 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) = 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) < 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            if L_tre_pop(i) = 0 then M_dvi_pop(i) =  - E_prot_pop(i)
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
    
        end if
    
    elseif del_S_ko_pop(i) = 0  then
    
        if L_tre_okr(i) > 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) = 0 then
        
            if L_tre_pop(i) = 0 then M_dvi_pop(i) =  - E_prot_pop(i)
            
        elseif L_tre_okr(i) < 0 then
        
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        end if
    
    elseif del_S_ko_pop(i) < 0  then
    
        if L_tre_okr(i) > 0 then
        
            if L_tre_pop(i) > 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            if L_tre_pop(i) = 0 then M_dvi_pop(i) =  - E_prot_pop(i)
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) = 0 then
        
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
        
        elseif L_tre_okr(i) < 0 then
        
            if L_tre_pop(i) < 0 then M_dvi_pop(i) =  - E_tre_pop(i)
            
        end if

    end if

end if

rem - для продольной составляющей(prod)


if del_S_ko_prod(i) > 0  then

    if L_tre_okr(i) > 0 then
        if L_tre_prod(i) > 0 then M_dvi_prod(i) =  - E_tre_prod(i)
        if L_tre_prod(i) = 0 then M_dvi_prod(i) = E_prot_prod(i)
        if L_tre_prod(i) < 0 then M_dvi_prod(i) =  - E_tre_prod(i)
    
    elseif L_tre_okr(i) = 0 then
        
        if L_tre_prod(i) > 0 then M_dvi_prod(i) =  - E_tre_prod(i)
    
    elseif L_tre_okr(i) < 0 then
    
        if L_tre_prod(i) > 0 then M_dvi_prod(i) =  - E_tre_prod(i)
        
    end if

elseif del_S_ko_prod(i) = 0  then

    if L_tre_okr(i) > 0 then
    
        if L_tre_prod(i) < 0 then M_dvi_prod(i) =  - E_tre_prod(i)
    
    elseif L_tre_okr(i) = 0 then
    
        if L_tre_prod(i) = 0 then M_dvi_prod(i) = E_prot_prod(i)
    
    elseif L_tre_okr(i) < 0 then
    
        if L_tre_prod(i) > 0 then M_dvi_prod(i) =  - E_tre_prod(i)
        
    end if

elseif del_S_ko_prod(i) < 0  then

    if L_tre_okr(i) > 0 then
    
        if L_tre_prod(i) < 0 then M_dvi_prod(i) =  - E_tre_prod(i)
    
    elseif L_tre_okr(i) = 0 then
    
        if L_tre_prod(i) < 0 then M_dvi_prod(i) =  - E_tre_prod(i)
        
    elseif L_tre_okr(i) < 0 then
    
        if L_tre_prod(i) > 0 then M_dvi_prod(i) =  - E_tre_prod(i)
        if L_tre_prod(i) = 0 then M_dvi_prod(i) = E_prot_prod(i)
        if L_tre_prod(i) < 0 then M_dvi_prod(i) =  - E_tre_prod(i)

    end if

end if

next i

end sub
