import { JwtPayload, sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { IToken } from '../interfaces/Providers/IToken';
import HandleError from '../interfaces/Error/handleError';

class tokenProvider implements IToken {
  private jwtSecret: string;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'hardPassword';
  }

  generateToken(email: string): string {
    const token = sign({ data: email }, this.jwtSecret, {
      expiresIn: '5d',
      algorithm: 'HS256',
    });

    return token;
  }

  checkToken(token: string): string {
    try {
      const response = verify(token, this.jwtSecret);
      if (!response) throw new HandleError('Unauthorized', 'Token must be a valid token');
      const { data } = response as JwtPayload;

      return data;
    } catch (err) {
      throw new HandleError('Unauthorized', 'Token must be a valid token');
    }
  }
}

export default tokenProvider;
