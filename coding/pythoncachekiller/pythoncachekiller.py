import os,sys,shutil

def test(x,n=""):
	if x!="":print(str(n)+" = "+str(x)+"\n")
	else:print(str(n)+"\n")
	

try:
	#тут для джанги вставить инпут 1
	print("choose deletion variant\n\n\
0 - type '0' and press 'Enter', that delete all '__pycache__' subfolders with internal files\n\n\
1 - type '1' and press 'Enter', that delete only '__pycache__' subfolders internal files")
	try:
		dj=input() or None
		dj=int(float(dj))
		print(dj)
	except:
		dj=None
		print("input data error",sys.exc_info())
	os.chdir(os.path.dirname(os.path.abspath(__file__))) # директория файла стала текущей
	s=os.path.sep # системный разделитель в пути к файлам
	path=os.getcwd() # путь к папке файла
	test(__file__," path to 'pythoncachekiller.py' script file")
	
	for (p,d,f) in os.walk(path):
		if dj==0: # удаляем все вложения и __pycache__
			if "__pycache__" in p:
				shutil.rmtree(p)
		elif dj==1:
			if "__pycache__" in p:
				print("p=")
				print(p)
				print("d=")
				print(d)
				if d:
					for d_ in d:
						print("p+s+d_=")
						print(p+s+d_)
						shutil.rmtree(p+s+d_)
				print("f=")
				print(f)
				if f:
					for f_ in f:
						print("p+s+f_=")
						print(p+s+f_)
						os.remove(p+s+f_)
except:print(sys.exc_info())

print("work done, press 'Enter' to close this window or just close window")
input()