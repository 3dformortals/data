--------------------------------------------------

png batch edit / пакетное редактирование png.
Обработка всех png файлов находящихся в папке програмы на уровне файла програмы(вложеные папки не трогает). Файл результат начинается с "_".

требуется библиотека pillow и python
тестировалась под pillow 3.4.2, python 3.4.4 win7x64

--------------------------------------------------

 - ## pngbatchA0pixelplus 
 - все пиксели с альфой равной 0, касающиеся пикселя с альфой больше 0, получают заданый цвет

 ![original](pic/testoriginal.png?raw=true "before")
 ![edited](pic/pngbatchA0pixelplus_1.png?raw=true "after")
 ![edited2time](pic/pngbatchA0pixelplus_2.png?raw=true "after2time")
 
 --------------------------------------------------
 
 - ##pngbatchA255## - все пиксели получают альфу 255

 --------------------------------------------------
 
 - pngbatchAto255 - все пиксели с альфой больше 0, получают альфу 255

 --------------------------------------------------
 
 - pngbatchAtocolor - все пиксели с альфой больше 0, получают заданый цвет
если на входе четыре параметра - обычный режим
если на входе три параметра, то альфу не трогает
если два, то первый - отенок серого , второй - альфа
если один параметр, то только альфу трогает

--------------------------------------------------

 - pngbatchAborderblurpluscanvas - добавляет вокруг пикселей , у которых альфа больше 0, контуры с равномерно изменяющейся прозрачностью и расширяет рисунок на ширину рамки (ширина контура умноженая на число контуров)

 --------------------------------------------------
 
 - pngbatchAborderblurplus - добавляет вокруг пикселей , у которых альфа больше 0, контуры с равномерно изменяющейся прозрачностью

 --------------------------------------------------
 
 - pngbatchAborderblur - превращает пиксели , у которых альфа больше 0, в контуры с равномерно изменяющейся прозрачностью

 --------------------------------------------------
 
exe версии - портативные, созданы командой
pyinstaller --onefile source.py

--------------------------------------------------
--------------------------------------------------

png batch edit / batch editing png.
Processing all png files in the program folder on the program file-level (sub-folders do not touch). The result file begins with "_".

It requires pillow and python library
I tested under the pillow 3.4.2, python 3.4.4 win7x64

--------------------------------------------------

 - pngbatchA0pixelplus - all pixels with an alpha equal to 0, contact with pixel with an alpha greater than 0, will have the input color

 --------------------------------------------------
 
 - pngbatchA255 - all pixels will alpha 255

 --------------------------------------------------
 
 - pngbatchAto255 - all pixels with an alpha greater than 0, getting alpha 255

 --------------------------------------------------
 
 - pngbatchAtocolor - all pixels with an alpha greater than 0, will have the input color
If a four-parameter input - normal
if three parameters are input, the alpha will not changed
if two, then the first - a shade of gray, the second - alpha
if one parameter, only the alpha will changed

--------------------------------------------------

 - pngbatchAborderblurpluscanvas - adds around pixels that have alpha greater than 0, the contours with uniformly changing the transparency and expands the picture to the width of the frame (the width of the contour multiplied by the number of contours)

 --------------------------------------------------
 
 - pngbatchAborderblurplus - adds around pixels that have alpha greater than 0, the contours with uniformly changing the transparency

 --------------------------------------------------
 
 - pngbatchAborderblur - turns the pixels whose alpha is greater than 0, in the contours with uniformly changing the transparency

 --------------------------------------------------
 
exe version - portable, created use syntax
pyinstaller --onefile source.py

--------------------------------------------------

source code links:

https://github.com/lenivaya10001/data/tree/master/imagebatch/png

https://bitbucket.org/lenivaya10001/data/src/d9a8e9e023317bf10b4aa85f3ab167f766557f01/imagebatch/png/?at=master

exe win7x64 links created use pyinstaller:

https://www.dropbox.com/sh/bcjht9wd2xoay3k/AAC-QqERD4HJBZI9mXYL-o36a
