import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ReceitaEntity from "../entities/receitaEntity";
import receitaService from "../services/receitaService";

import Rodape from "../components/rodape";
import TopMenu from "../components/topMenu";

export default function receitaFormView() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setmodoPreparo] = useState("");

  const salvar = async () => {
    if (!nome || !ingredientes || !modoPreparo) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const novaReceita = new ReceitaEntity(
      null,
      nome,
      ingredientes.split(",").map(i => i.trim()),
      modoPreparo,
      null
    );

    await receitaService.salvar(novaReceita);
    Alert.alert("Sucesso", "Receita salva!");
    router.push("/view/receitaListView");
  };

  return (
    <View style={styles.wrapper}>
      <TopMenu />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>📝 CADASTRO DA RECEITA</Text>

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

        <View style={styles.preview} />
        <Text style={styles.previewLabel}>
          (Imagem desativada — usando apenas Expo padrão)
        </Text>

        <Pressable style={styles.botao} onPress={salvar}>
          <Text style={styles.botaoTexto}>Salvar</Text>
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
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },

  container: {
    flexGrow: 1,
    padding: 20,
    gap: 12,
    justifyContent: "flex-start",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    color: "#000",
    elevation: 1,
  },

  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
  },

  previewLabel: {
    textAlign: "center",
    opacity: 0.6,
    fontStyle: "italic",
    color: "#000",
  },

  botao: {
    width: "100%",
    backgroundColor: "#Ffa500",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoVoltar: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#964b00",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
});
