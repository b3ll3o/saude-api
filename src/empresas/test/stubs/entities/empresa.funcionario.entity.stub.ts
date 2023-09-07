import { EmpresaFuncionario } from '@/empresas/domain/entities/empresa.funcionario.entity';
import { EmpresaStub } from './empresa.entity.stub';
import { CargoEnum } from '@/empresas/domain/enums/cargo.enum';
import { FuncionarioStub } from '@/funcionarios/domain/test/stubs/entities/funcionario.entity.stub';

export class EmpresaFuncionarioStub {
  static NOME = 'nomeEmpresa';
  static ID = 1;

  static administrador(
    empresaUsuario: EmpresaFuncionario = new EmpresaFuncionario({
      id: this.ID,
      empresa: EmpresaStub.cadastrado(),
      funcionario: FuncionarioStub.cadastrado(),
      cargo: CargoEnum.ADMINISTRADOR,
    }),
  ): EmpresaFuncionario {
    return empresaUsuario;
  }
}
