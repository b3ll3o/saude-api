import { Objeto } from '../../objeto';
import { Erro } from '../erro';

export class ErroDto extends Objeto<ErroDto> {
  campo: string;
  mensagens: string[];

  constructor(erro: Erro) {
    const { campo, mensagens } = erro;
    super({ campo, mensagens });
  }
}
