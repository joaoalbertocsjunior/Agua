import React, { Component } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

import NavigationBar from 'react-native-navbar';


export default class RequestDetail extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#177EF0",
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      borderBottomColor: "transparent"
    },
    headerTintColor: "transparent",
    header: null,
  };

  constructor(props) {
    super(props);


    this.state = {
    };
  }

  async componentWillMount() {

  }

  async componentDidMount() {

  }

  render() {
    const { navigate } = this.props.navigation;

    const listData = [
      {
        key: 0,
        quantity: 40,
        name: "Água mineral s/ gás 500 mL",
        price: 65.50,
      },
      {
        key: 1,
        quantity: 12,
        name: "Água mineral c/ gás 500 mL",
        price: 65.50,
      },
      {
        key: 2,
        quantity: 30,
        name: "Água mineral s/ gás 1,5 L",
        price: 37,
      },
    ];

    return (
      <ScrollView style={{backgroundColor: "#fff" }}>

        <View style={{flex: 1, height: 58}}>
          <NavigationBar
            containerStyle={{backgroundColor: "#177EF0"}}
            leftButton={{
              title: 'Voltar',
              handler: () => this.props.navigation.navigate("Requests"),
              tintColor: 'white',
            }}
            statusBar={statusBarConfig}
            title={titleConfig}
            />
        </View>

        <View style={{height: 44, justifyContent: "center", backgroundColor: "#F9FDFF"}}>
          <Text style={{color: "black", fontWeight: "bold", fontSize: 14, paddingLeft: 10}}> STATUS CONCLUÍDO </Text>
        </View>

        <FlatList
          data={listData}
          renderItem={(item) => {
            return (
              <View style={{height: 44, flexDirection: "row", backgroundColor: "white"}}>
                <View style={{flex: 0.1, alignItems: "center", justifyContent: "center"}}>
                  <Text style={{color: "#49C1B8", fontSize: 13, fontWeight: "bold"}}> {item.item.quantity}x </Text>
                </View>
                <View style={{flex: 0.64, justifyContent: "center"}}>
                  <Text style={{paddingLeft: 10, fontSize: 13}}>{item.item.name}</Text>
                </View>
                <View style={{flex: 0.26, alignItems: "center", justifyContent: "center"}}>
                  <Text style={{fontSize: 14, fontWeight: "bold"}}>{"R$ ".concat(item.item.price.toFixed(2).toString().replace(".", ","))}</Text>
                </View>
              </View>
            );}}
          keyExtractor={(item, index) => index.toString()} />

        <View style={{flex: 0.16, flexDirection: "row", backgroundColor: "#49C1B8"}}>
          <View style={{flex: 0.74, justifyContent: "center"}}>
            <Text style={{fontSize: 15, fontWeight: "bold", paddingLeft: 10}}>Total</Text>
            <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10, color: "white"}}>Sem taxa de entrega</Text>
          </View>
          <View style={{flex: 0.26, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 14, fontWeight: "bold", color: "white"}}> R$ 180,00 </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{flex: 0.4, justifyContent: "center"}}>
            <Text style={{fontSize: 14, fontWeight: "bold", paddingLeft: 10, paddingTop: 10, paddingBottom: 10, color: "black"}}>ENDERECO DE ENTREGA</Text>
            <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Al Jaú, 97</Text>
            <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Alphaville</Text>
            <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Santana de Parnaíba - SP</Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{fontSize: 14, fontWeight: "bold", paddingLeft: 10, paddingTop: 10, paddingBottom: 10, color: "black"}}>MAIS INFORMACOES</Text>

            <View style={{flex: 0.2, flexDirection: "row"}}>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Número do pedido</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 10}}>0001001609</Text>
              </View>
            </View>

            <View style={{flex: 0.2, flexDirection: "row"}}>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Pedido realizado</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 10}}>14:32 23/03/2018</Text>
              </View>
            </View>

            <View style={{flex: 0.2, flexDirection: "row"}}>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Pedido entregue</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 10}}>12:38 25/03/2018</Text>
              </View>
            </View>

            <View style={{flex: 0.2, flexDirection: "row"}}>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Forma de pagamento</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 10}}>VISA 7654</Text>
              </View>
            </View>

            <View style={{flex: 0.2, flexDirection: "row"}}>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>CPF/CNPJ na nota</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 10}}>sim</Text>
              </View>
            </View>

            <View style={{flex: 0.2, flexDirection: "row"}}>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", paddingLeft: 10}}>Obs para o entregador</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={{fontSize: 13, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 10}}>sim</Text>
              </View>
            </View>

          </View>
        </View>


        <TouchableOpacity style={{height: 64}} onPress={() => alert("test")}>
          <View style={{flex: 1, margin: 10, alignItems: "center", justifyContent: "center", borderRadius: 4, backgroundColor: "#0F63BB"}}>
            <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}> Refazer pedido </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const titleConfig = {
  tintColor: "white",
  title: "Detalhes do pedido",
}

const statusBarConfig = {
  tintColor: "#177EF0",
}


const styles = StyleSheet.create({
});
