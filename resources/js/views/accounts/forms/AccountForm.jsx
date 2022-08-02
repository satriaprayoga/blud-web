import React from 'react'
import PropTypes from 'prop-types'

const initialValues = {
    "kode": "",
    "name": "",
    "root": false,
    "report": "",
    "type": "-",
    "group": "-",
    "parent_id": 1
}

const AccountForm = ({open, handleClose, afterSave}) => {
  return (
    <div>AccountForm</div>
  )
}

AccountForm.propTypes = {
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    afterSave:PropTypes.func
}

export default AccountForm