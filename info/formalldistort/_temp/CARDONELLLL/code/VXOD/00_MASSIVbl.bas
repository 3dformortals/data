Attribute VB_Name = "MASSIVbl"

rem массивы для начальных условий и др
Global timemove# rem текущее время движения
Global Const dt = 0.01 rem приращение времени в секундах
rem время и его изменение

Global DOROGA# 'номер дороги из набора
Global NEROVNO# 'номер неровностей из набора
Global KORPUS# 'номер корпуса из набора
Global n_ko# 'число колес автомобиля
Global del_X_rul# 'смещение вдоль oX точки нулевой поворачиваемости колес от X_cm
Global ugol_ko_max# 'максимальный конструктивный угол поворота колес в градусах
Global KAK_POEDEM# 'номер режима движения
Global POEDEM_DO# 'величина после которой совершается торможение или др. действие
Global EDEM_KUSOK# 'едем на отрезке
Global KUSOK_OT# 'отрезок от X1
Global KUSOK_DO# 'отрезок до X2
Global IDUET_VETER# 'и дует ветер?
Global VETER# 'скорость ветра м/с
Global IDUET_REZKO# 'и дует резкими порывами?
Global REZKO_OT# 'дует резкими порывами от %
Global REZKO_DO# 'дует резкими порывами до %
Global UGOL_VETRA# 'направление ветра в градусах
Global MAX_SKOR_YES# 'скорость движения ограничена
Global MAX_SKOR# 'максимальная скорость движения м/с
Global START_SKOR_YES# 'есть начальная скорость движения
Global START_SKOR# 'начальная скорость движения м/с
Global del_Y_kurs# 'смещение поперечной координаты точки курса относительно первоначального положения центра масс мм
'массивы для входных данных с листа "ГЛАВНАЯ"

Global NOMER_DSU#() 'номер ДСУ из набора для каждого колеса
Global OPIS_DSU$() 'описание ДСУ из набора для каждого колеса
Global TORMOZA#() 'вариант тормозной системы для каждого колеса
Global ASS#() 'есть 1 или нет 0 антипробуксовочная система для каждого колеса
Global ACC#() 'участвует 1 или нет 0 в активном ускорении для каждого колеса
Global RPS_MAX#() 'максимальные обороты управляемого колеса
'массивы для входных данных с листа "НАБОР_ДСУ"

Global NOMER_KO#() 'номер колеса в наборе
Global OPIS_KO$() 'описание колеса (название колеса)
Global GEO_WIN#() 'ТИП ГЕОМЕТРИИ ШИНЫ 0-ГОЛАЯ 1-ЕЛОЧКА 2-ЗМЕЙКА
Global o_phi_ris#()
Global RIS_STEP#()
Global GRIP#()
Global WEVRONOV#()
Global RR#()
Global GRIP#()
Global Rwin_geom#()
Global dik0#()
Global dik1#()
Global dik2#()
Global dik3#()
Global dik4#()
Global dik5#()
Global dik6#()
Global dik7#()
Global dik8#()
Global dik9#()
Global dik10#()
Global dik11#()
Global dik12#()
Global dik13#()
Global dik14#()
Global dik15#()
Global dik16#()
Global dik17#()
Global dik18#()
Global dik19#()
Global dik20#()
Global dik21#()
Global dis0#()
Global dis1#()
Global dis2#()
Global dis3#()
Global dis4#()
Global dis5#()
Global dis6#()
Global dis7#()
Global dis8#()
Global dis9#()
Global dis10#()
Global dis11#()
Global dis12#()
Global dis13#()
Global dis14#()
Global dis15#()
Global dis16#()
Global dis17#()
Global dis18#()
Global dis19#()
Global dis20#()
Global dis21#()
Global o_rho1#()
Global o_rho2#()
Global o_rho3#()
Global o_rho4#()
Global o_rho5#()
Global o_rho6#()
Global o_rho7#()
Global o_rho8#()
Global o_rho9#()
Global o_rho10#()
Global o_rho11#()
Global o_rho12#()
Global o_rho13#()
Global o_rho14#()
Global proc_Me4#()
Global proc_Me5#()
Global proc_Me6#()
Global proc_Me7#()
Global proc_Me8#()
Global proc_Me9#()
Global proc_Me10#()
Global proc_Me11#()
Global proc_Me12#()
Global proc_Me13#()
Global proc_Me14#()
Global o_rho_Me4#()
Global o_rho_Me5#()
Global o_rho_Me6#()
Global o_rho_Me7#()
Global o_rho_Me8#()
Global o_rho_Me9#()
Global o_rho_Me10#()
Global o_rho_Me11#()
Global o_rho_Me12#()
Global o_rho_Me13#()
Global o_rho_Me14#()
Global m1#()
Global m2#()
Global m3#()
Global m4#()
Global m5#()
Global m6#()
Global m7#()
Global m8#()
Global m9#()
Global m10#()
Global m11#()
Global m12#()
Global m13#()
Global m14#()
Global J1#()
Global J2#()
Global J3#()
Global J4#()
Global J5#()
Global J6#()
Global J7#()
Global J8#()
Global J9#()
Global J10#()
Global J11#()
Global J12#()
Global J13#()
Global J14#()
Global J_dop#()
Global J_wstu#()
Global J_kord#()
Global J_prot#()
Global J_kol#()
Global J_stu#()
Global J_win#()
Global m_dop#()
Global m_ko#()
Global P_NAK#()
Global T_NAK#()
Global rad0#()
Global rad1#()
Global rad2#()
Global rad3#()
Global rad4#()
Global F0#()
Global F1#()
Global F2#()
Global F3#()
Global F4#()
Global okr0#()
Global okr1#()
Global okr2#()
Global okr3#()
Global okr4#()
Global M0#()
Global M1#()
Global M2#()
Global M3#()
Global M4#()
Global SOO#()
Global FOO#()
Global L_TW#()
Global H_TW#()
Global E_TW#()
global coso_phi_TW#()
global S_TW#()
'массивы для входных данных с листа "НАБОР_КОЛЕС"

