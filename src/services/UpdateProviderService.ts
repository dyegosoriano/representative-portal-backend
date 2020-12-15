import { getRepository } from 'typeorm'

import providers_view, { ProviderRender } from '@views/providers_view'
import { passwordCheck, passwordEncrypt } from '@util/password'
import AppError from '@errors/AppError'

import Provider from '@entity/Provider'

interface Request {
  confirmPass: string
  oldPass: string
  newPass: string
  email: string
  cnpj: number
  name: string
  id: string
}

export default class UpdateProviderService {
  async execute({ confirmPass, oldPass, newPass, email, cnpj, name, id }: Request): Promise<ProviderRender> {
    const providerRepository = getRepository(Provider)
    const provider = await providerRepository.findOneOrFail({ id })

    const passwordChecked = await passwordCheck(oldPass, provider.password)

    if (oldPass && !passwordChecked) throw new AppError('Senha incorreta!')

    if (newPass !== confirmPass) throw new AppError('A senha de confirmação não corresponde com a nova senha', 401)

    if (email || cnpj) {
      const providerExist = await providerRepository.find({ where: [{ email }, { cnpj }] })

      providerExist.find(item => {
        if (provider.id !== item.id) {
          if (item.email === email) throw new AppError('O email pertence a outro usuário!', 401)
          if (+item.cnpj === cnpj) throw new AppError('O CNPJ pertence a outro usuário!', 401)
        }
      })
    }

    provider.password = await passwordEncrypt(newPass)
    provider.email = email
    provider.name = name
    provider.cnpj = cnpj

    await providerRepository.save(provider)

    return providers_view.render(provider)
  }
}
