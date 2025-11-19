// server.js
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  // Create raw HTTP server for Next.js
  const httpServer = createServer(handler);

  // Create Socket.IO server, attach to HTTP server
  const io = new Server(httpServer, {
    cors: { origin: "*" } // Adjust for your frontend URLs
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // example event:
    socket.on("hello", (msg) => {
      socket.emit("hello", `Server says: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
