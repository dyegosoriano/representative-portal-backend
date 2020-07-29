import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  TotalOrders,
  ContainerOrders,
  Order,
  OrderId,
  Tag,
  StatusText,
} from './styles';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get('/orders');

        const { count, rows } = response.data;

        setOrders(rows);
        setTotal(count);
      } catch (error) {
        console.log(`error.message >>> ${error.message} <<<`);
      }
    }

    getOrders();
  }, []);

  function getOrder(order) {
    navigation.navigate('Order', { order });
  }

  return (
    <>
      <ContainerOrders>
        {orders.map((order) => (
          <Order key={order.id} onPress={() => getOrder(order)}>
            <OrderId>Pedido n˚ {order.id}</OrderId>

            {order.canceled_at && (
              <Tag color="#ff1744">
                <StatusText>Cancelado</StatusText>
              </Tag>
            )}

            {order.confirmed_at && (
              <Tag color="#00e676">
                <StatusText>Aprovado</StatusText>
              </Tag>
            )}
          </Order>
        ))}
      </ContainerOrders>

      <TotalOrders>Total de pedidos: {total}</TotalOrders>
    </>
  );
};

export default MyOrders;
