export class Erro {
  private _campo: string;
  private _mensagens: string[];

  constructor(campo: string, mensagens: string[]) {
    this._validaCampo(campo);
    this._validaMensagens(mensagens);

    this._campo = campo;
    this._mensagens = mensagens;
  }

  get campo(): string {
    return ''.concat(this._campo);
  }

  get mensagens(): string[] {
    return [...this._mensagens];
  }

  adicionaNovasMensagens(mensagens: string[]): void {
    if (this._mensagensValidas(mensagens)) {
      const novasMensagens = mensagens
        .filter((m) => this._mensagemConteudoValido(m))
        .filter(
          (m) => this._mensagens.filter((mc) => m !== mc)[0] != undefined,
        );
      if (novasMensagens !== undefined) {
        this._mensagens = [...this._mensagens, ...novasMensagens];
      }
    }
  }

  private _validaCampo(campo: string) {
    if (campo === undefined || campo === null || campo === '') {
      throw new Error('Campo inválido.');
    }
  }

  private _validaMensagens(mensagens: string[]) {
    if (this._mensagensInvalidas(mensagens)) {
      throw new Error('Mensagens inválidas.');
    }
    mensagens.forEach((m) => {
      if (this._mensagemConteudoInvalido(m)) {
        throw new Error('Mensagens inválidas.');
      }
    });
  }

  private _mensagensInvalidas(mensagens: string[]): boolean {
    return (
      mensagens === undefined || mensagens === null || mensagens.length === 0
    );
  }

  private _mensagemConteudoInvalido(mensagem: string): boolean {
    return mensagem === undefined || mensagem === null || mensagem === '';
  }

  private _mensagemConteudoValido(mensagem: string): boolean {
    return !this._mensagemConteudoInvalido(mensagem);
  }

  private _mensagensValidas(mensagens: string[]): boolean {
    return !this._mensagensInvalidas(mensagens);
  }
}
