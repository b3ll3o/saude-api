import { IsNotEmpty } from 'class-validator';

export const PREENCHIMENTO_OBRIGATORIO_MENSAGEM = 'Preenchimento obrigatório.';
export const PreenchimentoObrigatorio = () =>
  IsNotEmpty({ message: PREENCHIMENTO_OBRIGATORIO_MENSAGEM });
