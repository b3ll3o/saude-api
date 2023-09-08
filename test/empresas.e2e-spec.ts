import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { ValidationPipeCustom } from '@/shared/pipes/validation.pipe.custom';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';
import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';
import { EmpresaFuncionario } from '@/empresas/domain/entities/empresa.funcionario.entity';
import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { EmpresasModule } from '@/empresas/empresas.module';

const BASE_URL = '/empresas';

describe('Empresas', () => {
  let app: INestApplication;
  let repository: Repository<Empresa>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EmpresasModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Empresa, Usuario, EmpresaFuncionario, Funcionario],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          Empresa,
          Usuario,
          EmpresaFuncionario,
          Funcionario,
        ]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Empresa));

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipeCustom());
    await app.init();
  });

  describe('cadastra', () => {
    it('deve cadastrar um novo usuario', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(EmpresaStub.novo())
        .expect(201)
        .expect({
          id: 1,
          nome: EmpresaStub.NOME,
        });
    });

    it('não deve cadastrar duas empresas com o mesmo nome', async () => {
      await repository.save(EmpresaStub.cadastrado());
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(EmpresaStub.novo())
        .expect(400);
    });

    it('não deve cadastrar uma empresa sem nome', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(EmpresaStub.novo(new Empresa({ nome: '' })))
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
