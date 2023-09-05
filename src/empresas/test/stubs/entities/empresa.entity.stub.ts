import { Empresa } from '@/empresas/domain/entities/empresa.entity';

export class EmpresaStub {
  static NOME = 'nomeEmpresa';
  static ID = 1;

  static novo(
    empresa: Empresa = new Empresa({
      id: null,
      nome: this.NOME,
    }),
  ): Empresa {
    return empresa;
  }

  static cadastrado(
    empresa: Empresa = new Empresa({
      id: 1,
      nome: this.NOME,
    }),
  ): Empresa {
    return empresa;
  }

  static invalido(): Empresa {
    const empresa = this.novo()
    empresa.podeSerCadastrada(this.cadastrado())
    return empresa
  }
}
