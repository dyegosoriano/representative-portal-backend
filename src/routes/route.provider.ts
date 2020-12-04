import { Router } from 'express'

import CreateProviderService from '@services/CreateProviderService'
import UpdateProviderService from '@services/UpdateProviderService'
import DeleteProviderService from '@services/DeleteProviderService'

import authProviderMiddleware from '@middleware/authProvider'

const providerRoute = Router()

providerRoute.post('/', async (request, response) => {
  const { name, email, cnpj, password } = request.body

  const createProvider = new CreateProviderService()
  const provider = await createProvider.execute({ name, email, cnpj, password })

  return response.json(provider)
})

providerRoute.use(authProviderMiddleware)

providerRoute.put('/', async (request, response) => {
  const { id } = request.provider
  const { confirmPass, oldPass, newPass, email, cnpj, name } = request.body

  const updateProvider = new UpdateProviderService()
  const provider = await updateProvider.execute({
    confirmPass,
    oldPass,
    newPass,
    email,
    cnpj,
    name,
    id,
  })

  return response.json(provider)
})

providerRoute.delete('/', async (request, response) => {
  const { id } = request.provider

  const deleteProvider = new DeleteProviderService()
  await deleteProvider.execute({ id })

  return response.status(200).json({
    message: `Ação concluída com sucesso!`,
  })
})

export default providerRoute
