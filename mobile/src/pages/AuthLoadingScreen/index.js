import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';

export default function AuthLoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    async function handleUserNextScreen() {
      const userToken = await AsyncStorage.getItem('@ListApp:userToken');

      navigation.navigate(userToken ? 'Home' : 'Login');
    }

    handleUserNextScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00bfa5" />
    </View>
  );
}
