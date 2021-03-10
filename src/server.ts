import 'reflect-metadata';
import { createServer } from 'http';
import * as socketIo from 'socket.io';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

import RoomsRepository from './repositories/RoomsRepository';
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

const roomsRepository = new RoomsRepository();

io.on('connection', socket => {
  // Join a conversation
  const { roomId, username } = socket.handshake.query;

  let roomsRelation = roomsRepository.getRoomsInfo();

  if (username === 'homePage' && roomId === 'homePage') {
    io.emit('roomsInfo', roomsRelation);
  } else {
    let activeUsers = roomsRepository.getAllUsersInRoom(roomId);

    if (!activeUsers) {
      roomsRepository.createRoom(roomId);
      roomsRepository.addUserToRoom(roomId, username);

      roomsRelation = roomsRepository.getRoomsInfo();
      io.emit('roomsInfo', roomsRelation);

      activeUsers = roomsRepository.getAllUsersInRoom(roomId);
    }

    io.to(roomId).emit('usersInRoom', activeUsers);

    if (activeUsers && !activeUsers.includes(username)) {
      roomsRepository.addUserToRoom(roomId, username);

      const welcomeMessage = {
        nickname: 'ChatPlan Bot',
        body: `Usuário ${username} entrou no chat`,
        senderId: 'chatPlanBotId',
      };
      io.to(roomId).emit('newChatMessage', welcomeMessage);
    }

    socket.join(roomId);

    // Emit previous messages
    socket.emit('previoustMessages', roomsRepository.getMessageHistory(roomId));

    // Listen for new messages
    socket.on('sendMessage', (data: Message) => {
      roomsRepository.addMessageToHistory(roomId, data);
      io.to(roomId).emit('newChatMessage', data);
    });

    socket.on('leaveRoom', (nickname: string) => {
      roomsRepository.removeUserFromRoom(roomId, nickname);

      activeUsers = roomsRepository.getAllUsersInRoom(roomId);

      if (activeUsers && activeUsers.length === 0) {
        roomsRepository.deleteRoom(roomId);
      }

      const leaveMessage = {
        nickname: 'ChatPlan Bot',
        body: `Usuário ${username} saiu do chat`,
        senderId: 'chatPlanBotId',
      };
      io.to(roomId).emit('newChatMessage', leaveMessage);
      io.to(roomId).emit(
        'usersInRoom',
        roomsRepository.getAllUsersInRoom(roomId),
      );

      roomsRelation = roomsRepository.getRoomsInfo();

      io.emit('roomsInfo', roomsRelation);

      socket.leave(roomId);
    });

    // Leave the room if the user closes the socket
    socket.on('disconnect', () => {
      socket.leave(roomId);
    });
  }
});

server.listen(3333, () => {
  console.log('Listening on port 3333');
});
