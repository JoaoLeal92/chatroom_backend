interface IMessage {
  body: string;
  senderId: string;
  nickname: string;
}

interface IRooms {
  roomName: string;
  currentUsers: string[];
  messageHistory: IMessage[];
}

interface IRoomInfo {
  roomName: string;
  numberOfUsers: number;
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

  public deleteRoom(roomName: string): void {
    const roomIndex = this.rooms.findIndex(room => room.roomName === roomName);

    this.rooms.splice(roomIndex, 1);
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

  public getMessageHistory(roomId: string): IMessage[] | undefined {
    const currentRoom = this.rooms.find(room => room.roomName === roomId);

    return currentRoom?.messageHistory;
  }

  public addMessageToHistory(roomId: string, message: IMessage): void {
    const currentRoomIndex = this.rooms.findIndex(
      room => room.roomName === roomId,
    );

    this.rooms[currentRoomIndex].messageHistory.push(message);
  }

  public getRoomsInfo(): IRoomInfo[] {
    const roomsInfo = this.rooms.map(room => {
      const numberOfUsers = room.currentUsers.length;

      return {
        roomName: room.roomName,
        numberOfUsers,
      };
    });

    return roomsInfo;
  }
}

export default ActiveUsersRepository;
