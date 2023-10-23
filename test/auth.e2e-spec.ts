import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { ValidationPipeCustom } from '@/shared/pipes/validation.pipe.custom';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { AuthModule } from '@/auth/auth.module';
import { UsuarioAutenticavelDtoStub } from '@/auth/test/stubs/dtos/usuario.autenticavel.dto.stub';
import { UsuarioAutenticavelDto } from '@/auth/application/dtos/usuario.autenticavel.dto';
import { JwtGuard } from '@/auth/application/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { SenhasService } from '@/usuarios/domain/services/senhas.service';

const BASE_URL = '/auth';

describe('Auth', () => {
  let app: INestApplication;
  let repository: Repository<Usuario>;
  let senhasService: SenhasService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsuariosModule,
        AuthModule,
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
    senhasService = module.get(SenhasService)
    
    app = module.createNestApplication();

    const reflector = app.get(Reflector);
    const jwtService = app.get(JwtService);

    app.useGlobalPipes(new ValidationPipeCustom());
    app.useGlobalGuards(new JwtGuard(jwtService, reflector))
    await app.init();
  });

  describe('login', () => {
    const BASE_URL_LOGIN = `${BASE_URL}/login`

    it('deve fazer o login de um usuario', async () => {
      const usuarioCadastrado = UsuarioStub.cadastrado()
      usuarioCadastrado.senha = await senhasService.geraHashSenha(usuarioCadastrado.senha)
      await repository.save(usuarioCadastrado);
      const {email, senha } = UsuarioStub.cadastrado()
      return request(app.getHttpServer())
        .post(BASE_URL_LOGIN)
        .send(UsuarioAutenticavelDtoStub.novo(new UsuarioAutenticavelDto({email, senha})))
        .expect(200)
    })
  });

  afterEach(async () => {
    await app.close();
  });
});
