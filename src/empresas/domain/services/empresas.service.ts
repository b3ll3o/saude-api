import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from '../entities/empresa.entity';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { CargoEnum } from '../enums/cargo.enum';
import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { EmpresasFuncionariosService } from './empresas.funcionarios.service';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepository: Repository<Empresa>,
    private readonly empresasFuncionariosService: EmpresasFuncionariosService,
  ) {}

  async cadastra(
    novaEmpresa: Empresa,
    usuarioLogado: Usuario,
  ): Promise<Empresa> {
    const empresaCadastrada = await this._buscaPorNome(novaEmpresa.nome);
    if (!novaEmpresa.podeSerCadastrada(empresaCadastrada)) {
      return novaEmpresa;
    }
    const empresa = await this._cadastraNovaEmpresa(novaEmpresa, usuarioLogado);
    return empresa;
  }

  async podeSerCadastrado(
    empresaId: number,
    funcionario: Funcionario,
  ): Promise<boolean> {
    const empresa = await this._buscaPorId(empresaId);
    if (!empresa.podeCadastrarFuncionario(funcionario)) {
      return false;
    }
    return true;
  }

  private async _buscaPorId(id: number): Promise<Empresa> {
    return this.empresasRepository.findOne({ where: { id } });
  }

  private async _buscaPorNome(nome: string): Promise<null | Empresa> {
    return this.empresasRepository.findOne({ where: { nome } });
  }

  private async _cadastraNovaEmpresa(
    novaEmpresa: Empresa,
    usuarioLogado: Usuario,
  ): Promise<Empresa> {
    const empresaUsuario = await this.empresasFuncionariosService.cadastra({
      empresa: novaEmpresa,
      funcionario: new Funcionario({ nome: usuarioLogado.email }),
      cargo: CargoEnum.ADMINISTRADOR,
    });
    return empresaUsuario.empresa;
  }
}
