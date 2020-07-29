import React, { useContext } from 'react';

import { Feather as Icon } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import ButtonComponent from '../../components/Button';

import {
  Header,
  UserCnpj,
  UserName,
  Footer,
  ButtonText,
  ButtonIcon,
  ExitButton,
} from './styles';

export default function Dashboard() {
  const { user, handleSignOut } = useContext(AuthContext);

  return (
    <>
      <Header>
        <UserName>{user.name}</UserName>
        <UserCnpj>CNPJ: {user.cnpj}</UserCnpj>
      </Header>

      <Footer>
        <ButtonComponent
          title="Novo pedido"
          destiny="NewOrders"
          icon="plus-square"
        />

        <ButtonComponent
          title="Meus pedidos"
          destiny="MyOrders"
          icon="shopping-cart"
        />

        <ButtonComponent title="Meu perfil" destiny="Profile" icon="user" />

        <ExitButton onPress={handleSignOut}>
          <ButtonText>Sair</ButtonText>
          <ButtonIcon>
            <Icon name="log-out" color="#fff" size={24} />
          </ButtonIcon>
        </ExitButton>
      </Footer>
    </>
  );
}
