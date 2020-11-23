import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`🚀  Server is running port: ${port}`))
