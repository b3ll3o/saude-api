import { Column, Entity, OneToMany } from 'typeorm';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';
import { EmpresaFuncionario } from './empresa.funcionario.entity';
import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { EntidadeRastreavel } from '@/shared/objetos/classes/entidades/entidade.rastreavel';

@Entity('empresas')
export class Empresa extends EntidadeRastreavel<Empresa> {
  @Column()
  nome: string;

  @OneToMany(() => EmpresaFuncionario, (ef) => ef.empresa)
  empresasFuncionarios?: EmpresaFuncionario[];

  podeSerCadastrada(empresa: Empresa) {
    if (!empresa) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
    return false;
  }

  podeCadastrarFuncionario(funcionario: Funcionario) {
    const funcionarioCadastrado =
      this.empresasFuncionarios
        .map((ef) => ef.funcionario.nome)
        .filter((n) => n === funcionario.nome).length > 0;
    if (funcionarioCadastrado) {
      this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
      return false;
    }
    return true;
  }
}
