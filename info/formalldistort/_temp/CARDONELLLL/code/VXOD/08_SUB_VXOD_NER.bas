Attribute VB_Name = "Sub_VXOD_NER"
Sub VXOD_NER()

dim i#,j#,k#,n_ner#

n_ner=0
do while val(DOCELL_NER.CELLS(NEROVNO*10-9,n_ner+1).value) = 2 and n_ner+1<=256 or val(DOCELL_NER.CELLS(NEROVNO*10-9,n_ner+1).value) = 1 and n_ner+1<=256 or val(DOCELL_NER.CELLS(NEROVNO*10-9,n_ner+1).value) = 0 and n_ner+1<=256
n_ner=n_ner+1
loop

redim tip_ner(n_ner) 'тип неровности
redim lin_ner(n_ner) 'длина неровности
redim par_ner(n_ner) 'параметр неровности
redim n_povtor(n_ner) 'количество повторений неровности
redim wag_ner(n_ner) 'шаг повторений неровности

for i = 1 to n_ner

tip_ner(i) =val(DOCELL_NER.CELLS(NEROVNO*10-9,i).value)
lin_ner(i) =val(DOCELL_NER.CELLS(NEROVNO*10-8,i).value)
par_ner(i)=val(DOCELL_NER.CELLS(NEROVNO*10-7,i).value)
n_povtor(i)=val(DOCELL_NER.CELLS(NEROVNO*10-6,i).value)
wag_ner(i)=val(DOCELL_NER.CELLS(NEROVNO*10-5,i).value)

next i

X_ner = 0

for k = 1 to n_ner

    for j = 1 to n_povtor(k)
    
        if tip_ner(k) = 0 then
        
            for i = 1 to lin_ner(k)
                X_ner=X_ner+1
                if X_ner>X_tra then goto konec
            
                if i>0 and i<= 0.25*lin_ner(k) then
                
                    Z_tra(X_ner)=Z_tra(X_ner)+par_ner(k)-par_ner(k)*(1-i^2/(0.25*lin_ner(k))^2)^0.5
                
                elseif i>0.25*lin_ner(k) and i<= 0.5*lin_ner(k)
                
                    Z_tra(X_ner)=Z_tra(X_ner)+par_ner(k)+par_ner(k)*(1-(0.25*lin_ner(k)-i)^2/(0.25*lin_ner(k))^2)^0.5
                
                elseif i>0.5*lin_ner(k) and i<=0.75*lin_ner(k)
                
                    Z_tra(X_ner)=Z_tra(X_ner)+par_ner(k)+par_ner(k)*(1-i^2/(0.25*lin_ner(k))^2)^0.5
                
                elseif i>0.75*lin_ner(k) and i<=lin_ner(k)
                
                    Z_tra(X_ner)=Z_tra(X_ner)+par_ner(k)-par_ner(k)*(1-(0.25*lin_ner(k)-i)^2/(0.25*lin_ner(k))^2)^0.5
                
                end if
            
            next i
                
        elseif tip_ner(k)=1 then
        
            for i = 1 to lin_ner(k)
                X_ner=X_ner+1
                if X_ner>X_tra then goto konec
            
                if i >0 and i<= 0.5*lin_ner(k) then
                
                    Z_tra(X_ner)=Z_tra(X_ner)+i*tan(par_ner(k))
                
                elseif i>0.5*lin_ner(k) and i<= lin_ner(k) then
                
                    Z_tra(X_ner)=Z_tra(X_ner)+(lin_ner(k)-(i-lin_ner(k)))*tan(par_ner(k))
                
                end if
            
            next i
        
        elseif tip_ner(k)=2 then
        
            for i = 1 to lin_ner(k)
                 X_ner=X_ner+1
                if X_ner>X_tra then goto konec
                Z_tra(X_ner)=Z_tra(X_ner)+par_ner(k)
            
            next i
        
        end if
    X_ner=X_ner-lin_ner(k)+wag_ner(k)
    next j

next k

konec:

END SUB
