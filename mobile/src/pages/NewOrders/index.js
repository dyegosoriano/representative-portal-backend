import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';

import { Container, Header, ExitButton, Title } from './styles';

const Orders = () => {
  return (
    <Container>
      <Header>
        <ExitButton>
          <Icon name="arrow-left" color="#00bfa5" size={24} />
        </ExitButton>

        <Title>Novo Pedido</Title>
      </Header>
    </Container>
  );
};

export default Orders;
