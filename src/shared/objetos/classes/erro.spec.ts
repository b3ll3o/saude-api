import { Erro } from './erro';

describe('Erro', () => {
  describe('constructor', () => {
    it('deve construir um novo erro', () => {
      const erro = new Erro('campo', ['mensagens']);
      expect(erro.campo).toBe('campo');
      expect(erro.mensagens[0]).toBe('mensagens');
    });

    it('não deve construir um novo erro com campo undefined', () => {
      expect(() => new Erro(undefined, ['mensagens'])).toThrowError();
    });

    it('não deve construir um novo erro com campo null', () => {
      expect(() => new Erro(null, ['mensagens'])).toThrowError();
    });

    it('não deve construir um novo erro com campo vazio', () => {
      expect(() => new Erro('', ['mensagens'])).toThrowError();
    });

    it('não deve construir um novo erro com mensagerns undefined', () => {
      expect(() => new Erro('campo', undefined)).toThrowError();
    });

    it('não deve construir um novo erro com mensagerns null', () => {
      expect(() => new Erro('campo', null)).toThrowError();
    });

    it('não deve construir um novo erro com mensagens vazias', () => {
      expect(() => new Erro('campo', [])).toThrowError();
    });

    it('não deve construir um novo erro com mensagens com centeudo vazio', () => {
      expect(() => new Erro('campo', [''])).toThrowError();
    });

    it('não deve construir um novo erro com mensagens com centeudo null', () => {
      expect(() => new Erro('campo', [null])).toThrowError();
    });

    it('não deve construir um novo erro com mensagens com centeudo undefined', () => {
      expect(() => new Erro('campo', [undefined])).toThrowError();
    });
  });

  describe('adicionaNovasMensagens', () => {
    it('deve adicionar novas mensagens', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens(['novaMensagem']);
      expect(erro.mensagens).toHaveLength(2);
    });

    it('não deve adicionar duas vezes a mesma mensagem', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens(['mensagem']);
      expect(erro.mensagens).toHaveLength(1);
    });

    it('não deve adicionar mensagens undefined', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens(undefined);
      expect(erro.mensagens).toHaveLength(1);
    });

    it('não deve adicionar mensagens null', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens(null);
      expect(erro.mensagens).toHaveLength(1);
    });

    it('não deve adicionar mensagens vazia', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens([]);
      expect(erro.mensagens).toHaveLength(1);
    });

    it('não deve adicionar mensagens com conteudo undefined', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens([undefined]);
      expect(erro.mensagens).toHaveLength(1);
    });

    it('não deve adicionar mensagens com conteudo null', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens([null]);
      expect(erro.mensagens).toHaveLength(1);
    });

    it('não deve adicionar mensagens com conteudo vazia', () => {
      const erro = new Erro('campo', ['mensagem']);
      erro.adicionaNovasMensagens(['']);
      expect(erro.mensagens).toHaveLength(1);
    });
  });
});
