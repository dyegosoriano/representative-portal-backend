import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

import {
  Container,
  Header,
  UserCnpj,
  UserName,
  Footer,
  Button,
  ButtonText,
  ButtonIcon,
  ExitButton,
} from './styles';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { user, token } = route.params;

  function handleNavigate(destiny) {
    navigation.navigate(destiny, { user, token });
  }

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
        <Button onPress={() => handleNavigate('NewOrders')}>
          <ButtonText>Novo pedido</ButtonText>
          <ButtonIcon>
            <Icon name="plus-square" color="#fff" size={24} />
          </ButtonIcon>
        </Button>

        <Button onPress={() => handleNavigate('MyOrders')}>
          <ButtonText>Meus pedidos</ButtonText>
          <ButtonIcon>
            <Icon name="shopping-cart" color="#fff" size={24} />
          </ButtonIcon>
        </Button>

        <Button onPress={() => handleNavigate('Profile')}>
          <ButtonText>Meu perfil</ButtonText>
          <ButtonIcon>
            <Icon name="user" color="#fff" size={24} />
          </ButtonIcon>
        </Button>

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
