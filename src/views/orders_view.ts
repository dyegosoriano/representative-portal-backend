import Order from '@entity/Order'

export interface OrderRender {
  id: string
  confirmed: Date | null
  on_my_way: Date | null
  delivered: Date | null
  canceled: Date | null
  closed: Date | null
  createdAt: Date
  updatedAt: Date
  owner?: {
    id: string
  }
}

export default {
  render(order: Order): OrderRender {
    const owner = order.owner ? { id: order.owner.id } : undefined

    return {
      id: order.id,
      confirmed: order.confirmed,
      on_my_way: order.on_my_way,
      delivered: order.delivered,
      canceled: order.canceled,
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
