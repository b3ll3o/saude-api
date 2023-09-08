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
    if (empresaId) {
      return this._cadastraNovoFuncionario({
        funcionario,
        empresaId,
        cargo,
      });
    } else {
      return this._cadastradaNovaEmpresa({
        funcionario,
        empresa,
        cargo,
      });
    }
  }

  private async _cadastradaNovaEmpresa({
    funcionario = undefined,
    cargo = undefined,
    empresa = undefined,
  }: {
    funcionario?: Funcionario;
    cargo?: string;
    empresa?: Empresa;
  }): Promise<EmpresaFuncionario> {
    const empresaFuncionario = new EmpresaFuncionario({
      cargo,
      funcionario,
      empresa,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(empresa);
      await queryRunner.manager.save(funcionario);
      await queryRunner.manager.save(empresaFuncionario);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return empresaFuncionario;
  }

  private async _cadastraNovoFuncionario({
    funcionario = undefined,
    empresaId = undefined,
    cargo = undefined,
  }: {
    funcionario?: Funcionario;
    empresaId?: number;
    cargo?: string;
  }): Promise<EmpresaFuncionario> {
    const empresaCadastrada = await this.dataSource.manager.findOne(Empresa, {
      where: { id: empresaId },
    });
    const empresaFuncionario = new EmpresaFuncionario({
      cargo,
      funcionario,
      empresa: empresaCadastrada,
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
    } finally {
      await queryRunner.release();
    }
    return empresaFuncionario;
  }
}
