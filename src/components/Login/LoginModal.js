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
  Dimensions,
  Alert
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Entypo";

import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

// create a component

export default class LoginModal extends Component {
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
      modalLoginVisible: false,
      modalRegisterVisible: false,
      email: "",
      password: "",
      currentUser: {},
      loading: false
    };
  }

  componentWillReceiveProps() {
    this.setState({ modalLoginVisible: this.props.open });
  }

  closeModal() {
    this.setState({ modalLoginVisible: false });
    Object.assign(this.props, { open: false });
  }

  sendLogin() {
    if (
      this.state.email == "" ||
      this.state.email == undefined ||
      this.state.password == "" ||
      this.state.password == undefined
    ) {
      Alert.alert("Aviso", "Preencha os dados corretamente ;)");
      return;
    }

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
        password: this.state.password
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/users/login`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao autenticar-se!");
        }
      })
      .then(currentUser => {
        try {
          AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
          AsyncStorage.setItem(
            "@authenticationToken",
            currentUser.authentication_token
          );
          this.setState({ loading: false });
          this.props.navigation.navigate("Products");
        } catch (error) {
          console.error(error);
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        Alert.alert("Atenção", error.message);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

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
              paddingTop: 40,
              width: "100%",
              flex: 0,
              flexDirection: "row"
            }}
          >
            <Icon
              onPress={() => (this.state.loading ? false : this.props.navigation.goBack())}
              name="chevron-with-circle-left"
              size={30}
              color="#1474DE"
            />

            <Text style={{ width: "60%", textAlign: "center" }}>Login</Text>
          </View>

          <View
            style={{
              flex: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              marginTop: 40,
              marginBottom: 60
            }}
          >
            <Text
              style={{
                color: "#0E5CB2",
                width: "60%",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              Seja bem-vindo de volta. Entre com seu email e senha.
            </Text>
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
                placeholder="E-MAIL*"
                keyboardType={"email-address"}
                returnKeyType={"next"}
                autoCapitalize="none"
                editable={!this.state.loading}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={event => {
                  this.refs.SecondInput.focus();
                }}
              />

              <TextInput
                ref="SecondInput"
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="SENHA*"
                secureTextEntry={true}
                editable={!this.state.loading}
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={event => {
                  this.sendLogin();
                }}
              />
              <TouchableOpacity style={{ marginBottom: 60 }}>
                <Text style={{ color: "#0E5FB7", fontWeight: "bold" }}>
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonFacebook}
                onPress={() => (this.state.loading ? false : this.sendLogin())}
              >
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonFacebook}
                onPress={() =>
                  this.state.loading ? false : navigate("SearchZipCode")
                }
              >
                <Text style={styles.buttonText}>CONECTAR COM FACEBOOK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonNoRegister}
                onPress={() =>
                  this.state.loading ? false : navigate("SearchZipCode")
                }
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
