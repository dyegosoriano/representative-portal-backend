import Product from '../models/Product'

class ProductController {
  async store (request, response) {
    // Cadastrar produto
    const provider_id = request.userId
    const { name_product, price, amount } = request.body

    try {
      const newProduct = await Product.create({
        provider_id,
        name_product,
        price,
        amount
      })

      return response.json(newProduct)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}

export default new ProductController()
