import ReceitaEntity from "../entities/receitaEntity";

let receitas = [
  new ReceitaEntity(1, "Bolo de Cenoura", ["cenoura", "farinha", "açúcar", "óleo", "ovo", "fermento"], 
    "Bata a cenoura descascada com os ovos, açúcar e óleo até ficar homogênea. Em seguida, misture com a farinha e por último acrescente o fermento. Disponha em uma assadeira previamente untada e asse por 40 min à 180°.",
    null
  ),
  new ReceitaEntity(2, "Arroz", ["arroz", "água", "sal", "cebola", "alho"],
    "Refogue a cebola e o alho até ficarem transparentes. Após isso coloque o arroz, o sal e complete com água. Assim que secar, prove o arroz e veja se precisa cozinhar mais.",
    null
  ),
  new ReceitaEntity(3, "Omelete Simples", ["ovo", "sal", "pimenta"],
    "Bata os ovos, tempere e frite.",
    null
  ),
  new ReceitaEntity(4, "Salada Rápida", ["alface", "tomate", "rúcula", "azeite", "sal", "limão", "pimenta"],
    "Pique o tomate, rasgue as folhas em pedaços. Misture o azeite, limão, sal e pimenta. Misture todos os ingredientes e regue o molho por cima.",
    null
  ),
  new ReceitaEntity(5, "Carbonara", ["ovo", "bacon", "parmesão", "macarrão", "sal", "pimenta"],
    "Pique o bacon, separe as gemas das claras e rale o parmesão. Frite o bacon e reserve. Misture as gemas e o queijo ralado. Cozinhe o macarrão al dente, junte tudo e finalize com o bacon.",
    null
  ),
  new ReceitaEntity(6, "Panqueca Doce", ["farinha", "ovo", "leite", "açúcar", "fermento"],
    "Bata todos os ingredientes em um liquidificador e frite em uma frigideira quente. Sirva com calda ou sorvete.",
    null
  ),
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
