import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { EmpresasService } from './empresas.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EmpresasUsuariosService } from './empresas.usuarios.service';
import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { EmpresaUsuario } from '../entities/empresa.usuario.entity';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EmpresaUsuarioStub } from '@/empresas/test/stubs/entities/empresa.usuario.entity.stub';

describe('EmpresasService', () => {
  let repository: Repository<Empresa>;
  let service: EmpresasService;
  let empresasUsuariosService: EmpresasUsuariosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresasService, EmpresasUsuariosService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Empresa, EmpresaUsuario, Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Empresa, EmpresaUsuario, Usuario]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Empresa));
    empresasUsuariosService = new EmpresasUsuariosService(null);
    service = new EmpresasService(repository, empresasUsuariosService);
  });

  describe('cadastra', () => {
    it('deve cadastrar nova empresa', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrado()));
      jest
        .spyOn(empresasUsuariosService, 'cadastra')
        .mockImplementation(() =>
          Promise.resolve(EmpresaUsuarioStub.administrador()),
        );

      const empresa = await service.cadastra(
        EmpresaStub.novo(),
        UsuarioStub.cadastrado(),
      );

      expect(empresa.id).toBe(EmpresaStub.ID);
    });

    it('não deve cadastrar empresa com nome ja cadastrado', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrado()));

      const empresa = await service.cadastra(
        EmpresaStub.novo(),
        UsuarioStub.novo(),
      );

      expect(empresa.id).toBeNull();
      expect(empresa.invalido()).toBeTruthy();
    });
  });
});
