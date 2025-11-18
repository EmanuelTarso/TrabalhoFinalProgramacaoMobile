import { useRouter } from "expo-router";
<Pressable
            style={styles.itemBox}
            onPress={() => {
              router.push("../view/receitaListView.jsx");
            }}
          >
            <Text style={styles.item}> Lista de Receitas</Text>
          </Pressable>
<Pressable
            style={styles.itemBox}
            onPress={() => {
              router.push("../view/receitaFormView.jsx");
            }}
          >
            <Text style={styles.item}> Formulário </Text>
          </Pressable>
<Pressable
            style={styles.itemBox}
            onPress={() => {
              router.push("../app/index.jsx");
            }}
          >
            <Text style={styles.item}> Index </Text>
          </Pressable>
