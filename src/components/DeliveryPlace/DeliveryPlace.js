import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "@expo/vector-icons/Entypo";
import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

export default class DeliveryPlace extends Component {
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
      street: "",
      number: "",
      complement: "",
      state: "",
      city: "",
      zipcode: "",
      loading: false
    };
  }
  async componentDidMount() {
    let value = await AsyncStorage.getItem("@authenticationToken");

    this.setState({ token: value });

    let address = await AsyncStorage.getItem("@address");

    address = JSON.parse(address);

    this.setState(address);
  }

  saveAddress() {
    if (this.state.number == "" || this.state.number == undefined) {
      alert("Preencha o número ;)");
      return;
    }

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        number: this.state.number,
        complement: this.state.complement,
        zipcode: this.state.zipcode
      }),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Token token=${this.state.token}`
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/users/addresses`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao registrar endereço!");
        }
      })
      .then(response => {
        try {
          AsyncStorage.setItem(
            "@address",
            JSON.stringify({
              street: this.state.street,
              city: this.state.city,
              state: this.state.state,
              complement: this.state.complement,
              zipcode: this.state.zipcode
            })
          );

          AsyncStorage.setItem("@addressId", response.id.toString());
          this.setState({ loading: false });
          this.props.navigation.navigate("Products");
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.message);
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
              Entregar em
            </Text>
          </View>

          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={{ flex: 0, flexDirection: "row", width: "80%" }}>
                <TextInput
                  style={{
                    height: 40,
                    width: "30%",
                    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                    marginBottom: 20
                  }}
                  placeholder="ESTADO"
                  onChangeText={state => this.setState({ state })}
                  value={this.state.state}
                />

                <TextInput
                  style={{
                    height: 40,
                    width: "58%",
                    marginLeft: "10%",
                    borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                    marginBottom: 20
                  }}
                  placeholder="CIDADE"
                  onChangeText={city => this.setState({ city })}
                  value={this.state.city}
                />
              </View>

              <TextInput
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="ENDEREÇO"
                onChangeText={street => this.setState({ street })}
                value={this.state.street}
              />

              <TextInput
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="NÚMERO"
                onChangeText={number => this.setState({ number })}
                value={this.state.number}
              />

              <TextInput
                style={{
                  height: 40,
                  width: "80%",
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
                  marginBottom: 20
                }}
                placeholder="APTO, BLOCO ETC"
                onChangeText={complement => this.setState({ complement })}
                value={this.state.complement}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttonFacebook}
              onPress={() => {
                this.saveAddress();
                AsyncStorage.setItem("@street", this.state.street);
              }}
            >
              <Text style={styles.buttonText}>BUSCAR</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
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
