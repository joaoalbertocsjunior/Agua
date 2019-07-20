import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  StatusBar,
  ActivityIndicator,
  Dimensions
} from "react-native";

import PubSub from "pubsub-js";
import Icon from "@expo/vector-icons/Entypo";
import IconFeather from "@expo/vector-icons/Feather";
import Product from "./Product";
import Navbar from "../Navbar/Navbar";
import Menu from "../Menu/Menu";
import SideMenu from "react-native-side-menu";
import { API_URL } from "../../api/Api";

const { height } = Dimensions.get("window");

export default class Products extends Component {
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

    this.toggle = this.toggle.bind(this);

    this.state = {
      finalProducts: {},
      totalCount: 0,
      loading: false,
      products: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      isOpen: false,
      selectedItem: "About",
      token: "",
      street: ""
    };
  }

  async componentDidMount() {
    let value = await AsyncStorage.getItem("@authenticationToken");
    let addressId = await AsyncStorage.getItem("@addressId");
    this.setState({ token: value });

    this.getProducts();

    if (!addressId) {
      this.getAddress();
    }

    let streett = await AsyncStorage.getItem("@street");
    this.setState({ street: streett ? streett : "Não Encontrada" });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.product !== undefined) {
      this.product = nextProps.product;
    }
  }

  async componentWillMount() {
    let value = await AsyncStorage.getItem("@authenticationToken");
    this.setState({ token: value });
    this.getProducts();

    PubSub.subscribe("timeline", (topico, product) => {
      this.getKey();
    });
  }

  getProducts() {
    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Token token=${this.state.token}`
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/products`, requestInfo)
      .then(res => res.json())
      .then(response => {
        this.setState({
          products: response,
          error: response.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item
    });

  // @TODO: REFACTOR
  async getKey() {
    try {
      const value = await AsyncStorage.getItem("listOfProducts");

      if (value === null) {
        await AsyncStorage.setItem("listOfProducts", "{}");
      }

      let productList = JSON.parse(value);
      let totalPrice = 0;
      let finalProducts = {};

      for (let i = 0; i <= this.state.products.length; i++) {
        if (
          this.state.products[i] &&
          productList[`product${this.state.products[i].id}`]
        ) {
          totalPrice =
            totalPrice +
            productList[`product${this.state.products[i].id}`].count *
              productList[`product${this.state.products[i].id}`].price;

          finalProducts = Object.assign(finalProducts, {
            [`${this.state.products[i].id}`]: this.state.products[i].count
          });
        }
      }

      this.setState({ totalCount: totalPrice });
      AsyncStorage.setItem("@totalPrice", totalPrice.toString());
      AsyncStorage.setItem("@products", JSON.stringify(finalProducts));
    } catch (error) {
      // console.log("Error retrieving data" + error);
    }
  }

  async clearKey() {
    try {
      await AsyncStorage.removeItem("listOfProducts");
      await AsyncStorage.removeItem("@authenticationToken");
      await AsyncStorage.removeItem("currentUser");
    } catch (error) {
      alert(error);
    }
  }

  goToCard() {
    this.props.navigation.navigate("PaymentForm");
  }

  getAddress() {
    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Token token=${this.state.token}`
      })
    };

    this.setState({ loading: true });
    fetch(`${API_URL()}/users/addresses`, requestInfo)
      .then(res => res.json())
      .then(response => {
        this.setState({ street: response[0].full_name });

        AsyncStorage.setItem("@addressId", response[0].id.toString());
        AsyncStorage.setItem(
          "@address",
          JSON.stringify({ street: response[0].full_name })
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={this.props.navigation}/>;
    const emptyMessage = (
      <Text
        style={{
          backgroundColor: "#fff",
          flex: 1,
          textAlign: "center",
          paddingTop: "50%"
        }}
      >
        {" "}
        Não há produto disponível :'({" "}
      </Text>
    );
    const list = (
      <FlatList
        style={{ backgroundColor: "#fff" }}
        data={this.state.products}
        renderItem={({ item }) => {
          return <Product product={item} totalCount={this.state.totalCount} />;
        }}
        keyExtractor={item => item.id.toString()}
      />
    );

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <Navbar
            toggle={this.toggle}
            title="Faça seu pedido"
            navigation={this.props.navigation}
            goTo="Profile"
          />

          {this.state.products.length > 0 ? list : emptyMessage}

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

          <View
            style={{
              flex: 0,
              bottom: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
              backgroundColor: "#0EA79B",
              alignContent: "center",
              alignItems: "center",
              paddingLeft: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name="creative-commons-noderivs"
                size={20}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "white" }}>
                R$ {this.state.totalCount.toFixed(2)}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={this.add}
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: -3,
                    fontSize: 12
                  }}
                  onPress={() => this.goToCard()}
                >
                  FINALIZAR PEDIDO
                </Text>
                <Icon name="chevron-small-right" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 0,
              bottom: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              height: 80,
              backgroundColor: "#1474DE",
              alignContent: "center",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <View style={{ width: "80%" }}>
              <Text style={{ color: "#50E3C2" }}>Entregar em</Text>
              <Text style={{ color: "white" }}>{this.state.street}</Text>
            </View>
            <View style={{ width: "20%" }}>
              <TouchableOpacity
                // onPress={() => navigate("SearchZipCode")}
                onPress={() => this.clearKey()}
                style={{
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <IconFeather name="map-pin" size={30} color="white" />
                <Text
                  style={{
                    color: "white",
                    marginTop: 5,
                    fontSize: 12
                  }}
                >
                  MUDAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SideMenu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  countText: {
    color: "#FF00FF"
  }
});
