#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
# морда tkinter
import tkinter as tk
# импортирование модулей python
import html
import codecs
import requests
import string

#говно с принтом в виндоконсоль изза ошибок консоли, не понимает юникод или тп

def gethtml(url):
    try:
        r=requests.get(url, data='cmd=date +%Y%m%d', headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0' })
        # text=r.content.decode("unicode_escape","ignore")
        text=html.unescape(r.text)
        
        # print("text------------------\n",text)
        return text
    except:
        print(sys.exc_info())
        input("error enter to continue")

def make_weather():
    t=gethtml("http://www.gismeteo.ru/weather-moscow-4368/now/")
    # r=requests.get("http://samples.openweathermap.org/data/2.5/weather?id=524901&appid=f6f2d4a845566079c73fe054221e7558")
    # t.encode("utf-8")
    t=t.split("<span class=\"js_value tab-weather__value_l\">",1)[1]
    x,t=t.split("<span class=\"tab-weather__value_m\">",1)
    y=t.split("</span>")[0]
    x=''.join(char for char in x if char not in string.whitespace)
    text="температура воздуха "+x+y
    return text

def make_metal():
    t=gethtml("http://cbr.ru/hd_base/metall/metall_base_new/")
    # t.encode("utf-8","ignore")
    t=html.unescape(t)
    # t=t.split("<th class=\"right\">Палладий</th>")[1]
    t=t.split("Палладий</th>")[1]
    # print("------------------------",t,"----------------------") # bug unicode
    t=t.split("<tr>")[1]
    t=t.split("</tr>",1)[0]
    t=t.split("<td>")[1]
    d,t=t.split("</td>",1)
    t=t.split("<td class=\"right\">",1)[1]
    m1,t=t.split("</td>",1)
    t=t.split("<td class=\"right\">",1)[1]
    m2,t=t.split("</td>",1)
    t=t.split("<td class=\"right\">",1)[1]
    m3,t=t.split("</td>",1)
    t=t.split("<td class=\"right\">",1)[1]
    m4,t=t.split("</td>",1)
    text=[d,m1,m2,m3,m4]
    text="rub/gramm "+d+"\ngold "+m1+"\nsilver "+m2+"\nplatinum "+m3+"\npalladium "+m4
    return text

def make_money():
    t=gethtml("http://www.cbr.ru/currency_base/daily.aspx?date_req=31.12")
    t=t.split("<table class=\"data\"><tbody><tr><th>Цифр. код</th><th>Букв. код</th><th>Единиц</th><th>Валюта</th><th>Курс</th></tr>")[1].split("</tbody>")[0]
    
    usd=t.split("USD",1)[1].split("<td>",3)[-1].split("</td>")[0]
    eur=t.split("EUR",1)[1].split("<td>",3)[-1].split("</td>")[0]
    text="eur "+eur+"\nusd "+usd
    return text

def create_labels():
    try:
        s,me,mo,we="null"
        s="-----------"
        # print(s)
        me=make_metal()
        # print(me)
        mo=make_money()
        # print(mo)
        we=make_weather()
        # print(we)
    except:
        print("createlabelserror",sys.exc_info())
    return [s,me,mo,we]

class Application(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.grid()
        self.createWidgets()
    
    def createWidgets(self):
        self.quitButton = tk.Button(self, text='Quit',
            command=self.quit)
        self.quitButton.grid()
        s,me,mo,we=create_labels()
        for i in [s,me,s,mo,s,we]:
            self.testLabel = tk.Label(self, text=i)
            self.testLabel.grid()
        
def center(toplevel):
    toplevel.update_idletasks()
    w = toplevel.winfo_screenwidth()
    h = toplevel.winfo_screenheight()
    size = tuple(int(_) for _ in toplevel.geometry().split('+')[0].split('x'))
    x = w/2 - size[0]/2
    y = h/2 - size[1]/2
    toplevel.geometry("%dx%d+%d+%d" % (size + (x, y)))

root = tk.Tk()
app = Application(root)
center(root)
app.master.title('Sample application')
app.mainloop()

# try:
#     print("-----------")
#     m=make_metal()
#     print(m)
#     print("-----------")
#     m=make_money()
#     print(m)
#     print("-----------")
#     w=make_weather()
#     print(w)
# except:
#     print(sys.exc_info())


# input("close window")
