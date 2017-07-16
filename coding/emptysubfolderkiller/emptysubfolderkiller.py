import os,sys,shutil

def test(x,n=""):
	if x!="":print(str(n)+" = "+str(x)+"\n")
	else:print(str(n)+"\n")
	

try:
	print("0 - press 'Enter' to delete all empty subfolders\n\n\
	1 - type '1' and press 'Enter' to count empty subfolders, without deleting")
	dj=input()
	try:
		dj=int(float(dj))
	except:
		dj=0
	os.chdir(os.path.dirname(os.path.abspath(__file__)))#директория файла стала текущей
	s=os.path.sep#системный разделитель в пути к файлам
	path=os.getcwd()#путь к папке файла
	test(__file__," path to 'emptyfolderkiller.py' script file")
	
	itemin=0
	itemdel=0
	excepts=0
	for (p,d,f) in os.walk(path):
		if (not d and not f):
			try:
				itemin+=1
				if (dj==0):
					shutil.rmtree(p)
					itemdel+=1
			except:
				excepts+=1
				print("------------------------\n[shutil.rmtree error]\n",sys.exc_info(),p)
except:print(sys.exc_info())
print(itemin,"items found")
print(itemdel,"items deleted")
print(excepts,"excepts")

print("work done, press 'Enter' to close this window or just close window")
input()