import React from 'react';

import { Container, UserInput, PasswordInput } from './styles';

const Login = () => {
  return (
    <Container>
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
