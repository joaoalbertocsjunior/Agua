import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  StatusBar 
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "@expo/vector-icons/Entypo";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

class Intro extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#177EF0",
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      borderBottomColor: "transparent"
    },
    headerTintColor: "#ffffff",
    // header: ,
  };

  componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

  componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

  handleBackButton() {
        return true;
    }

  constructor(props) {
    super(props);

    this.state = {
      // scrollEnabled: true
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Swiper
        ref="swiper"
        style={styles.wrapper}
        showsButtons={false}
        paginationStyle={styles.dotStyle}
        activeDotStyle={styles.activeDot}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        index={0}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../images/001_onboarding-celular.png")}
          />

          <Icon
            onPress={() => this.refs.swiper.scrollBy(1)}
            name="chevron-right"
            size={25}
            color="#0EA79B"
            style={styles.buttonNext}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../images/002_onboarding-entrega.png")}
          />
          <Icon
            onPress={() => this.refs.swiper.scrollBy(1)}
            name="chevron-right"
            size={25}
            color="#0EA79B"
            style={styles.buttonNext}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../images/003_onboarding-reciclagem.png")}
          />
          <Icon
            onPress={() => this.refs.swiper.scrollBy(1)}
            name="chevron-right"
            size={25}
            color="#0EA79B"
            style={styles.buttonNext}
          />
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../images/004_onboarding-solidariedade.png")}
          />
          <Icon
            onPress={() => this.refs.swiper.scrollBy(1)}
            name="chevron-right"
            size={25}
            color="#0EA79B"
            style={styles.buttonNext}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../images/005_onboarding-permissoes.png")}
          />
          <TouchableOpacity
            style={styles.buttonStart}
            onPress={() => navigate("Login")}
          >
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  dotStyle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
    bottom: 15,
    backgroundColor: "transparent"
  },

  buttonStart: {
    position: "absolute",
    right: 20,
    bottom: 20
  },

  buttonText: {
    color: "#0EA79B",
    fontSize: 20
  },

  activeDot: {
    backgroundColor: "#0EA79B"
  },
  backgroundImage: {
    width,
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  imageContainer: {
    backgroundColor: "#136ED3",
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    position: 'absolute',
    top: '-5%',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  buttonNext: {
    position: "absolute",
    bottom: 10,
    right: 20
  }
});

export default Intro;
