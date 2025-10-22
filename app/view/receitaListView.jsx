import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ReceitaService from "../services/receitaService";

export default function ReceitaListView() {
  const router = useRouter();
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

  const receitas = ReceitaService.getAll();

  const todosIngredientes = useMemo(() => {
    const set = new Set();
    receitas.forEach((r) => r.ingredientes.forEach((i) => set.add(i)));
    return Array.from(set);
  }, [receitas]);

  const receitasFiltradas = useMemo(() => {
    if (ingredientesSelecionados.length === 0) return receitas;
    return receitas.filter((r) =>
      ingredientesSelecionados.every((i) => r.ingredientes.includes(i))
    );
  }, [receitas, ingredientesSelecionados]);

  const toggleIngrediente = (item) => {
    setIngredientesSelecionados((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Receitas</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
        {todosIngredientes.map((i) => (
          <Pressable key={i} style={styles.checkboxContainer} onPress={() => toggleIngrediente(i)}>
            <View style={[styles.checkbox, ingredientesSelecionados.includes(i) && styles.checkboxChecked]} />
            <Text>{i}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={{ flex: 1 }}>
        {receitasFiltradas.map((r) => (
          <Pressable key={r.id} style={styles.card} onPress={() => router.push(`/view/receitaDetailView?id=${r.id}`)}>
            <Text style={styles.cardTitle}>{r.nome}</Text>
            <Text>Ingredientes: {r.ingredientes.join(", ")}</Text>
            <Text style={{ marginTop: 5 }}>
              Modo de preparo: {r.instrucoes.substring(0, 50)}...
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable style={styles.botao} onPress={() => router.push("/view/receitaFormView")}>
        <Text style={styles.botaoTexto}>Nova Receita</Text>
      </Pressable>

      <Pressable style={styles.botaoVoltar} onPress={() => router.push("/")}>
        <Text style={styles.botaoTexto}>Voltar ao Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  filtros: { marginVertical: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginRight: 10, gap: 5 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#000" },
  checkboxChecked: { backgroundColor: "#1E90FF" },
  card: { marginBottom: 15, padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 5 },
  botao: { backgroundColor: "#1E90FF", padding: 12, borderRadius: 10, marginTop: 10, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 16 },
  botaoVoltar: { padding: 12, borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: "#1E90FF", alignItems: "center" },
});
