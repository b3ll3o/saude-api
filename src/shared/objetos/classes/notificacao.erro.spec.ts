import { Erro } from './erro';
import { NotificacaoErro } from './notificacao.erro';

describe('NotificacaoErro', () => {
  describe('adicionaErros', () => {
    it('deve adicionar novos erros', () => {
      const notificacao = new NotificacaoErro();
      notificacao.adicionaErros([new Erro('campo', ['mensagem'])]);
      expect(notificacao.erros).toHaveLength(1);
    });

    it('não deve adicionar duas vezes o mesmo erro', () => {
      const notificacao = new NotificacaoErro();
      notificacao.adicionaErros([new Erro('campo', ['mensagem'])]);
      notificacao.adicionaErros([new Erro('campo', ['mensagem'])]);
      expect(notificacao.erros).toHaveLength(1);
    });

    it('não deve adicionar erro undefined', () => {
      const notificacao = new NotificacaoErro();
      notificacao.adicionaErros(undefined);
      expect(notificacao.erros).toHaveLength(0);
    });

    it('não deve adicionar erro null', () => {
      const notificacao = new NotificacaoErro();
      notificacao.adicionaErros(null);
      expect(notificacao.erros).toHaveLength(0);
    });

    it('não deve adicionar erro com conteudo undefined', () => {
      const notificacao = new NotificacaoErro();
      notificacao.adicionaErros([undefined]);
      expect(notificacao.erros).toHaveLength(0);
    });

    it('não deve adicionar erro com conteudo null', () => {
      const notificacao = new NotificacaoErro();
      notificacao.adicionaErros([null]);
      expect(notificacao.erros).toHaveLength(0);
    });
  });
});