Global NOMER_AMO#() 'номер амортизатора в наборе
Global OPIS_AMO$() 'описание амортизатора (название амортизатора)
Global YES_AMO#() 'упругость системы 0 = блокирован 1 = сжимаемый 
Global YES_RUL#() 'рулевая управляемость системы 0 = статичный 1 = управляемый 
Global D_amo#()
Global S_amo#()
Global F_amo0#()
Global F_amo1#()
Global F_amo2#()
Global F_amo3#()
Global F_amo4#()
Global PRO0#()
Global PRO1#()
Global PRO2#()
Global PRO3#()
Global PRO4#()
'массивы для входных данных с листа "НАБОР_АМОРТИЗАТОРОВ"

global NOMER_KOR# 'номер корпуса в наборе
global OPIS_KOR$ 'описание корпуса (название корпуса)
global D_down#
global D_up#
global D_right#
global D_left#
global D_back#
global D_front#
global m_korp#
global J_vert#
global J_pop#
global J_prod#
global Cx_down#
global Cx_up#
global Cx_right#
global Cx_left#
global Cx_back#
global Cx_front#
global NAME_GIF$ 'НАЗВАНИЕ РИСУНКА GIF
'массивы для входных данных с листа "НАБОР_КОРПУСОВ"

global del_X_ko#() 'смещение ko относительно cm в момент старта
global del_Y_ko#() 'смещение ko относительно cm в момент старта
global del_Z_ko#() 'смещение ko относительно cm в момент старта
global zadok# 'наиболее удаленная дистанция от cm до ko+Rwin назад
global peredok# 'наиболее удаленная дистанция от cm до ko+Rwin вперед
global levobok# 'наиболее удаленная дистанция от cm до ko+Rwin влево
global pravobok# 'наиболее удаленная дистанция от cm до ko+Rwin вправо
global posadka# 'наиболее удаленная дистанция от cm до ko+Rwin вниз
global X_tra# 'текущая координата X трассы для расчета Z трассы
global Z_tra#() 'координата Z точки трассы в зависимости от координаты X
global tip_seg#() 'тип сегмента
global lin_seg#() 'длина сегмента
global par_seg#() 'параметр сегмента
'массивы для входных данных с листа "НАБОР_ДОРОГ"

global NOMER_MAT#() 'номер материала в наборе материалов
global OPIS_MAT#() 'описание материала сегмента дороги
global L_TW#() '
global H_TW#() '
global E_TW#() '
global a_e#() '
global b_e#() '
global c_e#() '
'массивы для входных данных с листа "МАТЕРИАЛЫ_ДОРОГ"

global tip_ner#() 'тип неровности
global lin_ner#() 'длина неровности
global par_ner#() 'параметр неровности
global n_povtor#() 'количество повторений неровности
global wag_ner#() 'шаг повторений неровности
'массивы для входных данных с листа "НАБОР_НЕРОВНОСТЕЙ"

