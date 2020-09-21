import 'dotenv/config'

export default {
  secretUser: process.env.USER_SECRET,
  secretProvider: process.env.PROVIDER_SECRET,
  expiresIn: process.env.DAY_EXPIRES
}
