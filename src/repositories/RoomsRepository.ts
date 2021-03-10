interface Message {
  body: string;
  senderId: string;
  nickname: string;
}

interface IRooms {
  roomName: string;
  currentUsers: string[];
  messageHistory: Message[];
}

class ActiveUsersRepository {
  private rooms: IRooms[];

  constructor() {
    this.rooms = [];
  }

  public createRoom(roomName: string): void {
    this.rooms.push({
      roomName,
      currentUsers: [],
      messageHistory: [],
    });
  }

  public addUserToRoom(roomId: string, username: string): void {
    const currentRoomIndex = this.rooms.findIndex(
      room => room.roomName === roomId,
    );

    this.rooms[currentRoomIndex].currentUsers.push(username);
  }

  public removeUserFromRoom(roomId: string, username: string): void {
    const currentRoomIndex = this.rooms.findIndex(
      room => room.roomName === roomId,
    );

    const userIndex = this.rooms[currentRoomIndex].currentUsers.findIndex(
      user => user === username,
    );

    this.rooms[currentRoomIndex].currentUsers.splice(userIndex, 1);
  }

  public getAllUsersInRoom(roomId: string): string[] | undefined {
    const currentRoom = this.rooms.find(room => room.roomName === roomId);

    return currentRoom?.currentUsers;
  }

  public getMessageHistory(roomId: string): Message[] | undefined {
    const currentRoom = this.rooms.find(room => room.roomName === roomId);

    return currentRoom?.messageHistory;
  }

  public addMessageToHistory(roomId: string, message: Message): void {
    const currentRoomIndex = this.rooms.findIndex(
      room => room.roomName === roomId,
    );

    this.rooms[currentRoomIndex].messageHistory.push(message);
  }
}

export default ActiveUsersRepository;
