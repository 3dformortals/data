#!/usr/bin/env python

# Hue World in GIMP Python
import os, colorsys
from gimpfu import *

def get_layer_colors(width,height):
	
	image=gimp.image_list()[0]
	active_layer = pdb.gimp_image_get_active_layer(image)
	
	chanel_xy=list(range(width))
	for i in chanel_xy: chanel_xy[i]=list(range(height))
	color_xy=list(range(width))
	for i in color_xy: color_xy[i]=list(range(height))
	
	for x in range(width):
		for y in range(height):
			num_channels, pixel = pdb.gimp_drawable_get_pixel(active_layer, x, y)
			
			chanel_xy[x][y]=num_channels
			r=float(pixel[0])/255
			g=float(pixel[1])/255
			b=float(pixel[2])/255
			hsv=colorsys.rgb_to_hsv(r,g,b)
			h=hsv[0]
			s=hsv[1]
			v=hsv[2]
			a=pixel[3] #pixel[3]не делим на 255, оставляем прежним
			color_xy[x][y]=(h,s,v,a) 
	return (chanel_xy,color_xy)

def h_new(h_pix,h_plus):
	h=h_pix+h_plus #прямое нарастание самое примитивное
	if h>1.0: h=h-1.0
	#if h< 0.1 or h>0.75: h=0.1
	return h

def hue_world() :
	
	image=gimp.image_list()[0]
	active_layer = pdb.gimp_image_get_active_layer(image)
	#active_layer
	width = pdb.gimp_image_width(image)
	height = pdb.gimp_image_height(image)
	#ширина высота изображения
	start_colors_xy = get_layer_colors(width,height) #косяк здесь!!! кажись устранил
	#получили начальный массив цветов (nchan, hsva) от него будем шагать
	layer_copy = pdb.gimp_layer_copy(active_layer, True)
	pdb.gimp_image_insert_layer(image, layer_copy, None, 1)
	#ww2 видно на панели и вообще... None parent(group) , 1 position(from 0)
	#копировали слой его будем менять
	
	for h_step in range(101):
		h_plus=h_step/100.0
		
		
		for x in range(width):
			
			for y in range(height):
				
				h_pix=start_colors_xy[1][x][y][0]
				s_pix=start_colors_xy[1][x][y][1]
				v_pix=start_colors_xy[1][x][y][2]
				a_pix=start_colors_xy[1][x][y][3]
				h_ne=float(h_new(h_pix,h_plus))
				new_rgb=colorsys.hsv_to_rgb(h_ne,s_pix,v_pix)
				r_pix=int(new_rgb[0]*255)
				g_pix=int(new_rgb[1]*255)
				b_pix=int(new_rgb[2]*255)
				num_channels=start_colors_xy[0][x][y]
				pixel=(r_pix,g_pix,b_pix,a_pix)
				pdb.gimp_drawable_set_pixel(layer_copy, x, y, num_channels, pixel)
			
		
		pdb.gimp_layer_set_visible(layer_copy, False)
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


register(
    "python-fu-hue-world",
    "Hue distorter",
    "Distort and loop hue(rainbow) in image",
    "lian liviafan",
    "lian liviafan",
    "2014",
    "Hueworld (Py)...",
    "",#Use first(higher) layer of first open image
    [],
    [],
    hue_world, menu="<Image>/Test/")

main()
