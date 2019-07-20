//import liraries
import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "@expo/vector-icons/Entypo";

import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

// create a component
export default class RegisterModal extends Component {
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

  constructor(props) {
    super(props);

    this.state = {
      modalRegisterVisible: this.props.open,
      name: "",
      email: "",
      password: "",
      cellphone: "",
      currentUser: {},
      loading: false
    };
  }

  componentWillReceiveProps() {
    console.log("register", this.props);
    this.setState({ modalRegisterVisible: this.props.open });
  }

  closeModal() {
    this.setState({ modalRegisterVisible: false });
  }

  sendRegister() {
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
        cellphone_number: this.state.cellphone
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/users`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao registrar-se!");
        }
      })
      .then(currentUser => {
        AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
        AsyncStorage.setItem(
          "@authenticationToken",
          currentUser.authentication_token
        );

        this.setState({ loading: false });
        this.props.navigation.navigate("SearchZipCode");
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#0EA79B"
          animating={true}
          style={{
            position: "absolute",
            padding: 10,
            alignSelf: "center",
            marginTop: height / 2.5,
            opacity: this.state.loading ? 1.0 : 0.0
          }}
        />
        <KeyboardAwareScrollView>
          <View
            style={{
              marginLeft: "10%",
              marginTop: 20,
              width: "100%",
              flex: 0,
              flexDirection: "row"
            }}
          >
            <Icon
              onPress={() => this.props.navigation.goBack()}
              name="chevron-with-circle-left"
              size={30}
              color="#1474DE"
            />

            <Text style={{ width: "60%", textAlign: "center" }}>Cadastrar</Text>
          </View>

          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <TextInput
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="NOME*"
                onChangeText={name => this.setState({ name })}
              />

              <TextInput
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                autoCapitalize="none"
                placeholder="EMAIL*"
                keyboardType={"email-address"}
                onChangeText={email => this.setState({ email })}
              />

              <TextInputMask
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="CELULAR*"
                type={"cel-phone"}
                onChangeText={cellphone => this.setState({ cellphone })}
                value={this.state.cellphone}
              />

              <TextInput
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="SENHA*"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />

              <Text
                style={{
                  color: "#0E5FB7",
                  fontWeight: "bold",
                  marginBottom: 60
                }}
              >
                A Senha deve conter no minimo 8 caracteres.
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonFacebook}
                onPress={() => this.sendRegister()}
              >
                <Text style={styles.buttonText}>AVANÇAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonFacebook}
                onPress={() => navigate("SearchZipCode")}
              >
                <Text style={styles.buttonText}>CONECTAR COM FACEBOOK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonNoRegister}
                onPress={() => navigate("SearchZipCode")}
              >
                <Text style={styles.buttonTextNoRegister}>
                  COMPRAR SEM CADASTRO
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: "center",
                  color: "#4A4A4A",
                  fontWeight: "bold"
                }}
              >
                *Ao entrar você concorda com nossos termos de uso
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  wrapper: { flex: 1 },

  buttonFacebook: {
    flex: 0,
    flexDirection: "column",
    width: "90%",
    height: 50,
    backgroundColor: "#4477DB",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: 4
  },

  buttonNoRegister: {
    flex: 0,
    flexDirection: "column",
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
    borderColor: "#0F63BF",
    borderWidth: 2,
    borderRadius: 4
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  buttonTextNoRegister: {
    color: "#0F63BF",
    fontWeight: "bold",
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  modalContainer: {
    flex: 0,
    justifyContent: "center",
    marginBottom: 20
  },
  innerContainer: {
    alignItems: "center"
  }
});
