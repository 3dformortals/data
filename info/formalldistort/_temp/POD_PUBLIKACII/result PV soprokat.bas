Attribute VB_Name = "sub_soprokatwin"
Option Explicit
Global j#, i#, k#
Global R_win#, dis0#, o_phi_udar#, o_phi_progib#, PI#, dis21#, dis6#, dis7#, V_PROGIB#, o_phi_kat#, koordinata#
Global F_kat#, o_omega_prot#, PROGIB_alt#, R_kat_alt#, SOPROKAT#, OTDAET#, F_win_rez#, C_PROT#,C_KORD#, na100#
Global omega1#, omega2#, PROGIB#, m_tek#, m_prot#, m_kord#, m_prot_tek#, m_kord_tek#, V_rubber#
Global V_NAK#, P_NAK#, V_tek#, P_tek#, g_acc#, m_gruz#, RUBBER_PROT#, fi_step#
Global F_iner#, acc_d#, t_d#, s_d#, s_do#, v_d#, v_do#, F_I_D#, F_SOPR#, r_do#, A_SOPR#, NSOPROKAT#, NOTDAET#, N_kat#
global dik8#
Dim docell As Object



Sub SOPROKATWIN()

j = 0:  i = 0:  k = 0:  R_win = 0:  dis0 = 0:  o_phi_udar = 0:  o_phi_progib = 0:  PI = 0:   dis21 = 0:  dis6 = 0:  dis7 = 0:  V_PROGIB = 0
o_phi_kat = 0:   koordinata = 0:  F_kat = 0:  o_omega_prot = 0:   PROGIB_alt = 0:  R_kat_alt = 0:   F_win_rez = 0:  C_PROT = 0
omega1 = 0:  omega2 = 0:  PROGIB = 0:  m_tek = 0:  m_prot = 0:  V_rubber = 0:   V_NAK=0:  P_NAK=0
V_tek=0:  P_tek=0:  m_gruz=0:   F_iner=0:   acc_d=0:   C_KORD=0:  m_kord=0: m_prot_tek=0: m_kord_tek=0
t_d=0: s_d=0: s_do=0: v_d=0: v_do=0: F_I_D=0: F_SOPR=0: r_do=0: A_SOPR=0: NSOPROKAT=0: NOTDAET=0: N_kat=0: fi_step=0
dik8=0: RUBBER_PROT=0
Set docell = Workbooks("SOPROKATW.xls").Worksheets("soprokatlist")
docell.Columns("D:F").Select
Selection.ClearContents
call DATA_VXOD
call GRANICA



For o_omega_prot = omega1 To omega2 Step (omega2 - omega1) / 100

call ALLNULL

fi_step = 1/1000
m_prot_tek= m_prot *o_phi_kat /360*fi_step

for na100 = o_phi_kat*fi_step to o_phi_kat step o_phi_kat*fi_step

SOPROKAT = SOPROKAT +(C_PROT* (dik8*fi_step *PI/180 * R_win)^2 * s_d*(o_phi_kat-na100)*sinus(na100))   + m_prot_tek * (o_omega_prot * R_kat_tek(0))^2/(2*2*PI*R_kat_tek(0)) *sinus(na100)

next na100



call ZAPISKA

Next o_omega_prot

konec:



End Sub

Function R_kat_tek(x)

R_kat_tek = (R_win-PROGIB)/cosinus(x)

end Function

Function sinus(x)
Dim sind#
sind = sin(x * PI / 180)
sinus = sind
End Function

Function cosinus(x)
Dim cosd#
cosd = cos(x * PI / 180)
cosinus = cosd
End Function

Function acosinus(x)

acosinus = Application.WorksheetFunction.Degrees(Application.WorksheetFunction.ACOS(x))

end Function

Sub ALLNULL()

SOPROKAT=0
OTDAET=0
s_do=0: v_do=0: A_SOPR=0: NSOPROKAT=0: NOTDAET=0

end sub

