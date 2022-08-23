export interface IToken{
  generateToken(email: string): string;
  checkToken(token:string):string;
}
