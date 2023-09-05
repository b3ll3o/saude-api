import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from '../entities/empresa.entity';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EmpresasUsuariosService } from './empresas.usuarios.service';
import { PerfilEnum } from '../enums/perfil.enum';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepository: Repository<Empresa>,
    private readonly empresasUsuariosService: EmpresasUsuariosService,
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

  private async _buscaPorNome(nome: string): Promise<null | Empresa> {
    return this.empresasRepository.findOne({ where: { nome } });
  }

  private async _cadastraNovaEmpresa(
    novaEmpresa: Empresa,
    usuarioLogado: Usuario,
  ): Promise<Empresa> {
    const empresaUsuario = await this.empresasUsuariosService.cadastra(
      novaEmpresa,
      usuarioLogado,
      PerfilEnum.ADMINISTRADOR,
    );
    return empresaUsuario.empresa;
  }
}
