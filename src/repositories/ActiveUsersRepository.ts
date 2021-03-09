interface RoomUsers {
  [key: string]: string[];
}

class ActiveUsersRepository {
  private users: RoomUsers;

  constructor() {
    this.users = {};
  }

  public addRoom(roomId: string): void {
    this.users[roomId] = [];
  }

  public addUser(roomId: string, username: string): void {
    this.users[roomId].push(username);
  }

  public removeUser(roomId: string, username: string): void {
    const userIndex = this.users[roomId].findIndex(user => user === username);

    this.users[roomId].splice(userIndex, 1);
  }

  public getAllUsers(roomId: string): string[] {
    return this.users[roomId];
  }
}

export default ActiveUsersRepository;
