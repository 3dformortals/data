# -*- coding: utf-8 -*-
# terminal version
import webbrowser
import urllib.request #second test
import random

def getUserAgent():
    """return random user agent string from list manually collected before"""
    alist = [
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
        "Opera/9.80 (Windows NT 6.2; Win64; x64) Presto/2.12 Version/12.16",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
        "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1"
    ]
    return random.choice(alist)

def gethtml2(url):
    req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': getUserAgent()
    }
)
    with urllib.request.urlopen(req) as response:
        html = response.read().decode()
    # print(html)
    return html

def readyoutube(url,post=False):
    result = gethtml2(url)
    return result

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


# 20200704 new stuff
hrefs = dict()
titles = dict()
want = -1
while(want != 0):
    if (want in range(11,17)):
        webtext = readyoutube(sources[want])
        items = webtext.split("\"title\":{\"accessibility\":{\"accessibilityData\":{\"label\":\"",11)[1:10] #up to 9 elements
        hrefs.clear()
        titles.clear()
        print("="*len(names[want]))
        print(names[want])
        for i in range(len(items)): #get title , create dict of titles and hrefs
            title = items[i].split("\"simpleText\":\"",1)[1].split("\"},\"publishedTimeText\"",1)[0]
            title = title.replace("&quot;", '\"')[:72]
            if (len(title)==72): title += "..."
            href = "https://www.youtube.com" + items[i].split("\"},\"publishedTimeText\":{\"simpleText\":\"",1)[0].split("\"simpleText\":\"",1)[1]
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

# old stuff not worked, youtube change page style
# hrefs = dict()
# titles = dict()
# want = -1
# while(want != 0):
#     if (want in range(11,17)):
#         webtext = readyoutube(sources[want])
#         items = webtext.split("dir=\"ltr\" title=\"",11)[1:10] #up to 9 elements
#         hrefs.clear()
#         titles.clear()
#         print("="*len(names[want]))
#         print(names[want])
#         for i in range(len(items)): #get title , create dict of titles and hrefs
#             title = items[i].split("\"  aria-describedby",1)[0]
#             title = title.replace("&quot;", '\"')[:72]
#             if (len(title)==72): title += "..."
#             href = "https://www.youtube.com" + items[i].split("href=\"")[1].split("\"",1)[0]
#             titles[i]=title
#             hrefs[i]=href
#             print(str(i+1) + "  "+titles[i])
#         print(headtext)
#     elif (want in range(1,len(hrefs)+1)): #show element in browser
#         webbrowser.open(hrefs[want-1],2)
#     else :
#         print(headtext)
#         print(helptext)
#     want = int(input()[:2])
