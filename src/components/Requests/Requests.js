/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, ScrollView, Text, FlatList, Modal } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


import Icon from '@expo/vector-icons/Entypo';
import Navbar from "../Navbar/Navbar";
import Menu from "../Menu/Menu";
import SideMenu from "react-native-side-menu";

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const data = [
  {
    key: "0",
    month: "DEZ",
    address: "Al Tupiniquins",
    day: 21,
    datePlaceholder: "Quinta, 21 de Dezembro de 2017",
    price: 102.30,
  }
];

const SecondRoute = () => <View style={[ { flex: 1 }, { backgroundColor: '#673ab7' } ]} />;

type Props = {};
export default class Requests extends Component<Props> {
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
  state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Abertos' },
        { key: 'second', title: 'Concluídos' },
      ],
      isOpen: false,
      modalVisible: false,
    };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar style={{backgroundColor: 'white', borderColor: '#F5F3F5', borderWidth: 1}} tabStyle={{ borderColor: '#F5F3F5', borderWidth: 1}} indicatorStyle={{ backgroundColor: "#1CA29C", height: 4}} labelStyle={{ color: "#1CA29C"}} {...props} />;

  _renderScene = SceneMap({
    first: () => {
      return (
        <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={{height: responsiveHeight(10)}} onPress={() => this.props.navigation.navigate("RequestDetail")} >
                  <View style={{height: responsiveHeight(10), flexDirection: "row", backgroundColor: 'white', borderWidth: 1, borderColor: '#E9E9E9'}}>
                    <View style={{flex: 0.12, marginVertical: 5, marginHorizontal: 10 }}>
                      <View style={{flex: 0.44, backgroundColor: '#43A99E', borderTopLeftRadius: 4, borderTopRightRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>{item.month}</Text>
                      </View>
                      <View style={{flex: 0.56, backgroundColor: '#EDEBEC', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, alignItems: 'center', justifyContent: 'center'  }}>
                        <Text style={{fontWeight: 'bold'}}>{item.day}</Text>
                      </View>
                    </View>
                    <View style={{flex: 0.60, backgroundColor: 'white', justifyContent: 'center' }}>
                      <Text style={{fontSize: 9}}>Pedido Entregue em <Text style={{fontWeight: 'bold', fontSize: 10}}>{item.address}</Text></Text>
                      <Text style={{color: '#09A995', fontSize: 11}}>{item.datePlaceholder}</Text>
                    </View>
                    <View style={{flex: 0.20, backgroundColor: 'white', justifyContent: 'center' }}>
                      <Text style={{fontWeight: 'bold', fontSize: 10}}>{"R$ ".concat(item.price.toFixed(2).toString().replace(".", ","))}</Text>
                    </View>
                    <View style={{flex: 0.08, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="chevron-right" size={30} color="#43A99E" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={ item => item.key}
            />
        </ScrollView>
      );
    },
    second: SecondRoute,
  });

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item
    });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={this.props.navigation}/>;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.setState({isOpen})}
      >
        <Navbar
          toggle={this.toggle}
          title="Faça seu pedido"
          navigation={this.props.navigation}
          goTo="Profile"
        />
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { return true }}>
          <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
          <View style={{backgroundColor: 'red', flex: 1}}>
          </View>
          </TouchableOpacity>
        </Modal>
      </SideMenu>
    );
  }
}
