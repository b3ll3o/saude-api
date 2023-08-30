import { CampoNaoEncontradoErro } from './campo.nao.encontrado.erro';

describe('CampoNaoEncontradoErro', () => {
  describe('constructor', () => {
    it('deve criar um novo erro', () => {
      const erro = new CampoNaoEncontradoErro('teste');
      expect(erro.campo).toBe('teste');
      expect(erro.mensagens[0]).toBe('Teste não encontrado.');
    });
  });
});
