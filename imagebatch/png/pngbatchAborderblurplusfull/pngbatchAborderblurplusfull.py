import os, sys, datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))

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

def firstloop_color_None(basealp,progres):
    """в конце первого захода отмечает как None все не прозрачные пиксели оригинала"""
    h=len(basealp) # высота столбца
    w=len(basealp[0]) # длина строки
    for i in range(h):
        if i in [0,h-1]:continue
        for j in range(w):
            if j in [0,w-1]:continue
            if basealp[i][j] >0:
                basealp[i][j] =None
                progres[0]+=1
    print(progres[0]," px have color")
    pass

def basealp_full_changed(basealp):
    """проверяет есть не None пиксели, или завершает обработку"""
    h=len(basealp) # высота столбца
    w=len(basealp[0]) # длина строки
    for i in range(h):
        if i in [0,h-1]:continue
        for j in range(w):
            if j in [0,w-1]:continue
            if basealp[i][j] is not None:return False
    return True

def zaxod_alpha(im,_firstloop, h, w, borderalp,basealp,progres):
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
    if _firstloop[0]: firstloop_color_None(basealp,progres)

    for y in h[1:-1]:
        for x in w[1:-1]:
            if oldalp[y][x] == 0:  # альфа 0 - пиксель полностью прозрачный
                r, g, b, a = obxod_poisk_cveta(y, x, h, w, borderalp,oldalp,oldR,oldG,oldB,basealp,progres)
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
        _firstloop[0] = False

def obxod_poisk_cveta(y,x,h,w,ba,oldalp,oldR,oldG,oldB,basealp,progres):
    """обход прозрачного пикселя, поиск и вычисление цвета"""
    y1 = y - 1 if y > 0 else -1
    y2 = y
    y3 = y + 1 if y < h[-1] else -1
    x1 = x - 1 if x > 0 else -1
    x2 = x
    x3 = x + 1 if x < w[-1] else -1
    r, g, b = [], [], []
    a = oldalp[y][x]
    for yy in [y1, y2, y3]:
        for xx in [x1, x2, x3]:
            if yy >= 0 and xx >= 0 and not (xx == x and yy == y) and oldalp[yy][xx] > 0:
                r += [oldR[yy][xx]]
                g += [oldG[yy][xx]]
                b += [oldB[yy][xx]]
                if basealp[y][x] is not None:
                    basealp[y][x]=None
                    a=ba
                    progres[0]+=1
    r = max(r) if r else oldR[y][x]
    g = max(g) if g else oldG[y][x]
    b = max(b) if b else oldB[y][x]
    # r = int(sum(r) / len(r)) if r else oldR[y][x]
    # g = int(sum(g) / len(g)) if g else oldG[y][x]
    # b = int(sum(b) / len(b)) if b else oldB[y][x]
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
        fullsize=w*h # для вычисления прогреса обработки
        progres=[0] # список чтобы по сылке
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
        xborderalp=[]
        stepalp=int(255 / (abs(contourn) + 1))
        diapazon=list(range(abs(contourn)))
        diapazon.reverse()
        if contourn<0:diapazon.reverse()
        for x in diapazon:
            dx=[(x+1) * stepalp]*contourw
            xborderalp+=dx
        for borderalp in xborderalp:
            if  not firstloop[0] and basealp_full_changed(basealp):break
            zaxod_alpha(im,firstloop, h, w, borderalp,basealp,progres)
            print("file ",fcounter,"/",len(fnames)," ",fname," ",str(progres[0] / fullsize*100)[0:5],"% complete",sep="")
        while not basealp_full_changed(basealp):
            zaxod_alpha(im,firstloop, h, w, 255,basealp,progres)
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
