import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert, Button, Modal, Text, TextInput, View } from 'react-native';

import {
  Container,
  BoxModal,
  BoxAmount,
  BoxModalText,
  OptionsBox,
  Picker,
  Product,
  ScrollProducts,
  Strong,
  Title,
} from './styles';

const NewOrder = () => {
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  async function confirmOrder() {
    Alert.alert('Aviso', 'Deseja concluir o pedido?', [
      { text: 'OK', onPress: () => navigation.goBack() },
      { text: 'Cancelar' },
    ]);
  }

  async function cancelOrder() {
    Alert.alert('Aviso', 'Deseja cancelar o pedido?', [
      { text: 'OK', onPress: () => navigation.goBack() },
      { text: 'Cancelar' },
    ]);
  }

  return (
    <Container>
      <Title>
        Pedido: <Strong>231</Strong>
      </Title>

      <ScrollProducts>
        <Product>
          <View>
            <Strong>Chocolate</Strong>
            <Text>
              Quantidade: <Strong>1</Strong>
            </Text>
            <Text>
              valor total: <Strong>R$15</Strong>
            </Text>
          </View>

          <Button title="Excluir" color="#f00" />
        </Product>
      </ScrollProducts>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <BoxModal>
          <View>
            <BoxModalText>
              Produto selecionado: <Strong>{selectedValue}</Strong>
            </BoxModalText>
            <BoxModalText>
              Valor unitário: <Strong>R$ 15</Strong>
            </BoxModalText>
            <BoxModalText>
              Valor total: <Strong>R$ 15</Strong>
            </BoxModalText>

            <BoxAmount>
              <Text>Quantidade: </Text>
              <TextInput
                placeholder="Insira o valor desejado"
                keyboardType="number-pad"
                returnKeyType="done"
              />
            </BoxAmount>
          </View>

          <Picker
            selectedValue={selectedValue}
            onValueChange={(value, index) => setSelectedValue(value)}
          >
            <Picker.Item label="Produto 1" value="Produto 1" />
            <Picker.Item label="Produto 2" value="Produto 2" />
            <Picker.Item label="Produto 3" value="Produto 3" />
            <Picker.Item label="Produto 4" value="Produto 4" />
            <Picker.Item label="Produto 5" value="Produto 5" />
            <Picker.Item label="Produto 6" value="Produto 6" />
            <Picker.Item label="Produto 7" value="Produto 7" />
            <Picker.Item label="Produto 8" value="Produto 8" />
            <Picker.Item label="Produto 9" value="Produto 9" />
            <Picker.Item label="Produto 10" value="Produto 10" />
            <Picker.Item label="Produto 11" value="Produto 11" />
            <Picker.Item label="Produto 12" value="Produto 12" />
            <Picker.Item label="Produto 13" value="Produto 13" />
            <Picker.Item label="Produto 14" value="Produto 14" />
            <Picker.Item label="Produto 15" value="Produto 15" />
            <Picker.Item label="Produto 16" value="Produto 16" />
            <Picker.Item label="Produto 17" value="Produto 17" />
            <Picker.Item label="Produto 18" value="Produto 18" />
            <Picker.Item label="Produto 19" value="Produto 19" />
            <Picker.Item label="Produto 20" value="Produto 20" />
          </Picker>

          <View>
            <Button title="Adicionar" onPress={() => setModalVisible(false)} />
            <Button
              title="Cancelar"
              color="#f00"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </BoxModal>
      </Modal>

      <OptionsBox>
        <Button title="Confirmar" onPress={() => confirmOrder()} />
        <Button title="Novo item" onPress={() => setModalVisible(true)} />
        <Button title="Cancelar" color="#f00" onPress={() => cancelOrder()} />
      </OptionsBox>
    </Container>
  );
};

export default NewOrder;
