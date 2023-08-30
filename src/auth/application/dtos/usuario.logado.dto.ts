import { Objeto } from '@/shared/objetos/objeto';

export class UsuarioLogadoDto extends Objeto<UsuarioLogadoDto> {
  sub: number;
  email: string;
  id: number;
}
