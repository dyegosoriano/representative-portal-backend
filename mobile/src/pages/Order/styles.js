import styled from 'styled-components/native';

export const ProductsList = styled.ScrollView`
  padding: 0px 20px;
`;

export const Product = styled.View`
  padding: 20px;
  margin-top: 20px;
  background: #607d8b;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductName = styled.Text`
  color: #fff;
  font-size: 30px;
  margin-bottom: 10px;
`;

export const ProductText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const ProductButtons = styled.View`
  width: 75px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Footer = styled.View`
  height: 100px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  color: #fff;
`;

export const Button = styled.TouchableOpacity`
  background: ${(props) => (props.color ? props.color : '#212121')};
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
`;
