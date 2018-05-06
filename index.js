const express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io")(server),
	PORT = process.env.PORT || 3000

var Nebulas = require("nebulas");
var Neb = Nebulas.Neb;

const CANVAS_ROWS = 50
const CANVAS_COLS = 50

var canvas = []

for(var rows = 0;  rows < CANVAS_ROWS; rows++){
	canvas[rows] = []
	for(var cols = 0; cols < CANVAS_COLS; cols++){
		canvas[rows][cols] = "#FFF"
	}
}

app.use(express.static("public"))
io.on("connection", socket => {
	socket.emit("canvas",canvas)
	
	socket.on("color",data => {
		if(data == null || data.row == null || data.col == null 
			|| data.row < 1 
			|| data.col < 1 
			|| data.col > CANVAS_COLS 
			|| data.row > CANVAS_ROWS){
			
			console.log("Invalid input")
			return;
			
		}
		canvas[data.row - 1][data.col - 1] = data.color
		io.emit("canvas",canvas)
	})	
})

// test code --- actually does nothing
function fillColors() {
    var neb = new Neb();
     neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));

     neb.api.getAccountState("n1X7iPAv8oHcpYesH1Hf9wdpAJETpJLybWB").then(function (state) {
         console.log(state);
     }).catch(function (err) {
         console.log(err);
    });


    for(var rows = 0;  rows < CANVAS_ROWS; rows++){
    	canvas[rows] = []
    	for(var cols = 0; cols < CANVAS_COLS; cols++){
    		canvas[rows][cols] = "#FFF"
    	}
    }
}
fillColors();
// test code --- actually does nothing


server.listen(PORT)