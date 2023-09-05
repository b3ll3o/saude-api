import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';

describe('Empresa', () => {
  describe('podeSerCadastrada', () => {
    it('deve retorna true quando empresa for igual a undefined', () => {
      const empresa = EmpresaStub.novo();
      expect(empresa.podeSerCadastrada(undefined)).toBeTruthy();
    });

    it('deve retorna true quando empresa for igual a null', () => {
      const empresa = EmpresaStub.novo();
      expect(empresa.podeSerCadastrada(null)).toBeTruthy();
    });

    it('deve retorna false e adicionar novo erro quando empresa passado for valido', () => {
      const empresa = EmpresaStub.novo();
      expect(empresa.podeSerCadastrada(EmpresaStub.cadastrado())).toBeFalsy();
      expect(empresa.invalido()).toBeTruthy();
      expect(empresa.erros).toHaveLength(1);
    });
  });
});
