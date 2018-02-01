#!/usr/bin/env python

# Hue World in GIMP Python
import os, colorsys,sys
from gimpfu import *

def int32(x):
	if x>0xFFFFFFFF:
		raise OverflowError
	if x>0x7FFFFFFF:
		x=int(0x100000000-x)
		if x<2147483648:
			return -x
		else:
			return -2147483648
	return x

def black_loop():
	
	image=gimp.image_list()[0]
	active_layer = pdb.gimp_image_get_active_layer(image)
	#active_layer
	width = pdb.gimp_image_width(image)
	height = pdb.gimp_image_height(image)
	num_channels, pixel = pdb.gimp_drawable_get_pixel(active_layer, 10, 10)
	if pixel!=(0,0,0,255): pixel=(0,0,0,255)
	else: pixel=(255,255,255,255)
	for x in range(width):
		for y in range(height):
			pdb.gimp_drawable_set_pixel(active_layer, x, y, num_channels, pixel)
		
	



register(
    "python-fu-black-loop",
    "Hue distorter",
    "Loop hue(rainbow) in image",
    "lian liviafan",
    "lian liviafan",
    "2014",
    "Blackloop (Py)...",
    "",#Use first(higher) layer of first open image
    [],
    [],
    black_loop, menu="<Image>/Test/")

main()
