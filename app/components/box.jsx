import { StyleSheet, Text, View } from "react-native";

export default function Box({ title, children }) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontWeight: "700",
    marginBottom: 5,
    fontSize: 16,
  },
  content: {
    // permite inserir qualquer conteúdo dentro do Box
  },
});
