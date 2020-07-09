import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Orders from './pages/Orders';
import NewOrder from './pages/NewOrder';
import Profile from './pages/Profile';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: '#f0f0f5' } }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={Home} />
        <Screen name="Orders" component={Orders} />
        <Screen name="NewOrders" component={NewOrder} />
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
}
