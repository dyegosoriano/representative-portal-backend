import File from '../models/File'

class FileController {
  async store (request, response, next) {
    const { name, path } = request.body

    try {
      const file = await File.create({
        name,
        path
      })

      return response.json(file)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      next(error)
    }
  }
}

export default new FileController()
