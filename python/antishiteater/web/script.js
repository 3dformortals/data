async function show(x){
    var tbody = document.getElementById("result")
    tbody.innerHTML=""
    var text = await eel.readyoutube(x)()
    text = text.split("dir=\"ltr\" title=\"",11)
    for(var i=1;i<11;i++){
        var tr = document.createElement("tr")
        var td1 = document.createElement("td")
        var atext = text[i].split("\"  aria-describedby",1)[0].replace(/&quot;/g, '\"')
        var ahref = "https://www.youtube.com" + text[i].split("href=\"")[1].split("\"")[0]
        var a = document.createElement("a")
        a.href = ahref
        a.text = atext
        a.target = "_blank"
        td1.appendChild(a)
        
        var td2 = document.createElement('td')
        var button = document.createElement('button')
        button.onclick = function(){ openSource(ahref)}
        button.innerHTML = "open<br>web"
        td2.appendChild(button)
        
        tr.appendChild(td2)
        tr.appendChild(td1)
        tbody.appendChild(tr)
    }
}

function openSource(url){
    mywindow = window.open(url,"_blank")
}