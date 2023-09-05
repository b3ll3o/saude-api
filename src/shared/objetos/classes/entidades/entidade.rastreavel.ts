import { JoinColumn, OneToOne } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EntidadeNotificavel } from './entidade.notificavel';

export class EntidadeRastreavel<T> extends EntidadeNotificavel<T> {
  @OneToOne(() => Usuario)
  @JoinColumn()
  usuarioCriacao?: Usuario;
  @OneToOne(() => Usuario)
  @JoinColumn()
  usuarioAtualizacao?: Usuario;
  @OneToOne(() => Usuario)
  @JoinColumn()
  usuarioDelecao?: Usuario;
}
