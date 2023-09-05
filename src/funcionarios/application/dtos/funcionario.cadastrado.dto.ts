import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { Objeto } from '@/shared/objetos/objeto';

export class FuncionarioCadastradoDto extends Objeto<FuncionarioCadastradoDto> {
  id: number;
  nome: string;

  constructor(funcionario: Funcionario) {
    const { id, nome } = funcionario;
    super({
      id,
      nome,
    });
  }
}
