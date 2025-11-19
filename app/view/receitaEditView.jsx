import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import receitaService from "../services/receitaService";

import Rodape from "../components/rodape";
import TopMenu from "../components/topMenu";

export default function receitaEditView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [receita, setReceita] = useState(null);
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    receitaService.obterPorId(id).then((r) => {
      if (r) {
        setReceita(r);
        setNome(r.nome);
        setIngredientes(r.ingredientes.join(", "));
        setModoPreparo(r.modoPreparo);
      }
    });
  }, [id]);

  if (!receita) return null;

  const salvar = () => {
    const nova = {
      ...receita,
      nome,
      ingredientes: ingredientes.split(",").map((i) => i.trim()),
      modoPreparo,
    };

    receitaService.salvar(nova).then(() => {
      console.log("[EditView] receita atualizada -> id:", receita.id);
      router.push(`/view/receitaDetailView?id=${receita.id}`);
    });
  };

  const confirmarExclusao = () => {
    console.log("[EditView] exclusão confirmada -> id:", receita.id);
    receitaService.excluir(receita.id).then(() => {
      console.log("[EditView] receita excluída -> redirecionando...");
      router.replace("/view/receitaListView");
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TopMenu />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Editar Receita</Text>

          <TextInput value={nome} onChangeText={setNome} style={styles.input} />
          <TextInput
            value={ingredientes}
            onChangeText={setIngredientes}
            style={styles.input}
          />
          <TextInput
            value={modoPreparo}
            onChangeText={setModoPreparo}
            multiline
            style={[styles.input, { height: 120 }]}
          />

          <Pressable style={styles.botao} onPress={salvar}>
            <Text style={styles.botaoTexto}>Salvar Alterações</Text>
          </Pressable>

          <Pressable style={styles.botaoExcluir} onPress={() => setModalVisible(true)}>
            <Text style={styles.botaoTexto}>Excluir Receita ❌</Text>
          </Pressable>
        </View>
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
  scroll: { flexGrow: 1 },
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#FFF8F0" },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, backgroundColor: "#fff", marginBottom: 10 },
  botao: { backgroundColor: "#Ffa500", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 10 },
  botaoExcluir: { backgroundColor: "#c0392b", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 10 },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  modalBackground: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0,0,0,0.5)" },
  modalContainer: { width:300, padding:20, backgroundColor:"#fff", borderRadius:10 },
  modalTitle: { fontSize:18, fontWeight:"bold", marginBottom:20, textAlign:"center" },
  modalButtons: { flexDirection:"row", justifyContent:"space-between" },
  modalBtn: { flex:1, padding:10, borderRadius:8, marginHorizontal:5, alignItems:"center" },
});
