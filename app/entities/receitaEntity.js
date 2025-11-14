export default class ReceitaEntity {
  constructor(id, nome, ingredientes, modoPreparo, imagem) {
    this.id = id;
    this.nome = nome;
    this.ingredientes = ingredientes;
    this.modoPreparo = modoPreparo;
    this.imagem = imagem;
  }
}
