if("undefined"==typeof jQuery)throw new Error("Pointer.js needs Jquery");
console.log("You can open your Pointer by pressing Ö")
console.log(window.location)

var backgroundColor = "red";
var width = "20px";
var height = "20px";
var connectTo;
var Slideemitted;
function initialize(object){

        if(object.color){
           backgroundColor = object.color;
        }
        if(object.width && object.height){
            width = object.width;
            height = object.height;
        }
        if(object.Server != undefined && object.Server != ""){
            connectTo = object.Server;
        }
}
    var Pointer = {
        initialize : initialize
    }
    //Pointer.initialize({color:"orange", width:"100px", height: "200px"})
    //Notification.requestPermission(function(){});

    $(function(){
        console.log(connectTo)
        var socket = io(connectTo);
        socket.emit("welcome", socket.id)
        socket.emit("height",{
            height: window.innerHeight,
            width: window.innerWidth
        })
        socket.on("coordinates", function(c){
            var x = c.X * window.innerWidth;
            var y = c.Y * window.innerHeight;
            var d = document.getElementById("canvas");
            d.style = `background-color:${backgroundColor};margin-left: ${x}px; margin-top: ${y}px; width: ${width}px, height: ${height}px`;
            if(c == false){
                d.style = "";
            }
        })
        socket.on('ChangeSlide', function(msg){
            if(msg == "left"){
                Reveal.left()
            }else if(msg == "right"){
                Reveal.right();
            }else if(msg == "up"){
                Reveal.up()
            }else if(msg == "down"){
                Reveal.down();
                    }
               if(Slideemitted == false){ 
                socket.emit("currentSlide",window.location.hash);
                Slideemitted = true;
               }
        })
        socket.on('jumpto', function(e){
            if(e.n){
                console.log("You will go to page Number " + e.slide)
            }else{
                console.log("You will got to the link: " + e.slide)
            }
        });
    });
    window.onkeypress = function(e){
        console.log("mem")
        if(e.key.toUpperCase() == "Ö" ){
             window.open("http://localhost:3000/pointer", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
        }
    }