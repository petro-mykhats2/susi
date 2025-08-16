import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  return (
    <>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  )
}

export default Notification
