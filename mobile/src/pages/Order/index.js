import React, { useState, useEffect } from 'react';

import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
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

  useEffect(() => {
    async function getItens() {
      const response = await api.get(`/orders/${order.id}`);

      setProducts(response.data.itens);
    }

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
              <Icon name="trash-2" size={24} color="#fff" />
            </ProductButtons>
          </Product>
        ))}
      </ProductsList>

      <Footer>
        <Button>
          <ButtonText>Concluir </ButtonText>
          <Icon name="check" size={24} color="#fff" />
        </Button>

        <Button color="#ff1744">
          <ButtonText>Cancelar </ButtonText>
          <Icon name="trash-2" size={24} color="#fff" />
        </Button>
      </Footer>
    </>
  );
};

export default Order;
