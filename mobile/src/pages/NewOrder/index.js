import React, { useEffect, useState } from 'react'

import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import Loading from '../Loading'
import ItemsList from '../../components/ItemsList'

const NewOrder = () => {
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    async function getNewOrder() {
      try {
        const response = await api.post('/orders')

        setOrder(response.data)
        setLoading(false)
      } catch (error) {
        console.log(`error.message >>> ${error.message} <<<`)

        Alert.alert('Alerta', 'Houve um problema com a conexão', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ])
      }
    }

    getNewOrder()
  }, [])

  return loading ? <Loading /> : <ItemsList order={order} />
}

export default NewOrder
