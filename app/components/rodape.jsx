import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function Rodape() {
  const abrirLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.title}>Bon Appétit !!!</Text>

      <View style={styles.linksContainer}>
        <Pressable onPress={() => abrirLink("https://github.com/EmanuelTarso/TrabalhoFinalProgramacaoMobile")}>
          <Text style={styles.link}>GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#964b00",
    borderTopWidth: 1,
    borderColor: "#00000030",
    alignItems: "center",
    gap: 6,
    marginTop: 20,
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  link: {
    color: "#ffd28f",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  separator: {
    color: "#ffd28f",
    fontSize: 14,
    fontWeight: "600",
  },
});
