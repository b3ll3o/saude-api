import { NovoUsuarioDto } from '@/usuarios/application/dtos/novo.usuario.dto';
import { UsuarioStub } from '../entities/usuario.entity.stub';

export class NovoUsuarioDtoStub {
  static novo(): NovoUsuarioDto {
    return new NovoUsuarioDto({
      email: UsuarioStub.EMAIL,
      nome: UsuarioStub.NOME,
      senha: UsuarioStub.SENHA,
    });
  }
}
