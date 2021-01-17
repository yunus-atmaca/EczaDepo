import React from 'react'
import AlertView from '../Components/AlertView'

interface AlertProps {
  title: string
  message: string
  ok?: () => void
  okText?: string
  cancel?: () => void
  cancelText?: string
  onClose: () => void
}

function createAlert(props: AlertProps) {
  return (
    <AlertView
      title={props.title}
      message={props.message}
      ok={props.ok || undefined}
      okText={props.okText || undefined}
      cancel={props.cancel || undefined}
      cancelText={props.cancelText || undefined}
      onClose={props.onClose}
    />
  )
}

export default function Alert(props: AlertProps) {
  return {
    alert: createAlert(props)
  }
}

