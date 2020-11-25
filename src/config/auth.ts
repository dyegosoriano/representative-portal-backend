import 'dotenv/config'

interface auth {
  secretProvider: string
  secretUser: string
  expiresIn: string
}

const authConfig: auth = {
  secretProvider: process.env.PROVIDER_SECRET,
  secretUser: process.env.USER_SECRET,
  expiresIn: process.env.DAY_EXPIRES,
}

export default authConfig
