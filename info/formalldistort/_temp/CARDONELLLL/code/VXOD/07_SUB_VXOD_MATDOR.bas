Attribute VB_Name = "Sub_VXOD_MATDOR"
Sub VXOD_MATDOR(j)

redim NOMER_MAT(X_tra) 'номер материала сегмента в наборе материалов
redim OPIS_MAT(X_tra) 'описание материала сегмента дороги
redim L_TW(X_tra)
redim H_TW(X_tra)
redim E_TW(X_tra)
redim a_e(X_tra)
redim b_e(X_tra)
redim c_e(X_tra)

NOMER_MAT(X_tra)=DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,1).value
OPIS_MAT(X_tra) = DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,2).value
L_TW(X_tra) =DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,3).value
H_TW(X_tra) =DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,4).value
E_TW(X_tra) =DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,5).value
a_e(X_tra) =DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,6).value
b_e(X_tra) =DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,7).value
c_e(X_tra) =DOCELL_MATDOR.CELLS(DOCELL_NABDOR.CELLS(DOROGA*5-1,j).VALUE,8).value

END SUB
