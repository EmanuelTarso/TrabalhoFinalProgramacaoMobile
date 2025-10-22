import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import ReceitaService from "../services/receitaService";

export default function ReceitaDetailView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    const r = ReceitaService.getAll().find((r) => r.id === id);
    if (!r) {
      Alert.alert("Erro", "Receita não encontrada!");
      router.back();
    } else {
      setReceita(r);
    }
  }, [id]);

  if (!receita) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{receita.nome}</Text>
      <Text style={styles.subtitle}>Ingredientes:</Text>
      {receita.ingredientes.map((i, idx) => (
        <Text key={idx}>• {i}</Text>
      ))}
      <Text style={[styles.subtitle, { marginTop: 10 }]}>Modo de preparo:</Text>
      <Text>{receita.instrucoes}</Text>

      <Pressable style={styles.botao} onPress={() => router.back()}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontWeight: "700", marginBottom: 5 },
  botao: { marginTop: 20, backgroundColor: "#1E90FF", padding: 12, borderRadius: 10, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 16 },
});
