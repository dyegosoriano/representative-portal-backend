import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
`;

export const Welcome = styled.Text`
  font-size: 30px;
`;

export const Title = styled.Text`
  font-size: 40px;
  color: #00bfa5;
  margin-bottom: 50px;
`;

export const UserInput = styled.TextInput`
  height: 60px;
  font-size: 16px;
  background: #fff;
  border-radius: 10px;

  margin-bottom: 25px;
  padding: 0 20px;
`;

export const PasswordInput = styled.TextInput`
  height: 60px;
  font-size: 16px;
  background: #fff;
  border-radius: 10px;

  margin-bottom: 25px;
  padding: 0 20px;
`;

export const Button = styled.TouchableOpacity`
  background: #00bfa5;
  height: 60px;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  font-size: 24px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  margin-left: 60px;
`;

export const ButtonIcon = styled.View`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
