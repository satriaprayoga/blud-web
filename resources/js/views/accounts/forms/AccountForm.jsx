import React from 'react'
import { Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import api from '../../../utils/api'
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import MainCard from '../../../ui-component/cards/MainCard'
import { object } from 'yup'
import { string } from 'yup'

const initialValues = {
  "kode": "",
  "name": "",
}

const AccountForm = ({ open, handleClose, afterSave, parentAccount }) => {

  const handleSave = async (values) => {
    try {
      const parent_id = parentAccount.id;
      const parentReport = parentAccount.report;
      
      const payload={
        'name':values.name,
        'kode':values.kode
      }
      
      switch (parentAccount.report) {
        case 'induk':
          payload.report = 'kelompok';
          break;
         
        case 'kelompok':
          payload.report = 'jenis';
          break;
        
        case 'jenis':
          payload.report = 'rincian objek';
          break;
        
        case 'rincian objek':
          payload.report = 'rincian';
          break;
       
        default:
         
          break;
      }
      payload.type = parentAccount.type;
      payload.group = parentAccount.group;
      payload.parent_id = parent_id;
      payload.root=false;
      console.log(payload);
      const response=await api.post('accounts', payload);
      console.log(response.data.account)
    } catch (error) {

    }
    afterSave();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <MainCard title='Tambah Kode Rekening'>
        <Formik initialValues={initialValues}
          validationSchema={object(
            {
              kode: string().required("Kode harus diisi"),
              name: string().required("uraian harus diisi").max(255, 'Max.255 karakter'),
            }
          )}
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            handleSave(values);
            formikHelpers.resetForm();
            handleClose();
          }}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <DialogContent>

                <Field name="kode"
                  type="text"
                  as={TextField}
                  variant="standard"
                  fullWidth

                  label="Kode"
                  error={Boolean(errors.kode) && Boolean(touched.kode)}
                  helperText={Boolean(touched.kode) && errors.kode} />
                <Field name="name"
                  type="text"
                  as={TextField}
                  variant="standard"
                  fullWidth
                  label="Uraian"
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText={Boolean(touched.name) && errors.name}
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Batal</Button>
                <Button type="submit" variant="contained" disabled={!dirty || !isValid}>Simpan</Button>
              </DialogActions>
            </Form>
          )
          }
        </Formik>
      </MainCard>
    </Dialog>
  )
}

AccountForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  afterSave: PropTypes.func
}

export default AccountForm