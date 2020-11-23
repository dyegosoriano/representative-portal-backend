import 'dotenv/config'

const authConfig = {
  secretProvider: process.env.PROVIDER_SECRET,
  secretUser: process.env.USER_SECRET,
  expiresIn: process.env.DAY_EXPIRES
}

export default authConfig
