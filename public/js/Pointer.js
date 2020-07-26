if ("undefined" == typeof jQuery) throw new Error("Pointer.js requires Jquery");
var connecto;
var d = document;
window.oncontextmenu = function (e) {
    e.preventDefault();
}
var z;

function initialize(object) {
    connecto = object.server || undefined;
    if (object.notes == false) {
        d.getElementById("notes").style.visibility = "hidden"
    } else if (object.notes == true) {
        d.getElementById("notes").style.visibility = "visible"
    } else if (typeof object.notes == "undefined") {
        d.getElementById("notes").style.visibility = "visible"
    }
    var script = [], crS = d.createElement("script");
    var style = [], crL = d.createElement("link");
    var head = d.getElementsByTagName("head")[0];
    if (object.dependencies) {
        for (let i = 0; i < object.dependencies.length; i++) {
            if (object.dependencies[i].type == "js") {
                crS.src = object.dependencies[i].src;
                if (object.dependencies[i].async == true) {
                    crS.attributes = ["async", "true"]
                }
                script.push(crS)
                crS = d.createElement("script");
            } else if (object.dependencies[i].type == "css") {
                crL.href = object.dependencies[i].src;
                crL.rel = "stylesheet"
                style.push(crL);
                crL = d.createElement("link")
            }
        }
        for (let i = 0; i < script.length; i++) {
            head.appendChild(script[i]);
        }
        for (let i = 0; i < style.length; i++) {
            head.appendChild(style[i]);
        }
    }
}
var Pointer = {
    initialize: initialize
}
$(function () {
    $("#pointer").hide();

    console.log(connecto)
    var socket = io();

    $("#onlyPointer").click(function (e) {
        $("#main").hide();
        $("#pointer").show();
        $("#hid").val(true)
    })
    $("#closePointer").click(function (a) {
        $("#main").show();
        $("#pointer").hide();
        $("#hid").val(false);
    })

    window.ontouchmove = function (e, err) {
        if ($("#hid").val() == "true") {

            if (err) throw err;
            var X = e.targetTouches[0].clientX;
            var Y = e.targetTouches[0].clientY;
            X = X / window.innerWidth;
            Y = Y / window.innerHeight;
            if (X && Y) {
                socket.emit("Coordinates", {
                    X: X,
                    Y: Y,
                    token: token
                })
            }

            window.ontouchend = function (e) {
                socket.emit("Coordinates", false)
            }
        }
    }
    socket.on('disconnect', function () {
        console.log('disconnected')
        d.cookie = "token=;";
    })

    d.getElementById("Up").onclick = function () {
        socket.emit("ChangeSlide", "up")
    }
    d.getElementById("left").onclick = function () {
        socket.emit("ChangeSlide", "left")
    }
    d.getElementById("right").onclick = function () {
        socket.emit("ChangeSlide", "right")
    }
    d.getElementById("down").onclick = function () {
        socket.emit("ChangeSlide", "down")
    }
    socket.on('Slide', function (num) {
        d.getElementById("currentSlide").innerHTML = num.A;
        if (num.B != null) {
            $("#notes").html(num.B)
        } else {
            $("#notes").html("")
        }

    })
    /*
    d.getElementById("jumpForm").onsubmit = function(e){
        e.preventDefault();
        var x = $("#jumpto").val();
        if(!isNaN(x))socket.emit("jumpto", x), $("#currentSlide").val(x);
        else alert("Please type in a number");
    }*/
    var ispaused = false;
    $("#pause").click(function () {
        if (ispaused) { $("#top").show(); $(this).html("Pause Presentation"); socket.emit("pause", false); ispaused = false; return };
        socket.emit("pause", true);
        $("#top").hide();
        $(this).html("Resume Presentation");
        ispaused = true;
    })
    socket.on("paused", function (type) {
        if (type == true) {
            ispaused = true;
            $("#top").hide();
            $("#pause").html("Resume Presentation");
        } else if (type == false) {
            ispaused = false;
            $("#top").show();
            $("#pause").html("Pause Presentation");
            return;
        }
    })
    socket.on("pauses", function (type) {
        if (type == true) {
            ispaused = true;
            $("#top").hide();
            $("#pause").html("Resume Presentation");
        } else if (type == false) {
            ispaused = false;
            $("#top").show();
            $("#pause").html("Pause Presentation");
            return;
        }
    })
})
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
$("#SlidePreview").click(function (e) {

    modal.style.display = "block";
    link = this;

    var iframe = document.createElement("iframe");
    iframe.src
});
span.onclick = function () {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}