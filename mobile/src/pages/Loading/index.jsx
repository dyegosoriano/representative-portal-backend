import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// import { Container } from './styles';

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00bfa5" />
    </View>
  );
};

export default Loading;
