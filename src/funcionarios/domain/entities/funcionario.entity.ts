import { EmpresaFuncionario } from '@/empresas/domain/entities/empresa.funcionario.entity';
import { EntidadeRastreavel } from '@/shared/objetos/classes/entidades/entidade.rastreavel';
import { Erro } from '@/shared/objetos/classes/erro';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('funcionarios')
export class Funcionario extends EntidadeRastreavel<Funcionario> {
  @Column()
  nome: string;

  @OneToMany(() => EmpresaFuncionario, (ef) => ef.funcionario)
  empresasFuncionarios?: EmpresaFuncionario[];

  podeSerCadastrado(funcionarioPodeSerCadastradoNaEmpresa: boolean): boolean {
    if (!funcionarioPodeSerCadastradoNaEmpresa) {
      this._notificacaoErro.adicionaErros([
        new Erro('empresa', ['Nome do funcionário já cadastrado na empresa.']),
      ]);
      return false;
    }
    return true;
  }
}
