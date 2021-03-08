export default interface IActiveUsersRepository {
  addRoom(roomId: string): void;
  addUser(roomId: string, username: string): void;
  removeUser(roomId: string, username: string): void;
  getAllUsers(roomId: string): string[];
}
