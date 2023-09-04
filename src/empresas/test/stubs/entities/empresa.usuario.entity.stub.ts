import { EmpresaUsuario } from '@/empresas/domain/entities/empresa.usuario.entity';
import { EmpresaStub } from './empresa.entity.stub';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { PerfilEnum } from '@/empresas/domain/enums/perfil.enum';

export class EmpresaUsuarioStub {
  static NOME = 'nomeEmpresa';
  static ID = 1;

  static administrador(
    empresaUsuario: EmpresaUsuario = new EmpresaUsuario({
      id: this.ID,
      empresa: EmpresaStub.cadastrado(),
      usuario: UsuarioStub.cadastrado(),
      perfil: PerfilEnum.ADMINISTRADOR,
    }),
  ): EmpresaUsuario {
    return empresaUsuario;
  }
}
