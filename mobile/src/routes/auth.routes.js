import * as React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../pages/SignIn'

export default function Routes() {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: '#f0f0f5' } }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  )
}
