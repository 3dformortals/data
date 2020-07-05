import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))

print("------------mydir------------")
print(mydir)
print("------------------------")
loopdir = mydir+os.sep+"loop"+os.sep
print("new files will be placed inside ",loopdir, "path")
print("------------------------")

variants = [2,4,8,16,32,64,128]
hueStep = input("hue step "+" ".join([str(x) for x in variants])+" ")

def pv(x):
    """parse string to int value between 0...255"""
    v = int(x) or 255
    if (v<0) : v=-v
    if (v>255) : v=255
    return v

def nextH(h,step):
    nh = h + step
    if nh>255:nh -= 255
    return nh

try:
    hueStep = int(hueStep)
    if hueStep not in variants: hueStep = 16
    print("value not from sequence, will used 16")
except:
    hueStep = 16
    print("bad incoming data, will used 16")
    print(sys.exc_info())

steps = [hueStep * i for i in range(int(256/hueStep))]

try:
    print(datetime.datetime.now().time())
    print("------------------ beginning ----------------------")
    fnames=[]
    for file in os.listdir(mydir):
        if file.endswith(".png"):
            fnames+=[file]
    print(fnames)
    
    if len(fnames) > 0:
        if not os.path.exists(loopdir):
            os.makedirs(loopdir)
    
    for fname in fnames:
        namedir = loopdir+os.sep+fname.split(".",1)[0]+os.sep
        if not os.path.exists(namedir):
            os.makedirs(namedir)

        adres=mydir+os.sep+fname
        print(adres)
        im = Image.open(adres).convert('RGBA')

        #hsv
        A = im.getchannel('A')
        # print([a for a in A.getdata(0)])
        im.convert('RGB').convert('HSV')
        H = im.getdata(0)

        newS = im.getdata(1)
        newV = im.getdata(2)

        for sind in range(len(steps)):
            newH = []
            for h in H:
                newH.append(nextH(h,steps[sind]))
            nim = []
            for i in range(len(newH)):
                nim.append((newH[i],newS[i],newV[i]))
            # print([i for i in H])
            # print(newH)
            HSV = Image.new('HSV',im.size)
            HSV.putdata(nim)
            R,G,B = HSV.convert('RGB').split()
            RGBA = Image.merge('RGBA',(R,G,B,A))

            print(str(sind+1)+"/"+str(len(steps)))
            print("recount complete")
            print(datetime.datetime.now().time())
            print("------------------ V ----------------------")

            RGBA.save(namedir+fname.split(".")[0]+"_"+str(sind)+"."+fname.split(".")[1])
            print("save image complete")
            print(datetime.datetime.now().time())
            print("------------------ V ----------------------")
            

except:
    print(sys.exc_info())
input("done (готово) . That close press Enter (enter - закрыть)")
