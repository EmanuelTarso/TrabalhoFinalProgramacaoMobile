import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ReceitaEntity from "../entities/receitaEntity";
import receitaService from "../services/receitaService";

import Rodape from "../components/rodape";
import TopMenu from "../components/topMenu";

export default function receitaFormView() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // <-- pega ID da URL

  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setmodoPreparo] = useState("");
  const [favorito, setFavorito] = useState(false);

  // Carregar dados se for edição
  useEffect(() => {
    async function carregar() {
      if (!id) return; // formulário de criação

      const receita = await receitaService.buscarPorId(parseInt(id));
      if (!receita) return;

      setNome(receita.nome);
      setIngredientes(receita.ingredientes.join(", "));
      setmodoPreparo(receita.modoPreparo);
      setFavorito(receita.favorito ?? false);
    }

    carregar();
  }, [id]);

  const salvar = async () => {
    if (!nome || !ingredientes || !modoPreparo) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const receita = new ReceitaEntity(
      id ? parseInt(id) : null, // <-- se tiver ID, edita
      nome,
      ingredientes.split(",").map(i => i.trim()),
      modoPreparo,
      favorito
    );

    await receitaService.salvar(receita);

    Alert.alert("Sucesso", id ? "Receita atualizada!" : "Receita salva!");
    router.push("/view/receitaListView");
  };

  return (
    <View style={{ flex: 1 }}>
      <TopMenu />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
          {id ? "✏️ EDITAR RECEITA" : "📝 CADASTRO DA RECEITA"}
        </Text>

        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder="Ingredientes (separados por vírgula)"
          value={ingredientes}
          onChangeText={setIngredientes}
          style={styles.input}
        />

        <TextInput
          placeholder="Modo de preparo"
          value={modoPreparo}
          onChangeText={setmodoPreparo}
          multiline
          style={[styles.input, { height: 120 }]}
        />

        <Pressable style={styles.botao} onPress={salvar}>
          <Text style={styles.botaoTexto}>{id ? "Salvar Alterações" : "Salvar"}</Text>
        </Pressable>

        <Pressable style={styles.botaoVoltar} onPress={() => router.push("/")}>
          <Text style={styles.botaoTexto}>Voltar ao Menu</Text>
        </Pressable>
      </ScrollView>

      <Rodape />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  container: { padding: 20, gap: 10, backgroundColor: "#FFF8F0" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    color: "#000",
    backgroundColor: "#fff",
    elevation: 1,
  },
  botao: {
    backgroundColor: "#Ffa500",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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