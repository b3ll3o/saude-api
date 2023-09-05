import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UsuarioLogado = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { usuarioLogado } = request;

    return data ? usuarioLogado?.[data] : usuarioLogado;
  },
);
