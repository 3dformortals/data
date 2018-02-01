#!/usr/bin/env python

#модуль читает png как символ 0/1 по прозрачности для и записывает матрицу в слой Border +Text in GIMP Python
#import os, colorsys,sys
from gimpfu import *

def read_symbol(image,drawable):
	
	if not pdb.gimp_drawable_has_alpha(drawable):
		pdb.gimp_layer_add_alpha(drawable)
	
	width = pdb.gimp_image_width(image)
	height = pdb.gimp_image_height(image)
	pix_xy = list(range(width))
	for x in range(width): pix_xy[x]=list(range(height))
	for x in range(width):
		for y in range(height):
			alfpix = pdb.gimp_drawable_get_pixel(drawable, x, y)
			if alfpix[1][3] == 255:
				pix_xy[x][y]=1
			else:
				pix_xy[x][y]=0
			
	text=str(pix_xy)
	text=text.replace("], [","],\n[")
	layer = pdb.gimp_text_layer_new(image, text, "PT Sans", 10, 0)
	pdb.gimp_image_insert_layer(image, layer, None, 0)
	


register(
    "python-fu-read-symbol",
    "read symbol, for Border text font, form png file",
    "Читает символ из png файла по прозрачности 0/1 и записывает резуьтат в текстовый слой",
    "lian liviafan",
    "lian liviafan",
    "2014",
    "read_symbol (Py)...",
    "*",
    [
	(PF_IMAGE, "image", "Исходное изображение", None),
	(PF_DRAWABLE, "drawable", "Исходный слой", None),
	],
    [],
    read_symbol, menu="<Image>/Test/")

main()
