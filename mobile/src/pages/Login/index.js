import React from 'react';

import { Container, Welcome, Title, UserInput, PasswordInput } from './styles';

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
    </Container>
  );
};

export default Login;
