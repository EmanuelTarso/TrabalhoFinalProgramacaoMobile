import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio Virtual</Text>
      <Text style={styles.subtitle}>
        Explore receitas e adicione as suas preferidas.
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/view/receitaListView")}
      >
        <Text style={styles.texto}>Ver Receitas</Text>
      </Pressable>

      <Pressable
        style={[styles.botao, { backgroundColor: "#28a745" }]}
        onPress={() => router.push("/view/receitaFormView")}
      >
        <Text style={styles.texto}>Nova Receita</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  botao: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  texto: { color: "#fff", fontSize: 18 },
});
