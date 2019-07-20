import React, { Component } from "react";
import { AppRegistry, SectionList, StyleSheet, Text, View, AsyncStorage, TouchableOpacity, ScrollView, NavigationActions, Linking } from "react-native";
import Menu from "../Menu/Menu";
import SideMenu from "react-native-side-menu";
import Navbar from "../Navbar/Navbar";

import EntypoIcon from "@expo/vector-icons/Entypo";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

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
      selectedItem: "Contato"
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

    const callArgs = {
      number: '11972881609',
      prompt: false
    }

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <Navbar toggle={this.toggle} title="Contato" />
        <ScrollView style={{backgroundColor: '#F0F0F0'}}>
          <SectionList
            style={{ backgroundColor: "#EFEFF4", flex: 1 }}
            sections={[
              {
                title: "Telefones:",
                data: [{ name: "Whatsapp - Problemas no pedido", link: "", icon: <FontAwesomeIcon name="whatsapp" size={16} color="#177EF0" />, onPress: () => {
                  Linking.canOpenURL('whatsapp://send?text=test&phone=11972881609').then(supported => {
                  if (!supported) {
                    alert("Verifique se você possui o Whatsapp instalado!")
                  } else {
                    return Linking.openURL('whatsapp://send?text=test&phone=11972881609');
                  }
                  }).catch(err => console.error('An error occurred', err));
                }},
                { name: "Ligação - Problemas no pedido", link: "", icon: <EntypoIcon name="phone" size={16} color="#177EF0" />, onPress: () => {
                  Linking.openURL('tel:(11)972881609')
                }}]
              },
              {
                title: "Emails:",
                data: [{ name: "Envie sua sugestão", link: "", icon: <MaterialIcon name="question-answer" size={16} color="#177EF0" />, onPress: () => {
                  Linking.openURL('mailto:contact@aguajah.com?subject=Sugestão&body=example')
                }},
                { name: "Problemas no pedido", link: "", icon: <FontAwesomeIcon name="exclamation" size={16} color="#177EF0" />, onPress: () => {
                  Linking.openURL('mailto:support@aguajah.com?subject=Problema%20no%20pedido&body=example')
                }}]
              }
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={{borderWidth: 1, borderColor: '#F0F0F0'}} onPress={() => item.onPress()}>
                <View style={{height: 44, backgroundColor: '#FFFFFF', flexDirection: 'row'}}>
                  <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                    {item.icon}
                  </View>
                  <View style={{flex: 0.8, justifyContent: 'center'}}>
                    <Text style={{paddingLeft: 5}}>{item.name}</Text>
                  </View>
                  <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                    <EntypoIcon name="chevron-thin-right" size={16} color="#177EF0" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <View style={{height: 44, backgroundColor: '#EFEFF4', flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>{section.title}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </SideMenu>
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

AppRegistry.registerComponent("aguajah", () => Profile);
