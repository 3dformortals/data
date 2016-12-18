import os,sys

if getattr(sys, 'frozen', False):
	mydir = os.path.dirname(sys.executable)
elif __file__:
	mydir = os.path.dirname(__file__)

print("------------mydir------------")
print(mydir)
print("------------------------")

try:
	imgs=[]
	rez=open("svg2png.bat", "w", encoding="utf-8")
	s1='magick -background none \"'
	#s1='magick  \"' #uncoment to white background result
	s2='\" \"'
	# s3='\" '
	s3='\" &&^\n'
	s4='\"'
	fnames=[]
	for file in os.listdir(mydir):
		if file.endswith(".svg"):
			fnames+=[file.split(".svg")[0]]
	
	for fname in fnames:
		
		if fname != fnames[-1]:
			rez.write(s1+mydir+os.sep+fname+'.svg'+s2+mydir+os.sep+fname+'.png'+s3)
		else:
			rez.write(s1+mydir+os.sep+fname+'.svg'+s2+mydir+os.sep+fname+'.png'+s4)
	rez.close()
	print(imgs)
except:
	print(sys.exc_info())
input("----------- done готово -------- enter закрыть окно")
