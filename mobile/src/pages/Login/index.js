import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';

import {
  Container,
  Welcome,
  Title,
  UserInput,
  PasswordInput,
  Button,
  ButtonText,
  ButtonIcon,
} from './styles';

const Login = () => {
  return (
    <Container>
      <Welcome>Seja bem vindo ao</Welcome>
      <Title>Portal do representante</Title>

      <UserInput
        placeholder="Informe seu CPF"
        keyboardType="number-pad"
        maxLength={11}
      />

      <PasswordInput
        placeholder="Informe sua password"
        keyboardType="visible-password"
        secureTextEntry
        autoCorrect={false}
      />

      <Button>
        <ButtonText>Enviar</ButtonText>
        <ButtonIcon>
          <Icon name="arrow-right" size={24} color="#FFF" />
        </ButtonIcon>
      </Button>
    </Container>
  );
};

export default Login;
