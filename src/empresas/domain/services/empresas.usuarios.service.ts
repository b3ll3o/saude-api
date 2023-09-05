import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmpresaUsuario } from '../entities/empresa.usuario.entity';
import { Empresa } from '../entities/empresa.entity';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

@Injectable()
export class EmpresasUsuariosService {
  constructor(private dataSource: DataSource) {}

  async cadastra(
    empresa: Empresa,
    usuarioLogado: Usuario,
    perfil: string,
  ): Promise<EmpresaUsuario> {
    const empresaUsuario = new EmpresaUsuario({
      perfil,
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
      console.log(err)
    } finally {
      await queryRunner.release();
    }
    return empresaUsuario;
  }
}
