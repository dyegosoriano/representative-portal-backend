import React, { useState, useEffect } from 'react';

import { View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import {
  ProductsList,
  Product,
  ProductName,
  ProductText,
  ProductButtons,
  Footer,
  ButtonText,
  Button,
} from './styles';

import api from '../../services/api';

const Order = () => {
  const [products, setProducts] = useState([]);

  const route = useRoute();

  const { order } = route.params;
  const navigation = useNavigation();

  async function getItens() {
    const response = await api.get(`/orders/${order.id}`);
    setProducts(response.data.itens);
  }

  async function confirmOrder() {
    await api.put(`/orders/${order.id}`, { closed: true });
    navigation.goBack();
  }

  async function deleteOrder() {
    await api.delete(`/orders/${order.id}`);
    navigation.goBack();
  }

  async function deleteItem(id) {
    await api.delete(`/items/${id}`);
    getItens();
  }

  useEffect(() => {
    getItens();
  }, []);

  return (
    <>
      <ProductsList>
        {products.map((product) => (
          <Product key={product.id}>
            <View>
              <ProductName>Nome do produto</ProductName>
              <ProductText>Quantidade: {product.amount}</ProductText>
              <ProductText>R$: {product.total_price}</ProductText>
            </View>

            <ProductButtons>
              <Icon name="edit" size={24} color="#fff" />

              <TouchableOpacity onPress={() => deleteItem(product.id)}>
                <Icon name="trash-2" size={24} color="#fff" />
              </TouchableOpacity>
            </ProductButtons>
          </Product>
        ))}
      </ProductsList>

      <Footer>
        <Button onPress={() => confirmOrder()}>
          <ButtonText>Concluir </ButtonText>
          <Icon name="check" size={24} color="#fff" />
        </Button>

        <Button onPress={() => deleteOrder()} color="#ff1744">
          <ButtonText>Excluir </ButtonText>
          <Icon name="trash-2" size={24} color="#fff" />
        </Button>
      </Footer>
    </>
  );
};

export default Order;
