Attribute VB_Name = "Sub_VXOD_DSU"
Sub VXOD_DSU()

dim i#

redim NOMER_DSU(1 To n_ko) 'номер ДСУ из набора для каждого колеса
redim OPIS_DSU(1 To n_ko) 'описание ДСУ из набора для каждого колеса
redim TORMOZA(1 To n_ko) 'вариант тормозной системы для каждого колеса
redim ASS(1 To n_ko) 'есть 1 или нет 0 антипробуксовочная система для каждого колеса
redim ACC(1 To n_ko) 'участвует 1 или нет 0 в активном ускорении для каждого колеса
redim RPS_MAX(1 To n_ko) 'максимальные обороты управляемого колеса

for i = 1 to n_ko
NOMER_DSU(i)=int(val(DOCELL_DSU.CELLS(int(val(DOCELL_GLA.CELLS(i+1,8).VALUE)),1).VALUE))
OPIS_DSU(i)=DOCELL_DSU.CELLS(int(val(DOCELL_GLA.CELLS(i+1,8).VALUE)),2).VALUE
TORMOZA(i)= int(val(DOCELL_DSU.CELLS(int(val(DOCELL_GLA.CELLS(i+1,8).VALUE)),3).VALUE))
ASS(i)= int(val(DOCELL_DSU.CELLS(int(val(DOCELL_GLA.CELLS(i+1,8).VALUE)),4).VALUE))
ACC(i)= int(val(DOCELL_DSU.CELLS(int(val(DOCELL_GLA.CELLS(i+1,8).VALUE)),5).VALUE))
RPS_MAX(i)= val(DOCELL_DSU.CELLS(int(val(DOCELL_GLA.CELLS(i+1,8).VALUE)),6).VALUE)
next i

END SUB
