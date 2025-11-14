import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ReceitaEntity from "../entities/receitaEntity";
import receitaService from "../services/receitaService";

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
      null // sem imagem
    );

    await receitaService.salvar(novaReceita);
    Alert.alert("Sucesso", "Receita salva!");
    router.push("/view/receitaListView");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>CADASTRO</Text>

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

      {/* Espaço reservado */}
      <View style={styles.preview} />
      <Text style={{ textAlign: "center", opacity: 0.6, marginBottom: 10 }}>
        (Imagem desativada — usando apenas Expo padrão)
      </Text>

      <Pressable style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </Pressable>

      <Pressable style={styles.botaoVoltar} onPress={() => router.push("/")}>
        <Text style={styles.botaoTexto}>Voltar ao Menu</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  container: { padding: 20, gap: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },

  preview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  botao: {
    backgroundColor: "#Ffa500",
    padding: 12,
    borderRadius: 10,
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
