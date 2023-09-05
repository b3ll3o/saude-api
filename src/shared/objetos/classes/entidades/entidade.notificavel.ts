import { Erro } from '../erro';
import { NotificacaoErro } from '../notificacao.erro';
import { EntidadeDatavel } from './entidade.datavel';

export class EntidadeNotificavel<T> extends EntidadeDatavel<T> {
  protected _notificacaoErro: NotificacaoErro;

  constructor(entidade: Partial<T>) {
    super(entidade);
    this._notificacaoErro = new NotificacaoErro();
  }

  get erros(): Erro[] {
    return this._notificacaoErro.erros;
  }

  valido(): boolean {
    return this._notificacaoErro.valido();
  }

  invalido(): boolean {
    return this._notificacaoErro.invalido();
  }
}
