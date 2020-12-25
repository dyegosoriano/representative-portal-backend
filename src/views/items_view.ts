import Item from '@entity/Item'

export interface ItemRender {
  id: string

  totalPrice: number
  unitPrice: number
  product: string
  amount: number

  created_at: Date | null
  updated_at: Date | null
}

export default {
  render(item: Item): ItemRender {
    return {
      id: item.id,

      product: item.product.product,
      unitPrice: item.product.price,
      totalPrice: item.totalPrice,
      amount: item.amount,

      created_at: item.created_at,
      updated_at: item.updated_at,
    }
  },
}
