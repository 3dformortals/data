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

def hue_new(h_pix,h_plus):
	h_new=h_pix+h_plus #прямое нарастание самое примитивное
	if h_new > 1:
		h_new-=1
	return h_new

def hue_loop(steps,rblur):
	
	image=gimp.image_list()[0]
	active_layer = pdb.gimp_image_get_active_layer(image)
	#active_layer
	width = pdb.gimp_image_width(image)
	height = pdb.gimp_image_height(image)
	
	#ширина высота изображения
	#start_colors_xy = get_layer_colors(active_layer,width,height) #косяк здесь!!!
	#получили начальный массив цветов (nchan, hsva) от него будем шагать
	steps=int(steps)
	step=list(range(steps))
	for i in range(steps):
		step[i]=360.0/steps*(i+1)
		if step[i]>180:step[i]-=360
	rblur=max([width,height])/100*float(rblur)
	h_step=0
	for h_plus in step:
		h_float=h_plus
		h_step+=1
		layer_copy = pdb.gimp_layer_copy(active_layer, True)
		pdb.gimp_image_insert_layer(image, layer_copy, None, 1)
		#ww2 видно на панели и вообще... None parent(group) , 1 position(from 0)
		#копировали слой его будем менять
		pdb.gimp_hue_saturation(layer_copy, 0, h_float, 0, 0)
		if (rblur>0):pdb.plug_in_gauss(image, layer_copy, rblur, rblur, 1)
		
		#pdb.gimp_layer_set_visible(layer_copy, False)
		pdb.gimp_layer_set_visible(layer_copy, True)
		#но не видно... хотя после фалс может будет видно
		pdb.gimp_item_set_name(layer_copy, "ww"+str(h_step))
		#теперь он ww+
		
		
		#pdb.gimp_image_set_active_layer(image, layer_copy)
		#кеша активный - выделен для редактирования...а вот и хуюшки.. не работает молча
		uri = pdb.gimp_image_get_uri(image)
		fileplace = os.path.dirname(uri)
		fileplace=fileplace.replace('file:///','')
		pdb.file_png_save_defaults(image, layer_copy, fileplace+"/kewa"+str(h_step)+".png", fileplace+"/kewaraw"+str(h_step)+".png")
		#pdb.gimp_image_remove_layer(image, layer_copy)


register(
    "python-fu-hue-loop",
    "Hue distorter",
    "Loop hue(rainbow) in image",
    "lian liviafan",
    "lian liviafan",
    "2014",
    "Hueloop (Py)...",
    "",#Use first(higher) layer of first open image
    [
	(PF_STRING, "steps", "число кадров", "11"),
	(PF_STRING, "rblur", "радиус размытия в %", "3")
	],
    [],
    hue_loop, menu="<Image>/Test/")

main()
