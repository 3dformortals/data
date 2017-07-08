python tree compiler  

script have two compile options  
0 -compile to *.pyc all subfolder *.py files  
1 -django compile to *.pyc all subfolder *.py files, except "manage.py" file of "pythontreecompiler.py" script level, and except subfolders start with combination "os separator + underscore". For linux is "/\_" , for windows is "\\\_" . For example the "\_temp" or "/\_temp" folder will be not included in result of compilation.  

The result will be placed in the path placed on parent folder level, with unique name (\_+datetime+\_+parent folder of "pythontreecompiler.py" file name). The result will include all files of included folders, but python files will have *.pyc form. The django app in this case work same, but code can't be readed easy.  

Place "pythontreecompiler.py" file inside your project directory and run. For django compile place "pythontreecompiler.py" file into project "manage.py" file level. Tested on  
win7 x64 python3.4  
ubuntu linux 32bit 16.04 python 3.6 .  

--------------------------------------------------

source code links:

https://github.com/lenivaya10001/data/tree/master/coding/pythontreecompiler

https://bitbucket.org/lenivaya10001/data/src