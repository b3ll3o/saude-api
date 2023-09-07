import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from '../entities/funcionario.entity';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { EmpresasService } from '@/empresas/domain/services/empresas.service';

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
    this.empresasService.podeSerCadastrado(empresaId, novoFuncionario);
    novoFuncionario.usuarioCriacao = usuarioLogado;
    return this.funcionariosRepository.save(novoFuncionario);
  }
}
