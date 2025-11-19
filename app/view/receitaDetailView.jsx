import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Box from "../components/box";
import Rodape from "../components/rodape";
import TopMenu from "../components/topMenu";
import receitaService from "../services/receitaService";

export default function receitaDetailView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [receita, setReceita] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("[DetailView] id recebido da URL:", id);

  useEffect(() => {
    receitaService.obterPorId(id).then((r) => {
      console.log("[DetailView] retorno do obterPorId:", r);
      if (!r) {
        router.back();
      } else {
        setReceita(r);
      }
    });
  }, [id]);

  if (!receita) return null;

  const confirmarExclusao = () => {
    console.log("[DetailView] confirmarExclusao -> id:", receita.id);
    receitaService.excluir(receita.id)
      .then(() => {
        console.log("[DetailView] exclusão concluída, redirecionando...");
        router.replace("/view/receitaListView");
      })
      .catch(err => console.log("[DetailView] ERRO NO SERVICE:", err));
  };

  return (
    <View style={{ flex: 1 }}>
      <TopMenu />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>👩‍🍳 Detalhes da Receita</Text>
        <Text style={styles.title}>{receita.nome}</Text>

        <View style={styles.actionRow}>
          <Pressable
            onPress={() => {
              const novoValor = !receita.favorito;
              receitaService.favoritar(receita.id, novoValor).then(() => {
                setReceita({ ...receita, favorito: novoValor });
              });
            }}
          >
            <Text style={styles.favoriteBtn}>
              {receita.favorito ? "⭐ Favorita" : "☆ Favoritar"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.push(`/view/receitaEditView?id=${receita.id}`)
            }
          >
            <Text style={styles.editBtn}>📝 Editar</Text>
          </Pressable>

          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.deleteBtn}>❌ Excluir</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>Ingredientes:</Text>
        {receita.ingredientes.map((i, idx) => (
          <Text key={idx} style={styles.texto}>{i}</Text>
        ))}

        <Text style={[styles.subtitle, { marginTop: 10 }]}>Modo de preparo:</Text>
        <Text style={styles.texto}>{receita.modoPreparo}</Text>

        <Box title="Dica">
          <Text>Use ingredientes de qualidade!</Text>
        </Box>

        <View style={styles.imagemEspaco} />

        <Pressable
          style={styles.botaoVoltar}
          onPress={() => router.push("/view/receitaListView")}
        >
          <Text style={styles.botaoTexto}>Voltar</Text>
        </Pressable>
      </ScrollView>

      <Rodape />

      {/* Modal de confirmação */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Deseja realmente excluir?</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "#c0392b" }]}
                onPress={() => {
                  setModalVisible(false);
                  confirmarExclusao();
                }}
              >
                <Text style={{ color: "#fff" }}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#FFF8F0" },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  actionRow: { flexDirection: "row", gap: 20, marginBottom: 15, flexWrap: "wrap" },
  favoriteBtn: { fontSize: 20 },
  editBtn: { fontSize: 20 },
  deleteBtn: { fontSize: 20, color: "red" },
  subtitle: { fontWeight: "700", marginBottom: 5 },
  texto: { fontSize: 16, marginBottom: 4 },
  imagemEspaco: { width: "100%", height: 300, marginTop: 20, borderRadius: 12, backgroundColor: "#f0f0f0", borderWidth: 1 },
  botaoVoltar: { padding: 12, borderRadius: 10, marginTop: 20, borderWidth: 1, alignItems: "center", backgroundColor: "#964b00" },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  modalBackground: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0,0,0,0.5)" },
  modalContainer: { width:300, padding:20, backgroundColor:"#fff", borderRadius:10 },
  modalTitle: { fontSize:18, fontWeight:"bold", marginBottom:20, textAlign:"center" },
  modalButtons: { flexDirection:"row", justifyContent:"space-between" },
  modalBtn: { flex:1, padding:10, borderRadius:8, marginHorizontal:5, alignItems:"center" },
});
