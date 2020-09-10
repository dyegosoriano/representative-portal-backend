import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import Loading from '../Loading'

const NewOrder = () => {
  const navigation = useNavigation()

  async function getNewOrder() {
    try {
      const response = await api.post('/orders')

      const order = response.data

      navigation.navigate('Order', { order })
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

  useEffect(() => {
    getNewOrder()
  }, [])

  return <Loading />
}

export default NewOrder
