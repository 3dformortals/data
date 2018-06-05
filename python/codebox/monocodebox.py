#!/usr/bin/env python3
import re,sys,string

def mirror_n(t,n):
    """t-list n-mirrornumber"""
    regstr='.{1,'+str(n)+'}'
    xlist=re.findall(regstr, t)
    x="".join([rev[::-1] for rev in xlist])
    return x

def mirror(t):
    x=t
    for i in range(2,len(t)+1):
        x=mirror_n(x,i)
    return x

def upanddown(t):
    x=""
    toup=False
    todn=False
    x=list(t)
    for i in range(len(t)):
        if not toup and x[i]!=x[i].upper():
            toup=True
            x[i]=x[i].upper()
        elif not todn and x[i]!=x[i].lower():
            todn=True
            x[i]=x[i].lower()
    return "".join(x)

def opposite(x):
    num=string.digits
    numback=string.digits[::-1]
    big=string.ascii_uppercase
    bigback=string.ascii_uppercase[::-1]
    small=string.ascii_lowercase
    smallback=string.ascii_lowercase[::-1]
    # print("before dict generator")
    numdict={key:value for (key,value) in zip(num,numback)}
    bigdict={key:value for (key,value) in zip(num,numback)}
    smalldict={key:value for (key,value) in zip(small,smallback)}
    # print("afterdict generator")
    sumdict=numdict.copy()
    sumdict.update(bigdict)
    sumdict.update(smalldict)
    rez=""
    # print("before loop")
    for i in range(len(x)):
        xi = x[i]
        if (xi in sumdict): rez += sumdict[xi]
        else:rez += "_"
    # print("after loop")
    return rez

x=input("input the text\n\n")
#clean
try:
    # x=re.sub(r"[^a-zA-Z0-9]", "", x)
    x = opposite(x)
    x=mirror(x)
    x=upanddown(x)
    
    print("\n\n")
    print(x)
        
    
except:
    print(sys.exc_info())
input("\n\nenter to close")

