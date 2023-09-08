import { ManyToOne } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EntidadeNotificavel } from './entidade.notificavel';

export class EntidadeRastreavel<T> extends EntidadeNotificavel<T> {
  @ManyToOne(() => Usuario)
  usuarioCriacao?: Usuario;
  @ManyToOne(() => Usuario)
  usuarioAtualizacao?: Usuario;
  @ManyToOne(() => Usuario)
  usuarioDelecao?: Usuario;
}
