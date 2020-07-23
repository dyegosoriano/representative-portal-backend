import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

import api from '../../services/api';

import Button from '../../components/Button';

import {
  Container,
  Header,
  UserCnpj,
  UserName,
  Footer,
  ButtonText,
  ButtonIcon,
  ExitButton,
} from './styles';

const Home = () => {
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  async function handleExit() {
    await AsyncStorage.removeItem('@ListApp:userToken');
    navigation.navigate('Login');
  }

  useEffect(() => {
    async function loadingUser() {
      try {
        const token = JSON.parse(
          await AsyncStorage.getItem('@ListApp:userToken')
        );

        const response = await api.get('/user', {
          headers: {
            authorization: token,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log(`error.message >>> ${error.message} <<<`);
      }
    }

    loadingUser();
  }, []);

  return (
    <Container>
      <Header>
        <UserName>{user.name}</UserName>
        <UserCnpj>CNPJ: {user.cnpj}</UserCnpj>
      </Header>

      <Footer>
        <Button title="Novo pedido" destiny="NewOrders" icon="plus-square" />
        <Button title="Meus pedidos" destiny="MyOrders" icon="shopping-cart" />
        <Button title="Meu perfil" destiny="Profile" icon="user" />

        <ExitButton onPress={handleExit}>
          <ButtonText>Sair</ButtonText>
          <ButtonIcon>
            <Icon name="log-out" color="#fff" size={24} />
          </ButtonIcon>
        </ExitButton>
      </Footer>
    </Container>
  );
};

export default Home;
