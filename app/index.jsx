import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Rango Certo</Text>

      <View style={styles.imagemEspaco} />

      <Text style={styles.subtitle}>
        Registre, explore e desfrute do seu cardápio pessoal!
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/view/receitaListView")}
      >
        <Text style={styles.texto}>Ver Receitas</Text>
      </Pressable>

      <Pressable
        style={[styles.botao, { backgroundColor: "#964b00" }]}
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
    backgroundColor: "#FFF8F0", 
  },
  imagemEspaco: {
    width: "50%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "700", 
    color: "#000",
    textAlign: "center",
  },
 subtitle: {
  fontSize: 16,          
  fontWeight: "600",     
  color: "#333",     
  textAlign: "center",    
  marginBottom: 15,     
  fontStyle: "italic",   
},
  botao: {
    backgroundColor: "#Ffa500",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  texto: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
