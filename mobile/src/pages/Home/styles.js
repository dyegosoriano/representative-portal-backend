import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Header = styled.View`
  height: 100px;
  padding: 0 30px;
  background: #fff;
  justify-content: center;
`;

export const UserName = styled.Text`
  margin-top: 20px;
  font-size: 36px;
  text-align: right;
  color: #222;
`;

export const UserCnpj = styled.Text`
  text-align: right;
  font-style: italic;
  font-size: 14px;
  color: #222;
`;

export const Footer = styled.View`
  margin: 0 30px;
`;

export const Button = styled.TouchableOpacity`
  background: #00bfa5;
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-left: 60px;
`;

export const ButtonIcon = styled.View`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
