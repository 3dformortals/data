import os,sys,shutil

def test(x,n=""):
	if x!="":print(str(n)+" = "+str(x)+"\n")
	else:print(str(n)+"\n")
	

try:
	#тут для джанги вставить инпут 1
	print("choose deletion variant\n\n\
0 - press 'Enter', that delete all '__pycache__' subfolders with internal items\n\n\
1 - type '1' and press 'Enter', that delete only '__pycache__' subfolders internal items\n\n\
2 - type '2' and press 'Enter', that delete only '__pycache__' level '*.pyc' files")
	try:
		dj=input() or 0
		dj=int(float(dj))
		print(dj)
	except:
		dj=None
		print("input data error",sys.exc_info())
	os.chdir(os.path.dirname(os.path.abspath(__file__)))#директория файла стала текущей
	s=os.path.sep#системный разделитель в пути к файлам
	path=os.getcwd()#путь к папке файла
	test(__file__," path to 'pythoncachekiller.py' script file")
	
	cachen=0
	itemin=0
	itemdel=0
	excepts=0
	for (p,d,f) in os.walk(path):
		if dj==0:#удаляем все вложения и __pycache__
			if "__pycache__" in p:
				try:
					cachen+=1
					itemin+=len(f)+len(d)
					shutil.rmtree(p)
					itemdel+=len(f)+len(d)+1
				except:
					excepts+=1
					print("------------------------\n[shutil.rmtree error]\n",sys.exc_info())
		elif dj==1:
			if "__pycache__" in p:
				cachen+=1
				itemin+=len(f)+len(d)
				print("p=")
				print(p)
				print("d=")
				print(d)
				if d:
					for d_ in d:
						print("p+s+d_=")
						print(p+s+d_)
						try:
							shutil.rmtree(p+s+d_)
							itemdel+=len(d)
						except:
							excepts+=1
							print("------------------------\n[shutil.rmtree error]\n",sys.exc_info())
				print("f=")
				print(f)
				if f:
					for f_ in f:
						print("p+s+f_=")
						print(p+s+f_)
						try:
							os.remove(p+s+f_)
							itemdel+=1
						except:
							excepts+=1
							print("------------------------\n[os.remove error]\n",sys.exc_info())
		elif dj==2:
			if "__pycache__" in p:
				cachen+=1
				itemin+=len(f)+len(d)
				print("p=")
				print(p)
				print("d=")
				print(d)
				print("f=")
				print(f)
				if f:
					for f_ in f:
						print("p+s+f_=")
						print(p+s+f_)
						if (f_.endswith(".pyc")):
							try:
								os.remove(p+s+f_)
								itemdel+=1
							except:
								excepts+=1
								print("------------------------\n[os.remove error]\n",sys.exc_info())
except:print(sys.exc_info())
print(cachen,"folders found")
print(itemin,"items found")
print(itemdel,"items deleted")
print(excepts,"excepts")

print("work done, press 'Enter' to close this window or just close window")
input()