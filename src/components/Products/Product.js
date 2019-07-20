import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TextInput
} from "react-native";

import PubSub from "pubsub-js";
import Icon from "@expo/vector-icons/Entypo";
import PropTypes from "prop-types";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  add = () => {
    // this.props.add(this.props.product.id);
    this.setState({ count: this.state.count + 1 });
    this.props.product.count = this.state.count + 1;
    this.addToStorage();
  };

  async addToStorage() {
    try {
      const value = await AsyncStorage.getItem("listOfProducts");
      let products = JSON.parse(value) || {};

      let newProduct = {
        [`product${this.props.product.id}`]: this.props.product
      };

      let allProducts = Object.assign(products, newProduct);

      await AsyncStorage.setItem("listOfProducts", JSON.stringify(allProducts)).then(() => {
        this.setState({
          totalCount: this.props.product.count * this.props.product.price
        });

        PubSub.publish("timeline", this.props.product);
      });

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  trunc(text) {
    return text.length > 20 ? `${text.substr(0, 10)}...` : text;
  }

  remove = () => {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 });
      this.props.product.count = this.state.count - 1;
      this.addToStorage();
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          height: 90,
          borderBottomWidth: 1,
          borderColor: "#C8C8C8",
          paddingTop: 30
        }}
      >
        <View>
          <Image
            style={{ width: 60, height: 60, marginLeft: 20, marginTop: -15 }}
            source={{
              uri: `https:${this.props.product.image_url.substring(5)}`
            }}
          />
        </View>
        <View>
          <View style={{ flex: 0, flexDirection: "column" }}>
            <Text
              style={{
                color: "#002F5E",
                width: 100
              }}
            >
              {this.trunc(this.props.product.name)}
            </Text>
            <Text style={{ color: "#1983FA", fontSize: 10 }}>
              {this.props.product.price_with_currency}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 20
            }}
          >
            <TouchableOpacity onPress={this.remove}>
              <Icon name="minus" size={30} color="#177EF0" />
            </TouchableOpacity>

            <Text
              style={{
                color: "#177EF0",
                fontSize: 28,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              {this.state.count}
            </Text>

            <TouchableOpacity onPress={this.add}>
              <Icon name="plus" size={30} color="#177EF0" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

Product.propTypes = {
  totalCount: PropTypes.number
};
