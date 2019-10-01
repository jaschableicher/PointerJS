
console.log("You can open your Pointer by pressing Ö")
var backgroundColor = "red", width = "20px", height = "20px", connectTo, Slideemitted, pointer;
function initialize(object) {

    pointer = object.PointerSite || "/pointer";
    if (object.color) {
        backgroundColor = object.color;
    }
    if (object.width && object.height) {
        width = object.width;
        height = object.height;
    }
    if (object.Server != undefined && object.Server != "") {
        connectTo = object.Server;
    }
}
var Pointer = {
    initialize: initialize
}
//Notification.requestPermission(function(){});
try{
$(function () {
    console.log(Reveal.getSlide(2))

    var socket = io(connectTo);
    socket.emit("welcome", socket.id)
    socket.emit("height", {
        height: window.innerHeight,
        width: window.innerWidth
    })
    socket.on("coordinates", function (c) {
        var x = c.X * window.innerWidth;
        var y = c.Y * window.innerHeight;
        var d = document.getElementById("canvas");
        d.style = `background-color:${backgroundColor};margin-left: ${x}px; margin-top: ${y}px; width: ${width}px, height: ${height}px`;
        if (c == false) {
            d.style = "";
        }
    })
    socket.on('ChangeSlide', function (msg) {
        if (msg == "left") {
            Reveal.left()
        } else if (msg == "right") {
            Reveal.right();
        } else if (msg == "up") {
            Reveal.up()
        } else if (msg == "down") {
            Reveal.down()
        }

        let x = Reveal.getSlidePastCount();
        let z = Reveal.getSlideNotes();
        // getCurrentSlide z = z.innerHTML        
        socket.emit("currentSlide", {
            A: x,
            B: z
        }
        );

    })


    socket.on("pause", function (type) {
        Reveal.togglePause();
        console.log(Reveal.isPaused())
    })
    window.onkeypress = function (e) {
        console.log("key pressed" + e.key);
        if (e.key.toUpperCase() == "Ö") {
            window.open(pointer, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
            return;
        }


    }
});
} catch(err){
    if ("undefined" == typeof jQuery) {
    
        var script = document.createElement('script');
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/public/js/jquery.min.js", true)
        xhttp.send()
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    script.src = "/public/js/jquery.min.js";
                }else{
                    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
                }
                document.head.append(script)
            }
        }
    
    };}

