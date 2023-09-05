import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from '../entities/funcionario.entity';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionariosRepository: Repository<Funcionario>,
  ) {}

  async cadastra(
    novoFuncionario: Funcionario,
    usuarioLogado: Usuario,
  ): Promise<Funcionario> {
    novoFuncionario.usuarioCriacao = usuarioLogado;
    return this.funcionariosRepository.save(novoFuncionario);
  }
}
