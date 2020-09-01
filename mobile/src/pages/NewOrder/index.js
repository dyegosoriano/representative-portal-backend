import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert, Button } from 'react-native';

import { Container, OptionsBox, Title } from './styles';

const NewOrder = () => {
  const navigation = useNavigation();

  async function confirmOrder() {
    Alert.alert('Aviso', 'Deseja concluir o pedido?', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
      { text: 'Cancelar' },
    ]);
  }

  async function cancelOrder() {
    Alert.alert('Aviso', 'Deseja cancelar o pedido?', [
      { text: 'OK', onPress: () => navigation.goBack() },
      { text: 'Cancelar' },
    ]);
  }

  return (
    <Container>
      <Title>Pedido numero: 231</Title>

      <OptionsBox>
        <Button title="Confirmar" onPress={() => confirmOrder()} />
        <Button title="Novo item" />
        <Button title="Cancelar" onPress={() => cancelOrder()} />
      </OptionsBox>
    </Container>
  );
};

export default NewOrder;
