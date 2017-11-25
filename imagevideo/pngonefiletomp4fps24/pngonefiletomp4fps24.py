import os,sys,datetime
from PIL import Image
from moviepy.editor import *

if getattr(sys, 'frozen', False): # windows executable case (pyinstaller)
    mydir = os.path.dirname(sys.executable)
elif __file__: # python3 script case
    mydir = os.path.dirname(__file__)

print("------------mydir------------")
print(mydir)
print("------------------------")

try:
    durat=input("video time in seconds ")
    durat=int(float(durat))
    print(datetime.datetime.now().time())
    print("------------------ начало begin ----------------------")
    fnames=[]
    for file in os.listdir(mydir):
        if file.endswith(".png"):
            fnames+=[file]
    print(fnames)
    for fname in fnames:
        
        adres=mydir+os.sep+fname
        print(adres)
        clip = ImageClip(adres, duration=durat)
        
        print("load image data complete")
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")
        clip.write_videofile(fname.replace(".png",".mp4"),fps=24,audio=False)
        
        print("save video complete")
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")
    
except:
    print(sys.exc_info())
input("done готово / enter чтобы закрыть")