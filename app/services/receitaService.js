import ReceitaEntity from "../entities/receitaEntity";

let receitas = [
  new ReceitaEntity(1, "Bolo de Cenoura", ["cenoura", "farinha", "açúcar"], "Misture tudo e asse."),
  new ReceitaEntity(2, "Arroz", ["arroz", "água", "sal"], "Cozinhe o arroz até ficar macio."),
  new ReceitaEntity(3, "Omelete Simples", ["ovo", "sal", "pimenta"], "Bata os ovos, tempere e frite."),
  new ReceitaEntity(4, "Salada Rápida", ["alface", "tomate", "azeite", "sal"], "Misture todos os ingredientes e tempere."),
  new ReceitaEntity(5, "Panqueca Doce", ["farinha", "ovo", "leite", "açúcar"], "Misture os ingredientes e frite em frigideira."),
];

export default {
  listar() {
    return Promise.resolve(receitas);
  },

  salvar(receita) {
    if (receita.id) {
      const index = receitas.findIndex(r => r.id === receita.id);
      receitas[index] = receita;
    } else {
      receita.id = Date.now();
      receitas.push(receita);
    }
    return Promise.resolve();
  },

  obterPorId(id) {
    const receita = receitas.find(r => r.id === Number(id));
    return Promise.resolve(receita);
  },
};
