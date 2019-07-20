//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Icon from "@expo/vector-icons/Entypo";

const { width } = Dimensions.get("window");
export default class Status extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#177EF0",
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      borderBottomColor: "transparent"
    },
    headerTintColor: "transparent"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "column", paddingLeft: 20 }}>
          <Text>23 de Março</Text>
          <Text>Detalhes do pedido</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", paddingLeft: 20 }}>
          <Icon name="check" size={30} color="#333" />
          <Text
            style={{
              color: "#4A4A4A",
              fontSize: 20,
              paddingLeft: 20
            }}
          >
            Realizado
          </Text>
        </View>
        <View style={{}}>
          <Image
            source={require("../../images/bg-status.png")}
            style={{
              width: width,
              height: 180
            }}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249,252,255,0.5)",
    paddingTop: 60
  }
});
