export interface ICrypto {
  comparePassword(password: string, passwordHash: string): boolean;
}
