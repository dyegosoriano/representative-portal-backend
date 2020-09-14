import React, { useState, useEffect } from 'react'
import { Alert, Button, Modal, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import api from '../../services/api'

import AddItems from '../../components/AddItems'
import ProductBox from '../../components/ProductBox'
import LoadingModal from '../../components/LoadingModal'

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

  const { confirmed_at } = order

  async function getItens() {
    try {
      const response = await api.get(`/orders/${order.id}`)
      setProductsOrder(response.data.itens)
      setLoading(false)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
      Alert.alert('Ops!!!', 'Houve um problema com a conexão!')
    }
  }

  async function deleteItem(id) {
    try {
      await api.delete(`/items/${id}`)
      getItens()
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
      Alert.alert('Ops!!!', 'Houve um problema com a conexão!')
    }
  }

  async function confirmOrder() {
    Alert.alert('Aviso', 'Deseja concluir o pedido?', [
      {
        text: 'OK',
        onPress: async () => {
          try {
            await api.put(`/orders/${order.id}`, { confirm: true })
            navigation.goBack()
          } catch (error) {
            console.log(`error.message >>> ${error.message} <<<`)
            Alert.alert('Ops!!!', 'Houve um problema com a conexão!')
          }
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
          try {
            await api.delete(`/orders/${order.id}`)
            navigation.goBack()
          } catch (error) {
            console.log(`error.message >>> ${error.message} <<<`)
            Alert.alert('Ops!!!', 'Houve um problema com a conexão!')
          }
        },
      },
      { text: 'Cancelar' },
    ])
  }

  useEffect(() => {
    getItens()
  }, [])

  return (
    <Container>
      <LoadingModal loading={loading} />

      <Modal animationType="slide" visible={modalVisible}>
        <AddItems
          order_id={order.id}
          products={productsOrder}
          setProducts={setProductsOrder}
          modalVisible={setModalVisible}
        />
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

      {!confirmed_at && (
        <Footer>
          <Button title="Confirmar" onPress={() => confirmOrder()} />
          <Button title="Novo item" onPress={() => setModalVisible(true)} />
          <Button title="Cancelar" onPress={() => cancelOrder()} color="#f00" />
        </Footer>
      )}
    </Container>
  )
}

export default Order
