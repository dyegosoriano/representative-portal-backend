import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import { Container, Header, ExitButton, Title } from './styles';

const Profile = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <ExitButton onPress={handleNavigateBack}>
          <Icon name="arrow-left" color="#00bfa5" size={24} />
        </ExitButton>

        <Title>Meu perfil</Title>
      </Header>
    </Container>
  );
};

export default Profile;
