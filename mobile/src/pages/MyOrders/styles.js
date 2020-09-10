import styled from 'styled-components/native'

export const ListOrders = styled.FlatList`
  padding: 16px;
`

export const OrderBox = styled.View`
  justify-content: flex-start;
  height: 65px;
`

export const OrderId = styled.Text`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #000;
`

export const OrderDate = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  color: #000;
`

export const OrderStatus = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
`
