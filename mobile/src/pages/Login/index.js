import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
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
  const refPass = useRef();

  async function handleSubmit() {
    try {
      const response = await api.post('/sessions/user', {
        email: user,
        password,
      });

      navigation.navigate('Home', { user: response.data.user });
    } catch (error) {
      Alert.alert('Ops!!!', 'Você deve ter digitado a senha ou email errado!');
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
          onSubmitEditing={() => refPass.current.focus()}
          onChangeText={(text) => setUser(text)}
          placeholder="Informe seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          value={user}
          autoFocus
        />

        <PasswordInput
          onChangeText={(text) => setPassword(text)}
          keyboardType="visible-password"
          placeholder="Informe sua senha"
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
          autoCorrect={false}
          value={password}
          secureTextEntry
          ref={refPass}
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
