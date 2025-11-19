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

import Rodape from "../components/rodape";
import TopMenu from "../components/topMenu";

export default function receitaListView() {
  const router = useRouter();

  const [receitas, setReceitas] = useState([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [buscaIngrediente, setBuscaIngrediente] = useState("");
  const [somenteFavoritas, setSomenteFavoritas] = useState(false);

  useEffect(() => {
    async function carregar() {
      const lista = await receitaService.listar();
      setReceitas([...lista]);
    }
    carregar();
  }, []);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const todosIngredientes = useMemo(() => {
    const set = new Set();
    receitas.forEach((r) =>
      r.ingredientes.forEach((i) => set.add(capitalize(i)))
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [receitas]);

  const ingredientesFiltrados = useMemo(() => {
    if (!buscaIngrediente.trim()) return todosIngredientes;
    return todosIngredientes.filter((i) =>
      i.toLowerCase().includes(buscaIngrediente.trim().toLowerCase())
    );
  }, [buscaIngrediente, todosIngredientes]);

  const receitasFiltradas = useMemo(() => {
    let lista = receitas;

    if (somenteFavoritas) {
      lista = lista.filter((r) => r.favorito);
    }

    if (ingredientesSelecionados.length === 0) return lista;

    return lista.filter((r) =>
      ingredientesSelecionados.every((i) =>
        r.ingredientes.some((ing) => capitalize(ing) === i)
      )
    );
  }, [receitas, ingredientesSelecionados, somenteFavoritas]);

  const toggleIngrediente = (item) => {
    setIngredientesSelecionados((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopMenu />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Receitas</Text>

          <TextInput
            placeholder="Buscar ingrediente"
            value={buscaIngrediente}
            onChangeText={setBuscaIngrediente}
            style={styles.input}
          />

          <Pressable
            style={[styles.botao, somenteFavoritas && { backgroundColor: "#c97c00" }]}
            onPress={() => setSomenteFavoritas(!somenteFavoritas)}
          >
            <Text style={styles.botaoTexto}>
              {somenteFavoritas ? "Mostrar Todas" : "Mostrar Favoritas ⭐"}
            </Text>
          </Pressable>

          <View style={styles.filtroWrapper}>
            {ingredientesFiltrados.length > 0 && <Text style={styles.setaEsquerda}>◀</Text>}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtros}
            >
              {ingredientesFiltrados.map((i) => (
                <Pressable
                  key={i}
                  style={[styles.tag, ingredientesSelecionados.includes(i) && styles.tagSelected]}
                  onPress={() => toggleIngrediente(i)}
                >
                  <Text
                    style={[styles.tagText, ingredientesSelecionados.includes(i) && { color: "#fff" }]}
                  >
                    {i}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {ingredientesFiltrados.length > 0 && <Text style={styles.setaDireita}>▶</Text>}
          </View>

          {receitasFiltradas.length === 0 ? (
            <Text style={styles.nenhum}>Nenhuma receita encontrada</Text>
          ) : (
            receitasFiltradas.map((r) => (
              <View key={r.id} style={styles.card}>
                <Pressable
                  onPress={() => {
                    receitaService.favoritar(r.id).then(() => {
                      setReceitas([...receitas]);
                    });
                  }}
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <Text style={{ fontSize: 24 }}>{r.favorito ? "⭐" : "☆"}</Text>
                </Pressable>

                <Pressable
                  onPress={() => router.push(`/view/receitaDetailView?id=${r.id}`)}
                >
                  <Text style={styles.nome}>🍴 {r.nome}</Text>
                  <Text style={styles.ingredientes}>
                    Ingredientes: {r.ingredientes.map((i) => capitalize(i)).join(", ")}
                  </Text>
                  <View style={styles.cardImage} />
                </Pressable>
              </View>
            ))
          )}

          <Pressable style={styles.botao} onPress={() => router.push("/view/receitaFormView")}>
            <Text style={styles.botaoTexto}>Nova Receita</Text>
          </Pressable>

          <Pressable style={styles.botaoVoltar} onPress={() => router.push("/")}>
            <Text style={styles.botaoTexto}>Voltar ao Menu</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Rodape />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff8f0" },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: "#fff" },

  filtroWrapper: { position: "relative", marginVertical: 10 },
  filtros: { paddingHorizontal: 25 },
  setaEsquerda: { position: "absolute", left: 0, top: "50%", transform: [{ translateY: -10 }], fontSize: 18, zIndex: 10 },
  setaDireita: { position: "absolute", right: 0, top: "50%", transform: [{ translateY: -10 }], fontSize: 18, zIndex: 10 },

  tag: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, marginRight: 10, backgroundColor: "#fff" },
  tagSelected: { backgroundColor: "#Ffa500", borderColor: "#Ffa500" },
  tagText: { fontSize: 14 },

  card: { marginBottom: 15, padding: 12, borderRadius: 12, backgroundColor: "#fff", elevation: 3, position: "relative" },
  nome: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  ingredientes: { fontSize: 14, color: "#555" },
  cardImage: { width: "100%", height: 150, marginTop: 10, borderRadius: 8, backgroundColor: "#f0f0f0", borderWidth: 1, borderColor: "#ddd" },

  nenhum: { textAlign: "center", color: "#666", marginTop: 20 },

  botao: { backgroundColor: "#Ffa500", padding: 12, borderRadius: 10, marginTop: 10, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 16 },

  botaoVoltar: { padding: 12, borderRadius: 10, marginTop: 10, borderWidth: 1, alignItems: "center", backgroundColor: "#964b00", borderColor: "#000" },
});
