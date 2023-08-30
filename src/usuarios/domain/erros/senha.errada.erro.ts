import { Erro } from '@/shared/objetos/classes/erro';

export class SenhaErradaErro extends Erro {
  static CAMPO = 'senha';
  static MENSAGEM = 'Senha errada.';
  constructor() {
    super(SenhaErradaErro.CAMPO, [SenhaErradaErro.MENSAGEM]);
  }
}
