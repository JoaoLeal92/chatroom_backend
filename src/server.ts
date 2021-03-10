import 'reflect-metadata';
import { createServer } from 'http';
import * as socketIo from 'socket.io';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

import ActiveUsersRepository from './repositories/ActiveUsersRepository';
import routes from './routes';
import './database';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

const server = createServer(app);
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
const activeUsersRepository = new ActiveUsersRepository();

io.on('connection', socket => {
  // Join a conversation
  const { roomId, username } = socket.handshake.query;

  const activeUsers = activeUsersRepository.getAllUsers(roomId);

  if (!activeUsers) {
    activeUsersRepository.addRoom(roomId);
  }

  if (activeUsers && !activeUsers.includes(username)) {
    activeUsersRepository.addUser(roomId, username);

    const welcomeMessage = {
      nickname: 'ChatPlan Bot',
      body: `Usuário ${username} entrou no chat`,
      senderId: 'chatPlanBotId',
    };
    io.to(roomId).emit('newChatMessage', welcomeMessage);
  }
  // console.log(activeUsers);

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
    activeUsersRepository.removeUser(roomId, nickname);

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
    socket.leave(roomId);
  });
});

server.listen(3333, () => {
  console.log('Listening on port 3333');
});
