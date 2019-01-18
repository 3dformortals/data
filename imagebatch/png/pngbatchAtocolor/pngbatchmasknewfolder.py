import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))

print("------------mydir------------")
print(mydir)
print("------------------------")
maskdir = mydir+os.sep+"mask"+os.sep
print("new files will be placed inside ",maskdir, "path")
print("------------------------")

color = input("new color for pixels which had alpha > 0 (R G B A 255) space separated, default '255 255 255' white with old alpha ")

def pv(x):
    """parse string to int value between 0...255"""
    v = int(x) or 255
    if (v<0) : v=-v
    if (v>255) : v=255
    return v

try:
    color=color.split(" ")
    print(color)
    if len(color)==1:#only alpha will be changed
        _r=None
        _g=None
        _b=None
        _a=pv(color[0])
    elif len(color)==2:#gray and alpha will be changed
        _r=pv(color[0])
        _g=pv(color[0])
        _b=pv(color[0])
        _a=pv(color[1])
    elif len(color)==3:
        _r=pv(color[0])
        _g=pv(color[1])
        _b=pv(color[2])
        _a=None
    else:
        _r = pv(color[0])
        _g = pv(color[1])
        _b = pv(color[2])
        _a = pv(color[3])
except:
    print("bad incoming color, will be used white color with old alpha")
    print(sys.exc_info())
    _r,_g,_b,_a=255,255,255,None


print("new pixel colors will be RGBA(",_r,_g,_b,_a,")")
try:
    print(datetime.datetime.now().time())
    print("------------------ beginning ----------------------")
    fnames=[]
    for file in os.listdir(mydir):
        if file.endswith(".png"):
            fnames+=[file]
    print(fnames)
    
    if len(fnames) > 0:
        if not os.path.exists(maskdir):
            os.makedirs(maskdir)
    
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
        # im.save("_"+fname)
        im.save(maskdir+fname)
        print("save image complete")
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")

except:
    print(sys.exc_info())
input("done (готово) . That close press Enter (enter - закрыть)")
