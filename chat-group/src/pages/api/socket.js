import { Server } from 'socket.io';

export default function ServerHandler(req, res) {
  if (res.socket.server.io) {
    console.log(`[SOCKET] is already running`);
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('[SOCKET] is connected.');
    })
  }
  res.end();
}
