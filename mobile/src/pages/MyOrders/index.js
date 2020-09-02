import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import ProductBox from '../../components/ProductBox'

import {
  OrderBox,
  OrderDate,
  OrderId,
  OrderStatus,
  ScrollOrders,
} from './styles'

const MyOrders = () => {
  const navigation = useNavigation()

  const [orders, setOrders] = useState([])

  async function getOrders() {
    try {
      const response = await api.get('/orders')

      setOrders(response.data)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
    }
  }

  function getOrder(order) {
    navigation.navigate('Order', { order })
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <ScrollOrders>
        {orders.map(order => (
          <ProductBox key={order.id}>
            <OrderBox>
              <OrderId>Pedido n˚ {order.id}</OrderId>
              <OrderDate>27/09/1988</OrderDate>

              {order.canceled_at && (
                <OrderStatus color="#f00">Cancelado</OrderStatus>
              )}

              {order.confirmed_at && (
                <OrderStatus color="#0A0">Aprovado</OrderStatus>
              )}
            </OrderBox>

            <Button title="Acessar" onPress={() => getOrder(order)} />
          </ProductBox>
        ))}
      </ScrollOrders>
    </>
  )
}

export default MyOrders
