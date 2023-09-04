import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmpresaUsuario } from '../entities/empresa.usuario.entity';
import { Empresa } from '../entities/empresa.entity';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { PerfilEnum } from '../enums/perfil.enum';

@Injectable()
export class EmpresasUsuariosService {
  constructor(private dataSource: DataSource) {}

  async cadastra(
    empresa: Empresa,
    usuarioLogado: Usuario,
  ): Promise<EmpresaUsuario> {
    const empresaUsuario = new EmpresaUsuario({
      perfil: PerfilEnum.ADMINISTRADOR,
      empresa,
      usuario: usuarioLogado,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(empresa);
      await queryRunner.manager.save(empresaUsuario);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return empresaUsuario;
  }
}
