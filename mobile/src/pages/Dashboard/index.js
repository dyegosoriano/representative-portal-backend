import React, { useContext } from 'react';

import { Feather as Icon } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
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

const Dashboard = () => {
  const { user, handleSignOut } = useContext(AuthContext);

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

        <ExitButton onPress={handleSignOut}>
          <ButtonText>Sair</ButtonText>
          <ButtonIcon>
            <Icon name="log-out" color="#fff" size={24} />
          </ButtonIcon>
        </ExitButton>
      </Footer>
    </Container>
  );
};

export default Dashboard;
