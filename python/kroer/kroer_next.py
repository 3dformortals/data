from PyQt4 import QtCore, QtGui
import math

def o_nogi_l(o,ss,w):
	return o*math.pow(ss,0.5)/2+w
	
def o_bedr_l(o,ss,w):
	return o*math.pow(ss,0.5)/4+2*w
	
def eli_025(h3,b):
	return math.pi*(3*(h3+b)-math.pow((3*h3+b)*(h3+3*b), 0.5))/4
	
def xy_bedr(h3,ln3,o6):
	if ln3==0:ln3=1
	wov=o6*h3/ln3
	zad=h3
	pyp=zad*2/math.pi
	while eli_025(h3,pyp)+eli_025(h3,zad)<wov:
		zad*=1.01
		pyp=zad*2/math.pi
	return [pyp,zad]

def kroer():
	#входные данные
	ss=window.in12.value()
	w=window.in13.value()
	l1=o_nogi_l(window.in1.value(),ss,w)
	l2=o_nogi_l(window.in2.value(),ss,w)
	l3=o_nogi_l(window.in3.value(),ss,w)
	l4=o_bedr_l(window.in4.value(),ss,w)
	l5=o_bedr_l(window.in5.value(),ss,w)
	o6=window.in6.value()
	ln1=window.in7.value()
	ln2=window.in8.value()
	ln3=window.in9.value()
	ln4=window.in10.value()
	rem=window.in11.value()
	#вычисления
	h1=1/3*(ln1+ln2)+w
	h2=2/3*ln2-ln3+w
	h3=ln3-w
	h4=ln4
	h5=1.1*rem/2+w
	f=xy_bedr(h3,ln3,o6)
	x=f[0]
	y=f[1]
	#выравниваем край симметрично
	z=y-x
	l1+=z; l2+=z; l3+=z
	#присваивание значений
	window.out1.setValue(l1)
	window.out2.setValue(h1)
	window.out3.setValue(l2)
	window.out4.setValue(h2)
	window.out5.setValue(l3)
	window.out6.setValue(h3)
	window.out7.setValue(l4)
	window.out8.setValue(h4)
	window.out9.setValue(l5)
	window.out10.setValue(h5)
	window.out11.setValue(x)
	window.out12.setValue(y)

def nastroit():
	textline=window.line1.text()
	textline=textline.splitlines()
	window.in1.setValue(int(textline[1]))
	window.in2.setValue(int(textline[2]))
	window.in3.setValue(int(textline[3]))
	window.in4.setValue(int(textline[4]))
	window.in5.setValue(int(textline[5]))
	window.in6.setValue(int(textline[6]))
	window.in7.setValue(int(textline[7]))
	window.in8.setValue(int(textline[8]))
	window.in9.setValue(int(textline[9]))
	window.in10.setValue(int(textline[10]))
	window.in11.setValue(int(textline[11]))
	window.in12.setValue(float(textline[12]))
	window.in13.setValue(int(textline[13]))

def zapis():
	textline="\n"+str(window.in1.value())+"\n"+str(window.in2.value())+"\n"+str(window.in3.value())+"\n"+str(window.in4.value())+"\n"+str(window.in5.value())+"\n"+str(window.in6.value())+"\n"+str(window.in7.value())+"\n"+str(window.in8.value())+"\n"+str(window.in9.value())+"\n"+str(window.in10.value())+"\n"+str(window.in11.value())+"\n"+str(window.in12.value())+"\n"+str(window.in13.value())+"\n"+" l1= "+str(window.out1.value())+"\n"+" h1= "+str(window.out2.value())+"\n"+" l2= "+str(window.out3.value())+"\n"+" h2= "+str(window.out4.value())+"\n"+" l3= "+str(window.out5.value())+"\n"+" h3= "+str(window.out6.value())+"\n"+" l4= "+str(window.out7.value())+"\n"+" h4= "+str(window.out8.value())+"\n"+" l5= "+str(window.out9.value())+"\n"+" h5= "+str(window.out10.value())+"\n"+" x= "+str(window.out11.value())+"\n"+" y= "+str(window.out12.value())
	window.line1.setText(textline)

