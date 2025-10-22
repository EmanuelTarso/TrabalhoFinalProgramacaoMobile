const mem = [
  { id: "r1", nome: "Omelete Simples", ingredientes: ["ovo", "sal", "pimenta"], instrucoes: "Bater ovos, temperar e fritar." },
  { id: "r2", nome: "Salada Rápida", ingredientes: ["alface", "tomate", "azeite", "sal"], instrucoes: "Misturar e temperar." },
  { id: "r3", nome: "Panqueca Doce", ingredientes: ["farinha", "ovo", "leite", "acucar"], instrucoes: "Misturar e fritar em frigideira." },
];

export default {
  getAll: () => mem,
  add: (nova) => {
    const id = `r${mem.length + 1}`;
    mem.push({ id, ...nova });
  },
};