sub DATA_VXOD

R_win = docell.cells(1, 2).value / 1000
dis0 = docell.cells(2, 2).value / 1000

dis21 = docell.cells(4, 2).value / 1000
V_PROGIB = docell.cells(6, 2).value * docell.cells(5, 2).value / 100
omega1 = docell.cells(7, 2).value
omega2 = docell.cells(8, 2).value
C_PROT = docell.cells(9, 2).value
m_prot = docell.cells(10, 2).value
dis6 = docell.cells(11, 2).value/1000
dis7 = docell.cells(12, 2).value/1000
P_NAK = docell.cells(13, 2).value
m_gruz = docell.cells(14, 2).value
RUBBER_PROT = docell.cells(15, 2).value
C_KORD=docell.cells(16, 2).value
m_kord=docell.cells(17, 2).value
dik8=docell.cells(18, 2).value/1000

PI = 3.141592654
g_acc = 9.806

end sub

sub GRANICA

V_NAK = dis21*(dis7^2-dis6^2)*PI
o_phi_udar = 2 * acosinus(dis0 / R_win)
MsgBox ("o_phi_udar=" & o_phi_udar & "[deg]" & Chr(13) & "dis0=" & dis0 & "[m]" & Chr(13) & "R_win=" & R_win & "[m]" )

For o_phi_progib = 0 To o_phi_udar Step o_phi_udar / 1000
    o_phi_kat = o_phi_progib / 2
    V_PROGIB = dis21*(PI*dis7^2*2*o_phi_kat/360-dis7*cosinus(o_phi_kat)*sinus(o_phi_kat))
    V_tek=V_NAK-V_PROGIB
    P_tek=P_NAK*V_NAK/V_tek
    If m_gruz*g_acc <= (((P_tek-10^5)*dis21*PI/180*o_phi_progib*R_win)+((R_win-cosinus(o_phi_kat)*R_win)*C_KORD)) Then
        i = 1
        PROGIB = R_win * (1 - cosinus(o_phi_kat))
        MsgBox ("o_phi_kat=" & o_phi_kat & "[deg]" & Chr(13) & "o_phi_progib=" & o_phi_progib & "[deg]" & Chr(13) & "o_phi_udar=" & o_phi_udar & "[deg]" & Chr(13) & "PROGIB=" & PROGIB & "[m]")
        Exit For
    End If
Next o_phi_progib
If i = 0 Then
    PROGIB = R_win * (1 - cosinus(o_phi_udar/2))
    MsgBox ("прогиб до ступицы :) едем на ободах")
End If



for na100 = 0 to 1 step 0.01
R_kat_alt=R_kat_alt+1 / cosinus(o_phi_kat * na100)
next na100
R_kat_alt=R_kat_alt/101* (R_win - PROGIB)

PROGIB_alt = R_win - R_kat_alt
MsgBox ("R_kat_alt=" & R_kat_alt & "[m]"  & Chr(13) & "PROGIB_alt=" & PROGIB_alt & "[m]" & Chr(13) & "PROGIB=" & PROGIB & "[m]" )

koordinata = 0
 
s_d =  P_tek / C_PROT


end sub

sub ZAPISKA

if koordinata =0 then
    docell.cells(1, 4).value = "V"
    docell.cells(1, 5).value = "F_kat"
    docell.cells(2, 4).value = "[km/h]"
    docell.cells(2, 5).value = "[N]"
    docell.cells(1, 6).value = "[N_kat]"
    docell.cells(2, 6).value = "[kW/h]"

end if
    F_kat =  SOPROKAT
    N_kat =  (NSOPROKAT) '* 3600/1000
    docell.cells(koordinata + 3, 4).value = o_omega_prot * (R_win-PROGIB)*3.6
    docell.cells(koordinata + 3, 5).value = F_kat
    docell.cells(koordinata + 3, 6).value = N_kat

    
    docell.cells(1,3).value = koordinata
koordinata = koordinata + 1

end sub
