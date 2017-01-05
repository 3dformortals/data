import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(__file__)

print("------------mydir------------")
print(mydir)
print("------------------------")

color = input("цвет непрозрачных пикселей (R G B A 255) через пробел по умолчанию '0 0 0 255' черный ")
try:
    color=color.split(" ")
    print(color)
    if len(color)==1:#only alpha will changed
        _r=None
        _g=None
        _b=None
        _a=int(color[0]) if abs(int(color[0]))<256 else 255
    elif len(color)==2:#gray alpha will
        _r=abs(int(color[0])) if abs(int(color[0]))<256 else 255
        _g=abs(int(color[0])) if abs(int(color[0]))<256 else 255
        _b=abs(int(color[0])) if abs(int(color[0]))<256 else 255
        _a=int(color[1]) if abs(int(color[1]))<256 else 255
    elif len(color)==3:
        _r=abs(int(color[0])) if abs(int(color[0]))<256 else 255
        _g=abs(int(color[1])) if abs(int(color[1]))<256 else 255
        _b=abs(int(color[2])) if abs(int(color[2]))<256 else 255
        _a=None
    else:
        _r = abs(int(color[0])) if abs(int(color[0])) < 256 else 255
        _g = abs(int(color[1])) if abs(int(color[1])) < 256 else 255
        _b = abs(int(color[2])) if abs(int(color[2])) < 256 else 255
        _a = int(color[3]) if abs(int(color[2])) < 256 else 255
except:
    print("badcolor")
    print(sys.exc_info())
    _r,_g,_b,_a=0,0,0,255


print("цвет пикселей будет RGBA(",_r,_g,_b,_a,")")
try:
    print(datetime.datetime.now().time())
    print("------------------ начало ----------------------")
    fnames=[]
    for file in os.listdir(mydir):
        if file.endswith(".png"):
            fnames+=[file]
    print(fnames)
    for fname in fnames:

        adres=mydir+os.sep+fname
        print(adres)
        im = Image.open(adres).convert('RGBA')
        im.load()
        w,h=im.size
        w=range(w)
        h=range(h)

        R=list(im.getdata(0))
        G=list(im.getdata(1))
        B=list(im.getdata(2))
        alp=list(im.getdata(3)) #alpha tuple 0...255 кортеж прозрачности пикселей
        newalp=[]
        for i in range(len(alp)):
            r=_r if alp[i]>0 and _r is not None else R[i]
            g=_g if alp[i]>0 and _g is not None else G[i]
            b=_b if alp[i]>0 and _b is not None else B[i]
            a=_a if alp[i]>0 and _a is not None else alp[i]
            newalp.append((r,g,b,a))

        print("recount complete")
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")
        im.putdata(newalp)
        print("load image data complete")
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")
        im.save("_"+fname)
        print("save image complete")
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")

except:
    print(sys.exc_info())
input("done готово / enter чтобы закрыть")
