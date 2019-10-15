function bodyFontSize(){
    document.body.style.fontSize = document.getElementById('fontSize').value + "px"
}
function bodySwitchFont(){
    if(document.body.style.fontFamily == "body") document.body.style.fontFamily = "body1"
    else document.body.style.fontFamily = "body"
}
function tableMaker(){
    var ero = document.getElementById("eroglifs")
    var text = ero.innerText
    ero.innerText = ""
    var list = text.split("\n")
    var data = ""
    for (var i = 0;i<list.length;i++){
        var one = list[i].split(" ")
        for (var j = 0;j<one.length;j++){
            var div = document.createElement('div')
            if(j==0){
                div.innerHTML = "<b>&nbsp;"+one[j]+"&nbsp;</b>"
                div.setAttribute("class","eroglif")
            }
            else{
                div.innerHTML = one[j]
                div.setAttribute("class","reading")
            }
            ero.appendChild(div)
        }
    }
}
tableMaker()