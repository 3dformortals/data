
function nCleaner(txt){
    return txt.replace("\n","<br>")
}

async function addonItem(){
    var name = document.getElementById("itemName").value
    var url = document.getElementById("itemUrl").value
    var viewed = document.getElementById("itemViewed").value
    //add checking later... at least clearing from \n inside incoming data
    name = nCleaner(name)
    url = nCleaner(url)
    viewed = nCleaner(viewed)
    var dbtxt = await eel.pythonAddonItem(name, url, viewed)() //text from txt file returned
    txtToObject(dbtxt)
    infoDivDataCreator()
    hideAddonItem()
}

var db = {}

function txtToObject(txt){
    db = {} //clearing
    var stxt = txt.split("\n\n")
    for (var i=0;i<stxt.length;i++){
        var item = {}
        //alert("inside txtToObject stxt[i]= \n"+stxt[i])
        var sitem = stxt[i].split("\n")
        if (sitem.length == 3){
            item["name"] = sitem[0]
            item["url"] = sitem[1]
            item["saw"] = sitem[2]
            db[i]=item
        }//else{alert("sitem.length == "+sitem.length.toString()+"\n"+sitem.toString())}
    }
}

function objectToTxt(){
    var txt=""
    for (var key in db){txt+=db[key]["name"]+"\n"+db[key]["url"]+"\n"+db[key]["saw"]+"\n\n"}
    return txt
}

async function loadProcess(){
    var txt = await eel.pythonShow()() //read db first time
    txtToObject(txt) //now it can be used as database
    hideAddonItem() //hide first time after start programm
    infoDivDataCreator()
}

async function scanAll(){
    hideScanButton()
    for(var key in db){
        jSShowMessage('scanning - ' + db[key]['name'])
        var output = await eel.pythonScan(db[key]['url'])() //output is ready episodes number
        // output = parseInt(output)
        // alert(output)
        var color = "black"
        if(output>0){//good condition
            var saw = parseInt(db[key]['saw'])
            if( output>saw ){color='darkgreen'}
        }else if(output==0){//muddy condition
            color='olive'
        }else{color='darkred'}//something wrong etc
        //div coloring
        if(color!=""){
            document.getElementById('itemDiv'+key).style.backgroundColor = color
            document.getElementById('itemTable'+key).style.backgroundColor = color
            document.getElementById('editTable'+key).style.backgroundColor = color
        }
    }
    jSShowMessage('scanning complete')
    showScanButton()
}

function deleteItem(key){
    if(key in db) {delete db[key]}
    // infoDivDataCreator()
    document.getElementById('itemDiv'+key).style.display = 'none'
    eel.pythonFixChanges(objectToTxt(db))()
}

function viewedItem(key,saw){
    if(key in db) {
        var isaw=parseInt(saw)+1
        var sawnumber = isaw.toString()
        db[key]["saw"] = sawnumber
        document.getElementById("itemSaw"+key).innerHTML = isaw
    }
    // infoDivDataCreator()
    eel.pythonFixChanges(objectToTxt(db))()
}

function editItem(key){
    document.getElementById('editTable'+key).style.display = "inline"
    document.getElementById('itemViewed'+key).value = db[key]['saw']
}

function saveItem(key){
    document.getElementById('aName'+key).text = document.getElementById('itemName'+key).value
    document.getElementById('itemSaw'+key).innerHTML = document.getElementById('itemViewed'+key).value
    db[key]['name'] = document.getElementById('itemName'+key).value
    db[key]['url'] = document.getElementById('itemUrl'+key).value
    db[key]['saw'] = document.getElementById('itemViewed'+key).value
    // infoDivDataCreator()
    document.getElementById('editTable'+key).style.display = "none"
    eel.pythonFixChanges(objectToTxt(db))()
}

function cancelItem(key){
    document.getElementById('editTable'+key).style.display = "none"
    document.getElementById('itemName'+key).value = db[key]['name']
    document.getElementById('itemUrl'+key).value = db[key]['url']
    document.getElementById('itemViewed'+key).value = db[key]['saw']
}

function firstItem(key){
    var newdb = {}
    var newind = 0
    newdb[newind] = db[key]
    delete db[key]
    for (var ind in db){
        newind++
        newdb[newind] = db[ind]
    }
    db = newdb
    infoDivDataCreator()
    eel.pythonFixChanges(objectToTxt(db))()
}

function inputCreator(id,value,inputtype='text'){
    var input = document.createElement('input')
    input.setAttribute('type',inputtype)
    input.setAttribute('id',id)
    input.value = value
    return input
}

