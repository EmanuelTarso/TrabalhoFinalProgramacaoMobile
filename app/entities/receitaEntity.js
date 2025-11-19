export default class ReceitaEntity {
  constructor(id, nome, ingredientes, modoPreparo, imagem, favorito = false) {
    this.id = id;
    this.nome = nome;
    this.ingredientes = ingredientes;
    this.modoPreparo = modoPreparo;
    this.imagem = imagem;
    this.favorito = favorito;
  }
}
