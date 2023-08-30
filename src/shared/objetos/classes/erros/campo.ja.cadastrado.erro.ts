import { Erro } from '../erro';

export class CampoJaCadastradoErro extends Erro {
  constructor(campo: string) {
    super(campo, CampoJaCadastradoErro._geradorMensagens(campo));
  }

  private static _geradorMensagens(campo: string): string[] {
    if (campo === 'email') {
      return [this._geradorMensagem('E-mail')];
    }
    return [
      this._geradorMensagem(campo.charAt(0).toUpperCase() + campo.slice(1)),
    ];
  }

  private static _geradorMensagem(campo: string): string {
    return `${campo} já cadastrado.`;
  }
}
