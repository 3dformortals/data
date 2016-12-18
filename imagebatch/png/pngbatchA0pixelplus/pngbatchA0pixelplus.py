import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False):
	mydir = os.path.dirname(sys.executable)
elif __file__:
	mydir = os.path.dirname(__file__)

print("------------mydir------------")
print(mydir)
print("------------------------")

color = input("цвет новых пикселей (R G B A 255) через пробел по умолчанию '0 0 0 255' черный ")
try:
	color=color.split(" ")
	color[0]=int(color[0])
	color[1]=int(color[1])
	color[2]=int(color[2])
	color[3]=int(color[3])
	color=tuple(color)
except:
	print("badcolor")
	print(sys.exc_info())
	color=(0,0,0,255)
	
print("цвет пикселей будет RGBA("+str(color[0])+","+str(color[1])+","+str(color[2])+","+str(color[3]))

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
		im = Image.open(adres)
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
				if oldalp[y][x]:#альфа есть, пиксель не полностью прозрачный
					if y>0 and y<h[-1]: #не верхняя и не нижняя строка
						if x>0 and x<w[-1]: #не левый и не правый столбец
							for y3 in [y-1,y,y+1]:
								for x3 in [x-1,x,x+1]:
									newalp[y3][x3]=color[3]
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
