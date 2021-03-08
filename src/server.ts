import { createServer } from 'http';
import * as socketIo from 'socket.io';
import Users from './repositories/users';

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
const usersRepository = new Users();

io.on('connection', socket => {
  // Join a conversation
  const { roomId, username } = socket.handshake.query;

  const activeUsers = usersRepository.getAllUsers(roomId);

  if (!activeUsers) {
    usersRepository.addRoom(roomId);
  }

  if (activeUsers && !activeUsers.includes(username)) {
    usersRepository.addUser(roomId, username);

    const welcomeMessage = {
      nickname: 'ChatPlan Bot',
      body: `Usuário ${username} entrou no chat`,
      senderId: 'chatPlanBotId',
    };
    io.to(roomId).emit('newChatMessage', welcomeMessage);
  }
  console.log(activeUsers);

  // Creates a history for this chat
  if (!Object.keys(messageHistory).includes(roomId)) {
    messageHistory[roomId] = [];
  }

  // console.log(roomId);
  // console.log(messageHistory[roomId]);
  socket.join(roomId);

  // Emit previous messages
  socket.emit('previoustMessages', messageHistory[roomId]);

  // socket.in(roomId).emit('newChatMessage', welcomeMessage);

  socket.broadcast.emit();

  // Listen for new messages
  socket.on('newChatMessage', (data: Message) => {
    messageHistory[roomId].push(data);
    io.to(roomId).emit('newChatMessage', data);
  });

  socket.on('leaveRoom', (nickname: string) => {
    usersRepository.removeUser(roomId, nickname);

    const leaveMessage = {
      nickname: 'ChatPlan Bot',
      body: `Usuário ${username} saiu do chat`,
      senderId: 'chatPlanBotId',
    };
    io.to(roomId).emit('newChatMessage', leaveMessage);
    socket.leave(roomId);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    console.log('fechou');
    socket.leave(roomId);
  });
});

server.listen(3333, () => {
  console.log('Listening on port 3333');
});
