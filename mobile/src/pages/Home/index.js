import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
} from './styles';

const Home = () => {
  const navigation = useNavigation();

  function handleNavigate(destiny) {
    navigation.navigate(destiny);
  }

  return (
    <Container>
      <Header>
        <UserName>Dyego Soriano</UserName>
        <UserCnpj>CNPJ: 1232131241343</UserCnpj>
      </Header>

      <Footer>
        <Button onPress={() => handleNavigate('NewOrders')}>
          <ButtonText>Novo pedido</ButtonText>
          <ButtonIcon>
            <Icon name="plus-square" color="#fff" size={24} />
          </ButtonIcon>
        </Button>

        <Button onPress={() => handleNavigate('Orders')}>
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
      </Footer>
    </Container>
  );
};

export default Home;
