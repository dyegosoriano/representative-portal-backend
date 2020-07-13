import styled from 'styled-components/native';

export const ContainerButton = styled.TouchableOpacity`
  background: #263238;
  height: 60px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TextButton = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-left: 60px;
`;

export const IconButton = styled.View`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
