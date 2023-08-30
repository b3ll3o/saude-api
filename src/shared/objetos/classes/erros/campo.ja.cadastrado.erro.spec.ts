import { CampoJaCadastradoErro } from './campo.ja.cadastrado.erro';

describe('CampoJaCadastradoErro', () => {
  describe('constructor', () => {
    it('deve criar um novo erro', () => {
      const erro = new CampoJaCadastradoErro('teste');
      expect(erro.campo).toBe('teste');
      expect(erro.mensagens[0]).toBe('Teste já cadastrado.');
    });

    it('deve jogar um erro quando campo for undefined', () => {
      expect(() => new CampoJaCadastradoErro(undefined)).toThrowError();
    });

    it('deve jogar um erro quando campo for null', () => {
      expect(() => new CampoJaCadastradoErro(null)).toThrowError();
    });
  });
});
