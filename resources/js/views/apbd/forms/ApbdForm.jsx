import React from 'react'
import PropTypes from 'prop-types'
import { Field, Form, Formik } from 'formik'

const ApbdForm = ({open, handleClose, afterSave}) => {
  return (
    <div>ApbdForm</div>
  )
}

ApbdForm.propTypes = {
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    afterSave:PropTypes.func
}

export default ApbdForm