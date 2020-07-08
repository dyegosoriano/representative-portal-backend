import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <Welcome>Seja bem vindo ao</Welcome>
        <Title>Portal do representante</Title>

        <UserInput
          placeholder="Informe seu CPF"
          keyboardType="number-pad"
          maxLength={11}
        />

        <PasswordInput
          placeholder="Informe sua senha"
          keyboardType="visible-password"
          secureTextEntry
          autoCorrect={false}
        />

        <Button onPress={handleNavigate}>
          <ButtonText>Login</ButtonText>
          <ButtonIcon>
            <Icon name="log-in" size={24} color="#FFF" />
          </ButtonIcon>
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Login;
