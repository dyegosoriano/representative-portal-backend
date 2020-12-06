import 'dotenv/config'

const authConfig = {
  secretProvider: process.env.PROVIDER_SECRET || 'defaultProvider',
  secretUser: process.env.USER_SECRET || 'defaultUser',
  expiresIn: process.env.DAY_EXPIRES || '10d',
}

export default authConfig
