const express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io")(server),
	PORT = process.env.PORT || 3000
	
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

server.listen(3000)