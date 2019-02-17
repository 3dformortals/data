async function show(x){
    var tbody = document.getElementById("result")
    var text = await eel.readyoutube(x)()
    alert("wtf")
    for(var i=0;i<10;i++){
        var tr = document.createElement("tr")
        var td = document.createElement("td")
        td.innerText = text[i]
        tr.appendChild(td)
        tbody.appendChild(tr)
    }
}