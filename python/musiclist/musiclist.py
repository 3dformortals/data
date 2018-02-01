import os, sys,time

def sectotime(secund):
    """время как строка ... для печати... из секунд"""
    dthour=int(secund/3600)
    dtminut=int((secund-dthour*3600)/60)
    dtsecund=int(secund-dthour*3600-dtminut*60)
    return str(dthour)+"h:"+str(dtminut)+"m:"+str(dtsecund)+"s"

starttime=time.time()
try:
    mydir=""
    if getattr(sys, 'frozen', False):
        mydir = os.path.dirname(sys.executable)
    elif __file__:
        mydir = os.path.dirname(__file__)
    # os.chdir(os.path.dirname(os.path.abspath(__file__)))  # директория файла стала текущей
    s = os.path.sep  # системный разделитель в пути к файлам
    path=mydir
    
    # обход папок создание словаря файлов
    ends=(".mp3",".flac",".wma",".midi",".ogg",".mid","wav","da")
    for (p, d, f) in os.walk(path):
        adres=p+s+"musiclist.txt"
        try:
            txt = open(adres,mode="rt",encoding="utf-8")
            oldlines=txt.readlines()
            oldlines=[i.replace("\n","") for i in oldlines]
            txt.close()
        except:
            oldlines=[]
        txt=open(p+s+"musiclist.txt","a",encoding="utf-8")
        for file in f:
            if (file.lower().endswith(ends)):
                
                if not (file.replace("_"," ") in oldlines):
                    txt.write(file.replace("_"," ") +"\n")
        txt.close()
except:
    print(sys.exc_info())
    print("something wrong. To close window press Enter")
endtime=time.time()
worktime=sectotime(endtime-starttime)
input("done. press enter to close window."+"elapsed = "+worktime)
