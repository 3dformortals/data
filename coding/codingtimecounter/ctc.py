import os, sys,time

def sectotime(secund):
    """время как строка ... для печати... из секунд"""
    dthour=int(secund/3600)
    dtminut=int((secund-dthour*3600)/60)
    dtsecund=int(secund-dthour*3600-dtminut*60)
    return str(dthour)+"h:"+str(dtminut)+"m:"+str(dtsecund)+"s"

try:
    mydir=""
    if getattr(sys, 'frozen', False):
        mydir = os.path.dirname(sys.executable)
    elif __file__:
        mydir = os.path.dirname(__file__)
    # os.chdir(os.path.dirname(os.path.abspath(__file__)))  # директория файла стала текущей
    s = os.path.sep  # системный разделитель в пути к файлам
    path=mydir
    try:
        txt=open(path+s+"codingtime.txt",encoding="utf-8")
        sum=txt.readline().strip()
        sum=int(sum)
        txt.close()
    except:
        sum=0
    txt=open(path+s+"codingtime.txt","w",encoding="utf-8")
    txt.write(str(sum))
    txt.close()
    files={}
    dt=input("counter step in seconds, min 5, default 120 sec")
    try:
        dt=int(dt)
        if dt<5:dt=5
    except:
        print(sys.exc_info(),"counter step will 120 sec")
        dt=120


    # обход папок создание словаря файлов
    for (p, d, f) in os.walk(path):
        for file in f:
            ad=p+s+file
            files[ad]= os.stat(ad).st_size
    while True:
        nextfor=False
        for (p, d, f) in os.walk(path):
            if nextfor==True:break
            for file in f:
                if nextfor==True:break
                ad=p+s+file
                oldsize=files[ad]
                newsize=os.stat(ad).st_size
                if oldsize!=newsize:
                    files[ad]=newsize
                    txt = open(path + s + "codingtime.txt", "rt",encoding="utf-8")
                    sum=int(txt.readline().strip())+dt
                    txt.close()
                    txt = open(path + s + "codingtime.txt", "w",encoding="utf-8")
                    txt.write(str(sum))
                    txt.close()
                    nextfor=True
        print(sectotime(sum))
        time.sleep(dt)
except:
    print(sys.exc_info())

print("something wrong, try to delete/edit (need integer of seconds) codingtime.txt and start again.  To close window press Enter")
input()
