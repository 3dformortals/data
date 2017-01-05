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

def end_firstloop_empty_None():
    """в конце первого захода отмечает как None все пустые пиксели оригинала"""
    h=len(basealp) # высота столбца
    w=len(basealp[0]) # длина строки
    for i in range(h):
        if i in [0,h-1]:continue
        for j in range(w):
            if j in [0,w-1]:continue
            if basealp[i][j] ==0:basealp[i][j] =None
    pass

def basealp_full_changed():
    """проверяет есть не None пиксели, или завершает обработку"""
    h=len(basealp) # высота столбца
    w=len(basealp[0]) # длина строки
    for i in range(h):
        if i in [0,h-1]:continue
        for j in range(w):
            if j in [0,w-1]:continue
            if basealp[i][j] is not None:return False
    return True

def obxod_poisk_cveta(y,x,h,w,ba):
    """обход пикселя, поиск и вычисление цвета"""
    y1=y-1 if y>0 else -1
    y2=y
    y3=y+1 if y<h[-1] else -1
    x1=x-1 if x>0 else -1
    x2=x
    x3=x+1 if x<w[-1] else -1
    r = oldR[y][x]
    g = oldG[y][x]
    b = oldB[y][x]
    a=oldalp[y][x]
    for yy in [y1,y2,y3]:
        for xx in [x1,x2,x3]:
            if firstloop:
                if yy>=0 and xx>=0 and not(xx==x2 and yy==y2) and a>0 and oldalp[yy][xx]==0:
                    a=int(a*ba/255)
                    basealp[y][x]=None
                    newbeforeborder[y][x]=None
                    return r, g, b, a
            else:
                if yy>=0 and xx>=0 and not(xx==x and yy==y) and a>0 and basealp[yy][xx] is None and beforeborder[yy][xx] is None:
                    a=int(a*ba/255)
                    basealp[y][x] = None
                    newbeforeborder[y][x] = None
                    return r,g,b,a
    return r,g,b,a

try:
    starttime = datetime.datetime.now()
    print(starttime,end="")
    print("---- начало start---- ")
    fnames = []
    for file in os.listdir(mydir):
        if file.endswith(".png"):
            fnames += [file]
    print(fnames)
    for fname in fnames:
        print(fname," ",sep="",end="")
        adres = mydir + os.sep + fname
        im = Image.open(adres).convert('RGBA')
        w, h = im.size
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
        firstloop = True
        basealp = list(h)
        beforeborder = list(h) # буду None использовать для обозначения предыдущей границы
        newbeforeborder = list(h) # для накапливания перед переписыванием beforeborder чтобы граница была на след шаг
        xborderalp=[]
        stepalp=int(255 / (abs(contourn) + 1))
        diapazon=list(range(abs(contourn)))
        if contourn<0:diapazon.reverse()
        for x in diapazon:
            dx=[(x+1) * stepalp]*contourw
            xborderalp+=dx
        for borderalp in xborderalp:
            if  not firstloop and basealp_full_changed():break
            im.load()
            R = list(im.getdata(0))
            G = list(im.getdata(1))
            B = list(im.getdata(2))
            alp = list(im.getdata(3))  # alpha tuple 0...255 кортеж прозрачности пикселей
            oldR=list(h)
            newR=list(h)
            oldG=list(h)
            newG=list(h)
            oldB=list(h)
            newB=list(h)
            oldalp = list(h)
            newalp = list(h)

            for y in h:
                a = y * len(w)
                b = (y + 1) * len(w)
                oldR[y]=R[a:b]
                newR[y]=R[a:b]
                oldG[y]=G[a:b]
                newG[y]=G[a:b]
                oldB[y]=B[a:b]
                newB[y]=B[a:b]
                oldalp[y] = alp[a:b]
                newalp[y] = alp[a:b]
                newbeforeborder[y] = alp[a:b]
                if firstloop:
                    basealp[y] = alp[a:b]
                    beforeborder[y] = alp[a:b]

            for y in h[1:-1]:
                for x in w[1:-1]:
                    if basealp[y][x] is not None:  # базовая альфа - пиксель не был обработан
                        r,g,b,a=obxod_poisk_cveta(y, x, h, w, borderalp)
                        newR[y][x]=r
                        newG[y][x]=g
                        newB[y][x]=b
                        newalp[y][x]=a
            _R = []
            _G = []
            _B = []
            _alp = []
            for y in h:
                _R+=newR[y]
                _G+=newG[y]
                _B+=newB[y]
                _alp += newalp[y]

            for i in range(len(_alp)):
                alp[i] = (_R[i], _G[i], _B[i], _alp[i])
            im.putdata(alp)
            if firstloop:
                end_firstloop_empty_None()
                firstloop=False
            beforeborder = newbeforeborder[:]
            print(borderalp," ",sep="",end="")
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
