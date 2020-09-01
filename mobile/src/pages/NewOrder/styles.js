import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-top: 20px;
`;

export const Strong = styled.Text`
  font-weight: bold;
`;

export const BoxModal = styled.View`
  background: white;
  padding: 100px 20px 20px 20px;

  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const BoxModalText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const BoxAmount = styled.View`
  flex-direction: row;
  width: 300px;
`;

export const Picker = styled.Picker`
  width: 100%;
`;

export const OptionsBox = styled.View`
  width: 100%;
  padding: 20px 0px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
