var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var indexer = 1;
var count = 0;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on("connection", (socket) => {
    var id = indexer++;
    count++;

    console.log(`USER ${id} CONNECTED. Total users connected ${count}`);

    socket.on('disconnect', () => {
        count--;
        console.log(`USER ${id} DISCONNECTED. Total users connected ${count}`);
    });
});

http.listen(3000, () => {
    console.log("Listening on port 3000");
});