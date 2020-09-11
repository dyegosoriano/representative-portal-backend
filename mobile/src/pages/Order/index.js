import React, { useState, useEffect } from 'react'
import { Alert, Button, Modal, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import api from '../../services/api'

import Loading from '../Loading'
import AddItems from '../../components/AddItems'
import ProductBox from '../../components/ProductBox'

import {
  Container,
  Footer,
  ProductName,
  ProductText,
  ScrollProducts,
  Strong,
  Title,
} from './styles'

const Order = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  const [productsOrder, setProductsOrder] = useState([])

  const navigation = useNavigation()
  const route = useRoute()

  const { order } = route.params

  async function getItens() {
    try {
      const response = await api.get(`/orders/${order.id}`)

      setProductsOrder(response.data.itens)
      setLoading(false)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
    }
  }

  async function deleteItem(id) {
    try {
      await api.delete(`/items/${id}`)

      getItens()
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
    }
  }

  async function confirmOrder() {
    Alert.alert('Aviso', 'Deseja concluir o pedido?', [
      {
        text: 'OK',
        onPress: async () => {
          await api.put(`/orders/${order.id}`, { closed: true })

          navigation.goBack()
        },
      },
      { text: 'Cancelar' },
    ])
  }

  async function cancelOrder() {
    Alert.alert('Aviso', 'Deseja cancelar o pedido?', [
      {
        text: 'OK',
        onPress: async () => {
          await api.delete(`/orders/${order.id}`)

          navigation.goBack()
        },
      },
      { text: 'Cancelar' },
    ])
  }

  useEffect(() => {
    getItens()
  }, [])

  if (loading) return <Loading />

  return (
    <Container>
      <Modal animationType="slide" visible={modalVisible}>
        <AddItems modalVisible={setModalVisible} order_id={order.id} />
      </Modal>

      <Title>
        Pedido: <Strong>{order.id}</Strong>
      </Title>

      <ScrollProducts
        data={productsOrder}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ProductBox>
            <View>
              <ProductName>Chocolate</ProductName>
              <ProductText>
                Quantidade: <Strong>{item.amount}</Strong>
              </ProductText>
              <ProductText>
                valor total: <Strong>R$ {item.total_price}</Strong>
              </ProductText>
            </View>

            <Button
              title="Excluir"
              color="#f00"
              onPress={() => deleteItem(item.id)}
            />
          </ProductBox>
        )}
      />

      <Footer>
        <Button title="Confirmar" onPress={() => confirmOrder()} />
        <Button title="Novo item" onPress={() => setModalVisible(true)} />
        <Button title="Cancelar" onPress={() => cancelOrder()} color="#f00" />
      </Footer>
    </Container>
  )
}

export default Order
