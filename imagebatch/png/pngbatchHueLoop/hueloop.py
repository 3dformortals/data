import os,sys,datetime,colorsys
from PIL import Image
from PIL.Image import ADAPTIVE

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

variants = [2,4,8,16,32,64,128,-2,-4,-8,-16,-32,-64,-128]
hueStep = input("hue step "+" ".join([str(x) for x in variants])+
"\nNegative values for add reversed(except first and last) frames after general.\n"
)

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

def nextRGB(r,g,b,step):
    h,s,v = colorsys.rgb_to_hsv(r/255,g/255,b/255)
    nh = nextH(int(255*h),step)/255
    nr,ng,nb = colorsys.hsv_to_rgb(nh,s,v)
    return int(255*nr),int(255*ng),int(255*nb)

try:
    addBack = False
    hueStep = int(hueStep)
    if hueStep not in variants:
        hueStep = 128
        print("value not from sequence, will used 128")
    if hueStep<0:
        addBack = True
        hueStep = abs(hueStep)
except:
    hueStep = 128
    print("bad incoming data, will used 128")
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
        im = Image.open(adres)
        print("Format: {0}\nSize: {1}\nMode: {2}".format(im.format, im.size, im.mode))
        im.convert(mode='RGB')#,palette=ADAPTIVE,colors=16777216)

        #hsv
        # print([a for a in A.getdata(0)])
        # im.convert('RGB').convert(mode='HSV',palette=ADAPTIVE,colors=16777216)
        R = im.getdata(0)
        G = im.getdata(1)
        B = im.getdata(2)
        # A = im.getdata(3)

        for sind in range(len(steps)):
            nim = []
            for i in range(len(R)):
                r,g,b = nextRGB(R[i],G[i],B[i],steps[sind])
                nim.append((r,g,b))
                # nim.append((r,g,b,A[i]))
            RGB = Image.new('RGB',im.size)
            RGB.putdata(nim)
            
            # RGB = HSV.convert('RGB',palette=ADAPTIVE,colors=16777216)
            # R,G,B = HSV.convert('RGB').split()
            # RGBA = Image.merge('RGBA',(R,G,B,A))

            print(str(sind+1)+"/"+str(len(steps)))
            print("recount complete")
            print(datetime.datetime.now().time())
            print("------------------ V ----------------------")

            finaldir = namedir+fname.split(".")[0]+"_"+str(sind)+"."+fname.split(".")[1]
            RGB.save(finaldir,'PNG')
            
            if addBack and sind not in [0,len(steps)]:
                tailind = str(2*(len(steps)-1)-sind)
                finalTail =  namedir+fname.split(".")[0]+"_"+tailind+"."+fname.split(".")[1]
                RGB.save(finalTail,'PNG')
            # RGBA.save(finaldir,'PNG')
            print("save image complete")
            print(datetime.datetime.now().time())
            print("------------------ V ----------------------")
            

except:
    print(sys.exc_info())
input("done (готово) . That close press Enter (enter - закрыть)")
