import styled from 'styled-components/native';

export const Header = styled.View`
  flex: 1;
  align-items: center;
`;

export const UserName = styled.Text`
  margin-top: 30px;
  font-size: 36px;
  color: #222;
`;

export const UserCnpj = styled.Text`
  font-size: 14px;
  color: #222;
`;

export const Footer = styled.View`
  margin: 20px;
  justify-content: center;
`;

export const ExitButton = styled.TouchableOpacity`
  background: #ff1744;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
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
