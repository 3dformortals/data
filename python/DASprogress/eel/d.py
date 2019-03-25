 # -*- coding: utf-8 -*-

import sys,os
import html
import requests
from bs4 import BeautifulSoup as BS4
import re
import codecs
import string
import urllib.request

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

#site scanning section
def safeint(x):
    try:return int(x)
    except:return None

def gethtml(url,post=False):
    try:
        if post: r = requests.post(url, data='cmd=date +%Y%m%d', headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        else:r = requests.get(url, data='cmd=date +%Y%m%d', headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        # text=r.content.decode("unicode_escape","ignore")
        text = html.unescape(r.text)
        # print("text------------------\n",text)
        return text
    except:
        print(sys.exc_info())
        input("get html error enter to continue")

def gethtml2(url):
    with urllib.request.urlopen(url) as response:
        html = response.read().decode(errors='ignore')
    return html

def animevost_org_scanner(url):
    # done 20190211
    html = gethtml(url)
    soup = BS4(html,"html5lib")
    webname = soup.title.string.split("[")[0] or "parsing_error"
    website = "animevost.org"
    webready = soup.title.string.split("[")[1].split("]")[0].split("из")[0] or "parsing_error"
    webready = webready.split("-")[1] if "-" in webready else webready or "parsing_error"
    webready = safeint(webready.split(" ")[0]) or -1
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def shikimori_org_scanner(url):
    # done 20190211
    html = gethtml(url)
    soup = BS4(html, "html5lib")

    webname = soup.find("header", class_="head").meta["content"] or "parsing_error"
    website = "shikimori.org"
    maxready = 0
    span_ep_num = soup.find_all('span',class_="episode-num")
    for span_ep in span_ep_num:
        nextSpan = span_ep.findNext('span',class_="episode-kinds").string
        epNum = safeint(span_ep.string.split("#")[1]) or -1
        if "озвучка" in nextSpan and epNum > maxready: maxready = epNum
    webready = maxready
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def anistar_me_scanner(url):
    # done 20190211
    html = gethtml(url)
    soup = BS4(html, "html5lib")

    webname = soup.find("h1", itemprop="name").string or "parsing_error"
    website = "anistar.me"
    webready = soup.find("p", class_="reason").string
    print("webready = ", webready, flush=True)
    webready = safeint(re.findall('\d+', webready )[0]) or -1
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def vk_com_scanner(url):
    # done 20190211
    print("inside vkcomscanner py",flush=True)
    # html = gethtml(url,True)
    html = gethtml2(url)
    soup = BS4(html, "html5lib")

    webname = soup.find("div", class_="ui_crumb").text or "parsing_error"
    website = "vk.com"
    webready = soup.find("span", class_="_video_subtitle_counter").string
    webready = safeint(webready.split(" ")[0]) or -1
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def green_tea_scanner(url):
    # done 20190211
    html = gethtml(url,True)
    soup = BS4(html, "html5lib")

    webname = soup.find("meta", itemprop="name")["content"] or "parsing_error"
    website = "green-teatv.com"
    webready = 0
    for div in soup.find_all("div",class_="info-label"):
        if div.text == "Длительность:":
            webready = safeint(div.findNext("div",class_="info-desc").text.split("из")[0]) or -1
            break
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def anilibria_tv_scanner(url):
    # done 20190211
    html = gethtml(url,True)
    soup = BS4(html, "html5lib")

    webname = soup.find("h1", class_='title-rus').text or "parsing_error"
    webname +=" / "+ soup.find("h3", class_='title-original').text or "parsing_error"

    website = "anilibria.tv"
    textready = soup.find("div", class_='torrent-first-col').span.text or "parsing_error"
    text = textready.split(" ",1)[1]
    text = text.split(" ")[0].split("[")[0]
    if "-" in text: text=text.split("-")[1]
    webready = safeint(text) or -1
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def lostfilm_tv_scanner(url):
    # done 20190211
    html = gethtml(url,True)
    soup = BS4(html, "html5lib")

    webname = soup.find("div", class_='title-ru').text or "parsing_error"
    webname +=" / "+ soup.find("div", class_='title-en').text or "parsing_error"

    website = "lostfilm.tv"
    textready = soup.find("div", class_="details").text or "parsing_error"
    text = textready.split("серий: ",1)[1].split(" ")[0]
    webready = safeint(text) or -1
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def web_scanner(url):
    print("inside webscanner py",flush=True)
    print(url,flush=True)
    print("url.get.lower() = ",url.lower())
    # print(gethtml(url), flush=True)
    if "animevost.org" in url.lower(): data = animevost_org_scanner(url)
    elif "shikimori.org" in url.lower(): data = shikimori_org_scanner(url)
    elif "anistar.me" in url.lower(): data = anistar_me_scanner(url)
    elif "vk.com" in url.lower(): data = vk_com_scanner(url)
    elif "anilibria.tv" in url.lower(): data = anilibria_tv_scanner(url)
    elif "green-teatv.com" in url.lower(): data = green_tea_scanner(url)
    elif "lostfilm.tv" in url.lower(): data = lostfilm_tv_scanner(url)
    else: data = ["testwebname","testwebsite","testcanscan","testscanstatus",-1]
    webname, website, canscan, scanstatus, webready = data
    return str(webready)

def test():
    url="https://vk.com/videos-24440848?section=album_54694282"
    # html = gethtml(url,True)
    html = gethtml2(url)
    return html

@eel.expose
def pythonScan(url):
    out = -1 #something wrong etc
    try:
        print(url,flush=True)
        # out = test()
        out = int(web_scanner(url))
        print("out = ",out, flush=True)
    except:
        pass
    return out

eel.start('main.html', options={'mode': 'default','chromeFlags': ['--disable-http-cache']})
