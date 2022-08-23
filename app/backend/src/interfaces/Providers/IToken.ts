import { JwtPayload } from 'jsonwebtoken';

export interface IToken {
  generateToken(email: string): string;
  checkToken(token:string):string | JwtPayload ;
}
