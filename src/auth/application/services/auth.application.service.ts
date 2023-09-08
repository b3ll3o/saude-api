import { UsuariosApplicationService } from '@/usuarios/application/services/usuarios.application.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioAutenticavelDto } from '../dtos/usuario.autenticavel.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly _usuarioApplicationService: UsuariosApplicationService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(usuarioAutenticavelDto: UsuarioAutenticavelDto): Promise<any> {
    const usuario = await this._usuarioApplicationService.autentica(
      usuarioAutenticavelDto,
    );
    if (!usuario) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      id: usuario.id,
      nome: usuario.nome,
    };
    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
