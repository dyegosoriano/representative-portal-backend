import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 32px;
  padding-bottom: 32px;
  padding-right: 32px;
  padding-left: 32px;
  justify-content: center;
`;

export const Welcome = styled.Text`
  font-size: 30px;
`;

export const Title = styled.Text`
  font-size: 40px;
  color: #34cb79;
  margin-bottom: 80px;
`;

export const UserInput = styled.TextInput`
  height: 60px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 25px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 16px;
`;

export const PasswordInput = styled.TextInput`
  height: 60px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 25px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  background: #34cb79;
  height: 60px;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  margin-left: 60px;
  color: #fff;
  font-size: 24px;
`;

export const ButtonIcon = styled.View`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
