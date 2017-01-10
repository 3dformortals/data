import os, sys, datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(__file__)

print("------------mydir------------")
print(mydir)
print("------------------------")

contour = input("через пробел [толщина контура px] [число контуров]. например 1 3"
              "\nspace separated [contour width px] [contour number]. example 1 3 ")
try:
    contourw,contourn = contour.split(" ",1)
    contourw, contourn = int(contourw),int(contourn)
    contourn = contourn if abs(contourn)< 256 and abs(contourn) > 0 else 3
    contourw = contourw if contourw > 0 else 1
except:
    print("----bad input data----")
    print(sys.exc_info())
    contourw,contourn = 1,3

print("толщина контура/contour width",contourw,"px")
print("число контуров/contour number",contourn)

def diftimestring(starttime,endtime):
    """разница во времени как строка ... для печати"""
    dt=endtime-starttime
    dtsecund=str(int(dt/datetime.timedelta(seconds=1)))
    dtminut=str(int(dt/datetime.timedelta(minutes=1)))
    dthour=str(int(dt/datetime.timedelta(hours=1)))
    return dthour+"h:"+dtminut+"m:"+dtsecund+"s"

def firstloop_color_mark(basealp,progres):
    """первый заход. отмечает как -1 все не прозрачные пиксели оригинала"""
    h=len(basealp) # высота столбца
    w=len(basealp[0]) # длина строки
    for i in range(h):
        if i in [0,h-1]:continue
        for j in range(w):
            if j in [0,w-1]:continue
            if basealp[i][j] >0:
                basealp[i][j] =-1
                progres[0]+=1
    pass

def basealp_full_changed():
    """проверяет есть не -1 пиксели, или завершает обработку. НЕ ИСПОЛЬЗУЕТСЯ"""
    h=len(basealp) # высота столбца
    w=len(basealp[0]) # длина строки
    for i in range(h):
        if i in [0,h-1]:continue
        for j in range(w):
            if j in [0,w-1]:continue
            if basealp[i][j] >-1:return False
    return True

def kontur_counter(h,w,kontur,basealp,firstloop):
    """создает конутр для обхода границы прозрачности"""
    newkontur=[]
    dh=list(h[1:-1])
    dw=list(w[1:-1])
    if firstloop:
        for y in dh:
            for x in dw:
                if basealp[y][x]==-1: # обработан
                    y1 = y - 1 if y > 1 else -1
                    y2 = y
                    y3 = y + 1 if y < dh[-1] else -1
                    x1 = x - 1 if x > 1 else -1
                    x2 = x
                    x3 = x + 1 if x < dw[-1] else -1
                    for yy in [y1, y2, y3]:
                        for xx in [x1, x2, x3]:
                            if xx!=-1 and yy!=-1 and not (xx == x and yy == y) and basealp[yy][xx] == 0:
                                if [yy, xx] not in newkontur:newkontur+=[[yy,xx]]
                            elif basealp[yy][xx] > 0:
                                basealp[yy][xx] = -1
    else:
        for y,x in kontur:
            if (y in [h[1:-1]] and x in [w[1:-1]]) and basealp[y][x] == -1: # не рамка и не прозрачный
                y1 = y - 1 if y > 1 else -1
                y2 = y
                y3 = y + 1 if y < dh[-1] else -1
                x1 = x - 1 if x > 1 else -1
                x2 = x
                x3 = x + 1 if x < dw[-1] else -1
                for yy in [y1, y2, y3]:
                    for xx in [x1, x2, x3]:
                        if xx!=-1 and yy!=-1 and not (xx == x and yy == y) and basealp[yy][xx] == 0:
                            if [yy,xx] not in newkontur:newkontur += [[yy, xx]]
                        elif basealp[yy][xx]>0:
                            basealp[yy][xx]=-1
    return newkontur

def zaxod_alpha(im,_firstloop, h, w, borderalp,basealp,kontur,progres):
    """заход на альфу"""
    im.load()
    R = list(im.getdata(0))
    G = list(im.getdata(1))
    B = list(im.getdata(2))
    alp = list(im.getdata(3))  # alpha tuple 0...255 кортеж прозрачности пикселей
    oldR = list(h)
    newR = list(h)
    oldG = list(h)
    newG = list(h)
    oldB = list(h)
    newB = list(h)
    oldalp = list(h)
    newalp = list(h)

    for y in h:
        a = y * len(w)
        b = (y + 1) * len(w)
        oldR[y] = R[a:b]
        newR[y] = R[a:b]
        oldG[y] = G[a:b]
        newG[y] = G[a:b]
        oldB[y] = B[a:b]
        newB[y] = B[a:b]
        oldalp[y] = alp[a:b]
        newalp[y] = alp[a:b]
        if _firstloop[0]:
            basealp[y] = alp[a:b]

        # создана структура даных
    if _firstloop[0]: firstloop_color_mark(basealp,progres) # цвета оригинала a>0 отмечены в basealp как -1 = обработаные
    # создание контура на месте прозрачного ряда вокруг обработаных
    kontur=kontur_counter(h,w,kontur,basealp,_firstloop)

    for y,x in kontur:
        r, g, b, a = obxod_poisk_cveta(y, x, h, w, borderalp, oldalp, oldR, oldG, oldB, basealp)
        newR[y][x] = r
        newG[y][x] = g
        newB[y][x] = b
        newalp[y][x] = a
    _R = []
    _G = []
    _B = []
    _alp = []
    for y in h:
        _R += newR[y]
        _G += newG[y]
        _B += newB[y]
        _alp += newalp[y]

    for i in range(len(_alp)):
        alp[i] = (_R[i], _G[i], _B[i], _alp[i])
    im.putdata(alp)
    if _firstloop[0]:
        _firstloop[0]= False
    # print(borderalp," len(kontur)=",len(kontur)," ", sep="")
    return kontur

