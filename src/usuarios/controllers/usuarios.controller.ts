import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosApplicationService } from '../application/services/usuarios.application.service';
import { NovoUsuarioDto } from '../application/dtos/novo.usuario.dto';
import { UsuarioCadastradoDto } from '../application/dtos/usuario.cadastrado.dto';
import { Public } from '@/auth/application/guards/public.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationService,
  ) {}

  @Public()
  @Post()
  async cadastra(
    @Body() novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    return this.usuariosApplicationService.cadastra(novoUsuarioDto);
  }
}
