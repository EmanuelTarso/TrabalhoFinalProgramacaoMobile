import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import ReceitaService from "../services/receitaService";

export default function ReceitaFormView() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [instrucoes, setInstrucoes] = useState("");

  const salvar = () => {
    if (!nome || !ingredientes || !instrucoes) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    ReceitaService.add({
      nome,
      ingredientes: ingredientes.split(",").map((i) => i.trim()),
      instrucoes,
    });

    Alert.alert("Sucesso", "Receita salva!");
    router.push("/view/receitaListView");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        placeholder="Ingredientes (separados por vírgula)"
        value={ingredientes}
        onChangeText={setIngredientes}
        style={styles.input}
      />
      <TextInput
        placeholder="Modo de preparo"
        value={instrucoes}
        onChangeText={setInstrucoes}
        multiline
        style={[styles.input, { height: 120 }]}
      />

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
  container: { padding: 20, gap: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  botao: { backgroundColor: "#Ffa500", padding: 12, borderRadius: 10, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 16 },
  botaoVoltar: { padding: 12, borderRadius: 10, marginTop: 10, borderWidth: 1, alignItems: "center", backgroundColor: "#964b00", borderColor: "#000"},
});
