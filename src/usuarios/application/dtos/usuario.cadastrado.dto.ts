import { Objeto } from '@/shared/objetos/objeto';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

export class UsuarioCadastradoDto extends Objeto<UsuarioCadastradoDto> {
  id: number;
  email: string;

  constructor(usuario: Usuario) {
    const { id, email } = usuario;
    super({ id, email });
  }
}
