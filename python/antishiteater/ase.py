 # -*- coding: utf-8 -*-
import tkinter
from tkinter import ttk
import sys,os,pickle,webbrowser
import html
import requests
from bs4 import BeautifulSoup as BS4
import re
import codecs
import string

import eel
eel.init('web')

def gethtml(url,post=False):
    try:
        if post: r = requests.post(url, data='cmd=date +%Y%m%d', headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        else: r = requests.get(url, data='cmd=date +%Y%m%d', headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        # text=r.content.decode("unicode_escape","ignore")
        text = html.unescape(r.text)
        # print("text------------------\n",text)
        return text
    except:
        print(sys.exc_info())
        return "python - gethtml error \n" + str(sys.exc_info())

@eel.expose
def readyoutube(x,post=False):
    url=""
    if x == 1: url=""  
    elif x == 2: url=""
    elif x == 3: url=""
    elif x == 4: url=""
    elif x == 5: url=""
    return gethtml(url,post)

eel.start('main.html')