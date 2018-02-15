Attribute VB_Name = "sub_soprokatwin"
Option Explicit
Global j#, i#
Global R_win#, dis0#, o_phi_udar#, o_phi_progib#, PI#, dis21#, dis6#, dis7#, V_PROGIB#, o_phi_kat#, PART_PROGIB#, koordinata#
Global F_kat#, o_omega_prot#, dt#, PROGIB_alt#, R_kat_alt#, SOPROKAT#, PROKAT#, OTDAET#, DAET#, F_win_rez#, C_win_rez#, na101#
Global XVX#
global VX#(101)
Global omega1#, omega2#, PROGIB#, F_tek#, m_tek#, m_prot#, t_vsled#, V_rubber#
Global V_NAK#, P_NAK#, V_tek#, P_tek#, g_acc#, m_gruz#

Sub SOPROKATWIN()

j = 0
i = 0
R_win = 0
dis0 = 0
o_phi_udar = 0
o_phi_progib = 0
PI = 0

dis21 = 0
dis6 = 0
dis7 = 0
V_PROGIB = 0
o_phi_kat = 0
PART_PROGIB = 0
koordinata = 0
F_kat = 0
o_omega_prot = 0
'dt = 0
PROGIB_alt = 0
R_kat_alt = 0
SOPROKAT = 0
OTDAET = 0
PROKAT = 0
DAET = 0
F_win_rez = 0
C_win_rez = 0
F_kat=0

XVX = 0
for i  = 1 to 101 
VX(i)=0
next i
i=0
omega1 = 0
omega2 = 0
PROGIB = 0
F_tek = 0
m_tek = 0
m_prot = 0
t_vsled = 0
V_rubber = 0

V_NAK=0
P_NAK=0
V_tek=0
P_tek=0
m_gruz=0


Dim docell As Object
Set docell = Workbooks("SOPROKATW.xls").Worksheets("soprokatlist")

docell.Columns("D:G").Select
Selection.ClearContents

R_win = docell.cells(1, 2).value / 1000
dis0 = docell.cells(2, 2).value / 1000

dis21 = docell.cells(4, 2).value / 1000
V_PROGIB = docell.cells(6, 2).value * docell.cells(5, 2).value / 100
omega1 = docell.cells(7, 2).value
omega2 = docell.cells(8, 2).value
C_win_rez = docell.cells(9, 2).value
m_prot = docell.cells(10, 2).value
dis6 = docell.cells(11, 2).value/1000
dis7 = docell.cells(12, 2).value/1000
P_NAK = docell.cells(13, 2).value
m_gruz = docell.cells(14, 2).value
PI = 3.141592654
g_acc = 9.806
'dt = 0.01

V_NAK = dis21*(dis7^2-dis6^2)*PI
o_phi_udar = 2 * acosinus(dis0 / R_win)
MsgBox ("o_phi_udar=" & o_phi_udar & "[deg]" & Chr(13) & "dis0=" & dis0 & "[m]" & Chr(13) & "R_win=" & R_win & "[m]" )

For o_phi_progib = 0 To o_phi_udar Step o_phi_udar / 1000
    o_phi_kat = o_phi_progib / 2
    V_PROGIB = dis21*(PI*dis7^2*2*o_phi_kat/360-dis7*cosinus(o_phi_kat)*sinus(o_phi_kat))
    V_tek=V_NAK-V_PROGIB
    P_tek=P_NAK*V_NAK/V_tek
    If m_gruz*g_acc <= (((P_tek-10^5)*dis21*PI/180*o_phi_progib*R_win)+((R_win-cosinus(o_phi_kat)*R_win)*C_win_rez)) Then
    'If m_gruz*g_acc <= (((P_tek-10^5)*dis21*2*sinus(o_phi_kat)*R_win)+((R_win-cosinus(o_phi_kat)*R_win)*C_win_rez)) Then
        i = 1 ' MsgBox ("случилось"): i = 1
        PROGIB = R_win * (1 - cosinus(o_phi_kat))
        'F_win_rez = C_win_rez * PROGIB
        
        MsgBox ("o_phi_kat=" & o_phi_kat & "[deg]" & Chr(13) & "o_phi_progib=" & o_phi_progib & "[deg]" & Chr(13) & "o_phi_udar=" & o_phi_udar & "[deg]" & Chr(13) & "PROGIB=" & PROGIB & "[m]")
        Exit For
    End If
Next o_phi_progib
If i = 0 Then
PROGIB = R_win * (1 - cosinus(o_phi_udar/2))
MsgBox ("прогиб до ступицы :) едем на ободах")  ': GoTo konec
Else
Rem MsgBox ("PROGIB=" & PROGIB)
End If

for na101 = 0 to 1 step 0.01
R_kat_alt=R_kat_alt+1 / cosinus(o_phi_kat * na101)
next na101
R_kat_alt=R_kat_alt/101* (R_win - PROGIB)

