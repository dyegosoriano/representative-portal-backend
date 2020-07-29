import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Button, Text, IconButton } from './styles';

export default function ButtonComponent({ title, icon, destiny }) {
  const navigation = useNavigation();

  function handleNavigate(direction) {
    navigation.navigate(direction);
  }

  return (
    <Button onPress={() => handleNavigate(destiny)}>
      <Text>{title}</Text>

      <IconButton>
        <Icon name={icon} color="#fff" size={25} />
      </IconButton>
    </Button>
  );
}
