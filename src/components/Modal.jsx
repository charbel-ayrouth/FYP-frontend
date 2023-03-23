import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({ children, open, onClose }) => {
  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div className='overlay_styles' />
      <div className='modal_styles rounded-lg p-6'>{children}</div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
