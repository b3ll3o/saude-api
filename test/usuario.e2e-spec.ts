import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { ValidationPipeCustom } from '@/shared/pipes/validation.pipe.custom';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';

const BASE_URL = '/usuarios';

describe('Usuarios', () => {
  let app: INestApplication;
  let repository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsuariosModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Usuario));

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipeCustom());
    await app.init();
  });

  describe('cadastra', () => {
    it('deve cadastrar um novo usuario', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo())
        .expect(201)
        .expect({
          id: 1,
          email: UsuarioStub.EMAIL,
          nome: UsuarioStub.NOME,
        });
    });

    it('não deve cadastrar dois usuarios com o mesmo email', async () => {
      await repository.save(UsuarioStub.cadastrado());
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo())
        .expect(400);
    });

    it('não deve cadastrar um usuario sem email', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo(new Usuario({ email: '' })))
        .expect(400);
    });

    it('não deve cadastrar um usuario sem senha', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(UsuarioStub.novo(new Usuario({ senha: '' })))
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
