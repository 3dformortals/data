import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))

print("------------mydir------------")
print(mydir)
print("------------------------")

try:
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
		w,h=im.size
		w=range(w)
		h=range(h)
		R=list(im.getdata(0))
		G=list(im.getdata(1))
		B=list(im.getdata(2))
		alp=list(im.getdata(3)) #alpha tuple 0...255 кортеж прозрачности пикселей
		oldalp=list(h)
		newalp=list(h)
		for y in h:
			a=y*len(w)
			b=(y+1)*len(w)
			oldalp[y]=alp[a:b]
			newalp[y]=alp[a:b]
		
		for y in h:
			for x in w:
				newalp[y][x]=255
		_alp=[]
		
		for y in h:
			_alp+=newalp[y]
		
		for i in range(len(_alp)):
			alp[i]=(R[i],G[i],B[i],_alp[i])
		print("recount complete")
		print(datetime.datetime.now().time())
		print("------------------ V ----------------------")
		im.putdata(alp)
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
