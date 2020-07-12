import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import api from '../../services/api';

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
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function handleSubmit() {
    try {
      const response = await api.post('/sessions/user', {
        email: user,
        password,
      });

      // navigation.navigate('Home');

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
          placeholder="Informe seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={user}
          onChangeText={(text) => setUser(text)}
        />

        <PasswordInput
          placeholder="Informe sua senha"
          keyboardType="visible-password"
          secureTextEntry
          autoCorrect={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={handleSubmit}>
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
