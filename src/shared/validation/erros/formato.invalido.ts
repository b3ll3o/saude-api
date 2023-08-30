import { IsEmail } from 'class-validator';

export const FORMATO_INVALIDO_MENSAGEM = 'Formato inválido.';
export const FormatoInvalido = () =>
  IsEmail(undefined, { message: FORMATO_INVALIDO_MENSAGEM });
