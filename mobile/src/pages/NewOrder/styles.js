import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  padding: 32px 0px;
`;

export const ScrollProducts = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Product = styled.View`
  padding: 16px;
  margin-bottom: 16px;
  background: #fff;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Strong = styled.Text`
  font-weight: bold;
`;

export const BoxModal = styled.View`
  background: white;
  padding: 100px 16px 16px 16px;

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
  padding: 16px 0px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
