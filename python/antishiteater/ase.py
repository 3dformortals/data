 # -*- coding: utf-8 -*-
import sys,os,webbrowser
import html
import requests
from bs4 import BeautifulSoup as BS4
import re
import urllib.request #second test


import eel
eel.init('web')

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

@eel.expose
def readyoutube(x,post=False):
    url=""
    # if x == 1: url="https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnwDsFt61-jXeyMOnKy9fQENJvaHoCkX0&order=date&part=snippet&channelId=UCIMmvSgcO23HvZ8Ne32GlYw&maxResults=10"
    if x == 1: url="http://www.youtube.com/channel/UCt6nsWw2kQNszwpuuHoxBLA/videos"
    elif x == 2: url="https://www.youtube.com/channel/UC_nKsYiigmY9OskmITBXdBQ/videos"
    elif x == 3: url="https://www.youtube.com/user/NavalnyRu/videos"
    elif x == 4: url="https://www.youtube.com/channel/UCgxTPTFbIbCWfTR9I2-5SeQ/videos"
    elif x == 5: url="https://www.youtube.com/user/kamikadzedead/videos"
    # result = gethtml(url)
    result = gethtml2(url)
    return result

eel.start('main.html')