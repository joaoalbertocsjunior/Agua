import React, { Component } from "react";
import { AppRegistry, SectionList, StyleSheet, Text, View, AsyncStorage } from "react-native";
import Menu from "../Menu/Menu";
import SideMenu from "react-native-side-menu";
import Navbar from "../Navbar/Navbar";

// create a component
export default class Profile extends Component {
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

  constructor() {
    super();

    this.state = {
      isOpen: false,
      selectedItem: "Minha conta"
    };
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

  async signOut() {
    try {
      await AsyncStorage.removeItem("listOfProducts");
      await AsyncStorage.removeItem("@authenticationToken");
      await AsyncStorage.removeItem("currentUser");

      this.props.navigation.navigate("Login");
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const menu = (
      <Menu
        onItemSelected={this.onMenuItemSelected}
        navigation={this.props.navigation}
      />
    );

    return (
      <View style={styles.container}>
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <Navbar toggle={this.toggle} title="Minha conta" />
          <SectionList
            style={{ backgroundColor: "#EFEFF4", flex: 1 }}
            sections={[
              {
                title: "DADOS CADASTRAIS ",
                data: [{ name: "Editar dados", link: "" }]
              },
              {
                title: "DADOS PARA ENTREGA",
                data: [
                  { name: "Endereços", link: "SearchZipCode" },
                  { name: "Pagamentos", link: "" }
                ]
              },
              {
                title: "MAIS INFORMAÇÕES",
                data: [
                  { name: "Código de desconto", link: "" },
                  { name: "Termos de uso", link: "" }
                ]
              }
            ]}
            renderItem={({ item }) => (
              <Text style={styles.item} onPress={() => navigate(item.link)}>
                {item.name}
              </Text>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => index}
          />
          <View
            style={{
              flex: 0,
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              height: 44,
              width: "100%",
              backgroundColor: "white",
              marginBottom: 100
            }}
          >
            <Text onPress={() => this.signOut()} style={styles.textSignOut}>
              Sair
            </Text>
          </View>
          <View style={styles.footer}>
            <Text>Frescca Água Mineral App</Text>
            <Text>Copyright 2018 Frescca. Todos os direitos reservados</Text>
          </View>
        </SideMenu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "#EFEFF4"
  },
  sectionHeader: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#EFEFF4",
    height: 44
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
    backgroundColor: "white"
  },
  textSignOut: {
    backgroundColor: "white",
    color: "red",
    paddingTop: 13,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center"
  },
  footer: {
    backgroundColor: "#EFEFF4",
    flex: 0,
    bottom: 0,
    position: "absolute",
    width: "100%",
    height: 100,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 20
  }
});

AppRegistry.registerComponent("FresccaApp", () => Profile);
