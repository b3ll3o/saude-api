import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

export class UsuarioStub {
  static ID = 1;
  static EMAIL = 'email@email.com';
  static NOME = 'nomeUsuario';
  static PERFIL = 'perfil';
  static EMAIL_2 = 'teste@teste.com';
  static SENHA = 'Senha@123';
  static SENHA_2 = 'Outra@123';

  static novo(
    usuario: Usuario = new Usuario({
      id: null,
      email: this.EMAIL,
      senha: this.SENHA,
      nome: this.NOME,
    }),
  ): Usuario {
    return usuario;
  }

  static cadastrado(
    usuario: Usuario = new Usuario({
      id: 1,
      email: this.EMAIL,
      senha: this.SENHA,
      nome: this.NOME,
    }),
  ): Usuario {
    return usuario;
  }

  static async cadastradoHashSenha(): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(UsuarioStub.SENHA, salt);
    return new Usuario({
      id: 1,
      email: this.EMAIL,
      nome: this.NOME,
      senha: hash,
    });
  }

  static invalido(): Usuario {
    const usuario = this.cadastrado();
    usuario.podeSerCadastrado(this.cadastrado());
    return usuario;
  }
}
