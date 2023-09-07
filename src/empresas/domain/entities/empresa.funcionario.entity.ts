import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { EntidadeRastreavel } from '@/shared/objetos/classes/entidades/entidade.rastreavel';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Empresa } from './empresa.entity';

@Entity('empresas_funcionarios')
export class EmpresaFuncionario extends EntidadeRastreavel<EmpresaFuncionario> {
  @Column()
  cargo: string;

  @ManyToOne(() => Funcionario, (f) => f.empresasFuncionarios)
  public funcionario: Funcionario;
  @ManyToOne(() => Empresa, (e) => e.empresasFuncionarios)
  public empresa: Empresa;
}
