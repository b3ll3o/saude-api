import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';

export class FuncionarioStub {
  static ID = 1;
  static NOME = 'Nome Funcionario';
  static cadastrado(): Funcionario {
    return new Funcionario({
      id: this.ID,
      nome: this.NOME,
    });
  }
}
