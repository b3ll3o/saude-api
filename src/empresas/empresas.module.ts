import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './domain/entities/empresa.entity';
import { EmpresasService } from './domain/services/empresas.service';
import { EmpresasApplicationService } from './application/services/empresas.application.service';
import { EmpresasController } from './controllers/empresas.controller';
import { EmpresaFuncionario } from './domain/entities/empresa.funcionario.entity';
import { EmpresasFuncionariosService } from './domain/services/empresas.funcionarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, EmpresaFuncionario])],
  providers: [
    EmpresasService,
    EmpresasFuncionariosService,
    EmpresasApplicationService,
  ],
  controllers: [EmpresasController],
  exports: [EmpresasService],
})
export class EmpresasModule {}
