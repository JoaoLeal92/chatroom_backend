import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(
    payload: string,
    hashedString: string,
  ): Promise<boolean> {
    return payload === hashedString;
  }
}
