import { PrimaryGeneratedColumn } from 'typeorm';
import { Objeto } from '../../objeto';

export class Entidade<T> extends Objeto<T> {
  @PrimaryGeneratedColumn()
  id: number;
}
