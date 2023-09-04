import { Column, Entity, ManyToOne } from 'typeorm';
import { Empresa } from './empresa.entity';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { Entidade } from '@/shared/objetos/classes/entidades/entidade';

@Entity('empresas_usuarios')
export class EmpresaUsuario extends Entidade<EmpresaUsuario> {
  @Column()
  perfil: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.empresasUsuarios)
  public empresa: Empresa;
  @ManyToOne(() => Usuario)
  public usuario: Usuario;
}
