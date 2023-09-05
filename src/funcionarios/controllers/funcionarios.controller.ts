import { Body, Controller, Post } from '@nestjs/common';
import { FuncionariosApplicationService } from '../application/services/funcionarios.application.service';
import { NovoFuncionarioDto } from '../application/dtos/novo.funcionario.dto';
import { FuncionarioCadastradoDto } from '../application/dtos/funcionario.cadastrado.dto';
import { UsuarioLogado } from '@/auth/application/decorators/usuario.logado.decorator';

@Controller('funcionarios')
export class FuncioariosController {
  constructor(private readonly service: FuncionariosApplicationService) {}

  @Post()
  async cadastra(
    @Body() novoFuncionarioDto: NovoFuncionarioDto,
    @UsuarioLogado() usuarioLogado,
  ): Promise<FuncionarioCadastradoDto> {
    return this.service.cadastra(novoFuncionarioDto, usuarioLogado);
  }
}
