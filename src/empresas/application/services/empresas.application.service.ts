import { EmpresasService } from '@/empresas/domain/services/empresas.service';
import { Injectable } from '@nestjs/common';
import { NovaEmpresaDto } from '../dtos/nova.empresa.dto';
import { EmpresaCadastradaDto } from '../dtos/empresa.cadastrada.dto';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';

@Injectable()
export class EmpresasApplicationService {
  constructor(private readonly empresasService: EmpresasService) {}

  async cadastra(
    novaEmpresaDto: NovaEmpresaDto,
    usuarioLogado,
  ): Promise<EmpresaCadastradaDto> {
    const { nome } = novaEmpresaDto;
    const empresa = await this.empresasService.cadastra(
      new Empresa({
        nome,
      }),
      usuarioLogado,
    );
    return new EmpresaCadastradaDto(empresa);
  }
}
