import Product from '../models/Product'
import File from '../models/File'

class ProductController {
  async store (request, response) {
    // Cadastrar produto
    const provider_id = request.userId
    const { product_name, price, amount, product_image } = request.body

    try {
      const newProduct = await Product.create({
        product_image,
        product_name,
        provider_id,
        amount,
        price
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
    const { product_name, price, amount, product_image } = request.body

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

      if (product_image) {
        const imageExist = await File.findByPk(product_image)

        if (!imageExist) return response.status(401).json({ error: 'The image is not in the database' })

        await product.update({ product_image })
      }

      await product.update({ product_name, price, amount })

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
    const page = Number(request.query.page)

    try {
      let products = []

      if (!page) {
        products = await Product.findAll()
      } else {
        products = await Product.findAll({
          order: ['id'],
          attributes: [
            'id',
            'product_name',
            'price',
            'amount'
          ],
          include: {
            model: File,
            as: 'image',
            attributes: ['name', 'path']
          },
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
        ],
        include: [{
          model: File,
          as: 'image',
          attributes: ['name', 'url']
        }]
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