class MyLabel(QtGui.QLabel):
	def __init__(self, parent=None, text_align=False):
		QtGui.QLabel.__init__(self, parent)
		if text_align:
			if text_align=="-1":self.setAlignment(QtCore.Qt.AlignHCenter | QtCore.Qt.AlignVCenter)
			elif text_align=="0":self.setAlignment(QtCore.Qt.AlignRight | QtCore.Qt.AlignVCenter)
			elif text_align=="45":self.setAlignment(QtCore.Qt.AlignRight | QtCore.Qt.AlignTop);
			elif text_align=="90":self.setAlignment(QtCore.Qt.AlignHCenter | QtCore.Qt.AlignTop)
			elif text_align=="135":self.setAlignment(QtCore.Qt.AlignLeft | QtCore.Qt.AlignTop)
			elif text_align=="180":self.setAlignment(QtCore.Qt.AlignLeft | QtCore.Qt.AlignVCenter)
			elif text_align=="225":self.setAlignment(QtCore.Qt.AlignLeft | QtCore.Qt.AlignBottom)
			elif text_align=="270":self.setAlignment(QtCore.Qt.AlignHCenter | QtCore.Qt.AlignBottom)
			elif text_align=="315":self.setAlignment(QtCore.Qt.AlignRight | QtCore.Qt.AlignBottom)

class MyDoubleSpinBox(QtGui.QDoubleSpinBox):
	def __init__(self, value=0.0):
		QtGui.QDoubleSpinBox.__init__(self)
		self.setMaximum(3000); self.setValue(value)

class MySpinBox(QtGui.QSpinBox):
	def __init__(self, value=0):
		QtGui.QSpinBox.__init__(self)
		self.setMaximum(3000); self.setValue(value)
			
