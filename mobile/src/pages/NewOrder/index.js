import React from 'react';
import { Button } from 'react-native';

import { Container, OptionsBox, Title } from './styles';

const NewOrder = () => {
  return (
    <Container>
      <Title>Pedido numero: 231</Title>

      <OptionsBox>
        <Button title="Confirmar" />
        <Button title="Novo item" />
        <Button title="Cancelar" />
      </OptionsBox>
    </Container>
  );
};

export default NewOrder;
