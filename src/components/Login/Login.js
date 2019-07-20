import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "@expo/vector-icons/Entypo";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

class Login extends Component {
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
      // modalLoginVisible: false,
      modalRegisterVisible: false,
      name: "",
      email: "",
      password: "",
      cellphone: "",
      currentUser: {},
      loading: false,
      popupVisible: false
    };
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  componentDidUpdate() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    let value = await AsyncStorage.getItem("currentUser");

    if (value) {
      let parsed = JSON.parse(value);

      AsyncStorage.setItem("@authenticationToken", parsed.authentication_token);

      this.props.navigation.navigate("Products");
    }
  }

  withoutRegister() {
    const requestInfo = {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/users/guest`, requestInfo)
      .then(response => response.json())
      .then(guestUser => {
        AsyncStorage.setItem("guestUser", JSON.stringify(guestUser));
        AsyncStorage.setItem(
          "@authenticationToken",
          guestUser.authentication_token
        );

        this.setState({ loading: false });
        this.props.navigation.navigate("SearchZipCode");
      })
      .catch(error => {
        this.setState({ loading: true });
        alert(error.message);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.wrapper}>
        <ActivityIndicator
          size="large"
          color="#0EA79B"
          animating={this.state.loading}
          style={{
            position: "absolute",
            padding: 10,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            marginTop: "30%",
            zIndex: 99
          }}
        />

        <View style={styles.contentTop}>
          <Image
            style={styles.logoTop}
            source={require("../../images/logo.png")}
          />

          <Text style={styles.textTop}>
            COMPRE PELO APLICATIVO E RECEBA NA SUA CASA. SEM TAXA DE ENTREGA
          </Text>
        </View>
        <View style={styles.contentLogo}>
          <Image
            style={styles.logo}
            source={require("../../images/text-login.png")}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.buttonSign}>
            <View style={styles.buttonEnter}>
              <TouchableOpacity
                onPress={() => navigate('LoginModal')}
              >
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRegister}>
              <TouchableOpacity onPress={() => navigate('RegisterModal')}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonFacebook}>
            <TouchableOpacity onPress={() => navigate("Login")}>
              <Text style={styles.buttonText}>CONECTAR COM O FACEBOOK</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonNoRegister}>
            <TouchableOpacity onPress={() => this.withoutRegister()}>
              <Text style={styles.buttonTextNoRegister}>
                COMPRAR SEM CADASTRO
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  contentLogo: {
    flex: 0,
    alignItems: "flex-end"
  },

  contentTop: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },

  textTop: {
    color: "#009389",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },

  logoTop: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40
  },

  logo: {
    height: "60%",
    width: "60%",
    marginRight: "20%",
    alignItems: "center"
  },
  form: {
    backgroundColor: "#fff",
    marginTop: "-50%",
    height: "100%"
  },
  buttonSign: {
    flex: 0,
    flexDirection: "row"
  },

  buttonEnter: {
    width: "45%",
    height: 50,
    backgroundColor: "#1474DE",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "5%",
    borderRadius: 4
  },

  buttonRegister: {
    width: "40%",
    height: 50,
    backgroundColor: "#1474DE",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    margin: "5%",
    borderRadius: 4
  },

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
    justifyContent: "center"
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

export default Login;
