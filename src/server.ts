import { createServer } from 'http';
import * as socketIo from 'socket.io';

const server = createServer();
const io = new socketIo.Server(server, {
  cors: {
    origin: '*',
  },
});

interface Message {
  body: string;
  senderId: string;
  nickname: string;
}

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

const messageHistory: Message[] = [];

io.on('connection', socket => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Emit previous messages
  socket.emit('previoustMessages', messageHistory);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data: Message) => {
    messageHistory.push(data);
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