function itemDivCreator(key,item){
    if("name" in item && "url" in item && "saw" in item){
        var div = document.createElement('div')
        var divid = 'itemDiv'+key
        div.setAttribute('id',divid)
        div.setAttribute('class','itemDiv')
        div.style.cssFloat = 'left'
        div.style.padding = '4px'
        div.style.margin = '1px'
        div.style.border = '1px solid'
        var table = document.createElement('table')
        table.setAttribute('id','itemTable'+key)
        
        var deleteButton = document.createElement('button')
        deleteButton.innerHTML = "x"
        deleteButton.onclick = function() {deleteItem(key)}
        
        var a = document.createElement('a')
        a.setAttribute('id','aName'+key)
        a.href = item["url"]
        a.text = item["name"]
        a.target = "_blank"
        
        var viewedButton = document.createElement('button')
        viewedButton.setAttribute('id','itemSaw'+key)
        viewedButton.innerHTML = item["saw"]
        viewedButton.onclick = function() {viewedItem(key, item["saw"])}
        viewedButton.setAttribute('title','+1')
        
        var editButton = document.createElement('button')
        editButton.innerHTML = "edit"
        editButton.onclick = function() {editItem(key)}
        editButton.setAttribute('title','редактировать')
        
        var firstButton = document.createElement('button')
        firstButton.innerHTML = "&uArr;"
        firstButton.onclick = function(){firstItem(key)}
        
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        td.appendChild(deleteButton)
        tr.appendChild(td)
        var td = document.createElement('td')
        td.appendChild(a)
        tr.appendChild(td)
        var td = document.createElement('td')
        td.appendChild(viewedButton)
        tr.appendChild(td)
        var td = document.createElement('td')
        td.appendChild(editButton)
        tr.appendChild(td)
        var td = document.createElement('td')
        td.appendChild(firstButton)
        tr.appendChild(td)
        table.appendChild(tr)
        div.appendChild(table)
        
        //edit table
        var table = document.createElement('table')
        table.setAttribute('id','editTable'+key)
        table.style.display = 'none'
        //name
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var text = document.createElement('text')
        text.setAttribute('id','itemNameText'+key)
        text.innerHTML = "name: "
        td.appendChild(text)
        tr.appendChild(td)
        var td = document.createElement('td')
        var input = inputCreator('itemName'+key, db[key]['name'])
        td.appendChild(input)
        tr.appendChild(td)
        table.appendChild(tr)
        //url
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var text = document.createElement('text')
        text.setAttribute('id','itemUrlText'+key)
        text.innerHTML = "url: "
        td.appendChild(text)
        tr.appendChild(td)
        var td = document.createElement('td')
        var input = inputCreator('itemUrl'+key, db[key]['url'])
        td.appendChild(input)
        tr.appendChild(td)
        table.appendChild(tr)
        //viewed
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var text = document.createElement('text')
        text.setAttribute('id','itemViewedText'+key)
        text.innerHTML = "viewed: "
        td.appendChild(text)
        tr.appendChild(td)
        var td = document.createElement('td')
        var input = inputCreator('itemViewed'+key, db[key]['saw'])
        td.appendChild(input)
        tr.appendChild(td)
        table.appendChild(tr)
        //controls
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var saveButton = document.createElement('button')
        saveButton.onclick = function() {saveItem(key)}
        saveButton.innerHTML = "save"
        td.appendChild(saveButton)
        tr.appendChild(td)
        var td = document.createElement('td')
        var cancelButton = document.createElement('button')
        cancelButton.onclick = function() {cancelItem(key)}
        cancelButton.innerHTML = "cancel"
        td.appendChild(cancelButton)
        tr.appendChild(td)
        table.appendChild(tr)
        div.appendChild(table)
        
    }else{var div = null}
    return div
}

function infoDivDataCreator(){
    var infodiv = document.getElementById("infodiv")
    infodiv.innerHTML = ""
    for (var key in db){
        var itemDiv = itemDivCreator(key,db[key])
        if(itemDiv!=null) infodiv.appendChild(itemDiv)
    }
    
}

function clearAddonItem(){
    document.getElementById("itemName").value = ""
    document.getElementById("itemUrl").value = ""
    document.getElementById("itemViewed").value = ""
}
function showAddonItem(){
    clearAddonItem()
    document.getElementById("addButton").style.display = "none"
    document.getElementById("scanButton").style.display = "none"
    document.getElementById("addItem").style.display = "inline"
}
function hideAddonItem(){
    document.getElementById("addItem").style.display = "none"
    document.getElementById("addButton").style.display = "inline"
    document.getElementById("scanButton").style.display = "inline"
}
function hideScanButton(){
    document.getElementById("addButton").style.display = "none"
    document.getElementById("scanButton").style.display = "none"
}
function showScanButton(){
    document.getElementById("addButton").style.display = "inline"
    document.getElementById("scanButton").style.display = "inline"
}
eel.expose(jSShowMessage)
function jSShowMessage(message){document.getElementById("itemProcess").innerHTML = message}

loadProcess()