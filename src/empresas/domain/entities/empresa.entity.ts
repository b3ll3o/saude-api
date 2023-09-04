import { EntidadeNotificavel } from '@/shared/objetos/classes/entidades/entidade.notificavel';
import { Column, Entity, OneToMany } from 'typeorm';
import { EmpresaUsuario } from './empresa.usuario.entity';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';

@Entity('empresas')
export class Empresa extends EntidadeNotificavel<Empresa> {
  @Column()
  nome: string;
  @OneToMany(() => EmpresaUsuario, (empresaUsuario) => empresaUsuario.empresa)
  empresasUsuarios?: EmpresaUsuario[];

  podeSerCadastrada(empresa: Empresa) {
    if (!empresa) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
    return false;
  }
}
