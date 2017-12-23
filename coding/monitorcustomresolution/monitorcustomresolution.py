import sys
xy=input("your monitor resolution space separated for example \"2560 1080\"")
try:
    dx,dy=xy.split(" ",1);
    dx=int(dx)
    dy=int(dy)
    dxdy=dx/dy
except:
    print(sys.exc_info())
    print("will be used 2560 1080")
    dx=2560
    dy=1080
    dxdy=dx/dy
dymin=int(dy/2)

for i in list(range(dy,dymin,int(-(dy-dymin)/10))):
    print(str(int(dxdy*i)),end=" ")
    print(i,end=" ")
    print(str(int(100*i/dy))+"%")
input("enter to close")