import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
`

export const Strong = styled.Text`
  font-weight: bold;
`

export const Title = styled.Text`
  padding: 16px 0px;
  font-size: 16px;
`

export const ScrollProducts = styled.FlatList`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`

export const ProductName = styled.Text`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #000;
`

export const ProductText = styled.Text`
  font-size: 16px;
  color: #000;
`

export const Footer = styled.View`
  width: 100%;
  padding: 16px 0px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
