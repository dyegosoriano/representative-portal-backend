import Product from '../models/Product'

class ProductController {
  async store (request, response) {
    // Cadastrar produto
    const provider_id = request.userId
    const { product_name, price, amount } = request.body

    try {
      const newProduct = await Product.create({
        provider_id,
        product_name,
        price,
        amount
      })

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
    const { product_name, price, amount } = request.body

    try {
      const product = await Product.findByPk(id)

      if (!product) {
        return response
          .status(400)
          .json({ error: 'The product requested was not found!' })
      }
      if (userId !== product.provider_id) {
        return response
          .status(400)
          .json({ error: "You're not allowed to alter this product" })
      }

      await product.update({ product_name, price, amount })
      const { provider_id } = product

      return response.json({
        id,
        provider_id,
        product_name,
        amount,
        price
      })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async index (request, response) {
    // Listagem de produtos
    const page = Number(request.query.page)

    try {
      let products = []

      if (!page) {
        products = await Product.findAll()
      } else {
        products = await Product.findAll({
          attributes: [
            'id',
            'product_name',
            'price',
            'amount'
          ],
          limit: 10,
          offset: (page - 1) * 10
        })
      }

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
      const product = await Product.findOne({
        where: { id },
        attributes: [
          'id',
          'provider_id',
          'product_name',
          'amount',
          'price'
        ]
      })

      if (!product) {
        return response
          .status(400)
          .json({ message: 'O produto solicitado não existe!' })
      }

      return response.json(product)
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
      const product = await Product.findOne({
        where: { id: product_id, provider_id }
      })

      if (!product) {
        return response
          .status(400)
          .json({
            message: 'Você não tem permissão para deletar esse produto'
          })
      }

      await product.destroy()

      return response.json({
        message: `O produto ${product.product_name} foi deletado com sucesso!`
      })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new ProductController()
