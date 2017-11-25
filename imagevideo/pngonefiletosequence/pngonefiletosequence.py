import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False): # windows executable case (pyinstaller)
	mydir = os.path.dirname(sys.executable)
elif __file__: # python3 script case
	mydir = os.path.dirname(__file__)

print("------------mydir------------")
print(mydir)
print("------------------------")

try:
	framenumbers=input("framenumbers for example 48=2sec*24fps etc")
	framenumbers=int(float(framenumbers))
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
		im = Image.open(adres).convert('RGBA')
		im.load()
		print("load image data complete")
		print(datetime.datetime.now().time())
		print("------------------ V ----------------------")
		for i in range(framenumbers):
			im.save(str(i)+"_frame"+"_"+fname)
			# im.save(str(i)+"_frame"+"_"+fname.replace(".png",".jpg"))
		print("save image complete")
		print(datetime.datetime.now().time())
		print("------------------ V ----------------------")
	
except:
	print(sys.exc_info())
input("done готово / enter чтобы закрыть")
