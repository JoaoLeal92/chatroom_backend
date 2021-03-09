export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashedString: string): Promise<boolean>;
}
