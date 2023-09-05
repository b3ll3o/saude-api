import { UsuarioLogadoDto } from '@/auth/application/dtos/usuario.logado.dto';
import { Usuario } from '../entities/usuario.entity';

export abstract class UsuarioFabrica {
  static fabrica(usuario: UsuarioLogadoDto): Usuario {
    const { id, email } = usuario;
    return new Usuario({
      id,
      email,
    });
  }
}
