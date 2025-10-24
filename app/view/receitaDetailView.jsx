import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import Box from "../components/box";
import receitaService from "../services/receitaService";

export default function receitaDetailView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    receitaService.obterPorId(id).then((r) => {
      if (!r) {
        Alert.alert("Erro", "Receita não encontrada!");
        router.back();
      } else {
        setReceita(r);
      }
    });
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
      <Text>{receita.modoPreparo}</Text>

      <Box title="Dica">
        <Text>Use ingredientes frescos</Text>
      </Box>

      <Pressable style={styles.botaoVoltar} onPress={() => router.push("/view/receitaListView")}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontWeight: "700", marginBottom: 5 },
  botaoVoltar: { padding: 12, borderRadius: 10, marginTop: 20, borderWidth: 1, alignItems: "center", backgroundColor: "#964b00", borderColor: "#000" },
  botaoTexto: { color: "#fff", fontSize: 16 },
});
