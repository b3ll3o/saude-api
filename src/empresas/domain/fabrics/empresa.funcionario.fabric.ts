import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { Empresa } from '../entities/empresa.entity';
import { EmpresaFuncionario } from '../entities/empresa.funcionario.entity';
import { CargoEnum } from '../enums/cargo.enum';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

export class EmpresaFuncionarioFabric {
  static fabricaEmpresaFuncionarioOperador(
    funcionario: Funcionario,
    empresa: Empresa,
    usuarioCriacao: Usuario,
  ): EmpresaFuncionario {
    return new EmpresaFuncionario({
      cargo: CargoEnum.OPERADOR,
      funcionario,
      empresa,
      usuarioCriacao,
    });
  }
}
