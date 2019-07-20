import { createStackNavigator } from 'react-navigation';

import Intro from '../components/Intro/Intro';
import Login from '../components/Login/Login';
import Products from '../components/Products/Products';

export const VisitanteRoutes = StackNavigator({
	
	Login: {
		screen: Login
  	},
});

export const UsuarioRoutes = StackNavigator({
	Products: {
		screen: Products,
		navigationOptions: {
			title: "Faça seu pedido"
		}
	  },
	  
});

export const RootStack = (route) => {

	var routeName = toString(route);
	return StackNavigator({
	  VisitanteRoutes: { screen: VisitanteRoutes },
	  UsuarioRoutes: { screen: UsuarioRoutes }
	},
	{
	  headerMode: "none",
	  mode: "modal",
	  initialRouteName: routeName,
	  navigationOptions: {
		gesturesEnabled: false
	  }
	});
  };