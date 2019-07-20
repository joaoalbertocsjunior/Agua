import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import Icon from "@expo/vector-icons/FontAwesome";

const window = Dimensions.get("window");

export default function Menu({ onItemSelected, navigation }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Icon
          name="user-circle"
          size={30}
          color="white"
          style={styles.avatar}
        />

        <Text
          style={styles.name}
          onPress={() => navigation.navigate("Profile")}
        >
          MINHA CONTA
        </Text>
      </View>

      <TouchableOpacity>
        <Text
          // onPress={() => navigation.navigate("Profile")}
          style={styles.item}
        >
          Meus pedidos
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity>
        <Text
          onPress={() => onItemSelected("Código de desconto")}
          style={styles.item}
        >
          Código de desconto
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity>
        <Text
          onPress={() => onItemSelected("Fale conosco")}
          style={styles.item}
        >
          Fale conosco
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity>
        <Text
          onPress={() => onItemSelected("Configurações")}
          style={styles.item}
        >
          Configurações
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity>
        <Text onPress={() => onItemSelected("Sobre o app")} style={styles.item}>
          Sobre o app
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          onPress={() => onItemSelected("Deixe sua sugestão ")}
          style={styles.item}
        >
          Deixe sua sugestão
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "#0F63BF"
    // paddingLeft: 30
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 70,
    paddingBottom: 50
  },
  avatar: {
    borderRadius: 24,
    flex: 1,
    paddingLeft: 30,
    paddingTop: 15,
    paddingRight: 10
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20,
    color: "white",
    fontSize: 16
  },
  item: {
    fontSize: 16,
    fontWeight: "300",
    paddingTop: 5,
    color: "white",
    height: 60,
    alignItems: "center",
    alignSelf: "center",
    paddingRight: 140
  }
});

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};
