import sys,cairo
# 2016 rsvg нет для винды а длл кривые

#some code to give rsvg.render_cairo(ctx) ability
#on windows.
import os

mydir = os.path.dirname(__file__)

try:
	import rsvg
	WINDOWS=False
except ImportError:
	print("Warning, could not import 'rsvg'")
	
	if os.name == 'nt':
		print("Detected windows, creating rsvg.")
		#some workarounds for windows

		from ctypes import *

		try:
			l=CDLL(mydir+os.sep+'librsvg-2-2.dll')
		except:
			print(sys.exc_info())
			input("l=cdll fail")
		g=CDLL('libgobject-2.0-0.dll')
		g.g_type_init()

		class rsvgHandle():
			class RsvgDimensionData(Structure):
				_fields_ = [("width", c_int),
							("height", c_int),
							("em",c_double),
							("ex",c_double)]

			class PycairoContext(Structure):
				_fields_ = [("PyObject_HEAD", c_byte * object.__basicsize__),
							("ctx", c_void_p),
							("base", c_void_p)]

			def __init__(self, path):
				self.path = path
				error = ''
				self.handle = l.rsvg_handle_new_from_file(self.path,error)


			def get_dimension_data(self):
				svgDim = self.RsvgDimensionData()
				l.rsvg_handle_get_dimensions(self.handle,byref(svgDim))
				return (svgDim.width,svgDim.height)

			def render_cairo(self, ctx):
				ctx.save()
				z = self.PycairoContext.from_address(id(ctx))
				l.rsvg_handle_render_cairo(self.handle, z.ctx)
				ctx.restore()



		class rsvgClass():
			def Handle(self,file):
				return rsvgHandle(file)

		rsvg = rsvgClass()
#code from site, that use dlls
#--------------------------------------
		
#code
input("start convert")
mydir = os.path.abspath(__file__)
mydir2 = os.path.dirname(__file__)
print(mydir)
print(mydir2)
try:
	print(cairo.version)
	for fname in os.listdir():
		if fname.endswith(".svg"):
			file=open(mydir2+os.sep+fname)
			#content=file.readlines()
			im=cairo.SVGSurface(file, 0, 0)
			print("im= " + str(im))
			im.write_to_png("svg.png")
except:
	print(sys.exc_info())
input()
