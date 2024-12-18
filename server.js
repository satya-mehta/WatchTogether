const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const { server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);
app.use(express.static("frontend"));

//handle Socket.Io connections
io.on("connection", Socket => {
    console.log("New user connected");
        Socket.on("disconnect", () => {
            console.log("user Disconnected");
        });
});

server.listen(3000, () =>{
    console.log("Server is running on local ip and 3000 port");
});