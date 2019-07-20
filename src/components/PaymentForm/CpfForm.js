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
      cpf: "",
      colorError: false
    };
  }

  componentDidMount() {
    this.refs["cpf"].getElement().focus();
  }

  textChanged() {
    this.setState({ colorError: !this.refs["cpf"].isValid() });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
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
              marginTop: 40,
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

            <Text style={{ width: "60%", marginTop: 10, textAlign: "center" }}>
              Informe seu CPF
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
                isValid
                ref={"cpf"}
                style={{
                  color: this.state.colorError ? "red" : "#000",
                  height: 40,
                  width: "80%",
                  marginBottom: 20,
                  borderBottomWidth: Platform.OS === "ios" ? 1 : 0
                }}
                type={"cpf"}
                placeholder="CPF*"
                onChangeText={cpf => {
                  this.textChanged();
                  this.setState({ cpf });
                }}
                value={this.state.cpf}
              />
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonFacebook}
                onPress={() => {
                  if (!this.state.colorError) {
                    navigate("FinalizePurchase", { cpf: this.state.cpf});
                  } else {
                    alert("Preencha corretamente o CPF!");
                  }
                }}
              >
                <Text style={styles.buttonText}>PRÓXIMO </Text>
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

  textInput: {},

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
