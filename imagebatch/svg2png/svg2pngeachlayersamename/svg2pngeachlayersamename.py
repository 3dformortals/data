import os,sys,datetime,subprocess,time
from PIL import Image
from xml.dom import minidom #for parsing svg as xml-like structured file

def sectotime(secund):
    """время как строка ... для печати... из секунд"""
    dthour=int(secund/3600)
    dtminut=int((secund-dthour*3600)/60)
    dtsecund=int(secund-dthour*3600-dtminut*60)
    return str(dthour)+"h:"+str(dtminut)+"m:"+str(dtsecund)+"s"

if getattr(sys, 'frozen', False):
    mydir = os.path.dirname(sys.executable)
elif __file__:
    mydir = os.path.dirname(os.path.abspath(__file__))

print("------------mydir------------")
print(mydir)
print("------------------------")
maskdir = mydir+os.sep+"eachlayer"+os.sep
print("new files will be placed inside ",maskdir, "path")
print("------------------------")

onefolder = input("input 1 to collect result in one folder, input 0 or nothing to collect result in personal folders for each svg file \n \
Layers with names started from \" \"(space) and \"-\"(minus) will be IGNORED.\n \
Developed/tested only with inkscape svg format.\n \
All layers inside svg must be UNLOCKED and VISIBLE, or can be empty png result.\n \
Empty layer inside inkscape svg file begin infinite recursion.\n \
That print empty layer add to layer rectangle/circle out of canvas(printed area).\n \
That break process press \"Ctrl+C\"\n \
REMOVE ALL PNG FILES from result FOLDER, BEFORE every START SCRIPT!!! Or remove result folder.\n \
External png files can break counter and process can fail")

def pv(x):
    """parse string to int value 1 or 0"""
    v = int(x) or 0
    if (v!=1) : v=0
    return v

def label_parser(label):
    value = None
    try:
        value = label.split(" ")[0]
    except:
        print("bad parsing svg g element, will be skipped")
    
    return value

def ids_and_layernames_extractor(ids,labels):
    dd = dict() #datadict: key = svg g id , value = svg g layername which is will be new name for exported png
    for i in range( min(len(ids),len(labels))):
        key = ids[i]
        label = labels[i]
        value = label_parser(label)
        dd[key]=value
    return dd


def inkscape_caller(dir_png,need_files,svg_adres,png_adres,layer_id,png_dpi="96"):
    x=0
    while x<1:
        time.sleep(10)
        fnumber=0
        for file in os.listdir(dir_png):
            if file.endswith(".png"):
                fnumber+=1
        if (need_files == fnumber+1): x=1
        print("wtf python?",flush=True)
    
    flow = subprocess.run(["inkscape","-f",svg_adres,"-e",png_adres,"-C","-i",layer_id,"-j",layer_id,"-d",png_dpi])
    print("flow is",flow,flush=True)
    

try:
    onefolder = pv(onefolder)
    if (onefolder == 1) :print("result will be collected in one folder")
    else: print("result will be collected in personal folder for each svg")
except:
    onefolder = 0
    print("something wrong","result will be collected in personal folder for each svg")



try:
    starttime=time.time()
    print(datetime.datetime.now().time())
    print("------------------ beginning ----------------------")
    fnames=[]
    for file in os.listdir(mydir):
        if file.endswith(".svg"):
            fnames+=[file]
    print(fnames)
    
    if len(fnames) > 0: # creation of folder for collect resulted png files
        if not os.path.exists(maskdir):
            os.makedirs(maskdir)
    

    len_g=0
    for fname in fnames:

        adres=mydir+os.sep+fname
        print(adres)
        doc = minidom.parse(adres)
        
        layer_ids = []
        layer_names = []
        for g in doc.getElementsByTagName('g'):
            layer_ids.append(g.getAttribute('id'))
            layer_names.append(g.getAttribute('inkscape:label'))
        # layer_ids = [path.getAttribute('id') for path in doc.getElementsByTagName('g')]
        # layer_names = [path.getAttribute('inkscape:label') for path in doc.getElementsByTagName('g')]
        
        doc.unlink()
        svg_g_for_export=ids_and_layernames_extractor(layer_ids,layer_names) # dict key = g id , value = png name for export
        if (None in svg_g_for_export): del svg_g_for_export[None]
        if ("" in svg_g_for_export): del svg_g_for_export[""]
        emptyvaluekeys=[]
        print("\n\ndict before cleaning--------------/////\\\\\\\\\\--------------\n",svg_g_for_export)
        for i in svg_g_for_export:
            if (len(svg_g_for_export[i])>0):
                if (svg_g_for_export[i][0] in ["-",""," "]): emptyvaluekeys.append(i)
            else:emptyvaluekeys.append(i)
        emptyvaluekeys = set(emptyvaluekeys)
        for i in emptyvaluekeys:
            del svg_g_for_export[i]
        print("\n",svg_g_for_export,"\ndict AFTER cleaning--------------\\\\\\\\\\/////--------------\n\n")
        
        dir_png=None
        if (onefolder):
            dir_png = maskdir
        else:
            fnametail = fname.split(os.sep)[-1].split(".")[0] # cut the file name from path and cut externsion .svg for folder name
            dir_png = maskdir+fnametail+os.sep
            if not os.path.exists(dir_png):
                os.makedirs(dir_png)
            len_g = 0 # every loop step we need increase number of files inside folder to 1 and check
            
        
        for dd in svg_g_for_export:
            len_g+=1
            adres_png = dir_png+svg_g_for_export[dd]+".png"
            inkscape_caller(dir_png,len_g,adres,adres_png,dd)

        print("export complete")
        print("spent ",sectotime(time.time()-starttime))
        print(datetime.datetime.now().time())
        print("------------------ V ----------------------")
except:
    print(sys.exc_info())
input("done (готово) . That close press Enter (enter - закрыть)")
