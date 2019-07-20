import React, { Component } from "react";
import { AppRegistry, SectionList, StyleSheet, Text, View, AsyncStorage, TouchableOpacity, ScrollView, NavigationActions, Linking } from "react-native";
import Menu from "../Menu/Menu";
import SideMenu from "react-native-side-menu";
import Navbar from "../Navbar/Navbar";

import Icon from "@expo/vector-icons/Entypo";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import IoniconIcon from "@expo/vector-icons/Ionicons";

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
      selectedItem: "Informações"
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

  openUrl(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
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
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}>
        <Navbar toggle={this.toggle} title="Informações" />
        <ScrollView style={{backgroundColor: '#F0F0F0'}}>
          <SectionList
            style={{ backgroundColor: "#EFEFF4", flex: 1 }}
            sections={[
              {
                title: "Sites:",
                data: [
                { name: "Site da Aguajah", link: "", icon: <Icon name="chevron-thin-right" size={16} color="#177EF0" />, url: "http://www.google.com"},
                { name: "Site da Frescca", link: "", icon: <Icon name="chevron-thin-right" size={16} color="#177EF0" />, url: "http://www.google.com"},
                { name: "Site da Uppdate", link: "", icon: <Icon name="chevron-thin-right" size={16} color="#177EF0" />, url: "http://www.google.com"}]
              },
              {
                title: "Redes Sociais:",
                data: [{ name: "Instagram Aguajah", link: "", icon: <Icon name="instagram" size={16} color="#177EF0" />, url: "http://www.google.com"},
                { name: "Facebook Aguajah", link: "", icon: <Icon name="facebook-with-circle" size={16} color="#177EF0" />, url: "http://www.google.com"}]
              },
              {
                title: "Legal:",
                data: [{ name: "Politica de privacidade", link: "", icon: <FontAwesomeIcon name="legal" size={16} color="#177EF0" />, url: "http://www.google.com"},
                { name: "Termos de uso", link: "", icon: <IoniconIcon name="ios-paper" size={16} color="#177EF0" />, url: "http://www.google.com"}]
              }
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={{borderWidth: 1, borderColor: '#F0F0F0'}} onPress={() => this.openUrl(item.url)}>
                <View style={{height: 44, backgroundColor: '#FFFFFF', flexDirection: 'row'}}>
                  <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                    {item.icon}
                  </View>
                  <View style={{flex: 0.8, justifyContent: 'center'}}>
                    <Text style={{paddingLeft: 5}}>{item.name}</Text>
                  </View>
                  <View style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="chevron-thin-right" size={16} color="#177EF0" />
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
