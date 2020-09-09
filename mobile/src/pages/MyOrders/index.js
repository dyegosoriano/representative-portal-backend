import React, { useState, useEffect } from 'react'
import { Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import Loading from '../Loading'
import ProductBox from '../../components/ProductBox'

import {
  OrderBox,
  OrderDate,
  OrderId,
  OrderStatus,
  ScrollOrders,
} from './styles'

export default function MyOrders() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const navigation = useNavigation()

  function getOrder(order) {
    navigation.navigate('Order', { order })
  }

  async function getOrders() {
    try {
      const response = await api.get('/orders')

      setOrders(response.data)
      setLoading(false)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      Alert.alert('Ops!!!', 'Houve um problema com a conexão', [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ])
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  if (loading) return <Loading />

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
