import styled from 'styled-components/native';

export const TotalOrders = styled.Text`
  font-size: 24px;
  text-align: center;
  padding: 20px 0px;
`;

export const ContainerOrders = styled.ScrollView`
  flex: 1;
`;

export const Order = styled.TouchableOpacity`
  height: 200px;
  margin: 10px 20px;
  padding: 10px;
  background: #651fff;
  border-radius: 5px;
`;

export const OrderId = styled.Text`
  color: #fff;
  text-align: right;
  font-size: 24px;
`;

export const OrderDate = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const Canceled = styled.Text`
  color: #fff;
  font-size: 18px;
`;
