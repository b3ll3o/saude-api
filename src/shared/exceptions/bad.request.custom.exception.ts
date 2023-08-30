import { BadRequestException } from '@nestjs/common';
import { Erro } from '../objetos/classes/erro';
import { ErroDto } from '../objetos/classes/dtos/erro.dto';

export class BadRequestCustomException extends BadRequestException {
  constructor(erros: Erro[]) {
    super({ erros: [...erros.map((e) => new ErroDto(e))] });
  }
}
