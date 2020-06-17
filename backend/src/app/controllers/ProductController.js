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

  async update (request, response) {
    // Alterar produto
    const provider_id = request.userId
    const { product_id } = request.params
    const { name_product, price, amount } = request.body

    try {
      const product = await Product.findOne({ where: { id: product_id, provider_id } })

      const updatedProduct = await product.update({ name_product, price, amount })

      return response.json(updatedProduct)
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async delete (request, response) {
    // Remover produto
    const provider_id = request.userId
    const { product_id } = request.params

    try {
      const product = await Product.findOne({ where: { id: product_id, provider_id } })

      if (!product) { return response.status(400).json({ message: 'Você não tem permissão para deletar esse produto' }) }

      await product.destroy()

      return response.json({ message: `O produto ${product.name_product} foi deletado com sucesso!` })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}

export default new ProductController()
