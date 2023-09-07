import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { EmpresasService } from './empresas.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EmpresasFuncionariosService } from './empresas.funcionarios.service';
import { EmpresaFuncionario } from '../entities/empresa.funcionario.entity';
import { EmpresaFuncionarioStub } from '@/empresas/test/stubs/entities/empresa.funcionario.entity.stub';
import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';

describe('EmpresasService', () => {
  let repository: Repository<Empresa>;
  let service: EmpresasService;
  let empresasFuncionariosService: EmpresasFuncionariosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresasService, EmpresasFuncionariosService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Empresa, EmpresaFuncionario, Funcionario, Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([
          Empresa,
          EmpresaFuncionario,
          Funcionario,
          Usuario,
        ]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Empresa));
    empresasFuncionariosService = new EmpresasFuncionariosService(null);
    service = new EmpresasService(repository, empresasFuncionariosService);
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
        .spyOn(empresasFuncionariosService, 'cadastra')
        .mockImplementation(() =>
          Promise.resolve(EmpresaFuncionarioStub.administrador()),
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
