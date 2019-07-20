import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from "react-native";

import Navbar from "../Navbar/Navbar";
import Products from "../Products/Products";
import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

export default class FinalizePurchase extends Component {
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
      items: [],
      products: {},
      creditCard: [],
      totalPrice: "",
      address: "",
      token: "",
      addressId: "",
      loading: false,
      cpf: this.props.navigation.state.params.cpf
    };
  }

  sendData() {
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        total_price: this.state.totalPrice,
        tax_id: "09328423821",
        deliveryman_instructions: this.state.address.complement,
        address_id: 1,
        credit_card: {
          number: this.state.creditCard.values.number,
          cvc: this.state.creditCard.values.cvc,
          expiration_date: this.state.creditCard.values.expiry,
          holder_name: this.state.creditCard.values.name,
          holder_tax_id: "04938192836"
        },
        products: this.state.products
      }),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Token token=${this.state.token}`
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/orders`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao registrar endereço!");
        }
      })
      .then(currentUser => {
        this.setState({ loading: false });
        alert("Pedido realizado com sucesso!");
        this.props.navigation.navigate("Products");
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error.message);
      });
  }

  async componentDidMount() {
    try {
      const listOfProducts = await AsyncStorage.getItem("@products");
      const totalPrice = await AsyncStorage.getItem("@totalPrice");
      const creditCard = await AsyncStorage.getItem("@creditCard");
      const address = await AsyncStorage.getItem("@address");
      const value = await AsyncStorage.getItem("@authenticationToken");
      const addressId = await AsyncStorage.getItem("@addressId");

      this.setState({ token: value });

      this.setState({
        products: JSON.parse(listOfProducts),
        totalPrice: Number(totalPrice),
        creditCard: JSON.parse(creditCard),
        address: JSON.parse(address) || "",
        addressId: Number(addressId)
      });
    } catch (error) {
      console.log("error ->", error);
    }

    this.listItems();
  }

  listItems() {
    this.setState({
      items: [
        {
          id: 1,
          title: "ENDEREÇO DE ENTREGA",
          description: this.state.address.street || "",
          link: "SearchZipCode"
        },
        {
          id: 2,
          title: "FORMA DE PAGAMENTO",
          description: `Cartão de Crédito - ${this.state.creditCard.values
            .type || ""} - ${this.state.creditCard.values.number.substr(
            this.state.creditCard.values.number.length - 4
          )} `,
          link: "PaymentForm"
        },
        {
          id: 3,
          title: "VALOR TOTAL DO PEDIDO",
          description: this.state.totalPrice || "",
          link: "Products"
        },
        {
          id: 4,
          title: "OBSERVAÇÃO PARA O ENTREGADOR",
          description: this.state.address.complement || "Sem observação",
          link: "DeliveryPlace"
        },
        {
          id: 5,
          title: "ADICIONAR CPF/CNPJ NA NOTA",
          description: this.state.cpf || "Sem CPF/CNPJ",
          link: "CpfForm"
        }
      ]
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
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
        <Navbar
          toggle={true}
          title="Confira seus dados"
          navigation={this.props.navigation}
          goTo="PaymentForm"
        />

        <FlatList
          style={{ backgroundColor: "#fff" }}
          data={this.state.items}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.title} onPress={() => navigate(item.link)}>
                  {item.title}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.sendData()}
          >
            <Text style={styles.buttonText}>Realizar pagamento</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(205,205,205,0.57)",
    height: 70,
    paddingTop: 18,
    paddingLeft: 20
  },
  title: {
    color: "rgba(0,47,94,0.85);",
    fontSize: 18,
    fontWeight: "bold"
  },
  description: {
    color: "rgba(0,47,94,0.85);",
    fontSize: 14
  },
  buttonWrapper: {
    flex: 0,
    bottom: 0,
    position: "absolute",
    flexDirection: "column",
    height: 60,
    width: "95%",
    backgroundColor: "#1474DE",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10
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
