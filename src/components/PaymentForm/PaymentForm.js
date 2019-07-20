import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TextInput,
  Platform
} from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput
} from "react-native-credit-card-input";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Navbar from "../Navbar/Navbar";

// create a component
export default class PaymentForm extends Component {
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

  _onChange = formData =>
    AsyncStorage.setItem("@creditCard", JSON.stringify(formData));
  _onFocus = field => console.log("focusing", field);
  _setUseLiteCreditCardInput = useLiteCreditCardInput =>
    this.setState({ useLiteCreditCardInput });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Navbar
          toggle={true}
          title="Adicionar forma de pagamento"
          navigation={this.props.navigation}
          goTo="Products"
        />
        <KeyboardAwareScrollView style={{marginBottom: 80,}}>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.titleText}>NOVO CARTÃO</Text>
            </View>
            <CreditCardInput
              requiresName
              requiresCPF
              autoFocus
              inputStyle={styles.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onFocus={this._onFocus}
              onChange={this._onChange}
              labels={{
                number: "NÚMERO DO CARTÃO",
                expiry: "DATA EXP",
                cvc: "CVV",
                name: "NOME NO CARTÃO"
              }}

            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("CpfForm")}
          >
            <Text style={styles.buttonText}>Adicionar Cartão</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    backgroundColor: "#177EF0",
    height: 40,
    paddingTop: 10,
    marginBottom: 20,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  titleText: {
    color: "#fff",
    alignSelf: "center"
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 60,
    marginBottom: 120,
    width: "90%",
    margin: "auto",
    alignSelf: "center",
    borderRadius: 4,
    flex: 1
  },
  label: {
    color: "black",
    fontSize: 12
  },
  input: {
    fontSize: 16,
    color: "black"
  },
  buttonWrapper: {
    flex: 0,
    bottom: 0,
    position: "absolute",
    flexDirection: "column",
    height: 60,
    width: "100%",
    backgroundColor: "#1474DE",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    alignSelf: "center",
    paddingTop: 20
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
