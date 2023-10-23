import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SenhasService {
  async geraHashSenha(senha: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(senha, salt);
  }

  async verificaSenha(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
  }
}
