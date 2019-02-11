 # -*- coding: utf-8 -*-

import eel
eel.init('web')

@eel.expose
def python_method():
    print("wtfeelyoudoing?")
    return 44
    
eel.start('main.html')
