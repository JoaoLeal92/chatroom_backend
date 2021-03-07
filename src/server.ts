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

interface MessageHistory {
  [key: string]: Message[];
}

const messageHistory: MessageHistory = {};

io.on('connection', socket => {
  // Join a conversation
  const { roomId } = socket.handshake.query;

  // Creates a history for this chat
  if (!Object.keys(messageHistory).includes(roomId)) {
    messageHistory[roomId] = [];
  }

  console.log(roomId);
  socket.join(roomId);
  console.log(messageHistory[roomId]);

  // Emit previous messages
  socket.emit('previoustMessages', messageHistory[roomId]);

  // socket.in(roomId).emit('welcomeMessage', 'Usuário entrou no chat');

  // Listen for new messages
  socket.on('newChatMessage', (data: Message) => {
    messageHistory[roomId].push(data);
    io.to(roomId).emit('newChatMessage', data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
});

server.listen(3333, () => {
  console.log('Listening on port 3333');
});
