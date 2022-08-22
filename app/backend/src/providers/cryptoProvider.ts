import * as bcrypt from 'bcrypt';

class cryptoProvider implements ICrypto {
  private bcrypt: string;
  constructor() {
    this.bcrypt = bcrypt;
  }

  comparePassword(password: string, passwordHash: string):boolean {
    return this.bcrypt.compareSync(password, passwordHash);
  }
}

export default cryptoProvider;
