import { UsuarioAutenticavelDto } from '@/auth/application/dtos/usuario.autenticavel.dto';

export class UsuarioAutenticavelDtoStub {
  static EMAIL = 'teste@teste.com';
  static SENHA = 'Senha@123';

  static novo(usuario: UsuarioAutenticavelDto = new UsuarioAutenticavelDto({
    email: this.EMAIL,
    senha: this.SENHA,
  })): UsuarioAutenticavelDto {
    return usuario
  }
}
