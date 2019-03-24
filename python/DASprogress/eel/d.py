 # -*- coding: utf-8 -*-

import os
import sys
import eel
eel.init('web')

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))
print(str(mydir))

def dbReader():
    try:
        with open(mydir + os.sep + "db.txt","r") as handle:
            dbTxt = handle.read()
    except:
        dbTxt = ""
    return dbTxt

def dbWriter(text):
    try:
        with open(mydir + os.sep + "db.txt","w") as handle:
            handle.write(text)
        message = "write to db complete"
    except:
        message = "wrong db writer"
    return message

def itemCreator(name, url, viewed):
    text = name+"\n"+url+"\n"+viewed+"\n\n"
    return text

@eel.expose
def python_method():
    print("wtfeelyoudoing?")
    return 44

@eel.expose
def pythonAddonItem(name, url, viewed):
    dbTxt = dbReader()
    newTxt = itemCreator(name, url, viewed)
    txt = dbTxt + newTxt
    message = dbWriter(txt)
    eel.jSShowMessage(message)
    return txt

@eel.expose
def pythonShow(): return dbReader()

@eel.expose
def pythonFixChanges(txt): dbWriter(txt)

eel.start('main.html', options={'mode': 'default','chromeFlags': ['--disable-http-cache']})
