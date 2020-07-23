import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

import api from '../../services/api';

import { Container, Header, ExitButton, Title } from './styles';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    async function getOrders() {
      try {
        const token = JSON.parse(
          await AsyncStorage.getItem('@ListApp:userToken')
        );

        const response = await api.get('/orders', {
          headers: {
            authorization: token,
          },
        });

        const { count, rows } = response.data;

        setOrders(rows);
        setTotal(count);
      } catch (error) {
        console.log(`error.message >>> ${error.message} <<<`);
      }
    }

    getOrders();
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <ExitButton onPress={handleNavigateBack}>
          <Icon name="arrow-left" color="#00bfa5" size={24} />
        </ExitButton>

        <Title>Meus Pedidos</Title>
      </Header>
    </Container>
  );
};

export default Orders;
