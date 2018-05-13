import os,sys,datetime
from PIL import Image
import random

if getattr(sys, 'frozen', False):
	mydir = os.path.dirname(sys.executable)
elif __file__:
	mydir = os.path.dirname(os.path.abspath(__file__)) #linux

print("------------mydir------------")
print(mydir)
print("------------------------")

data = input("number of result layers, and pattern size in pixels . Default 2 4")
try:
	data=data.split(" ")
	parts=int(data[0])
	boxsize=int(data[1])
except:
	print("bad data")
	print(sys.exc_info())
	parts = 2
	boxsize = 4
	
print("incoming data = ",str(parts),str(boxsize))

def boxpix_counter(i,j,boxsize,imgw,imgh):
	rez=[]
	for ibox in range(i,i+boxsize):
		for jbox in range(j,j+boxsize):
			if (ibox<imgw and jbox<imgh):
				rez.append((ibox,jbox))
	return rez

def pix_in_keep(i,j,keep):
	for box in keep:
		for pix in box:
			if (i,j) == pix: return True
	return False

try:
	print(datetime.datetime.now().time())
	print("------------------ preparing ----------------------")
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
		imgw,imgh=im.size
		w=range(0,imgw,boxsize)
		h=range(0,imgh,boxsize)
		
		imgs = [im.copy() for i in range(parts)]
		keep_pix = [[] for i in range(parts)]
		
		randpixboxes = [boxpix_counter(i,j,boxsize,imgw,imgh) for i in w for j in h]
		random.shuffle(randpixboxes)
		print("len(randpixboxes) = ",len(randpixboxes))
		imgs_ind = -1
		for pixbox in randpixboxes:
			imgs_ind += 1 if (imgs_ind < parts - 1) else -(parts-1)
			keep_pix[imgs_ind].append(pixbox)
		print("collecting permanent pixels complete")
		print(datetime.datetime.now().time())
		print("deleting pixels for each layer of image ",fname," , except permanent pixels.\nThis step will longest")
		for k in range(len(imgs)):
			print("layer number ", str(k+1), " from ", str(len(imgs)))
			img = imgs[k]
			keep = keep_pix[k]
			for i in range(imgw):
				for j in range(imgh):
					if not pix_in_keep(i,j,keep):
						img.putpixel( (i,j), (0,0,0,0) )
				presentdone = int(i/fullsteps*100)
				if (presentdone > olddone):
					print(str(presentdone)+"%",end="",flush=True)
					olddone = presentdone
		print("recount complete")
		print(datetime.datetime.now().time())
		for i in range(len(imgs)):
			imgs[i].save("_"+str(i)+"_"+fname)
		print("------------------ V ----------------------")
		print("save image complete")
		print(datetime.datetime.now().time())
		print("------------------ V ----------------------")
	
except:
	print(sys.exc_info())
input("done / enter to close")
