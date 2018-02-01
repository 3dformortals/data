import wx
import wx.lib.scrolledpanel
import pickle,sys
import webbrowser
from functools import partial # callback + parameters
 
# Define the tab content as classes:

def tabdata_maker(tabname,db):
    """prepare dict data for write to elements"""
    try:
        return db[tabname]
    except:
        print("tabdatamaker error", sys.exc_info())
        return [["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
        pass

class TabOne(wx.Panel):
    
    def __init__(self, parent, tabname):
        wx.Panel.__init__(self, parent)
        db=self.GetParent().GetParent().GetParent().db
        self.tabname=tabname
        self.db=tabdata_maker(self.tabname, db)
        sp=wx.lib.scrolledpanel.ScrolledPanel(self,-1, size=(780,660), pos=(0,0), style=wx.SIMPLE_BORDER)
        sp.SetupScrolling(scroll_x=False,scroll_y=True,rate_x=20,rate_y=60)
        boxv = wx.BoxSizer( wx.VERTICAL)
        
        xname=["x","name","-","+","i"]
        xwidth=[54,482,54,100,54]
        xposx=[0,60,548,608,714]
        dy=60
        for r in range(33):
            boxg = wx.BoxSizer(wx.HORIZONTAL)
            for c in range(5):
                self.b=wx.Button(sp,wx.ID_ANY,name="btn_"+xname[c]+str(r),label=xname[c],pos=(xposx[c],dy*r),size=(xwidth[c],54))
                if c == 1:self.b.SetLabel(self.db[r][0])
                elif c==3:self.b.SetLabel(self.db[r][2])
                self.b.Bind(wx.EVT_BUTTON, self.OnClicked) # wrong syntax
                boxg.Add(self.b)
            boxv.Add(boxg)
        sp.SetSizer( boxv )
    
    def OnClicked(self, event): 
        self.GetParent().GetParent().GetParent().global_click_manager(self.tabname,event)

class GetData(wx.Dialog):
    def __init__(self, parent, tabname, ind):
        wx.Dialog.__init__(self, parent, wx.ID_ANY, "Element editor", size= (650,260))
        self.panel = wx.Panel(self,wx.ID_ANY)

        self.db=parent.GetParent().GetParent().GetParent().db
        oldname=self.db[tabname][ind][0]
        oldhref=self.db[tabname][ind][1]
        olddone=self.db[tabname][ind][2]
        self.lblname = wx.StaticText(self.panel, label="Name", pos=(20,20))
        self.name = wx.TextCtrl(self.panel, value=oldname, pos=(120,20), size=(500,-1))
        self.lblhref = wx.StaticText(self.panel, label="Web link", pos=(20,60))
        self.href = wx.TextCtrl(self.panel, value=oldhref, pos=(120,60), size=(500,-1))
        self.lbldone = wx.StaticText(self.panel, label="Viewed", pos=(20,100))
        self.done = wx.TextCtrl(self.panel, value=olddone, pos=(120,100), size=(500,-1))
        self.saveButton =wx.Button(self.panel, label="Save", pos=(110,160))
        self.closeButton =wx.Button(self.panel, label="Cancel", pos=(280,160))
        self.saveButton.Bind(wx.EVT_BUTTON, partial(self.SaveConnString, tabname=tabname, ind=ind))
        self.closeButton.Bind(wx.EVT_BUTTON, self.OnQuit)
        self.Bind(wx.EVT_CLOSE, self.OnQuit)
        self.Show()

    def OnQuit(self, event):
        self.result_name = None
        self.Destroy()

    def SaveConnString(self, event, tabname, ind):
        self.result_name = self.name.GetValue()
        self.result_href = self.href.GetValue()
        self.result_done = self.done.GetValue()
        self.db[tabname][ind]=[self.result_name,self.result_href,self.result_done]
        tab=self.GetParent()
        btn_name=wx.Window.FindWindowByName("btn_name"+str(ind), tab)
        btn_plus=wx.Window.FindWindowByName("btn_+"+str(ind), tab)
        btn_name.SetLabel(self.result_name)
        btn_plus.SetLabel(self.result_done)
        self.Destroy()
 
class MainFrame(wx.Frame):
    def __init__(self,parent,title):
        # wx.Frame.__init__(self, None, title="DAS progress 132",size=(800,600))
        super(MainFrame, self).__init__(parent, title="DAS progress 132",size=(940,720))
        self.Centre()
        # self.Show()
        # SetSizeHints(minW, minH, maxW, maxH)
        self.SetSizeHints(940,720,940,720)
        
        # read the db
        self.db=self.db_reader()
        
 
        # Create a panel and notebook (tabs holder)
        self.p = wx.Panel(self)
        
        
        # self.pagetext=wx.StaticText(self.p, wx.ID_ANY, label="1/1", pos=(628,0),size=(36,34),style=wx.ALIGN_CENTRE_HORIZONTAL) # 670-36-6
        
        # self.pageminus=wx.Button(self.p,wx.ID_ANY,label="<<<",name="<<<",pos=(518,0),size=(100,34)) # 628-106
        # self.pageminus.Bind(wx.EVT_BUTTON, self.OnClicked)
        nb = wx.Notebook(self.p)
        self.cocoa=wx.Button(nb,wx.ID_ANY,label="(: на какао разработчику (топливо для меня)",name="btn_cocoa",pos=(370,0),size=(-1,34)) # засунул в nb так как до этого в p делал и на винде новая добавляется сзади а на линкусе спереди... может так лучше будет, надо проверить
        self.cocoa.Bind(wx.EVT_BUTTON, self.OnClicked)
        
        # Create the tab windows
        self.tab1 = TabOne(nb,"dorama")
        self.tab2 = TabOne(nb,"anime")
        self.tab3 = TabOne(nb,"series")
        self.tab4 = TabOne(nb,"other")
 
        # Add the windows to tabs and name them.
        nb.AddPage(self.tab1, "Dorama")
        nb.AddPage(self.tab2, "Anime")
        nb.AddPage(self.tab3, "Series")
        nb.AddPage(self.tab4, "Other")
 
        # Set noteboook in a sizer to create the layout
        sizer = wx.BoxSizer()
        sizer.Add(nb, 1, wx.EXPAND)
        self.p.SetSizer(sizer)
    
    def db_writer(self):
        """try write data to pickle file"""
        try:
            with open("db.pickle","wb") as handle:pickle.dump(self.db,handle)
        except:
            print("error db_writer",sys.exc_info())
    
    def db_reader(self):
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
    
    def i_maker(self,tabname,event):
        x=event.GetEventObject().GetName().split("btn_i",1)[1]
        if (tabname=="dorama"): parent=self.tab1
        elif (tabname=="anime"): parent=self.tab2
        elif (tabname=="series"): parent=self.tab3
        elif (tabname=="other"): parent=self.tab4
        dlg = GetData(parent = parent, tabname=tabname, ind = int(x)) 
        dlg.ShowModal()
        if dlg.result_name:
            # print(dlg.result_name,dlg.result_href,dlg.result_done)
            self.db[tabname][int(x)]=[dlg.result_name,dlg.result_href,dlg.result_done]
            self.db_writer()
        else:
            pass
            # print("dailog notsaved")
        dlg.Destroy()
    
    def name_maker(self,tabname,event):
        try:
            ind=int(event.GetEventObject().GetName().split("btn_name",1)[1])
            url=self.db[tabname][ind][1]
            webbrowser.open(url)
        except:
            print("error name_maker\n",sys.exc_info())
    
    def x_maker(self,tabname,event):
        x_name=event.GetEventObject().GetName()
        x=x_name.split("btn_x",1)[1]
        if tabname=="dorama":tab=self.tab1
        elif tabname=="anime":tab=self.tab2
        elif tabname=="series":tab=self.tab3
        elif tabname=="other":tab=self.tab4
        btn_name=wx.Window.FindWindowByName("btn_name"+x, tab)
        btn_plus=wx.Window.FindWindowByName("btn_+"+x, tab)
        btn_name.SetLabel("")
        btn_plus.SetLabel("0/0")
        self.db[tabname][int(x)]=["","http://helpmedraw.pythonanywhere.com/","0/0"]
        self.db_writer()
    
    def btn_plus_increment_maker(self,oldlabel):
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
    
    def plus_maker(self,tabname,event):
        x_name=event.GetEventObject().GetName()
        x=x_name.split("btn_+",1)[1]
        if tabname=="dorama":tab=self.tab1
        elif tabname=="anime":tab=self.tab2
        elif tabname=="series":tab=self.tab3
        elif tabname=="other":tab=self.tab4
        btn_plus=wx.Window.FindWindowByName("btn_+"+x, tab)
        newlabel=self.btn_plus_increment_maker(btn_plus.GetLabel())
        btn_plus.SetLabel(newlabel)
        self.db[tabname][int(x)][-1]=newlabel
        self.db_writer()
    
    def btn_minus_increment_maker(self,oldlabel):
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
    
    def minus_maker(self,tabname,event):
        x_name=event.GetEventObject().GetName()
        x=x_name.split("btn_-",1)[1]
        if tabname=="dorama":tab=self.tab1
        elif tabname=="anime":tab=self.tab2
        elif tabname=="series":tab=self.tab3
        elif tabname=="other":tab=self.tab4
        btn_plus=wx.Window.FindWindowByName("btn_+"+x, tab)
        newlabel=self.btn_minus_increment_maker(btn_plus.GetLabel())
        btn_plus.SetLabel(newlabel)
        self.db[tabname][int(x)][-1]=newlabel
        self.db_writer()
    
    def cocoa_maker(self):
        webbrowser.open("http://stts.pythonanywhere.com/")
    
    def global_click_manager(self,tabname,event):
        btnname=event.GetEventObject().GetName()
        i_list=["btn_i"+str(i) for i in range(33)]
        plus_list=["btn_+"+str(i) for i in range(33)]
        minus_list=["btn_-"+str(i) for i in range(33)]
        name_list=["btn_name"+str(i) for i in range(33)]
        x_list=["btn_x"+str(i) for i in range(33)]
        if (btnname in i_list):self.i_maker(tabname,event)
        elif (btnname in name_list):self.name_maker(tabname,event)
        elif (btnname in x_list):self.x_maker(tabname,event)
        elif (btnname in plus_list):self.plus_maker(tabname,event)
        elif (btnname in minus_list):self.minus_maker(tabname,event)
        elif (btnname == "btn_cocoa"):self.cocoa_maker()
        else:print("globalclickmanager",tabname,btnname)
    
    def OnClicked(self, event):
        # btn = event.GetEventObject().GetLabel() 
        self.global_click_manager("MainFrame",event)
    
    
 
 
if __name__ == "__main__":
    app = wx.App()
    
    MainFrame(None,title="DAS prog").Show()
    
    app.MainLoop()