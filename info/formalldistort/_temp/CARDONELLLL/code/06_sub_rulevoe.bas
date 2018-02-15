Attribute VB_Name = "Sub_rulevoe"
Sub rulevoe(X_rul,Y_rul,Z_rul,X_ko(),Y_ko(),Z_ko())

dim i#,X_pred#,Y_pred#,start_p#,start_l#,ugol#,ugol_pred#,ugol_ot#,ugol_do#,kol_p_n#,kol_l_n#,X_ko_do#,Y_ko_do#,m_do#,n_do#,m_L#,n_L#

X_pred=0
Y_pred=0
ugol=0
ugol_ot=0
ugol_do=0
start_p=0
kol_p_n=0
n_ko_reg_p=0

rem направо
for i = 1 to n_ko
    if abs(X_rul-X_ko(i))>X_pred then
        X_pred = X_ko(i)
        Y_pred = Y_ko(i)
        start_p=i
    elseif abs(X_rul-X_ko(i))=X_pred then
        if Y_ko(i)<Y_pred then
            X_pred = X_ko(i)
            Y_pred = Y_ko(i)
            start_p=i
        end if
    end if
next i
rem определеяет первичное колесо поворота направо

X_ko_do = X_ko(start_p)
Y_ko_do = Y_ko(start_p)
m_do = 0
n_do = -1
do
ugol_pred=90
for i = 1 to n_ko
    if Y_ko(i)<Y_ko_do then
        m_L=X_ko(i)-X_ko_do
        n_L=Y_ko(i)-Y_ko_do
        ugol = acos(abs(cosLL(m_do,n_do,0,m_L,n_L,0)))
        if ugol<ugol_pred then
            ugol_do = acos(abs(cosLL(0,-1,0,m_L,n_L,0)))
            ugol_pred=ugol
            kol_p_n=i
            m_do=m_L
            X_ko_do=X_ko(i)
            n_do=n_L
            Y_ko_do=Y_ko(i)
            
        elseif ugol=ugol_pred then
            if Y_ko(i)<Y_pred then
                ugol_do = acos(abs(cosLL(0,-1,0,m_L,n_L,0)))
                ugol_pred=ugol
                kol_p_n=i
                m_do=m_L
                X_ko_do=X_ko(i)
                n_do=n_L
                Y_ko_do=Y_ko(i)
            end if
        end if
    end if
next i
if ugol>0 then
    n_ko_reg_p=n_ko_reg_p+1
    redim preserve ugol_pov_pravo(1 To n_ko_reg_p,2)
    ugol_pov_pravo(n_ko_reg_p,0)=kol_p_n
    ugol_pov_pravo(n_ko_reg_p,1)=ugol_ot
    ugol_pov_pravo(n_ko_reg_p,2)=ugol_do
    ugol_ot=ugol_do
    ugol=0
    
elseif ugol=0 then
    n_ko_reg_p=n_ko_reg_p+1
    redim preserve ugol_pov_pravo(1 To n_ko_reg_p,2)
    ugol_pov_pravo(n_ko_reg_p,0)=kol_p_n
    ugol_pov_pravo(n_ko_reg_p,1)=ugol_ot
    ugol_pov_pravo(n_ko_reg_p,2)=90
    exit do
end if
loop
rem определяет остальные колеса начала отсчета углов поворота направо и принадлежащие им отрезки углов от и до

X_pred=0
Y_pred=0
ugol=0
ugol_ot=0
ugol_do=0
start_l=0
kol_l_n=0
n_ko_reg_l=0

rem налево
for i = 1 to n_ko
    if abs(X_rul-X_ko(i))>X_pred then
        X_pred = X_ko(i)
        Y_pred = Y_ko(i)
        start_l=i
    elseif abs(X_rul-X_ko(i))=X_pred then
        if Y_ko(i)>Y_pred then
            X_pred = X_ko(i)
            Y_pred = Y_ko(i)
            start_l=i
        end if
    end if
next i
rem определеяет первичное колесо поворота налево

X_ko_do = X_ko(start_l)
Y_ko_do = Y_ko(start_l)
m_do = 0
n_do = 1
do
ugol_pred=90
for i = 1 to n_ko
     if Y_ko(i)>Y_ko_do then
        m_L=X_ko(i)-X_ko_do
        n_L=Y_ko(i)-Y_ko_do
        ugol = acos(abs(cosLL(m_do,n_do,0,m_L,n_L,0)))
        if ugol<ugol_pred then
            ugol_do = acos(abs(cosLL(0,1,0,m_L,n_L,0)))
            ugol_pred=ugol
            kol_l_n=i
            m_do=m_L
            X_ko_do=X_ko(i)
            n_do=n_L
            Y_ko_do=Y_ko(i)
            
        else if ugol=ugol_pred then
            if Y_ko(i)>Y_pred then
                ugol_do = acos(abs(cosLL(0,1,0,m_L,n_L,0)))
                ugol_pred=ugol
                kol_l_n=i
                m_do=m_L
                X_ko_do=X_ko(i)
                n_do=n_L
                Y_ko_do=Y_ko(i)
            end if
        end if
    end if
next i
if ugol>0 then
    n_ko_reg_l=n_ko_reg_l+1
    redim preserve ugol_pov_levo(1 To n_ko_reg_l,2)
    ugol_pov_levo(n_ko_reg_l,0)=kol_l_n
    ugol_pov_levo(n_ko_reg_l,1)=ugol_ot
    ugol_pov_levo(n_ko_reg_l,2)=ugol_do
    ugol_ot=ugol_do
    ugol=0
    
elseif ugol=0 then
    n_ko_reg_l=n_ko_reg_l+1
    redim preserve ugol_pov_levo(1 To n_ko_reg_l,2)
    ugol_pov_levo(n_ko_reg_l,0)=kol_l_n
    ugol_pov_levo(n_ko_reg_l,1)=ugol_ot
    ugol_pov_levo(n_ko_reg_l,2)=90
    exit do
end if
loop
rem определяет остальные колеса начала отсчета углов поворота налево и принадлежащие им отрезки углов от и до

end sub

rem ugol_pov_levo(i,2) i-число колес регулирующих отсчет поворота; 0-порядковый номер колеса из эл.табл. 1-угол от 2-угол до
