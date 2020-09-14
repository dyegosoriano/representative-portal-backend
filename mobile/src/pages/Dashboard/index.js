import React, { useContext } from 'react'
import { Alert, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AuthContext from '../../contexts/auth'

import api from '../../services/api'

import { Header, UserCnpj, UserName, Footer } from './styles'

export default function Dashboard() {
  const { user, handleSignOut } = useContext(AuthContext)

  const navigation = useNavigation()

  async function getNewOrder() {
    try {
      const response = await api.post('/orders')
      const order = response.data
      navigation.navigate('Order', { order })
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

  return (
    <>
      <Header>
        <UserName>{user.name}</UserName>
        <UserCnpj>CNPJ: {user.cnpj}</UserCnpj>
      </Header>

      <Footer>
        <Button title="Novo pedido" onPress={getNewOrder} />

        <Button
          title="Meus pedidos"
          onPress={() => navigation.navigate('MyOrders')}
        />

        <Button title="Sair" onPress={handleSignOut} color="#f00" />
      </Footer>
    </>
  )
}
