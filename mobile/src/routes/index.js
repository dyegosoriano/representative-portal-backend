import React, { useContext } from 'react'

import AuthContext from '../contexts/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import LoadingModal from '../components/LoadingModal'

export default function Routes() {
  const { signed, loading } = useContext(AuthContext)

  return (
    <>
      <LoadingModal loading={loading} />

      {signed ? <AppRoutes /> : <AuthRoutes />}
    </>
  )
}
