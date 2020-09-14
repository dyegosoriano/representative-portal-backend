import React, { useState, useEffect } from 'react'
import { Alert, Button, Text, TextInput, View } from 'react-native'

import api from '../../services/api'

import { BoxAmount, BoxModal, BoxModalText, Picker, Strong } from './styles'

const AddItems = ({ order_id, modalVisible, products, setProducts }) => {
  const [allProducts, setAllProducts] = useState([])

  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState(null)
  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState(0)

  async function confirmProduct() {
    try {
      if (!productId) {
        Alert.alert('Ops!!!', 'Selecione um produto')
        return
      }

      const response = await api.post('/items', {
        product_id: productId,
        order_id,
        amount,
      })

      setProducts([...products, response.data])

      modalVisible(false)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
      Alert.alert('Ops!!!', 'Houve um problema com a conexão!')
    }
  }

  async function getProducts() {
    try {
      const response = await api.get('/products')
      setAllProducts(response.data)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)
      Alert.alert('Ops!!!', 'Houve um problema com a conexão!')
    }
  }

  useEffect(() => {
    const filteredProduct = allProducts.filter(
      item => item.name_product === productName
    )

    if (filteredProduct.length === 1) {
      const result = filteredProduct[0]

      setPrice(Number(result.price))
      setProductId(result.id)
    }
  }, [productName])

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <BoxModal>
      <View>
        <BoxModalText>
          Produto selecionado: <Strong>{productName}</Strong>
        </BoxModalText>

        <BoxModalText>
          Valor unitário:{' '}
          <Strong>
            {price.toLocaleString('pt-Br', {
              style: 'currency',
              currency: 'Brl',
            })}
          </Strong>
        </BoxModalText>

        <BoxModalText>
          Valor total:{' '}
          <Strong>
            {(price * amount).toLocaleString('pt-Br', {
              style: 'currency',
              currency: 'Brl',
            })}
          </Strong>
        </BoxModalText>

        <BoxAmount>
          <Text>Quantidade: </Text>
          <TextInput
            onChange={value => setAmount(Number(value.nativeEvent.text))}
            placeholder="Insira o valor desejado"
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </BoxAmount>
      </View>

      <Picker
        selectedValue={productName}
        onValueChange={value => setProductName(value)}
      >
        {allProducts.map(product => (
          <Picker.Item
            key={product.id}
            value={product.name_product}
            label={product.name_product}
          />
        ))}
      </Picker>

      <View>
        <Button title="Adicionar" onPress={confirmProduct} />
        <Button
          title="Cancelar"
          color="#f00"
          onPress={() => modalVisible(false)}
        />
      </View>
    </BoxModal>
  )
}

export default AddItems
