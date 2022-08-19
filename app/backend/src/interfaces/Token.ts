export default interface Token {
  generateToken(email: string): Promise<string>;
}
