import { Objeto } from '@/shared/objetos/objeto';
import { FormatoInvalido } from '@/shared/validation/erros/formato.invalido';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';

export class UsuarioAutenticavelDto extends Objeto<UsuarioAutenticavelDto> {
  @PreenchimentoObrigatorio()
  @FormatoInvalido()
  email: string;
  @PreenchimentoObrigatorio()
  senha: string;
}
