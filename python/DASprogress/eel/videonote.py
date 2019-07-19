 # -*- coding: utf-8 -*-

import sys,os,time,datetime
import html as HTML
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

def safenumber(x):
    try:return int(float(x))
    except:return 0
        

def gethtml(url,post=False):
    try:
        timeout=5 #sec to kill request if problem
        if post: r = requests.post(url, data='cmd=date +%Y%m%d', timeout=timeout, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        else:r = requests.get(url, data='cmd=date +%Y%m%d', timeout=timeout, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0'})
        # text=r.content.decode("unicode_escape","ignore")
        text = HTML.unescape(r.text)
        return text
    except TimeoutError:
        return 0

def gethtml2(url):
    try:
        with urllib.request.urlopen(url,None,5) as response:
            html = response.read().decode(errors='ignore')
    except TimeoutError:
        html=0
    return html

def youtube_scanner(url):
    html = gethtml2(url)
    regex = re.compile(r'\d* *(episode|серия|эпизод|выпуск) *\d*',flags=re.IGNORECASE|re.MULTILINE)
    regexpair = re.compile(r' *episode|серия|эпизод|выпуск *',flags=re.IGNORECASE|re.MULTILINE)
    # for text in textx:print(re.finditer(regex,text)) # only names without numbers... wtf python?!
    webready = -1
    iter = re.finditer(regex,html)
    for i in iter:
        # print(type(i[0]))
        
        pair = re.split(regexpair,i[0])
        ab = max([safenumber(x) for x in pair])
        # print(ab)
        if ab>webready:webready = ab
    return [0,1,2,3,webready]
    

def animevost_org_scanner(url):
    # done 20190211
    # html = gethtml2(url) #fail with errors, don't know why
    html = gethtml(url,True)
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
    # time.sleep(3) #looks like need 2-3 sec pause, or server not response
    # dt = datetime.datetime.today().strftime('%Y-%m-%d')
    timeout = 5
    r = urllib.request.Request(url ,headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    # r = urllib.request.Request(url, data='cmd=date +%Y%m%d',headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    html = gethtml2(r)
    if html:pass
    else:
        r = urllib.request.Request(url ,headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        # r = urllib.request.Request(url, data='cmd=date +%Y%m%d',headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        html = gethtml2(r)
        
    
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

def shikimori_one_scanner(url):
    # done 20190625
    # time.sleep(3) #looks like need 2-3 sec pause, or server not response
    # dt = datetime.datetime.today().strftime('%Y-%m-%d')
    timeout = 5
    r = urllib.request.Request(url ,headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    # r = urllib.request.Request(url, data='cmd=date +%Y%m%d',headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    html = gethtml2(r)
    if html:pass
    else:
        r = urllib.request.Request(url ,headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        # r = urllib.request.Request(url, data='cmd=date +%Y%m%d',headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        html = gethtml2(r)
        
    soup = BS4(html, "html5lib")
    htmltext = str(soup)
    webready = -1 #error etc
    fullSeason = soup.find("span",{"data-text":"вышло"}) or False
    if fullSeason: webready = 0 # keep it for full season released etc, for shikimori.one only
    anons = soup.find("span",{"data-text":"анонс"}) or False
    if anons: webready = -2 #anons case shikimori.one only
    if (not(anons or fullSeason)):
        episodes = htmltext.split("Эпизоды:",1)[1].split("class=\"value\">",1)[1].split("<",1)[0].split("/")[0] or False
        if episodes: webready = safenumber(episodes) or webready
        if webready > 1: webready-=1 #that make week(one episode) waiting period for dubbing
    print(webready)
    return 0, 0, 0, 0, webready


def anistar_me_scanner(url):
    # done 20190211
    r = urllib.request.Request(url ,headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    # r = urllib.request.Request(url, data='cmd=date +%Y%m%d',headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    html = gethtml2(r)
    if html:pass
    else:
        r = urllib.request.Request(url ,headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        # r = urllib.request.Request(url, data='cmd=date +%Y%m%d',headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        html = gethtml2(r)
    soup = BS4(html, "html5lib")

    webname = soup.find("h1", itemprop="name").string or "parsing_error"
    website = "anistar.me"
    webready = soup.find("p", class_="reason").string
    webready = safeint(re.findall('\d+', webready )[0]) or -1
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def vk_com_scanner(url):
    # done 20190211
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
    html = gethtml2(url)
    # html = gethtml(url,True)
    soup = BS4(html, "html5lib")

    webname = soup.find("meta", itemprop="name")["content"] or "parsing_error"
    website = "green-teatv.com"
    webready = -1
    for div in soup.find_all("div",class_="info-label"):
        if div.text == "Длительность:":
            webready = safeint(div.findNext("div",class_="info-desc").text.split("из")[0]) or -1
            break
    canscan = "yes"
    scanstatus = "good" if "parsing_error" != webname and webready > -1 else "bad" or "parsing_error"
    return webname, website, canscan, scanstatus, webready

def anilibria_tv_scanner(url):
    # done 20190211
    html = gethtml2(url)
    # html = gethtml(url,True)
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
    # done 20190423
    r = urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    html = gethtml2(r)
    if html:pass
    else:
        r = urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        html = gethtml2(r)
    
    text = html.split("серий: ",1)[1].split(" ")[0]
    webready = safenumber(text) or -1
    return [0,1,2,3,webready]

def animaunt_tv_scanner(url):
    r = urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'})
    html = gethtml2(r)
    if html:pass
    else:
        r = urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'})
        html = gethtml2(r)
    # html = gethtml(url,True)
    html = html.split('<li class="vis"><span>Эпизоды:</span>',1)[1].split("из",1)[0] or "0"
    webready = safenumber(html)
    return [0,1,2,3,webready]

def web_scanner(url):
    if "animevost.org" in url.lower(): data = animevost_org_scanner(url)
    elif "shikimori.org" in url.lower(): data = shikimori_one_scanner(url) #was banned on rus territory 2019-05
    elif "shikimori.one" in url.lower(): data = shikimori_one_scanner(url)
    elif "anistar.me" in url.lower(): data = anistar_me_scanner(url) # was banned from government on rus territory 2019-05-15
    elif "anistar.org" in url.lower(): data = anistar_me_scanner(url)
    elif "vk.com" in url.lower(): data = vk_com_scanner(url)
    elif "anilibria.tv" in url.lower(): data = anilibria_tv_scanner(url)
    elif "green-teatv.com" in url.lower(): data = green_tea_scanner(url)
    elif "lostfilm.tv" in url.lower(): data = lostfilm_tv_scanner(url)
    elif "https://animaunt.tv" in url.lower(): data = animaunt_tv_scanner(url)
    elif "https://www.youtube.com/playlist?list=" in url.lower(): data = youtube_scanner(url)
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
        out = int(web_scanner(url))
    except:
        pass
    return out

eel.start('main.html', options={'mode': 'default','chromeFlags': ['--disable-http-cache']})
