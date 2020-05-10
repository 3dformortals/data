# terminal version
 # -*- coding: utf-8 -*-
import sys,os,webbrowser
import html
import requests
from bs4 import BeautifulSoup as BS4
import re
import urllib.request #second test

def gethtml2(url):
    with urllib.request.urlopen(url) as response:
        html = response.read().decode()
    return html

def gethtml(url,post=False):
    try:
        print("before post/get",flush=True) # this last printed
        if post: r = requests.post(url, data='cmd=date +%Y%m%d', headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        else: r = requests.get(url, data='cmd=date +%Y%m%d', headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        # text=r.content.decode("unicode_escape","ignore")
        print("before r.text",flush=True)
        text = html.unescape(r.text)
        # print("text------------------\n",text)
        print(text)
        return text
    except:
        print(sys.exc_info())
        return "python - gethtml error \n" + str(sys.exc_info())

def readyoutube(url,post=False):
    result = gethtml2(url)
    return result

# new code

sources={
    11:"https://www.youtube.com/channel/UCIpvyH9GKI54X1Ww2BDnEgg/videos", #bit
    12:"https://www.youtube.com/channel/UC_nKsYiigmY9OskmITBXdBQ/videos", #bar
    13:"http://www.youtube.com/channel/UCt6nsWw2kQNszwpuuHoxBLA/videos", #nos
    14:"https://www.youtube.com/user/NavalnyRu/videos", #nax
    15:"https://www.youtube.com/channel/UCgxTPTFbIbCWfTR9I2-5SeQ/videos", #sliv
    16:"https://www.youtube.com/user/kamikadzedead/videos", #g
}

names={
    11:"БЫТЬ ИЛИ", #bit
    12:"БАРМАЛЕЙКА", #bar
    13:"НОВОСТИ СВЕРХДЕРЖАВЫ", #nos
    14:"НАХАЛЬНЫЙ", #nax
    15:"НАХАЛЬНЫЙ СЛИВ", #sliv
    16:"КЛИКБЕЙТЕР ЖИВОДЕР ПСИХ", #g
}

headtext = """======================================================
= 11 БЫТЬ 12 БАР 13 НОС 14 НАХ 15 СЛИВ 16 КЖП 0 exit =
======================================================"""
helptext = """прочитать список видео 11...16 , потом открыть в браузере 1...9 -> Enter
========================================================================"""

hrefs = dict()
titles = dict()
want = -1
while(want != 0):
    if (want in range(11,17)):
        webtext = readyoutube(sources[want])
        items = webtext.split("dir=\"ltr\" title=\"",11)[1:10] #up to 9 elements
        hrefs.clear()
        titles.clear()
        print("="*len(names[want]))
        print(names[want])
        for i in range(len(items)): #get title , create dict of titles and hrefs
            title = items[i].split("\"  aria-describedby",1)[0]
            title = title.replace("&quot;", '\"')[:100]
            href = "https://www.youtube.com" + items[i].split("href=\"")[1].split("\"",1)[0]
            titles[i]=title
            hrefs[i]=href
            print(str(i+1) + "  "+titles[i])
        print(headtext)
    elif (want in range(1,len(hrefs)+1)): #show element in browser
        webbrowser.open(hrefs[want-1],2)
    else :
        print(headtext)
        print(helptext)
    want = int(input()[:2])
