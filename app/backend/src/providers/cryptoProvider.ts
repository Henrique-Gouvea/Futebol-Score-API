import * as bcrypt from 'bcryptjs';
import { ICrypto } from '../interfaces/Providers/ICrypto';

class cryptoProvider implements ICrypto {
  constructor(private teste:string = 'teste') {

  }

  comparePassword(password: string, passwordHash: string):boolean {
    console.log(this.teste);
    return bcrypt.compareSync(password, passwordHash);
  }
}

export default cryptoProvider;
