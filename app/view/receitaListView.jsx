import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import receitaService from "../services/receitaService";

export default function receitaListView() {
  const router = useRouter();
  const [receitas, setReceitas] = useState([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [buscaIngrediente, setBuscaIngrediente] = useState("");

  useEffect(() => {
    async function carregar() {
      const lista = await receitaService.listar();
      setReceitas(lista);
    }
    carregar();
  }, []);

  const todosIngredientes = useMemo(() => {
    const set = new Set();
    receitas.forEach((r) => r.ingredientes.forEach((i) => set.add(i)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [receitas]);

  const ingredientesFiltrados = useMemo(() => {
    if (!buscaIngrediente.trim()) return todosIngredientes;
    return todosIngredientes.filter((i) =>
      i.toLowerCase().includes(buscaIngrediente.trim().toLowerCase())
    );
  }, [buscaIngrediente, todosIngredientes]);

  const receitasFiltradas = useMemo(() => {
    if (ingredientesSelecionados.length === 0) return receitas;
    return receitas.filter((r) =>
      ingredientesSelecionados.every((i) => r.ingredientes.includes(i))
    );
  }, [receitas, ingredientesSelecionados]);

  const toggleIngrediente = (item) => {
    setIngredientesSelecionados((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Receitas</Text>

      <TextInput
        placeholder="Buscar ingrediente"
        value={buscaIngrediente}
        onChangeText={setBuscaIngrediente}
        style={styles.input}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
      >
        {ingredientesFiltrados.map((i) => (
          <Pressable
            key={i}
            style={styles.checkboxContainer}
            onPress={() => toggleIngrediente(i)}
          >
            <View
              style={[
                styles.checkbox,
                ingredientesSelecionados.includes(i) && styles.checkboxChecked,
              ]}
            />
            <Text>{i}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {receitasFiltradas.length === 0 ? (
        <Text style={styles.nenhum}>Nenhuma receita encontrada</Text>
      ) : (
        receitasFiltradas.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => router.push(`/view/receitaDetailView?id=${r.id}`)}
            style={styles.card}
          >
            <Text style={styles.nome}>{r.nome}</Text>

            <Text style={styles.ingredientes}>
              Ingredientes: {r.ingredientes.join(", ")}
            </Text>

            {/* Espaço reservado */}
            <View style={styles.cardImage} />
          </Pressable>
        ))
      )}

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/view/receitaFormView")}
      >
        <Text style={styles.botaoTexto}>Nova Receita</Text>
      </Pressable>

      <Pressable
        style={styles.botaoVoltar}
        onPress={() => router.push("/")}
      >
        <Text style={styles.botaoTexto}>Voltar ao Menu</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filtros: { marginVertical: 10 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    gap: 5,
  },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#000" },
  checkboxChecked: { backgroundColor: "#Ffa500" },

  card: {
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  nome: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  ingredientes: { fontSize: 14, color: "#555" },

  cardImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  nenhum: { textAlign: "center", color: "#666", marginTop: 20 },
  botao: {
    backgroundColor: "#Ffa500",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "#fff", fontSize: 16 },
  botaoVoltar: {
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#964b00",
    borderColor: "#000",
  },
});
