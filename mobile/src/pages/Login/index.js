import React, { useState, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

import api from '../../services/api';

import {
  Container,
  Welcome,
  Title,
  LoginInput,
  Button,
  ButtonText,
  ButtonIcon,
} from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const refPass = useRef();

  async function handleSubmit() {
    if (email.length === 0) return;

    try {
      const response = await api.post('/sessions/user', {
        email,
        password,
      });

      const { token } = response.data;

      await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(token));

      navigation.navigate('Home');
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`);

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

        <LoginInput
          onSubmitEditing={() => refPass.current.focus()}
          onChangeText={(text) => setEmail(text)}
          placeholder="Informe seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          value={email}
        />

        <LoginInput
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
