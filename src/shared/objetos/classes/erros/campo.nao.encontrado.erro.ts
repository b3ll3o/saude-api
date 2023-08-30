import { Erro } from '../erro';

export class CampoNaoEncontradoErro extends Erro {
  constructor(campo: string) {
    super(campo, CampoNaoEncontradoErro._geradorMensagens(campo));
  }

  private static _geradorMensagens(campo: string): string[] {
    if (campo === 'usuario') {
      return [this._geradorMensagem('Usuário')];
    }
    return [
      this._geradorMensagem(campo.charAt(0).toUpperCase() + campo.slice(1)),
    ];
  }

  private static _geradorMensagem(campo: string): string {
    return `${campo} não encontrado.`;
  }
}
