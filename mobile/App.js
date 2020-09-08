import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './src/contexts/auth'

import Routes from './src/routes'

require('react-native').unstable_enableLogBox()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