PROGIB_alt = R_win - R_kat_alt
MsgBox ("R_kat_alt=" & R_kat_alt & "[m]"  & Chr(13) & "PROGIB_alt=" & PROGIB_alt & "[m]" & Chr(13) & "PROGIB=" & PROGIB & "[m]" )

koordinata = 0
 rem мдлывотамдлывотамлдвоа
For o_omega_prot = omega1 To omega2 Step (omega2 - omega1) / 100

call ALLNULL

for na101 = 0 to 1 step 0.01
OTDAET = OTDAET + sinus(o_phi_kat * na101) * OTDAET_YES_NO(o_phi_kat * na101)
next na101
OTDAET=OTDAET/101

for na101 = 0 to 1 step 0.01
DAET = DAET + S_otd(o_phi_kat * na101) 
next na101
DAET = DAET/101
OTDAET = OTDAET *DAET

'Call XVOST

for na101 = 0 to 1 step 0.01
SOPROKAT=SOPROKAT + S_vpr(o_phi_kat * na101)
'S_vpr(o_phi_kat * na101)
next na101
SOPROKAT=SOPROKAT/101
'SOPROKAT=SOPROKAT/101
'PROKAT=PROKAT/101
'SOPROKAT=SOPROKAT*PROKAT

Call NULLVX

    docell.cells(1, 4).value = "V"
    docell.cells(1, 5).value = "F_kat"
    docell.cells(2, 4).value = "[km/h]"
    docell.cells(2, 5).value = "[N]"
    docell.cells(1, 6).value = "SOPROKAT"
    docell.cells(1, 7).value = "OTDAET"
    docell.cells(2, 6).value = "[%/100]"
    docell.cells(2, 7).value = "[%/100]"

    F_kat =  (SOPROKAT-OTDAET) * C_win_rez
    docell.cells(koordinata + 3, 4).value = o_omega_prot * (R_win-PROGIB)*3.6
    docell.cells(koordinata + 3, 5).value = F_kat
    docell.cells(koordinata + 3, 6).value = SOPROKAT
    docell.cells(koordinata + 3, 7).value = OTDAET
    docell.cells(1,3).value = koordinata
koordinata = koordinata + 1
Next o_omega_prot

konec:
End Sub

Function S_otd(x)

F_tek = C_win_rez * (R_win - (R_win-PROGIB)/cosinus(o_phi_kat - x))

m_tek = m_prot / 360 * o_phi_kat / 101

t_vsled = ((o_phi_kat - x) * PI / 180) / o_omega_prot

PART_PROGIB = F_tek / m_tek * t_vsled ^ 2 / 2

If PART_PROGIB >= PROGIB Then
    S_otd = PROGIB
Else
    S_otd = PART_PROGIB
End If

end function

function S_vpr(y)

dim ix,jx

    F_tek = C_win_rez * (R_win - (R_win-PROGIB)/cosinus(o_phi_kat - y))
    
    m_tek = m_prot / 360 * o_phi_kat / 101

for ix = 0 to o_phi_kat step o_phi_kat/100
    
    t_vsled = (ix+360-y-o_phi_kat) * PI / 180 / o_omega_prot
    
    PART_PROGIB = F_tek / m_tek * t_vsled ^ 2 / 2
    
    for jx = 0 to o_phi_kat step o_phi_kat/100
    
        if ((R_win-PROGIB)+PART_PROGIB) >= R_kat_tek(o_phi_kat-jx) then
        'S_vpr=R
            S_vpr=(R_kat_tek(o_phi_kat-jx)-(R_win-PROGIB))*sinus(o_phi_kat-jx)
            'SOPROKAT = SOPROKAT + sinus(o_phi_kat-jx)
            'PROKAT = PROKAT + R_kat_tek(o_phi_kat-jx)-(R_win-PROGIB)
            goto konnec
        end if
    
    next jx

next ix

konnec:

End function

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

Sub XVOST()

Dim XVOSTVX

For XVOSTVX = XVX + 1 To 101

    VX(XVOSTVX)=0

next XVOSTVX 

End Sub

Sub NULLVX()

Dim NOMER

For NOMER = 1 To 101

VX(NOMER)=0
   
Next NOMER

End Sub

Sub ALLNULL()

SOPROKAT=0
OTDAET=0
XVX = 0
DAET=0
PROKAT=0
end sub

Function OTDAET_YES_NO(x)

F_tek = C_win_rez * (R_win - (R_win-PROGIB)/cosinus(o_phi_kat - x))
t_vsled = x * PI / 180 / o_omega_prot
m_tek = m_prot / 360 * o_phi_kat / 101
V_rubber = t_vsled * F_tek / m_tek
If V_rubber * cosinus(x) > o_omega_prot * R_kat_tek(x) * sinus(x) Then
    OTDAET_YES_NO = 1
    XVX = XVX + 1
    VX(XVX) = 0
Else
    OTDAET_YES_NO = 0
    XVX = XVX + 1
    VX(XVX) = x / o_phi_kat
        
End If

End Function
