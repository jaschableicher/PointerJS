var express = require("express")
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var qrcode = require("qrcode-terminal");
const open = require("open")

var address, os = require('os'), ifaces = os.networkInterfaces();

for (var dev in ifaces) {
    var iface = ifaces[dev].filter(function (details) {
        return details.family === 'IPv4' && details.internal === false;
    });
    if (iface.length > 0) address = iface[0].address;
}


app.use("/public", express.static("public"));

app.get("/getip", (req, res) => {
    res.sendFile(__dirname + "/lib/demo.html")
});

app.get("/pointer", (req, res) => {
    res.sendFile(__dirname + "/lib/Pointer.html")
})

app.get("/qrcode",(req,res)=>{
    res.sendFile(__dirname + "/lib/QR.html")
})
app.post("/getip",(req,res)=>{
    res.send(address)
})
var usersonline = 0;
io.on("connection", (socket) => {
    usersonline++;
    socket.broadcast.emit("getTitle", true)
    console.log(`1 user connected. Currently ${usersonline} Users are online`);
        socket.on("height", (numbers) => {
            socket.broadcast.emit("height", numbers);
        });

        socket.on("Coordinates", (coordinates) => {
            socket.broadcast.emit("coordinates", coordinates)
        });
        socket.on("ChangeSlide", (msg) => {
            socket.broadcast.emit('ChangeSlide', msg);

        })
        socket.on("currentSlide", (msg) => {
            socket.broadcast.emit('Slide', msg)
        });
        socket.on("jumpto", (slide) => {
            socket.broadcast.emit("jumpto", {
                slide: slide,
                n: false
            })

        });
        socket.on("paused", type => {
            socket.broadcast.emit("paused", type)
        })
        socket.on("pause", (type) => {
            console.log(type);
            socket.broadcast.emit("pause", type);
        })
        socket.on("title", (title)=>{
            socket.broadcast.emit("title",title)
        })
    socket.on('disconnect', function () {
        usersonline--;
        console.log(`1 User disconnected. Currently ${usersonline} Users are online`)
    })
});


http.listen(3000, function () {
    if(!process.env.NODE_TEST){
        qrcode.generate(`http://${address}:3000`)
        open(`http://${address}:3000`)
        console.log('listening on *:3000');
    }

});

module.exports = {http}