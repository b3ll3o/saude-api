import { Objeto } from '@/shared/objetos/objeto';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

export class UsuarioCadastradoDto extends Objeto<UsuarioCadastradoDto> {
  id: number;
  email: string;
  nome: string;

  constructor(usuario: Partial<Usuario>) {
    const { id, email, nome } = usuario;
    super({ id, email, nome });
  }
}
