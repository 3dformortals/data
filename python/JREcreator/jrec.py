
import os,sys,subprocess

try:
    s = os.sep
    if getattr(sys, 'frozen', False):
        mydir = os.path.dirname(sys.executable)
    elif __file__:
        mydir = os.path.dirname(os.path.abspath(__file__))
    # os.chdir(mydir)  # директория файла стала текущей
    print("mydir = "+mydir)
    jmodsPath = mydir+s+"jmods"+s
    binPath = mydir+s+"bin"+s
    jrePath = mydir+s+"jre"

    modulesList = os.listdir(jmodsPath)
    print(str(len(modulesList))+" modules in list")
    modulesSolid = ",".join(modulesList) #join list to string, with "," as separator
    modulesSolid = modulesSolid.replace(".jmod","") # delete all ".jmod" from resulted string
    # print(modulesSolid) #resulted string with collected modules

    # s1 = "jlink -v --no-header-files --no-man-pages --compress=2 --add-modules " # -v verbose , show info
    s1 = "jlink --no-header-files --no-man-pages --compress=2 --add-modules " # -v verbose , show pile of info in process
    s2 = " --output "

    # flow = subprocess.run(binPath+s1+"ALL-MODULE-PATH"+s2+jrePath,shell=True) #same as bottom. get all modules
    flow = subprocess.run(binPath+s1+modulesSolid+s2+jrePath,shell=True)
    # print("flow is",flow,flush=True) #print some info of subprocess

    print("jre path = "+jrePath)
    input("ok. enter close")
except:
    print("fail")
    print(sys.exc_info())
    input("something wrong. enter close")