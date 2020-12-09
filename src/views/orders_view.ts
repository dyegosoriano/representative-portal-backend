import Order from '@entity/Order'

export interface OrderRender {
  id: string
  confirmed: Date | null
  delivered: Date | null
  canceled: Date | null
  onMyWay: Date | null
  closed: Date | null
  createdAt: Date
  updatedAt: Date
  owner?: {
    id: string
    name: string
    email: string
    cnpj: number
  }
}

export default {
  render(order: Order): OrderRender {
    const owner = order.owner
      ? {
          id: order.owner.id,
          name: order.owner.name,
          email: order.owner.email,
          cnpj: order.owner.cnpj,
        }
      : undefined

    return {
      id: order.id,
      confirmed: order.confirmed,
      delivered: order.delivered,
      canceled: order.canceled,
      onMyWay: order.onMyWay,
      closed: order.closed,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      owner,
    }
  },

  renderAll(orders: Order[]): OrderRender[] {
    return orders.map(order => this.render(order))
  },
}
