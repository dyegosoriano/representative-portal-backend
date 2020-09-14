import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'

import { BoxModal } from './styles'

const LoadingModal = ({ loading }) => {
  return (
    <Modal visible={loading} animationType="fade">
      <BoxModal>
        <ActivityIndicator size="small" color="#00bfa5" />
      </BoxModal>
    </Modal>
  )
}

export default LoadingModal
