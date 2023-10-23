import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './domain/entities/usuario.entity';
import { UsuariosApplicationService } from './application/services/usuarios.application.service';
import { UsuariosService } from './domain/services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { SenhasService } from './domain/services/senhas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosApplicationService, UsuariosService, SenhasService],
  controllers: [UsuariosController],
  exports: [UsuariosApplicationService],
})
export class UsuariosModule {}
