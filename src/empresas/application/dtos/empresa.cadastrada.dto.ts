import { Empresa } from '@/empresas/domain/entities/empresa.entity';
import { Objeto } from '@/shared/objetos/objeto';

export class EmpresaCadastradaDto extends Objeto<EmpresaCadastradaDto> {
  id: number;
  nome: string;

  constructor(empresa: Empresa){
    const {id, nome} = empresa
    super({
      id, nome
    })
  }
}
