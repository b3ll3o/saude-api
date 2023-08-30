import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';

describe('Usuario', () => {
  describe('podeSerCadastrado', () => {
    it('deve retorna true quando usuario for igual a undefined', () => {
      const usuario = UsuarioStub.novo();
      expect(usuario.podeSerCadastrado(undefined)).toBeTruthy();
    });

    it('deve retorna true quando usuario for igual a null', () => {
      const usuario = UsuarioStub.novo();
      expect(usuario.podeSerCadastrado(null)).toBeTruthy();
    });

    it('deve retorna false e adicionar novo erro quando usuario passado for valido', () => {
      const usuario = UsuarioStub.novo();
      expect(usuario.podeSerCadastrado(UsuarioStub.cadastrado())).toBeFalsy();
      expect(usuario.invalido()).toBeTruthy();
      expect(usuario.erros).toHaveLength(1);
    });
  });
});