class MyWindow(QtGui.QWidget):
	def __init__ (self, parent=None):
		QtGui.QWidget.__init__(self, parent)
		self.resize(1000, 500)
		self.setWindowTitle("probaokna")
		self.setAutoFillBackground(True)
		pal = self.palette()
		#pal.setBrush(QtGui.QPalette.Normal, QtGui.QPalette.Window, QtGui.QBrush(QtGui.QPixmap("")))
		#self.setPalette(pal)
		self.btn1 = QtGui.QPushButton("ok")
		self.connect(self.btn1, QtCore.SIGNAL("clicked()"), kroer)
		self.btn2 = QtGui.QPushButton("настроить")
		self.connect(self.btn2, QtCore.SIGNAL("clicked()"), nastroit)
		self.btn3 = QtGui.QPushButton("записать")
		self.connect(self.btn3, QtCore.SIGNAL("clicked()"), zapis)
		self.line1 = QtGui.QLineEdit()
		self.line1.setPlaceholderText("вставьте замеры специальной строкой и нажмите ''настроить'' для настройки входных данных")

		self.lpic1 = MyLabel("схема замеров")
		self.lpic1.setPixmap(QtGui.QPixmap("sxema1.svg").scaledToHeight(500))
		
		self.lpic2 = QtGui.QLabel("схема размеров")
		self.lpic2.setPixmap(QtGui.QPixmap("sxema2.svg").scaledToHeight(500))
		
		self.lin1 = MyLabel("o1","0")
		self.lin2 = MyLabel("o2","0")
		self.lin3 = MyLabel("o3","0")
		self.lin4 = MyLabel("o4","0")
		self.lin5 = MyLabel("o5","0")
		self.lin6 = MyLabel("o6","0")
		self.lin7 = MyLabel("ln1","0")
		self.lin8 = MyLabel("ln2","0")
		self.lin9 = MyLabel("ln3","0")
		self.lin10 = MyLabel("ln4","0")
		self.lin11 = MyLabel("ремень","0")
		self.lin12 = MyLabel("ss","0")
		self.lin13 = MyLabel("шов","0")
		
		self.in1=MySpinBox(42)
		self.in2=MySpinBox(52)
		self.in3=MySpinBox(65)
		self.in4=MySpinBox(110)
		self.in5=MySpinBox(102)
		self.in6=MySpinBox(51)
		self.in7=MySpinBox(57)
		self.in8=MySpinBox(45)
		self.in9=MySpinBox(17)
		self.in10=MySpinBox(21)
		self.in11=MySpinBox(8)
		self.in12=MyDoubleSpinBox(1.69)
		self.in13=MySpinBox(2)
		
		self.out1 = MySpinBox()
		self.out2 = MySpinBox()
		self.out3 = MySpinBox()
		self.out4 = MySpinBox()
		self.out5 = MySpinBox()
		self.out6 = MySpinBox()
		self.out7 = MySpinBox()
		self.out8 = MySpinBox()
		self.out9 = MySpinBox()
		self.out10 = MySpinBox()
		self.out11 = MySpinBox()
		self.out12 = MySpinBox()
		
		self.lout1 = MyLabel("l1", 180)
		self.lout2 = MyLabel("h1", 180)
		self.lout3 = MyLabel("l2", 180)
		self.lout4 = MyLabel("h2", 180)
		self.lout5 = MyLabel("l3", 180)
		self.lout6 = MyLabel("h3", 180)
		self.lout7 = MyLabel("l4", 180)
		self.lout8 = MyLabel("h4", 180)
		self.lout9 = MyLabel("l5", 180)
		self.lout10 = MyLabel("h5", 180)
		self.lout11 = MyLabel("x", 180)
		self.lout12 = MyLabel("y", 180)
		self.lout13 = MyLabel("", 180)
		
		vbox_1 = QtGui.QVBoxLayout()
		hbox_1 = QtGui.QHBoxLayout()
		hbox_2 = QtGui.QHBoxLayout()
		vbox_lpic1 = QtGui.QVBoxLayout()
		vbox_lin = QtGui.QVBoxLayout()
		vbox_in = QtGui.QVBoxLayout()
		vbox_out = QtGui.QVBoxLayout()
		vbox_lout = QtGui.QVBoxLayout()
		vbox_lpic2 = QtGui.QVBoxLayout()
		#vbox.addWidget(self.btn)
		
		vbox_lpic1.addWidget(self.lpic1)
		vbox_lpic2.addWidget(self.lpic2)
		
		vbox_lin.addWidget(self.lin1)
		vbox_lin.addWidget(self.lin2)
		vbox_lin.addWidget(self.lin3)
		vbox_lin.addWidget(self.lin4)
		vbox_lin.addWidget(self.lin5)
		vbox_lin.addWidget(self.lin6)
		vbox_lin.addWidget(self.lin7)
		vbox_lin.addWidget(self.lin8)
		vbox_lin.addWidget(self.lin9)
		vbox_lin.addWidget(self.lin10)
		vbox_lin.addWidget(self.lin11)
		vbox_lin.addWidget(self.lin12)
		vbox_lin.addWidget(self.lin13)
		
		vbox_in.addWidget(self.in1)
		vbox_in.addWidget(self.in2)
		vbox_in.addWidget(self.in3)
		vbox_in.addWidget(self.in4)
		vbox_in.addWidget(self.in5)
		vbox_in.addWidget(self.in6)
		vbox_in.addWidget(self.in7)
		vbox_in.addWidget(self.in8)
		vbox_in.addWidget(self.in9)
		vbox_in.addWidget(self.in10)
		vbox_in.addWidget(self.in11)
		vbox_in.addWidget(self.in12)
		vbox_in.addWidget(self.in13)
		
		vbox_out.addWidget(self.out1)
		vbox_out.addWidget(self.out2)
		vbox_out.addWidget(self.out3)
		vbox_out.addWidget(self.out4)
		vbox_out.addWidget(self.out5)
		vbox_out.addWidget(self.out6)
		vbox_out.addWidget(self.out7)
		vbox_out.addWidget(self.out8)
		vbox_out.addWidget(self.out9)
		vbox_out.addWidget(self.out10)
		vbox_out.addWidget(self.out11)
		vbox_out.addWidget(self.out12)
		vbox_out.addWidget(self.btn1)
		
		vbox_lout.addWidget(self.lout1)
		vbox_lout.addWidget(self.lout2)
		vbox_lout.addWidget(self.lout3)
		vbox_lout.addWidget(self.lout4)
		vbox_lout.addWidget(self.lout5)
		vbox_lout.addWidget(self.lout6)
		vbox_lout.addWidget(self.lout7)
		vbox_lout.addWidget(self.lout8)
		vbox_lout.addWidget(self.lout9)
		vbox_lout.addWidget(self.lout10)
		vbox_lout.addWidget(self.lout11)
		vbox_lout.addWidget(self.lout12)
		vbox_lout.addWidget(self.lout13) #пустой для выравнивания
		
		hbox_2.addWidget(self.btn2)
		hbox_2.addWidget(self.line1)
		hbox_2.addWidget(self.btn3)
		
		hbox_1.addLayout(vbox_lpic1)
		hbox_1.addLayout(vbox_lin)
		hbox_1.addLayout(vbox_in)
		hbox_1.addLayout(vbox_out)
		hbox_1.addLayout(vbox_lout)
		hbox_1.addLayout(vbox_lpic2)
		vbox_1.addLayout(hbox_1)
		vbox_1.addLayout(hbox_2)
		self.setLayout(vbox_1)
		

if __name__ == "__main__":
	
	import sys
	
	app = QtGui.QApplication(sys.argv)
	window = MyWindow()
	
	#window.setWindowTitle("probaokna")
	
	#window.resize(300, 500)
	
	window.show()
	
	sys.exit(app.exec_())
	
