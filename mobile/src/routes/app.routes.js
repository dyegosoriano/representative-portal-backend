import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Order from '../pages/Order';
import MyOrders from '../pages/MyOrders';
import NewOrder from '../pages/NewOrder';
import Profile from '../pages/Profile';

export default function Routes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f0f0f5' } }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="NewOrders" component={NewOrder} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
