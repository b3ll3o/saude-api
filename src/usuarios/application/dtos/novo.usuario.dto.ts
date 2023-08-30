import { Objeto } from '@/shared/objetos/objeto';
import { FormatoInvalido } from '@/shared/validation/erros/formato.invalido';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';

export class NovoUsuarioDto extends Objeto<NovoUsuarioDto> {
  @PreenchimentoObrigatorio()
  @FormatoInvalido()
  email: string;
  @PreenchimentoObrigatorio()
  senha: string;
}
