import ReceitaEntity from "../entities/receitaEntity";

let receitas = [
  new ReceitaEntity(1, "Bolo de Cenoura", ["cenoura", "farinha", "açúcar", "oléo", "ovo", "fermento"], "Bata a cenoura descascada com os ovos, açúcar e oléo, ate ficar homogênea. Em seguida, misture com a farinha e por último acrescente o fermento. Disponha em uma assadeira previamente untadada e asse por 40 min à 180°."),
  new ReceitaEntity(2, "Arroz", ["arroz", "água", "sal", "cebola", "alho"], "Refogue a cebola e o alho ate ficarem transparente. Após isso colocar o arroz, o sal e completar com água, assim que secar, prove o arroz e veja se precisa de mais sal e/ou cozinhar mais."),
  new ReceitaEntity(3, "Omelete Simples", ["ovo", "sal", "pimenta"], "Bata os ovos, tempere e frite."),
  new ReceitaEntity(4, "Salada Rápida", ["alface", "tomate", "rucúla", "azeite", "sal", "limão", "pimenta"], "Pique o tomate, rasgue as folhas em pedaços. Misture o azeite, limão, sal e pimenta. Misture todos os ingredientes e regue o molho por cima."),
  new ReceitaEntity(5, "Carbonara", ["ovo", "bacon", "parmesão", "macarrão", "sal", "pimenta"], "Pique o bacon, separe as claras das gemas e rale o parmesão. Frite o bacon e reserve, em uma tigela misture as gemas e o queijo ralado. Cozinhe o macarrão em uma panela a parte com água fervente, retire quando estiver al dente. Na panela que fez o bacon, coloque o macarrão com um pouco da água, a mistura de gemas. Misture delicadamente para encorporar os ingredientes. Por fim, coloque o bacon frito e sirva.")
  new ReceitaEntity(6, "Panqueca Doce", ["farinha", "ovo", "leite", "açúcar", "fermento"], "Bata todos os ingredientes em um liquidificador e frite em uma frigideira quente. Sirva com uma calda doce ou sorvete."),
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

