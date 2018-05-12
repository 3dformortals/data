--------------------------------------------------

english description bottom

--------------------------------------------------

png batch edit / пакетное редактирование png.
Обработка всех png файлов находящихся в папке програмы на уровне файла програмы(вложеные папки не трогает). Файл результат начинается с "_".

требуется библиотека pillow и python.
Тестировалось под pillow 3.4.2, python 3.4.4 win7x64

--------------------------------------------------

##pngshredder
- разрезает каждый png файл в папке на несколько слоев. Каждый слой содержит уникальные фрагменты. Число слоев и размер фрагмента можно изменять.

![original](pic/pngshredder_0.png?raw=true "before")  
![edited](pic/pngshredder_1.png?raw=true "2 4 (1)")
![edited](pic/pngshredder_2.png?raw=true "2 4 (2)")  
![edited](pic/pngshredder_3.png?raw=true "2 16 (1)")
![edited](pic/pngshredder_4.png?raw=true "2 16 (2)")

--------------------------------------------------

##pngbatchAborderblurplusfull##
- добавляет вокруг пикселей , у которых альфа больше 0, контуры с равномерно изменяющейся прозрачностью, заполняет весь холст. Быстрее для обычных изображений (фото без фона) . Медленее для изображений малой насыщености (1 пиксель в середине холста) .

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAborderblurplusfull_1_20.png?raw=true "1 20")
![edited](pic/pngbatchAborderblurplusfull_1__20.png?raw=true "1 -20")

--------------------------------------------------

##pngbatchAborderblurplusfullslowcontour##
- добавляет вокруг пикселей , у которых альфа больше 0, контуры с равномерно изменяющейся прозрачностью, заполняет весь холст. Медленее для обычных изображений (фото без фона) . Быстрее для изображений малой насыщености (1 пиксель в середине холста) .

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAborderblurplusfullslowcontour_1_20.png?raw=true "1 20")
![edited](pic/pngbatchAborderblurplusfullslowcontour_1__20.png?raw=true "1 -20")

--------------------------------------------------

##pngbatchA0tocolor##
- все пиксели с альфой равной 0, получают заданый цвет

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchA0tocolor_1.png?raw=true "after")

--------------------------------------------------

##pngbatchA0pixelplus##
- все пиксели с альфой равной 0, касающиеся пикселя с альфой больше 0, получают заданый цвет

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchA0pixelplus_1.png?raw=true "after")
![edited2time](pic/pngbatchA0pixelplus_2.png?raw=true "after2time")

--------------------------------------------------

##pngbatchA255##
- все пиксели получают альфу 255

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchA255_1.png?raw=true "after")

--------------------------------------------------

##pngbatchAto255##
- все пиксели с альфой больше 0, получают альфу 255

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAto255_1.png?raw=true "after")

--------------------------------------------------

##pngbatchAtocolor##
- все пиксели с альфой больше 0, получают заданый цвет
- если на входе четыре параметра - обычный режим
- если на входе три параметра, то альфу не трогает
- если два, то первый - отенок серого , второй - альфа
- если один параметр, то только альфу трогает

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAtocolor_1.png?raw=true "0 0 0 255")

--------------------------------------------------

##pngbatchAborderblurpluscanvas##
- добавляет вокруг пикселей , у которых альфа больше 0, контуры с равномерно изменяющейся прозрачностью и расширяет рисунок на ширину рамки (ширина контура умноженая на число контуров)

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAborderblurpluscanvas_1_20.png?raw=true "1 20")
![edited](pic/pngbatchAborderblurpluscanvas_1__20.png?raw=true "1 -20")

--------------------------------------------------

##pngbatchAborderblurplus##
- добавляет вокруг пикселей , у которых альфа больше 0, контуры с равномерно изменяющейся прозрачностью

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAborderblurplus_1_20.png?raw=true "1 20")
![edited](pic/pngbatchAborderblurplus_1__20.png?raw=true "1 -20")

--------------------------------------------------

##pngbatchAborderblur##
- превращает пиксели , у которых альфа больше 0, в контуры с равномерно изменяющейся прозрачностью

![original](pic/testoriginal.png?raw=true "before")
![edited](pic/pngbatchAborderblur_1_20.png?raw=true "1 20")
![edited](pic/pngbatchAborderblur_1__20.png?raw=true "1 -20")

--------------------------------------------------

exe версии - портативные, созданы командой
`pyinstaller --onefile source.py`

--------------------------------------------------
--------------------------------------------------

png batch edit / batch editing png.
Processing all png files in the program folder on the program file-level (sub-folders do not touch). The result file begins with "_".

It requires pillow and python library.
Tested under the pillow 3.4.2, python 3.4.4 win7x64

--------------------------------------------------

## PngbatchAborderblurplusfull ##
- Adds surrounding pixels that have alpha greater than 0, the contours with uniformly changing the transparency, fills the entire canvas. Faster for ordinary images (picture without background). Slower for low saturation of the image (1 pixel in the middle of the canvas).

--------------------------------------------------

## PngbatchAborderblurplusfullslowcontour ##
- Adds surrounding pixels that have alpha greater than 0, the contours with uniformly changing the transparency, fills the entire canvas. Slow for conventional images (picture without background). Faster for low saturation of the image (1 pixel in the middle of the canvas).

--------------------------------------------------

## PngbatchA0tocolor ##
- All pixels with alpha set to 0, the color gets the job

--------------------------------------------------

##pngbatchA0pixelplus##
- all pixels with an alpha equal to 0, contact with pixel with an alpha greater than 0, will have the input color

--------------------------------------------------
 
##pngbatchA255##
- all pixels will alpha 255

--------------------------------------------------

##pngbatchAto255##
- all pixels with an alpha greater than 0, getting alpha 255

--------------------------------------------------

##pngbatchAtocolor##
- all pixels with an alpha greater than 0, will have the input color
- If a four-parameter input - normal
- if three parameters are input, the alpha will not changed
- if two, then the first - a shade of gray, the second - alpha
- if one parameter, only the alpha will changed

--------------------------------------------------

##pngbatchAborderblurpluscanvas##
- adds around pixels that have alpha greater than 0, the contours with uniformly changing the transparency and expands the picture to the width of the frame (the width of the contour multiplied by the number of contours)

--------------------------------------------------

##pngbatchAborderblurplus##
- adds around pixels that have alpha greater than 0, the contours with uniformly changing the transparency

--------------------------------------------------

##pngbatchAborderblur##
- turns the pixels whose alpha is greater than 0, in the contours with uniformly changing the transparency

--------------------------------------------------

exe versions - portable, created use syntax
`pyinstaller --onefile source.py`

--------------------------------------------------

source code links:

https://github.com/lenivaya10001/data/tree/master/imagebatch/png

https://bitbucket.org/lenivaya10001/data/src


exe win7x64 links created use pyinstaller:

https://www.dropbox.com/sh/bcjht9wd2xoay3k/AAC-QqERD4HJBZI9mXYL-o36a
