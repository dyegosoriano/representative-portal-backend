import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  TotalOrders,
  ContainerOrders,
  Order,
  OrderId,
  OrderDate,
  Canceled,
} from './styles';

const Orders = () => {
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

  function formateDate(date) {
    const dateTime = Date.parse(date);

    return dateTime;
  }

  function getOrder(order) {
    navigation.navigate('Order', { order });
  }

  return (
    <>
      <TotalOrders>Total de pedidos: {total}</TotalOrders>

      <ContainerOrders>
        {orders.map((order) => (
          <Order key={order.id} onPress={() => getOrder(order)}>
            <OrderId>Ordem de serviço {order.id}</OrderId>

            {order.canceled_at && (
              <Canceled>
                Cancelamento: {formateDate(order.canceled_at)}
              </Canceled>
            )}

            <OrderDate>Criado: {formateDate(order.createdAt)}</OrderDate>
          </Order>
        ))}
      </ContainerOrders>
    </>
  );
};

export default Orders;
