import { UsuarioLogadoDto } from '@/auth/application/dtos/usuario.logado.dto';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';

export class UsuarioLogadoDtoStub {
  static get(): UsuarioLogadoDto {
    return new UsuarioLogadoDto({
      id: UsuarioStub.ID,
    });
  }
}