rem массивы используемые в процессе вычислений

Global DATA_REZ#() 'массив для записи результатов
Global DOZAPISI# ' счетчик для записи через 0,1 сек
Global PRIEXALI# ' 1- движение прекращается
Global WHYSTOP$ ' причина остановки, записывается вручную
Global X_max_way# ' координата X после пересечения которой центром масс движение считается реализованным
Global Y_min_way# ' правая граница трассы, вылет за нее - остановка
Global Y_max_way# ' левая граница трассы, вылет за нее - остановка
Global POLE#() ' радиальная дистанция для обсчета пятна контакта колеса
Global dR_kat#() '(i,ko_n) радиус качения каждого элементарного треугольника пятна контакта
Global dPRO_win_rad#() '(i,ko_n) прогиб шины каждого элементарного треугольника пятна контакта
Global R_kat#() 'радиус качения шины в момент времени 1
Global R_kat_0#() 'радиус качения шины в момент времени 0

Global X_op#() 'текущая координата опоры каждого колеса
Global Y_op#() 'текущая координата опоры каждого колеса
Global Z_op#() 'текущая координата опоры каждого колеса
Global X_ko#() 'текущая координата центра каждого колеса
Global Y_ko#() 'текущая координата центра каждого колеса
Global Z_ko#() 'текущая координата центра каждого колеса
Global X_ko_0#() 'прежняя координата центра каждого колеса
Global Y_ko_0#() 'прежняя координата центра каждого колеса
Global Z_ko_0#() 'прежняя координата центра каждого колеса
Global D_vert_cm_op#() 'вертикальная дистанция от опоры до центра масс
Global D_pop_cm_op#() 'поперечная дистанция от опоры до центра масс
Global D_prod_cm_op#() 'продольная дистанция от опоры до центра масс
global X_cm# 'текущая координата центра масс
global Y_cm# 'текущая координата центра масс
global Z_cm# 'текущая координата центра масс
global A1# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global B1# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global C1# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global D1# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global A2# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global B2# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global C2# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global D2# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global A3# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global B3# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global C3# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
global D3# 'параметр трех перпендикулятных друг другу плоскостей описывающих положение корпуса
rem корпусные дела


rem для проги 01_sub_dots_around.bas

Global ugol_povorot_pravo#() 'какое колесо за какую часть угла поворота отвечает как ведущее...
Global ugol_povorot_levo#() '(i,2) i-число колес регулирующих отсчет поворота; 0-порядковый номер колеса из эл.табл. 1-угол от 2-угол до
Global n_ko_reg_p# 'число колес регулирующих поворот направо
Global n_ko_reg_l# 'число колес регулирующих поворот налево
Global X_kurs# 'координата точки курса
Global Y_kurs# 'координата точки курса
Global Z_kurs# 'координата точки курса
Global A_kurs# 'параметр плоскости курса
Global B_kurs# 'параметр плоскости курса
Global C_kurs# 'параметр плоскости курса
Global D_kurs# 'параметр плоскости курса
Global D_cm_rul# 'расстояние от cm до точки rul нулевой поворачиваемости колес
global X_rul# 'начальная координата X точки нулевой поворачиваемости колес
global Y_rul# 'начальная координата Y точки нулевой поворачиваемости колес
global Z_rul# 'начальная координата Z точки нулевой поворачиваемости колес
Global ko_do_cm#() 'находится колесо впереди 1, наравне 0, позади -1 центра масс по оси X
Global ko_do_rul#() 'находится колесо впереди 1, наравне 0, позади -1 точки нулевой поворачиваемости колес по оси X
Global ko_levee_cm#() 'колесо левее 1, наравне0, правее -1 центра масс по оси Y
Global ko_vblwe_cm#() 'первоначально колесо выше 1, наравне0, ниже -1 центра масс по оси Z
Global op_vblwe_cm#() 'опора выше 1, наравне0, ниже -1 центра масс по оси Z
Global napravo# 'поворот направо если = 1
Global nalevo# 'поворот налево если = 1
Global tra#() 'массив точек трассы
Global n_dS_kon#() 'число треугольников образующих пятно контакта каждого колеса
Global dS_kon_n# 'номер элементарного треугольника образующего пятно контакта
Global dS_kon#() 'площадь элементарного треугольника образующего пятно контакта
Global S_kon#() 'площадь контакта определенного колеса
Global ko_n# 'номер колеса(колесо_номер)
rem массивы для поворота колес


' массивы для вычисления работы трения.

