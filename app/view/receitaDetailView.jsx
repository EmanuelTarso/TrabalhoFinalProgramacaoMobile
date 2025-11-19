import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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

  function alternarFavorito() {
    receitaService.favoritar(receita.id).then((f) => {
      setReceita({ ...receita, favorito: f });
    });
  }

  if (!receita) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>👩‍🍳 Detalhes da Receita</Text>
      <Text style={styles.title}>{receita.nome}</Text>

      <Pressable style={styles.botaoFavorito} onPress={alternarFavorito}>
        <Text style={styles.botaoTextoFavorito}>
          {receita.favorito ? "★ Favorita" : "☆ Favoritar"}
        </Text>
      </Pressable>

      <Text style={styles.subtitle}>Ingredientes:</Text>
      {receita.ingredientes.map((i, idx) => (
        <Text key={idx} style={styles.texto}>{i}</Text>
      ))}

      <Text style={[styles.subtitle, { marginTop: 10 }]}>
        Modo de preparo:
      </Text>
      <Text style={styles.texto}>{receita.modoPreparo}</Text>

      <Box title="Dica">
        <Text>Use ingredientes de qualidade!</Text>
      </Box>

      <View style={styles.imagemEspaco} />

      <Pressable
        style={styles.botaoEditar}
        onPress={() => router.push(`/view/receitaFormView?id=${receita.id}`)}
      >
        <Text style={styles.botaoTextoEditar}>Editar Receita ✏️</Text>
      </Pressable>

      <Pressable
        style={styles.botaoVoltar}
        onPress={() => router.push("/view/receitaListView")}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </Pressable>

      <Text style={styles.encerramento}>Bon Appétit !!!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: "#FFF8F0",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700", 
    marginBottom: 10, 
    color: "#000",
  },
  subtitle: { 
    fontWeight: "700", 
    marginBottom: 5, 
    color: "#000",
  },
  texto: {
    color: "#000",
    fontSize: 16,
    marginBottom: 4,
  },
  imagemEspaco: {
    width: "100%",
    height: 300,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  botaoFavorito: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#ffdd00",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
  botaoTextoFavorito: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  botaoEditar: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#0066cc",
    borderWidth: 1,
    borderColor: "#000",
  },
  botaoTextoEditar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoVoltar: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#964b00",
    borderColor: "#000",
  },
  botaoTexto: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold",
  },
  encerramento: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    color: "#000",
  },
});
