const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors()); // Abilita CORS per tutte le rotte

let rooms = {};
let activeRooms = {};
let globalMessages = [];

const clearOldMessages = () => {
  const oneHourAgo = Date.now() - 3600000;
  globalMessages = globalMessages.filter(
    (message) => message.timestamp > oneHourAgo,
  );
};

setInterval(clearOldMessages, 600000);

io.on("connection", (socket) => {
  console.log("New client connected");

  const updateActiveRooms = () => {
    io.emit("activeRooms", Object.keys(activeRooms));
  };

  // Join a room
  socket.on("joinRoom", ({ room, username }) => {
    if (!rooms[room]) {
      rooms[room] = [];
      activeRooms[room] = true;
    }
    rooms[room].push(socket.id);
    socket.join(room);
    updateActiveRooms();
    socket.to(room).emit("message", {
      username,
      message: `User ${username} has joined the room.`,
    });
  });

  // Leave the room
  socket.on("leaveRoom", ({ room, username }) => {
    console.log(`User leaving room: ${room}`);
    if (rooms[room]) {
      rooms[room] = rooms[room].filter((id) => id !== socket.id);
      if (rooms[room].length === 0) {
        delete rooms[room];
        delete activeRooms[room];
      }
    }
    socket.leave(room);
    updateActiveRooms();
    socket.to(room).emit("message", {
      username,
      message: `User ${username} has left the room.`,
    });
  });

  // Send message to specific room
  socket.on("sendMessage", ({ room, message, username }) => {
    const messageData = { username, message, room, timestamp: Date.now() };

    if (room === "Global Chat") {
      globalMessages.push(messageData);
    }
    io.to(room).emit("message", messageData);
  });

  socket.on("disconnect", () => {
    // Rimuove l'utente da tutte le stanze in cui si trova
    Object.keys(rooms).forEach((room) => {
      rooms[room] = rooms[room].filter((id) => id !== socket.id);
      if (rooms[room].length === 0) {
        delete rooms[room];
        delete activeRooms[room];
      }
    });
    console.log("Client disconnected");
    updateActiveRooms();
  });
});

app.get("/active-rooms", (req, res) => {
  res.json(Object.keys(activeRooms));
});

app.get("/global-messages", (req, res) => {
  clearOldMessages();
  res.json(globalMessages);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
