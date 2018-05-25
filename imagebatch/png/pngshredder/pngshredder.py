import os,sys,datetime
from PIL import Image
import random,time

def stt(secund):
	"""время как строка ... для печати... из секунд"""
	dthour=int(secund/3600)
	dtminut=int((secund-dthour*3600)/60)
	dtsecund=int(secund-dthour*3600-dtminut*60)
	return str(dthour)+"h:"+str(dtminut)+"m:"+str(dtsecund)+"s"

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
	
print("incoming data: ",str(parts)," layers and",str(boxsize)," px pattern side size")

def boxpix_counter(row,col,boxsize,imgw,imgh):
	rez=[]
	for ibox in range(row,row+boxsize):
		for jbox in range(col,col+boxsize):
			if (ibox<imgh and jbox<imgw):
				rez.append((ibox,jbox))
	return rez

def pix_in_keep(row,col,keep):
	for box in keep:
		for pix in box:
			if (row,col) == pix: return True
	return False

def colortuples_to_colortable(ct,w):
	string_ind=list(range(0,len(ct[0]),w))
	pair_ind=[[i,i+w] for i in string_ind]
	ct_ind_table=[list(range(i,j)) for i,j in pair_ind]
	colortable=[]
	for row_ind in ct_ind_table:
		row = [(ct[0][i],ct[1][i],ct[2][i],ct[3][i]) for i in row_ind] #string of colors of one row
		colortable.append(row)
	return colortable

def colortable_to_colortuples(ct):
	colortuples = []
	for row in ct:
		for pix in row:
			colortuples.append(pix)
	return colortuples

try:
	print(datetime.datetime.now().time())
	stime=time.time()
	print("------------------ preparing ----------------------")
	fnames=[]
	for file in os.listdir(mydir):
		if file.endswith(".png"):
			fnames+=[file]
	print(fnames)
	etime=time.time()
	print("elapsed time ",stt(etime-stime))
	for fname in fnames:
		ftime=time.time() # one file edit time
		adres=mydir+os.sep+fname
		print(adres)
		im = Image.open(adres).convert('RGBA')
		im.load()
		imgw,imgh=im.size
		w=range(0,imgw,boxsize)
		h=range(0,imgh,boxsize)
		
		emptydata=[(0,0,0,0) for i in range(imgw * imgh)]
		empty = im.copy()
		empty.putdata(emptydata)
		imgs = [empty.copy() for i in range(parts)]
		keep_pix = [[] for i in range(parts)]
		
		randpixboxes = [boxpix_counter(row,col,boxsize,imgw,imgh) for row in h for col in w]
		random.shuffle(randpixboxes)
		print("number of patterns from cutted image = ",len(randpixboxes))
		imgs_ind = -1
		for pixbox in randpixboxes:
			imgs_ind += 1 if (imgs_ind < parts - 1) else -(parts-1)
			keep_pix[imgs_ind].append(pixbox)
		print("collecting permanent pixels complete")
		basegd = [list(im.getdata(0)),list(im.getdata(1)),list(im.getdata(2)),list(im.getdata(3))] # RGBA tuples
		basetable = colortuples_to_colortable(basegd,imgw) # table of colors x[row][string]
		print("copy permanent pixels for each layer of image ",fname," , to empty template.\nThis step will longest")
		for k in range(len(imgs)):
			print("\nlayer number ", str(k+1), " from ", str(len(imgs)))
			ltime=time.time()
			img = imgs[k]
			imggd = [list(img.getdata(0)),list(img.getdata(1)),list(img.getdata(2)),list(img.getdata(3))] # RGBA tuples
			imgtable = colortuples_to_colortable(imggd,imgw) # table of colors x[row][string]
			keep = keep_pix[k]
			keep = [pix for pixbox in keep for pix in pixbox]
			fullsteps = len(keep)
			olddone = 0
			for row,col in keep:
				imgtable[row][col] = basetable[row][col]
				presentdone = int(row/fullsteps*100)
				if (presentdone > olddone):
					print(str(presentdone)+"%",end="",flush=True)
					olddone = presentdone
			newimgdata = colortable_to_colortuples(imgtable)
			img.putdata(newimgdata)
			etime=time.time()
			print("\nelapsed time ",stt(etime-ltime))
		print("recount complete")
		for i in range(len(imgs)):
			imgs[i].save("_"+str(i)+"_"+fname)
		print("------------------ V ----------------------")
		print("save image complete")
		print(datetime.datetime.now().time())
		etime=time.time()
		print("elapsed time ",stt(etime-ftime))
		print("------------------ V ----------------------")
	etime=time.time()
	print("total elapsed time ",stt(etime-stime))
	
except:
	print(sys.exc_info())
print("source code placed on github\nhttps://github.com/lenivaya10001/data/tree/master/imagebatch/png")
input("done / enter to close")
