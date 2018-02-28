function switchfont(){
    document.body.style.fontFamily = "RBM";
    Array.from(document.body.querySelectorAll("code"), e => e.style.fontFamily="RBM");
    var b=document.getElementById("fontswitcherbutton");
    document.body.removeChild(b);
}
var b = document.createElement("button");
b.textContent = "RobotoMono-Regular.ttf";
b.type= "button";
b.id="fontswitcherbutton";
b.onclick = switchfont;
document.body.appendChild(b);