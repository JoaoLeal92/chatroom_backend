import { createServer } from 'http';
import * as socketIo from 'socket.io';

const server = createServer();
const io = new socketIo.Server(server, {
  cors: {
    origin: '*',
  },
});

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

io.on('connection', socket => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data: any) => {
    console.log(data);
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
});

server.listen(3333, () => {
  console.log('Listening on port 3333');
});
