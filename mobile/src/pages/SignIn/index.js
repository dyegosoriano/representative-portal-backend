import React, { useState, useRef, useContext } from 'react';

import { KeyboardAvoidingView, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';

import {
  Container,
  Welcome,
  Title,
  LoginInput,
  Button,
  ButtonText,
  ButtonIcon,
} from './styles';

const SignIn = () => {
  const { handleSignIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const refPass = useRef();

  async function handleSubmit() {
    if (email.length === 0) return;

    try {
      await handleSignIn(email, password);
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

export default SignIn;
