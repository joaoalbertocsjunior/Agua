import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Dimensions } from 'react-native';

const { height } = Dimensions.get("window");

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@authenticationToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Products' : 'Intro');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>

      <ActivityIndicator
      size="large"
      color="#0EA79B"
      animating={true}
      style={{
        position: "absolute",
        padding: 10,
        alignSelf: "center",
        marginTop: height / 2.5
      }}
      />
        <StatusBar barStyle="default" />
      </View>

      );
  }
};

export default AuthLoadingScreen;