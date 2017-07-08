import os,sys,shutil,py_compile
from datetime import datetime

def test(x,n=""):
	if x!="":print(str(n)+" = "+str(x)+"\n")
	else:print(str(n)+"\n")
	

try:
	dj=0
	#тут для джанги вставить инпут 1
	print("choose compilation option\n\
- press 'Enter' that compile all subfolders tree\n\
- type '1' and press 'Enter', that compile for Django cms ('manage.py' file of 'pythontreecompiler.py' file level will be excluded from result. All subfolders started with '\\_' windows, or '/_' linux will be excluded from result)")
	try:
		dj=int(float(input())) or 0
		print(dj)
	except:
		dj=0
		print("input data error ",sys.exc_info())
		print("will be used full compilation of subfolders")
	os.chdir(os.path.dirname(os.path.abspath(__file__))) # директория файла стала текущей
	s=os.path.sep # системный разделитель в пути к файлам
	path=os.getcwd() # путь к папке файла
	test(__file__,"path to 'pythontreecompiler.py' script file")
	pname=os.path.basename(path) # имя папки где лежит исполняемый файл
	pathpart=path.replace(s+pname,"") # адрес до папки с исполняемым файлом не включая ее
	cname=pathpart+s+"_"+datetime.now().strftime("%Y-%m-%d_%H-%M-%S-%f")+"_"+pname
	test("","result path");test(cname,"")
	test("","to continue press 'Enter'")
	input()
	os.mkdir(cname) # создана папка для импортированной копии дерева папок и файлов
	for (p,d,f) in os.walk(path):
		if dj==0 or dj==1 and s+"_" not in p:
			f_good,f_bad=[],[]
			dp=p.replace(path,"")
			if dp!="":
				partimport=dp+s
			else:
				partimport=""
			for file in f:
				if file[-3:]==".py" and p+s+file!=__file__:
					try:
						if dj!=1 or dj==1 and p==path and file not in ["manage.py"] or dj==1 and p!=path:
							py_compile.compile(p+s+file, cfile=None, dfile=None, doraise=False, optimize=-1)
							f_good.append(file)
						else:
							f_bad.append(file)
					except:
						print("py_compile fall. "+sys.exc_info()+"\n"+"file "+file+" will be copyed without compile")
						f_bad.append(file)
				else:
					if file !=os.path.basename(__file__):
						f_bad.append(file)
			np=cname+s+pname+dp
			os.makedirs(np) # создана папка в дереве, копирующем исходное
			for file in f_bad:
				shutil.copy2(p+s+file,np+s+file)
			for file in f_good:
				bad=True
				for cfile in os.listdir(p+s+"__pycache__"):
					if file[:-2] in cfile and cfile[-4:]==".pyc":
						shutil.copy2(p+s+"__pycache__"+s+cfile,np+s+file+"c")
						bad=False
				if bad:
					shutil.copy2(p+s+file,np+s+file)
	
except:print(sys.exc_info())

print("work done, press 'Enter' or close the window")
input()