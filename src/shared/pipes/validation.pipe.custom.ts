import { ValidationPipe } from '@nestjs/common';
import { Erro } from '../objetos/classes/erro';
import { BadRequestCustomException } from '../exceptions/bad.request.custom.exception';

export class ValidationPipeCustom extends ValidationPipe {
  constructor() {
    super({
      skipUndefinedProperties: false,
      skipNullProperties: false,
      skipMissingProperties: false,
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory(errors) {
        throw new BadRequestCustomException(
          errors.map((e) => new Erro(e.property, Object.values(e.constraints))),
        );
      },
    });
  }
}
