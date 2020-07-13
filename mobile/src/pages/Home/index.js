import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

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
  const navigation = useNavigation();
  const route = useRoute();

  const { user, token } = route.params;

  async function handleExit() {
    await AsyncStorage.removeItem('user');
    navigation.goBack();
  }

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
