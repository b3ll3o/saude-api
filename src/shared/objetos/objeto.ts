export class Objeto<T> {
  constructor(objeto: Partial<T>) {
    Object.assign(this, objeto);
  }
}
