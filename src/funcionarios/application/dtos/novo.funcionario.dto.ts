import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';

export class NovoFuncionarioDto {
  @PreenchimentoObrigatorio()
  nome: string;
  @PreenchimentoObrigatorio()
  empresaId: number;
}
