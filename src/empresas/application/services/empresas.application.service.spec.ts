import { EmpresasService } from "@/empresas/domain/services/empresas.service";
import { EmpresasApplicationService } from "./empresas.application.service";
import { EmpresaStub } from "@/empresas/test/stubs/entities/empresa.entity.stub";
import { UsuarioStub } from "@/usuarios/test/stubs/entities/usuario.entity.stub";


describe('EmpresasApplicationService', () => {
  let service: EmpresasApplicationService;
  let empresasService: EmpresasService;

  beforeEach(() => {
    empresasService = new EmpresasService(null, null);
    service = new EmpresasApplicationService(empresasService);
  });
  describe('cadastra', () => {
    it('deve retorna usuario cadastrado', async () => {
      jest
        .spyOn(empresasService, 'cadastra')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrado()));
      const empresa = await service.cadastra(EmpresaStub.novo(), UsuarioStub.cadastrado());
      expect(empresa.id).toBe(EmpresaStub.ID);
      expect(empresa.nome).toBe(EmpresaStub.NOME);
    });

    it('deve jogar um erro quando usuario estiver invalido', async () => {
      jest
        .spyOn(empresasService, 'cadastra')
        .mockImplementation(() => Promise.resolve(EmpresaStub.invalido()));
      await expect(service.cadastra(EmpresaStub.novo(), UsuarioStub.cadastrado())).rejects.toThrow();
    });
  });

  
});
