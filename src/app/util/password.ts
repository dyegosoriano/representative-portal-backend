import bcrypt from 'bcryptjs'

export function passwordEncrypt(pass: string) {
  return bcrypt.hash(pass, 8)
}

export function passwordCheck(oldPassword: string, password: string) {
  return bcrypt.compare(oldPassword, password)
}
