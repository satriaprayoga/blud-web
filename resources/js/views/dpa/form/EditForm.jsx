import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { Button, Dialog, DialogActions, DialogContent, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import MainCard from '../../../ui-component/cards/MainCard';
import { number, object, string } from 'yup';
import api from '../../../utils/api';

const EditForm = ({open, initialValues, handleClose, afterSave}) => {
  const {id}=useParams();

  const handleSave=async(values)=>{
    try {
      const response=await api.put('dpa/'+id,values);
      console.log(response.data.dpa);
    } catch (error) {
      
    }
    afterSave();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <MainCard title="Edit DPA">
          <Formik initialValues={initialValues}
                  validationSchema={
                    object({
                      tahapan: string().required('Tahapan harus diisi').max(12),
                      total: number().required('Total Pagu harus diisi').default(0.00),
                      no_dpa: string().required('Nomor DPA harus diisi')
                    })
                  }
                  onSubmit={(values,formikHelpers)=>{
                    console.log(values);
                    handleSave(values);
                    formikHelpers.resetForm();
                    handleClose();

                }}>
                  {({ errors, isValid, touched, dirty, values, setFieldValue, handleChange }) => (
            <Form>
              <DialogContent>
                <TextField
                  id="tahapan"
                  name="tahapan"
                  sx={{ marginTop: '5px' }}
                  fullWidth
                  variant='standard'
                  select
                  label="Tahapan"
                  value={values.tahapan}
                  onChange={handleChange('tahapan')}
                  error={Boolean(errors.tahapan) && Boolean(touched.tahapan)}
                  helperText={Boolean(touched.tahapan) && errors.tahapan}>
                  <MenuItem value="murni">Murni</MenuItem>
                  <MenuItem value="p1">Parsial 1</MenuItem>
                  <MenuItem value="p2">Parsial 2</MenuItem>
                  <MenuItem value="p3">Parsial 3</MenuItem>
                  <MenuItem value="pr">APBD-P</MenuItem>
                </TextField>
                <TextField
                  id='no_dpa'
                  name='no_dpa'
                  label="Nomor DPA"
                  sx={{ marginTop: '5px' }}
                  fullWidth
                  variant='standard'
                  value={values.no_dpa}
                  onChange={handleChange('no_dpa')}
                  error={Boolean(errors.no_dpa) && Boolean(touched.no_dpa)}
                  helperText={Boolean(touched.no_dpa) && errors.no_dpa}
                />
                <TextField
                  id='total'
                  name='total'
                  label="Total Pagu"
                  sx={{ marginTop: '5px' }}
                  fullWidth
                  variant='standard'
                  value={values.total}
                  onChange={handleChange('total')}
                  inputProps={{ inputMode: 'numeric' }}
                  error={Boolean(errors.total) && Boolean(touched.total)}
                  helperText={Boolean(touched.total) && errors.total}
                />
                {values.tahapan !== 'murni' &&
                  <TextField
                    id='total_after'
                    name='total_after'
                    label="Total Setelah Perubahan"
                    sx={{ marginTop: '5px' }}
                    fullWidth
                    variant='standard'
                    value={values.total}
                    onChange={handleChange('total_after')}
                    inputProps={{ inputMode: 'numeric' }}
                    error={Boolean(errors.total_after) && Boolean(touched.total_after)}
                    helperText={Boolean(touched.total_after) && errors.total_after}
                  />
                }

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