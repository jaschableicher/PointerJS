if("undefined"==typeof jQuery)throw new Error("Pointer.js needs Jquery");
var connecto;
var d = document;
window.oncontextmenu = function(e){
    e.preventDefault();
}
var z;

function initialize(object){
        connecto = object.server || undefined;
        var script = [], crS = d.createElement("script");
        var style = [], crL = d.createElement("link");
        var head = d.getElementsByTagName("head")[0];
        if(object.dependencies){
            for(let i = 0; i < object.dependencies.length; i++){
                if(object.dependencies[i].type == "js"){
                    crS.src = object.dependencies[i].src;
                    if(object.dependencies[i].async == true){
                        crS.attributes = ["async", "true"]
                    }
                    script.push(crS)
                    crS = d.createElement("script");
                }else if(object.dependencies[i].type == "css"){
                    crL.href = object.dependencies[i].src;
                    crL.rel = "stylesheet"
                    style.push(crL);
                    crL = d.createElement("link")
                }
            }
            for(let i = 0; i < script.length; i++){
                head.appendChild(script[i]);
            }
            for(let i = 0; i < style.length; i++){
                head.appendChild(style[i]);
            }
        }
}
var Pointer = {
    initialize: initialize
}
$(function(){
    $("#pointer").hide();

    console.log(connecto)
    var socket = io();
    

    var nxtSlide = d.getElementById("nextSlide")
    function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(d.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
if(getCookie("token") != ""){
    var token = getCookie("token");
}else{
     var token = Math.random().toString(36).substr(2); // remove `0.`
     d.cookie = `token=${token}`;
     socket.emit("SetToken", token);
};

$("#onlyPointer").click(function(e){
    $("#main").hide();
    $("#pointer").show();
    $("#hid").val(true)
})
$("#closePointer").click(function(a){
    $("#main").show();
    $("#pointer").hide();
    $("#hid").val(false);
})

window.ontouchmove = function(e, err){
    if($("#hid").val() == "true"){
        console.log("mem")
        
        if(err) throw err;
        var X = e.targetTouches[0].clientX;
        var Y = e.targetTouches[0].clientY;
        X = X / window.innerWidth;
        Y = Y / window.innerHeight;
        if(X && Y){
            socket.emit("Coordinates", {
                X: X,
                Y: Y,
                token: token
            })
        }
    
        window.ontouchend = function(e){
            socket.emit("Coordinates", false)
        }
      }
    }
socket.on('disconnect', function(){
    console.log('disconnected')
    document.cookie = "token=;";
})

 d.getElementById("Up").onclick = function(){
    socket.emit("ChangeSlide","up")
}
d.getElementById("left").onclick = function(){
    socket.emit("ChangeSlide","left")
}
d.getElementById("right").onclick = function(){
    socket.emit("ChangeSlide", "right")
}
d.getElementById("down").onclick = function(){
    socket.emit("ChangeSlide", "down")
}
socket.on('Slide', function(num){
        d.getElementById("currentSlide").innerHTML = num.split("/")[1];
       
    })
    d.getElementById("jumpForm").onsubmit = function(e){
        e.preventDefault();
        var x = $("#jumpto").val();
        socket.emit("jumpto", x);
    }
    window.addEventListener("online", () =>{
        console.log("online");
    })
    window.addEventListener("offline", () =>{
        console.log("offline")
    })
})
