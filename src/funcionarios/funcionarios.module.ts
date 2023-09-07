import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './domain/entities/funcionario.entity';
import { FuncionariosService } from './domain/services/funcionarios.service';
import { FuncioariosController } from './controllers/funcionarios.controller';
import { EmpresasModule } from '@/empresas/empresas.module';
import { FuncionariosApplicationService } from './application/services/funcionarios.application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario]), EmpresasModule],
  providers: [FuncionariosService, FuncionariosApplicationService],
  controllers: [FuncioariosController],
})
export class FuncionariosModule {}
