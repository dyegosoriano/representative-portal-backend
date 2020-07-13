import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ContainerButton, TextButton, IconButton } from './styles';

export default function Button({ title, icon, destiny }) {
  const navigation = useNavigation();
  const route = useRoute();

  const { user, token } = route.params;

  function handleNavigate(teste) {
    navigation.navigate(teste, { user, token });
  }

  return (
    <ContainerButton onPress={() => handleNavigate(destiny)}>
      <TextButton>{title}</TextButton>

      <IconButton>
        <Icon name={icon} color="#fff" size={25} />
      </IconButton>
    </ContainerButton>
  );
}
