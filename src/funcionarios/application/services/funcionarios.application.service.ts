import { FuncionariosService } from '@/funcionarios/domain/services/funcionarios.service';
import { Injectable } from '@nestjs/common';
import { NovoFuncionarioDto } from '../dtos/novo.funcionario.dto';
import { FuncionarioCadastradoDto } from '../dtos/funcionario.cadastrado.dto';
import { Funcionario } from '@/funcionarios/domain/entities/funcionario.entity';
import { BadRequestCustomException } from '@/shared/exceptions/bad.request.custom.exception';
import { UsuarioLogadoDto } from '@/auth/application/dtos/usuario.logado.dto';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

@Injectable()
export class FuncionariosApplicationService {
  constructor(private readonly service: FuncionariosService) {}

  async cadastra(
    novoFuncionarioDto: NovoFuncionarioDto,
    usuarioLogado: UsuarioLogadoDto,
  ): Promise<FuncionarioCadastradoDto> {
    const { nome } = novoFuncionarioDto;
    const funcionario = await this.service.cadastra(
      new Funcionario({ nome }),
      new Usuario(usuarioLogado),
    );
    if (funcionario.invalido()) {
      throw new BadRequestCustomException(funcionario.erros);
    }
    return new FuncionarioCadastradoDto(funcionario);
  }
}
