import os,sys,datetime
from PIL import Image

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))

print("------------mydir------------")
print(mydir)
print("------------------------")

allFiles = input("input 0 that open save only full empty png files (all pixels alpha = 0) \n input 1 or nothing that open save all png files.\n\nThis can fix files before collect texture atlas, f.e. if empty png looks in atlas like black filled, after compression using FileOptimizer")
allFiles = False if allFiles == "0" else True
input()


try:
	print(datetime.datetime.now().time())
	print("------------------ начало begin ----------------------")
	
	s = os.sep
	fnames = []
	for (p,d,f) in os.walk(mydir):
		for file in f:
			if file.endswith(".png"):
				fnames.append(p+s+file)
			else:
				print("skipped file:\n"+str(p) +"\n"+str(d)+"\n"+file+"\n---")
	print(fnames)
	
	for fname in fnames:
		print(fname)
		im = Image.open(fname).convert('RGBA')
		im.load()
		w,h=im.size
		w=range(w)
		h=range(h)
		R=list(im.getdata(0))
		G=list(im.getdata(1))
		B=list(im.getdata(2))
		alp=list(im.getdata(3)) #alpha tuple 0...255 кортеж прозрачности пикселей
		if allFiles or sum(alp) == 0: im.save(fname)
		print("save image complete")
		print(datetime.datetime.now().time())
		print("------------------ V ----------------------")
	
except:
	print(sys.exc_info())
input("done готово / enter чтобы закрыть")