def obxod_poisk_cveta(y,x,h,w,ba,oldalp,oldR,oldG,oldB,basealp):
    """обход пикселя, поиск и вычисление цвета"""
    y1 = y - 1 if y > 0 else -1
    y2 = y
    y3 = y + 1 if y < h[-1] else -1
    x1 = x - 1 if x > 0 else -1
    x2 = x
    x3 = x + 1 if x < w[-1] else -1
    r, g, b = [], [], []
    a = ba
    for yy in [y1, y2, y3]:
        for xx in [x1, x2, x3]:
            if yy >= 0 and xx >= 0 and not (xx == x and yy == y) and oldalp[yy][xx] > 0:
                r += [oldR[yy][xx]]
                g += [oldG[yy][xx]]
                b += [oldB[yy][xx]]
                # a = oldalp[yy][xx]
                if basealp[y][x] !=-1:
                    basealp[y][x]=-1
    # r = max(r) if r else oldR[y][x]
    # g = max(g) if g else oldG[y][x]
    # b = max(b) if b else oldB[y][x]
    r = int(sum(r) / len(r)) if r else oldR[y][x]
    g = int(sum(g) / len(g)) if g else oldG[y][x]
    b = int(sum(b) / len(b)) if b else oldB[y][x]
    return r,g,b,a

try:
    starttime = datetime.datetime.now()
    print(starttime,end="")
    print("---- начало start---- ")
    fnames = []
    for file in os.listdir(mydir):
        if file.endswith(".png"):
            fnames += [file]
    print(fnames,"\n----")
    fcounter=0
    for fname in fnames:
        fcounter+=1
        adres = mydir + os.sep + fname
        im = Image.open(adres).convert('RGBA')
        w, h = im.size
        fullsize=w*h
        progres=[0]
        dx=1
        dy=1
        cw=w+dx*2
        ch=h+dy*2
        fon=(0,0,0,0) #прозрачный фон
        nim = Image.new(im.mode, (cw, ch), fon)
        nim.paste(im, (dx, dy, dx + w, dy + h))
        w = range(cw)
        h = range(ch)
        im=nim
        # w = range(w)
        # h = range(h)
        firstloop = [True]
        basealp = list(h)
        kontur=[] # контур для обработки на следующий шаг содержит последовательность пар [[y,x],...,]
        xborderalp=[]
        stepalp=int(255 / (abs(contourn) + 1))
        diapazon=list(range(abs(contourn)))
        diapazon.reverse()
        if contourn<0:diapazon.reverse()
        for x in diapazon:
            dx=[(x+1) * stepalp]*contourw
            xborderalp+=dx
        for borderalp in xborderalp:
            if not firstloop[0] and len(kontur)==0:break
            kontur=zaxod_alpha(im,firstloop, h, w, borderalp,basealp,kontur,progres)
            progres[0]+=len(kontur)
            print("file ", fcounter, "/", len(fnames), " ", fname, " ", str(progres[0] / fullsize * 100)[0:5],"% complete", sep="")
        while len(kontur)>0:
            kontur=zaxod_alpha(im,firstloop, h, w, 255,basealp,kontur,progres)
            progres[0] += len(kontur)
            print("file ", fcounter, "/", len(fnames), " ", fname, " ", str(progres[0] / fullsize * 100)[0:5],"% complete", sep="")
        w, h = im.size
        im=im.crop((1,1,w-1,h-1)) # оба алгоритма один размер дают
        # dx = -1
        # dy = -1
        # cw = w + dx * 2
        # ch = h + dy * 2
        # fon = (0, 0, 0, 0)  # прозрачный фон
        # nim = Image.new(im.mode, (cw, ch), fon)
        # nim.paste(im, (dx, dy, dx + w, dy + h))
        # w = range(cw)
        # h = range(ch)
        # im = nim
        im.save("_" + fname)
        print("image saved ",end="")
        print(diftimestring(starttime,datetime.datetime.now()))

except:
    print(sys.exc_info())
print(datetime.datetime.now())
input("done готово / enter чтобы закрыть")
