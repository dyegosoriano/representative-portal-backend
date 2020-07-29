import styled from 'styled-components/native';

export const TotalOrders = styled.Text`
  background: #fff;
  font-size: 24px;
  text-align: center;

  padding: 20px 0px;
`;

export const ContainerOrders = styled.ScrollView`
  margin: 0px 20px;
`;

export const Order = styled.TouchableOpacity`
  background: #607d8b;
  border-radius: 5px;
  margin-top: 20px;
  padding: 30px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OrderId = styled.Text`
  color: #fff;
  font-size: 28px;
`;

export const Tag = styled.View`
  background: ${(props) => props.color};
  border-radius: 5px;
  padding: 5px;
  width: 70px;
  align-items: center;
`;

export const StatusText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;
