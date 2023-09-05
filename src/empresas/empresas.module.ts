import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './domain/entities/empresa.entity';
import { EmpresaUsuario } from './domain/entities/empresa.usuario.entity';
import { EmpresasService } from './domain/services/empresas.service';
import { EmpresasUsuariosService } from './domain/services/empresas.usuarios.service';
import { EmpresasApplicationService } from './application/services/empresas.application.service';
import { EmpresasController } from './controllers/empresas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, EmpresaUsuario])],
  providers: [
    EmpresasService,
    EmpresasUsuariosService,
    EmpresasApplicationService,
  ],
  controllers: [EmpresasController],
})
export class EmpresasModule {}
