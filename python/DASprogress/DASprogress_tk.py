 # -*- coding: utf-8 -*-
import tkinter
from tkinter import ttk
import sys,pickle,webbrowser

def on_linuxscrollup(event):
    try:
        canvas=event.widget.master.master
        scroll=-1
        canvas.yview_scroll(scroll, "units")
    except:pass

def on_linuxscrolldn(event):
    try:
        canvas=event.widget.master.master
        scroll=1
        canvas.yview_scroll(scroll, "units")
    except:pass

def on_mousewheel(event):
    try:
        shift = (event.state & 0x1) != 0
        canvas=event.widget.master.master
        scroll = -1 if event.delta > 0 else 1
        if shift:
            canvas.xview_scroll(scroll, "units")
        else:
            canvas.yview_scroll(scroll, "units")
    except:
        print("base scroll ",sys.exc_info())

def db_writer():
    """try write data to pickle file"""
    try:
        with open("db.pickle","wb") as handle:pickle.dump(db,handle)
    except:
        print("error db_writer",sys.exc_info())

def db_reader():
    """try read the data from pickle file"""
    try:
        with open("db.pickle","rb") as handle:
            db=pickle.load(handle)
            return db
    except:
        print("db_reader error\n",sys.exc_info())
        db={}
        db["dorama"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
        db["anime"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
        db["series"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
        db["other"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
        return db

def tabdata_maker(tabname):
    """prepare dict data for write to elements"""
    try:
        return db[tabname]
    except:
        print("tabdatamaker error", sys.exc_info())
        return [["noname","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
        pass

class MyDialog(object):
    def __init__(self, parent, prompt, tabname, ind):
        global buffer
        buffer=None
        self.tabname=tabname
        self.ind=ind
        self.value=None
        self.toplevel = tkinter.Toplevel(parent)
        self.iname = tkinter.StringVar(value=db[self.tabname][self.ind][0])
        self.ihref = tkinter.StringVar(value=db[self.tabname][self.ind][1])
        self.idone = tkinter.StringVar(value=db[self.tabname][self.ind][2])
        label = tkinter.Label(self.toplevel, text=prompt)
        lname = tkinter.Label(self.toplevel, text="Name:")
        lhref = tkinter.Label(self.toplevel, text="Web link:")
        ldone = tkinter.Label(self.toplevel, text="Viewed:")
        ename = tkinter.Entry(self.toplevel, width=40, textvariable=self.iname)
        ehref = tkinter.Entry(self.toplevel, width=40, textvariable=self.ihref)
        edone = tkinter.Entry(self.toplevel, width=40, textvariable=self.idone)
        button = tkinter.Button(self.toplevel, text="OK")
        button.bind("<Button-1>",self.onclick_ok)
        self.toplevel.geometry("%dx%d+%d+%d" % (700, 200, mainframe_width, mainframe_heigth))
        label.grid(row=0, column=0,columnspan=2)
        lname.grid(row=1,column=0,sticky=tkinter.W)
        ename.grid(row=1,column=1,sticky=tkinter.W +tkinter.E)
        lhref.grid(row=2,column=0,sticky=tkinter.W)
        ehref.grid(row=2,column=1)
        ldone.grid(row=3,column=0,sticky=tkinter.W)
        edone.grid(row=3,column=1)
        button.grid(row=4,column=0,columnspan=2)

    def show(self):
        self.toplevel.grab_set()
        self.toplevel.wait_window()
        # value = [self.iname.get(),self.ihref.get(),self.idone.get()]
        # return value
    
    def onclick_ok(self,event):
        global buffer
        buffer = [self.iname.get(),self.ihref.get(),self.idone.get()]
        self.toplevel.destroy()

def i_maker(name,tabname,tab):
    ind=int(name.split("i",1)[1])
    MyDialog(mainframe,"element editor",tabname,ind).show()
    d=buffer
    if d:
        db[tabname][ind]=d
        btn_href,btn_plus=None,None
        hrefname="href"+str(ind)
        plusname="plus"+str(ind)
        for chi in tab.children.values():
            if chi.name == hrefname:btn_href=chi
            elif chi.name == plusname:btn_plus=chi
            elif btn_href and btn_plus:break
        btn_href.configure(text=d[0])
        btn_plus.configure(text=d[2])
        db_writer()

def hrefsort(obj):
    return int(obj.name.split("href",1)[1])
def plussort(obj):
    return int(obj.name.split("plus",1)[1])

def refresh_tab(tabname,tab):
    bhref=[]
    bplus=[]
    for children in tab.children.values():
        if children.name in hrefnames:bhref.append(children)
        elif children.name in plusnames:bplus.append(children)
    bhref.sort(key=hrefsort)
    bplus.sort(key=plussort)
    
    for r in range(brows):
        hrefname="href"+str(r)
        donename="done"+str(r)
        bhref[r].configure(text=db[tabname][r][0])
        bplus[r].configure(text=db[tabname][r][2])
    db_writer()

def up_maker(name,tabname,tab):
    ind=int(name.split("up",1)[1])
    mylist=db[tabname]
    mylist.insert(0, mylist.pop(ind))
    db[tabname]=mylist
    refresh_tab(tabname,tab)

def btn_plus_increment_maker(oldlabel):
        try:
            oldlabel=oldlabel.replace(",",".")
            oldlabel=oldlabel.replace("из","/")
            if ("/" in oldlabel):
                done,summa=oldlabel.split("/",1)
                done=int(float(done))
            else:
                done=int(float(oldlabel))
                summa=False
            done+=1
            if summa:return str(done)+"/"+summa
            else:return str(done)
        except:
            return "0/0"

def plus_maker(name,btn,tabname,tab):
    ind=int(name.split("plus",1)[1])
    newtext=btn_plus_increment_maker(btn["text"])
    btn.configure(text=newtext)
    mylist=db[tabname]
    mylist[ind][2]=newtext
    db_writer()

def btn_minus_increment_maker(oldlabel):
        try:
            oldlabel=oldlabel.replace(",",".")
            oldlabel=oldlabel.replace("из","/")
            if ("/" in oldlabel):
                done,summa=oldlabel.split("/",1)
                done=int(float(done))
            else:
                done=int(float(oldlabel))
                summa=False
            done-=1
            if summa:return str(done)+"/"+summa
            else:return str(done)
        except:
            return "0/0"

def minus_maker(name,tabname,tab):
    ind=int(name.split("minus",1)[1])
    btn=None;plusname="plus"+str(ind)
    for children in tab.children.values():
        if children.name == plusname:
            btn=children
            break
    newtext=btn_minus_increment_maker(btn["text"])
    btn.configure(text=newtext)
    mylist=db[tabname]
    mylist[ind][2]=newtext
    db_writer()

def href_maker(name,tabname):
    try:
        ind=int(name.split("href",1)[1])
        url=db[tabname][ind][1]
        webbrowser.open(url)
    except:
        print("error href_maker\n",sys.exc_info())

def del_maker(name,tabname,tab):
    sind=name.split("del",1)[1]
    ind=int(sind);
    db[tabname][ind]=["","http://helpmedraw.pythonanywhere.com/","0/0"]
    btn_href,btn_plus=None,None
    for children in tab.children.values():
        if children.name == "href"+sind:btn_href=children
        elif children.name== "plus"+sind:btn_plus=children
        elif btn_href and btn_plus: break
    btn_href.configure(text="")
    btn_plus.configure(text="0/0")
    db_writer()



def global_click_manager(event):
    btn=event.widget
    name=btn.name
    tab=event.widget.master
    tabname=tab.name
    if name in inames:i_maker(name,tabname,tab)
    elif name in upnames:up_maker(name,tabname,tab)
    elif name in plusnames:plus_maker(name,btn,tabname,tab)
    elif name in minusnames:minus_maker(name,tabname,tab)
    elif name in hrefnames:href_maker(name,tabname)
    elif name in delnames:del_maker(name,tabname,tab)
    
    pass

def cocoa_click(event):
    webbrowser.open("http://stts.pythonanywhere.com/")

class MyButton(ttk.Button):
    def __init__(self, parent, name, *args, **kwargs):
        super(MyButton, self).__init__(parent, *args, **kwargs)
        self.name=name
        pass

class MyButtonFrame(ttk.Frame):
    def __init__(self, parent, name, *args, cols, rows, colsx, rowsy, bnames, btexts, bwidths, **kwargs):
        super(MyButtonFrame, self).__init__(parent, *args, **kwargs)
        self.name=name
        tdb=tabdata_maker(self.name)
        for r in range(rows):
            textname=tdb[r][0]
            # ehref=tdb[r][1]
            textdone=tdb[r][2]
            for c in range(cols):
                bname=bnames[c]+str(r)
                if c==1:btext=textname
                elif c==3:btext=textdone
                else: btext=btexts[c]
                bx=colsx[c]
                by=rowsy[r]
                b=MyButton(self,bname,text=btext)
                b.place(width=bwidths[c],height=rowsy[1],x=bx,y=by)
                b.bind("<Button-1>",global_click_manager)
        pass

buffer=None
db=db_reader()
mainframe = tkinter.Tk()
# use width x height + x_offset + y_offset (no spaces!)
mainframe_width = (mainframe.winfo_screenwidth() / 2 - 500)
mainframe_heigth = (mainframe.winfo_screenheight() / 2 - 300)
mainframe.geometry("%dx%d+%d+%d" % (1000, 600, mainframe_width, mainframe_heigth))
mainframe.title('DAS progress 132')
mainframe.resizable(False,True)
n_book = ttk.Notebook(mainframe)
n_book.pack(fill='both', expand='yes')
n_book.pressed_index = None

x_name=["Dorama","Anime","Series","Other"]
x_container=[]; x_canvas=[]; x_scroll=[]; x_frame=[]
cw,ch=960,400; fw,fh=1000,1320; sr=(0,0,1000,1320)
bnames=["del","href","minus","plus","up","i"]
btexts=["x","href","-","999/999",u"\u21E7","i"]
# btexts=["x","href","-","+",u"\u2191","i"]
# btexts=["x","href","-","+",u"\u25B2","i"]
bcols=len(bnames); brows=33
# for comparison global_click_manager
delnames,hrefnames,minusnames,plusnames,upnames,inames=[],[],[],[],[],[]
for i in range(brows):
    ind=str(i)
    delnames.append(bnames[0]+ind)
    hrefnames.append(bnames[1]+ind)
    minusnames.append(bnames[2]+ind)
    plusnames.append(bnames[3]+ind)
    upnames.append(bnames[4]+ind)
    inames.append(bnames[5]+ind)

colsx=[0,40,720,760,880,920]
rowsy=[40*y for y in range(brows)]
bwidths=[40,720,40,120,40,40]
for i in range(4):
    x_container.append(tkinter.Frame(n_book))
    x_container[i].pack(fill=tkinter.BOTH, expand=True)
    n_book.add(x_container[i], text=x_name[i]) # add container to note book
    x_canvas.append(tkinter.Canvas(x_container[i], width=cw, height=ch)) # add canvas to container
    x_scroll.append(tkinter.Scrollbar(x_container[i], command=x_canvas[i].yview)) # add scroll to container
    x_canvas[i].config(yscrollcommand=x_scroll[i].set, scrollregion=sr)
    x_canvas[i].pack(side=tkinter.LEFT, fill=tkinter.BOTH, expand=True)
    x_scroll[i].config(width=240)
    x_scroll[i].pack(side=tkinter.RIGHT, fill=tkinter.Y, expand=True)
    frame_name=x_name[i].lower()
    frame=MyButtonFrame(x_canvas[i], frame_name, cols=bcols,rows=brows,colsx=colsx,rowsy=rowsy,bnames=bnames,btexts=btexts,bwidths=bwidths, width=fw, height=fh)
    x_frame.append(frame) # create the frame for canvas
    x_canvas[i].create_window(0, 0, window=x_frame[i], anchor='nw') # add frame to canvas
    x_canvas[i].bind_all("<MouseWheel>", on_mousewheel) # windows and osx
    x_canvas[i].bind_all("<Button-4>", on_linuxscrollup)
    x_canvas[i].bind_all("<Button-5>", on_linuxscrolldn)

cocoa = ttk.Button(mainframe,text="(: на какао разработчику (топливо для меня)") # add button to mainframe - worked
cocoa.place(height=40,width=600,relx=0.4,rely=0)
cocoa.bind("<Button-1>",cocoa_click)
mainframe.mainloop()
