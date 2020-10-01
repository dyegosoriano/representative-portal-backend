import { resolve } from 'path'
import crypto from 'crypto'
import multer from 'multer'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('HEX')
      const fileName = `${file.originalname}-${fileHash}`

      return callback(null, fileName)
    }
  })
}
