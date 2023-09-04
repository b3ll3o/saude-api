import { Objeto } from '@/shared/objetos/objeto';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';

export class NovaEmpresaDto extends Objeto<NovaEmpresaDto> {
  @PreenchimentoObrigatorio()
  nome: string;
}
