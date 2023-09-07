import { EmpresaFuncionario } from '@/empresas/domain/entities/empresa.funcionario.entity';
import { EntidadeRastreavel } from '@/shared/objetos/classes/entidades/entidade.rastreavel';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('funcionarios')
export class Funcionario extends EntidadeRastreavel<Funcionario> {
  @Column()
  nome: string;

  @OneToMany(() => EmpresaFuncionario, (ef) => ef.funcionario)
  empresasFuncionarios?: EmpresaFuncionario[];
}
