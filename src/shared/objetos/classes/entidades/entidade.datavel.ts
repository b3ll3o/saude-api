import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Entidade } from './entidade';

export class EntidadeDatavel<T> extends Entidade<T> {
  @CreateDateColumn()
  dataCriacao: Date;
  @UpdateDateColumn()
  dataAtualizacao: Date;
  @DeleteDateColumn()
  dataDelecao: Date;
}
