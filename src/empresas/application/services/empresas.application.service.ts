import { EmpresasService } from '@/empresas/domain/services/empresas.service';
import { Injectable } from '@nestjs/common';
import { NovaEmpresaDto } from '../dtos/nova.empresa.dto';
import { EmpresaCadastradaDto } from '../dtos/empresa.cadastrada.dto';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';
import { BadRequestCustomException } from '@/shared/exceptions/bad.request.custom.exception';
import { UsuarioLogadoDto } from '@/auth/application/dtos/usuario.logado.dto';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

@Injectable()
export class EmpresasApplicationService {
  constructor(private readonly empresasService: EmpresasService) {}

  async cadastra(
    novaEmpresaDto: NovaEmpresaDto,
    usuarioLogado: UsuarioLogadoDto,
  ): Promise<EmpresaCadastradaDto> {
    const { nome } = novaEmpresaDto;
    const empresa = await this.empresasService.cadastra(
      new Empresa({
        nome,
      }),
      new Usuario(usuarioLogado),
    );
    if (empresa.invalido()) {
      throw new BadRequestCustomException(empresa.erros);
    }
    return new EmpresaCadastradaDto(empresa);
  }
}
