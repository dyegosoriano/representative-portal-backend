import React, { useState, useEffect } from 'react'
import { Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import Loading from '../Loading'
import ProductBox from '../../components/ProductBox'

import { OrderBox, OrderDate, OrderId, OrderStatus, ListOrders } from './styles'

export default function MyOrders() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)

  const navigation = useNavigation()

  function getOrder(order) {
    navigation.navigate('Order', { order })
  }

  async function loadOrders() {
    try {
      const response = await api.get('/orders', { params: { page } })

      setOrders([...orders, ...response.data])

      setLoading(false)
      setPage(+1)
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
    loadOrders()
  }, [])

  if (loading) return <Loading />

  return (
    <ListOrders
      data={orders}
      onEndReached={loadOrders}
      onEndReachedThreshold={0.5}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <ProductBox key={item.id}>
          <OrderBox>
            <OrderId>Pedido n˚ {item.id}</OrderId>
            <OrderDate>27/09/1988</OrderDate>

            {item.canceled_at && (
              <OrderStatus color="#f00">Cancelado</OrderStatus>
            )}

            {item.confirmed_at && (
              <OrderStatus color="#0A0">Aprovado</OrderStatus>
            )}
          </OrderBox>

          <Button title="Acessar" onPress={() => getOrder(item)} />
        </ProductBox>
      )}
    />
  )
}
