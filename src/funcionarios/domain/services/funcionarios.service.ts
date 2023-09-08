import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from '../entities/funcionario.entity';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EmpresasService } from '@/empresas/domain/services/empresas.service';
import { EmpresaFuncionario } from '@/empresas/domain/entities/empresa.funcionario.entity';
import { CargoEnum } from '@/empresas/domain/enums/cargo.enum';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionariosRepository: Repository<Funcionario>,
    private readonly empresasService: EmpresasService,
  ) {}

  async cadastra(
    novoFuncionario: Funcionario,
    usuarioLogado: Usuario,
    empresaId: number,
  ): Promise<Funcionario> {
    const funcionarioPodeSerCadastradoNaEmpresa =
      await this.empresasService.podeSerCadastrado(empresaId, novoFuncionario);
    if (
      !novoFuncionario.podeSerCadastrado(funcionarioPodeSerCadastradoNaEmpresa)
    ) {
      return novoFuncionario;
    }
    return this._cadastraNovoFuncionario(
      novoFuncionario,
      usuarioLogado,
      empresaId,
    );
  }

  private async _cadastraNovoFuncionario(
    funcionario: Funcionario,
    usuarioLogado: Usuario,
    empresaId: number,
  ) {
    funcionario.usuarioCriacao = usuarioLogado;
    funcionario.empresasFuncionarios.push(
      new EmpresaFuncionario({
        cargo: CargoEnum.OPERADOR,
        funcionario,
        empresa: new Empresa({ id: empresaId }),
        usuarioCriacao: usuarioLogado,
      }),
    );
    return this.funcionariosRepository.save(funcionario);
  }
}
