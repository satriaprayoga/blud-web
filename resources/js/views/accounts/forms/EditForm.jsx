import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../../ui-component/cards/MainCard'
import { Field, Form, Formik } from 'formik'
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { object } from 'yup'
import { string } from 'yup'
import api from '../../../utils/api'
import { useParams } from 'react-router'

const EditForm = ({open, initialValues, handleClose, afterSave}) => {

    const {id}=useParams();
  
    const handleSave=async (values)=>{
      try {
          const response=await api.put('accounts/'+id,values);
          //console.log(response);
      } catch (error) {
          console.log(error)
      }
      afterSave();
    }
    return (
      <Dialog open={open} onClose={handleClose}>
              <MainCard title="Edit Akun">
              <Formik 
                  initialValues={initialValues} 
                  validationSchema={object({
                      name:string().required("Mohon isi nama Unit"),
                      kode:string().required("Mohon isi kode Unit"),
                    
  
                  })}
                  onSubmit={(values,formikHelpers)=>{
                      console.log(values);
                      handleSave(values);
                      formikHelpers.resetForm();
                      handleClose();
  
                  }}
              >
                  
                      {({errors,isValid,touched, dirty}) => (
                              <Form>
                                  <DialogContent>
                                  <Field name="kode" 
                                      type="text" 
                                      as={TextField} 
                                      variant="standard"
                                      fullWidth 
                                      
                                      label="Kode" 
                                      error={Boolean(errors.kode) && Boolean(touched.kode)}
                                      helperText={Boolean(touched.kode) && errors.kode}/>
                                  <Field name="name" 
                                      type="text" 
                                      as={TextField} 
                                      variant="standard"
                                      fullWidth
                                      label="Nama Unit Kerja"
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
  
  EditForm.propTypes = {
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    afterSave:PropTypes.func,
    initialValues:PropTypes.object
  }
  
  export default EditForm