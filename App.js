import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, AsyncStorage, Image, Dimensions } from 'react-native';

import { createStackNavigator, SafeAreaView } from "react-navigation";
import Intro from "./src/components/Intro/Intro";
import Login from "./src/components/Login/Login";
import DeliveryPlace from "./src/components/DeliveryPlace/DeliveryPlace";
import Products from "./src/components/Products/Products";
import SearchZipCode from "./src/components/SearchZipCode/SearchZipCode";
import PaymentForm from "./src/components/PaymentForm/PaymentForm";
import FinalizePurchase from "./src/components/FinalizePurchase/FinalizePurchase";
import LoginModal from "./src/components/Login/LoginModal";
import RegisterModal from "./src/components/Login/RegisterModal";
import CpfForm from "./src/components/PaymentForm/CpfForm";
import Profile from "./src/components/Profile/Profile";
import Status from "./src/components/Status/Status";
import Requests from "./src/components/Requests/Requests";
import RequestDetail from "./src/components/Requests/RequestDetail";
import AuthLoadingScreen from "./src/components/AuthLoadingScreen";
// import ProductList from "./src/components/FinalizePurchase";
import Contact from "./src/components/Contact/Contact";
import Info from "./src/components/Info/Info";


const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


const RootStack = createStackNavigator({
  Intro: { screen: Intro },
  Login: { screen: Login },
  LoginModal: { screen: LoginModal },
  RegisterModal: { screen: RegisterModal },
  SearchZipCode: { screen: SearchZipCode },
  DeliveryPlace: { screen: DeliveryPlace },
  Products: { screen: Products },
  Profile: { screen: Profile },
  PaymentForm: { screen: PaymentForm },
  CpfForm: { screen: CpfForm },
  FinalizePurchase: { screen: FinalizePurchase },
  Requests: { screen: Requests},
  RequestDetail: { screen: RequestDetail },
  AuthLoadingScreen: { screen: AuthLoadingScreen},
  Contact: { screen: Contact },
  Info: { screen: Info },
},{
  initialRouteName: "AuthLoadingScreen",
  headerMode: "none",
}
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <RootStack />
    
  );
}
}
