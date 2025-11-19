import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TopMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrapper}>

      <View style={styles.topBar}>
        <Text style={styles.title}>Rango Certo</Text>

        <Pressable onPress={() => setOpen(!open)}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>

      {open && (
        <View style={styles.dropdown}>

          <Pressable
            style={styles.itemBox}
            onPress={() => {
              setOpen(false);
              router.push("/");
            }}
          >
            <Text style={styles.item}>🏠 Menu Inicial</Text>
          </Pressable>

          <Pressable
            style={styles.itemBox}
            onPress={() => {
              setOpen(false);
              router.push("/view/receitaListView");
            }}
          >
            <Text style={styles.item}>📜 Lista de Receitas</Text>
          </Pressable>

          <Pressable
            style={styles.itemBox}
            onPress={() => {
              setOpen(false);
              router.push("/view/receitaFormView");
            }}
          >
            <Text style={styles.item}>➕ Nova Receita</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#964b00",
    borderBottomWidth: 1,
    borderColor: "#00000040",
  },

  topBar: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  menuIcon: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },

  dropdown: {
    backgroundColor: "#c57a32",
    borderTopWidth: 1,
    borderColor: "#00000030",
    paddingVertical: 8,
  },

  itemBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  item: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
