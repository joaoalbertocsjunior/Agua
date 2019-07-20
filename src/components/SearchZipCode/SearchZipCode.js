import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "@expo/vector-icons/Entypo";

import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

export default class SearchZipCode extends Component {
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
      zipCode: "",
      address: {},
      token: "",
      loading: false
    };
  }

  async componentDidMount() {
    let value = await AsyncStorage.getItem("@authenticationToken");
    this.setState({ token: value });
  }

  onGoFocus() {
    // when you call getElement method, the instance of native TextInput will returned.
    this.refs["myText"].getElement().focus();
  }

  getAddress() {
    if (
      this.state.zipCode == "" ||
      this.state.zipCode == undefined ||
      this.state.zipCode.length < 9
    ) {
      alert("Preencha corretamente o CEP ;)");
      return;
    }

    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Token token=${this.state.token}`
      })
    };

    this.setState({ loading: true });
    fetch(
      `${API_URL()}/users/addresses/search?zipcode=${this.state.zipCode}`,
      requestInfo
    )
      .then(res => res.json())
      .then(response => {
        console.log(response);

        this.setState({
          address: Object.assign(response, { zipcode: this.state.zipCode })
        });

        AsyncStorage.setItem("@address", JSON.stringify(this.state.address))
          .then(() => {
            this.props.navigation.navigate("DeliveryPlace");
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : 20
        }}
      >
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

            <Text style={{ width: "60%", textAlign: "center" }}>
              Buscar por CEP
            </Text>
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
            />
          </View>

          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <TextInputMask
                require
                style={styles.textInput}
                type={"zip-code"}
                placeholder="CEP*"
                onChangeText={zipCode => this.setState({ zipCode })}
                value={this.state.zipCode}
              />

              <TouchableOpacity
                style={{ marginBottom: 60 }}
                onPress={() => navigate("DeliveryPlace")}
              >
                <Text style={{ color: "#0E5FB7", fontWeight: "bold" }}>
                  Não sei o CEP! Procurar por rua
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonFacebook}
                onPress={() => this.getAddress()}
              >
                <Text style={styles.buttonText}>BUSCAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },

  textInput: {
    height: 40,
    width: "80%",
    marginBottom: 20,
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0
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
    marginTop: "5%"
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
    marginTop: 40,
    marginBottom: 20
  },
  innerContainer: {
    alignItems: "center"
  }
});
