"""
генератор паролей, создает 11 паролей в файле pas.txt
"""
import random,sys
s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?&@$%^*()[]_|+-"
pl=11
try:
	print("введите длину пароля от 1 до 256")
	pl=int(float(input()))
	if pl<1 or pl>255:pl=11
except:
	print(sys.exc_info())
f=open(r"pas.txt","w",encoding="utf-8",newline="\n")
p=""
for i in range(11):
	p=""
	for j in range(pl):
		p+=random.choice(s)
	f.write(p+"\n")
f.close()
print("пароли записаны в файл pas.txt (UNIX utf-8). для завершения программы нажмите enter")
input()