import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

export default function formattedDate (order) {
  if (order === Array) {
    return order.map(item => (
      {
        ...item.dataValues,
        createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: pt })
      }
    ))
  }
}
