//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import NavBar, { NavButton, NavButtonText, NavTitle } from "react-native-nav";

import Icon from "@expo/vector-icons/Entypo";

// create a component
export default function Navbar({ toggle, title, navigation, goTo }) {
  const navigationLeft = toggle == true;

  if (navigationLeft) {
    return (
      <View>
        <NavBar style={styles} statusBar={{ barStyle: "light-content" }}>
          <NavButton
            onPress={() => navigation.navigate(goTo)}
            style={{ marginLeft: 0 }}
          >
            <NavButtonText>
              <Icon name="chevron-small-left" size={20} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 12, marginTop: -50 }}>
                VOLTAR
              </Text>
            </NavButtonText>
          </NavButton>
          <NavTitle style={styles.title}>{title}</NavTitle>
          <NavButton
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </NavBar>
      </View>
    );
  } else {
    return (
      <View>
        <NavBar style={styles} statusBar={{ barStyle: "light-content" }}>
          <NavButton onPress={() => toggle()} style={{ marginLeft: 0 }}>
            <NavButtonText>
              <Icon name="menu" size={30} color="#fff" />
            </NavButtonText>
          </NavButton>
          <NavTitle style={styles.title}>{title}</NavTitle>
          <NavButton />
        </NavBar>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  statusBar: {
    // StatusBar styles here (all view styles are valid)

    // default iOS styles:
    backgroundColor: "#177EF0",

    // default Android styles:
    backgroundColor: "#177EF0"
  },
  navBarContainer: {
    // NavBarContainer styles here (all view styles are valid)
    // unlikely that you will need to add any styles here
  },
  title: {
    color: "#fff",
    fontSize: 14
  },

  buttonText: {
    color: "#fff"
  },
  navBar: {
    // NavBar styles here (all view styles are valid)

    // default shared styles:
    borderTopWidth: 0,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // default iOS styles:
    backgroundColor: "#177EF0",
    paddingLeft: 8,
    paddingRight: 8,

    // default Android styles:
    backgroundColor: "#177EF0",
    padding: 16
  }
});

// Navbar.propTypes = {
//   toggle: PropTypes.func.isRequired
// };
