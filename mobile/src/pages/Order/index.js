import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, ExitButton, Title } from './styles';

const Order = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <ExitButton onPress={handleNavigateBack}>
          <Icon name="arrow-left" color="#00bfa5" size={24} />
        </ExitButton>

        <Title>Novo Pedido</Title>
      </Header>
    </Container>
  );
};

export default Order;
