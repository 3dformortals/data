 # -*- coding: utf-8 -*-

import sys,os
import html
import requests
from bs4 import BeautifulSoup as BS4
import re
import codecs
import string
import urllib.request


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

def test_vk():
    url="https://vk.com/videos-24440848?section=album_54694282"
    # html = gethtml(url,True)
    html = gethtml2(url)
    print(html)
    return html

def test_shiki():
    url="https://play.shikimori.org/animes/39191-wan-jie-shen-zhu/video_online"
    # html = gethtml(url,True)
    html = gethtml2(url)
    print(html)
    return html

def test_animevost():
    url="http://animevost.org/tip/tv/2228-kaguya-sama-wa-kokurasetai.html"
    html = gethtml(url,True)
    # html = gethtml2(url)
    print(html)
    return html

test_animevost()
input("shittttttttttttttttt")
