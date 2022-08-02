import React from 'react'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import api from '../../../utils/api'
import { Dialog } from '@mui/material'
import MainCard from '../../../ui-component/cards/MainCard'
import { object } from 'yup'
import { string } from 'yup'

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

  const handleSave=async (values) =>{
    try {
      await api.post('accounts',values);

    } catch (error) {
      
    }
    afterSave();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <MainCard title='Tambah Kode Rekening'>
        <Formik initialValues={initialValues}>
                validationSchema={object(
                  {
                    kode:string().required("Kode harus diisi"),
                    name:string().required("uraian harus diisi").max(255,'Max.255 karakter'),
                    report:string().required("jenis")
                  }
                )}
        </Formik>
      </MainCard>
    </Dialog>
  )
}

AccountForm.propTypes = {
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    afterSave:PropTypes.func
}

export default AccountForm