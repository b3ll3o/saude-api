import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmpresaFuncionario } from '../entities/empresa.funcionario.entity';
import { Empresa } from '../entities/empresa.entity';

@Injectable()
export class EmpresasFuncionariosService {
  constructor(private readonly dataSource: DataSource) {}

  async cadastra({
    funcionario = undefined,
    empresaId = undefined,
    cargo = undefined,
    empresa = undefined,
  }: {
    funcionario?: Funcionario;
    empresaId?: number;
    cargo?: string;
    empresa?: Empresa;
  }): Promise<EmpresaFuncionario> {
    const empresaFuncionario = await this._getEmpresaFuncionario({
      funcionario,
      empresaId,
      cargo,
      empresa,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(funcionario);
      await queryRunner.manager.save(empresaFuncionario);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
    }
    return empresaFuncionario;
  }

  private async _getEmpresaFuncionario({
    empresa,
    empresaId,
    cargo,
    funcionario,
  }: {
    empresa: Empresa;
    empresaId: number;
    cargo: string;
    funcionario: Funcionario;
  }): Promise<EmpresaFuncionario> {
    const entityManager = this.dataSource.createEntityManager();
    if (empresaId) {
      const empresaCadastrada = await entityManager.findOne(Empresa, {
        where: { id: empresaId },
      });
      return new EmpresaFuncionario({
        cargo,
        funcionario,
        empresa: empresaCadastrada,
      });
    } else {
      return new EmpresaFuncionario({
        cargo,
        funcionario,
        empresa,
      });
    }
  }
}
