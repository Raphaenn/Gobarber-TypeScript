import { uuid } from 'uuidv4';
import IUserTokenRepository from '@modules/Users/repositories/IUserTokenRepository';
import UserToken from "@modules/Users/infra/typeorm/entities/UserToken";

class FakeUserTokenRepo implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
        id: uuid(),
        token: uuid(),
        user_id
    });

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findtoken => findtoken.token === token);

    return userToken;
  };
  
}

export default FakeUserTokenRepo;