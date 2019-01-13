 # -*- coding: utf-8 -*-

import eel
eel.init('static_web')
eel.start('main.html')

@eel.expose
def testpythonfromjs():
    print("wtfeelyoudoing?")

# import sys,os,pickle




# if getattr(sys, 'frozen', False):
#     mydir = os.path.dirname(sys.executable)
# elif __file__:
#     mydir = os.path.dirname(os.path.abspath(__file__))
# print(str(mydir))



# @eel.expose
# def db_reader():
#     """try read the data from pickle file"""
#     try:
        
#         with open(mydir + os.sep + "db.pickle","rb") as handle:
#             db=pickle.load(handle)
#             return db
#     except:
#         print("db_reader error\n",sys.exc_info())
#         db={}
#         db["dorama"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
#         db["anime"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
#         db["series"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
#         db["other"]=[["","http://helpmedraw.pythonanywhere.com/","0/0"] for i in range(33)]
#         return db

# @eel.expose
# def db_writer():
#     """try write data to pickle file"""
#     try:
#         with open(mydir + os.sep + "db.pickle","wb") as handle:pickle.dump(db,handle)
#     except:
#         print("error db_writer",sys.exc_info())

# db=db_reader()

