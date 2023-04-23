import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({ children, open, closeHandler }) => {
  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div className='overlay_styles' onClick={closeHandler} />
      <div className='modal_styles rounded-lg p-6'>{children}</div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
