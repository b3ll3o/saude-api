import { EmpresaUsuario } from '@/empresas/domain/entities/empresa.usuario.entity';
import { EntidadeRastreavel } from '@/shared/objetos/classes/entidades/entidade.rastreavel';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('funcionarios')
export class Funcionario extends EntidadeRastreavel<Funcionario> {
  @ManyToOne(() => EmpresaUsuario)
  empresaUsuario?: EmpresaUsuario;
  @Column()
  nome: string;
}
