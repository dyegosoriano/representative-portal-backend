import Product from '../models/Product'

class ProductController {
  async store (request, response) {
    // Cadastrar produto
    const provider_id = request.userId
    const { name_product, price, amount } = request.body

    try {
      const newProduct = await Product.create(
        {
          provider_id,
          name_product,
          price,
          amount
        }
      )

      return response.json(newProduct)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async update (request, response) {
    // Alterar produto
    const { userId } = request
    const { id } = request.params
    const { name_product, price, amount } = request.body

    try {
      const product = await Product.findByPk(id)

      if (!product) {
        return response.status(400).json({ error: 'The product requested was not found!' })
      }

      if (userId !== product.provider_id) {
        return response.status(400).json({ error: "You're not allowed to alter this product" })
      }

      await product.update({ name_product, price, amount })

      return response.json(product)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async index (request, response) {
    // Listagem de produtos
    try {
      const products = await Product.findAndCountAll()

      return response.json(products)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async show (request, response) {
    // Exibir um único produto
    const { id } = request.params

    try {
      const products = await Product.findOne({ where: { id } })

      if (!products) { return response.status(400).json({ message: 'O produto solicitado não existe!' }) }

      return response.json(products)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
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
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new ProductController()
