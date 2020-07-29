import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
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
      <Stack.Screen name="Dashboard" component={Dashboard} />

      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{ title: 'Meus pedidos' }}
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{ title: 'Pedido' }}
      />

      <Stack.Screen
        name="NewOrders"
        component={NewOrder}
        options={{ title: 'Novo pedido' }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}
