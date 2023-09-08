import { UsuariosService } from '@/usuarios/domain/services/usuarios.service';
import { UsuariosApplicationService } from './usuarios.application.service';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { NovoUsuarioDtoStub } from '@/usuarios/test/stubs/dtos/novo.usuario.dto.stub';

describe('UsuariosApplicationService', () => {
  let service: UsuariosApplicationService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    usuariosService = new UsuariosService(null);
    service = new UsuariosApplicationService(usuariosService);
  });
  describe('cadastra', () => {
    it('deve retorna usuario cadastrado', async () => {
      jest
        .spyOn(usuariosService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      const usuario = await service.cadastra(NovoUsuarioDtoStub.novo());
      expect(usuario.id).toBe(UsuarioStub.ID);
      expect(usuario.email).toBe(UsuarioStub.EMAIL);
    });

    it('deve jogar um erro quando usuario estiver invalido', async () => {
      jest
        .spyOn(usuariosService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioStub.invalido()));
      await expect(service.cadastra(NovoUsuarioDtoStub.novo())).rejects.toThrow();
    });
  });

  describe('autentica', () => {
    it('deve retorna usuario autenticado', async () => {
      jest
        .spyOn(usuariosService, 'autentica')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      const usuario = await service.autentica(UsuarioStub.novo());
      expect(usuario.id).toBe(UsuarioStub.ID);
      expect(usuario.email).toBe(UsuarioStub.EMAIL);
    });

    it('deve retorna undefined quando usuario não estiver autenticado', async () => {
      jest
        .spyOn(usuariosService, 'autentica')
        .mockImplementation(() => Promise.resolve(UsuarioStub.invalido()));
      const usuario = await service.autentica(UsuarioStub.novo());
      expect(usuario).toBeUndefined();
    });
  });
});
