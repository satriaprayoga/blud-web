import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, useFormik } from 'formik'
import { Button, Dialog, DialogActions, DialogContent, MenuItem, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import MainCard from '../../../ui-component/cards/MainCard';
import { date, object, string } from 'yup';
import { number } from 'yup';

const DpaForm = ({ open, handleClose, afterSave, subunit }) => {

  const formik = useFormik({
    initialValues: {
      'tahun': new Date(),
      'tahapan': 'murni',
      'type': '',
      'no_dpa': '',
      'subunit_id': subunit.id,
      'total': 0.00,
      'total_after': 0.00,
      'aktif': false
    },
    validationSchema: object({
      tahun: date().min(new Date(), "Tahun harus lebih atau sama dengan tahun ini").required("Tahun harus diisi"),
      tahapan: string().required('Tahapan harus diisi'),
      no_dpa: string().required('Nomor DPA harus diisi')
    }),
    onSubmit: values => {
      console.log(values)
    }
  });


  return (
    <Dialog open={open} onClose={handleClose}>
      <MainCard title={`Buat DPA Sub Unit ${subunit.nama}`}>
        <Formik
          initialValues={{
            'tahun': new Date(),
            'tahapan': '',
            'type': '',
            'no_dpa': '',
            'subunit_id': subunit.id,
            'total': 0.00,
            'total_after': 0.00,
            'aktif': false
          }}
          validationSchema={
            object({
              tahun: date().min(new Date(), "Tahun harus lebih atau sama dengan tahun ini").required("Tahun harus diisi"),
              tahapan: string().required('Tahapan harus diisi').max(12),
              total: number().required('Total Pagu harus diisi').default(0.00),
              type: string().required('Jenis DPA harus diisi'),
              no_dpa: string().required('Nomor DPA harus diisi')
            })
          }
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            formikHelpers.resetForm();
            handleClose();

          }}>
          {({ errors, isValid, touched, dirty, values,setFieldValue, handleChange }) => (
            <Form>
              <DialogContent>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    views={['year']}
                    value={values.tahun}
                    disablePast
                    onChange={(value) => setFieldValue('tahun', new Date(value),true)}
                    renderInput={(params) =>
                      <TextField {...params}
                        fullWidth
                        id="tahun"
                        onChange={(value) => setFieldValue('tahun', new Date(value),true)}
                        value={values.tahun}
                        name="tahun"
                        label="tahun"
                        variant='standard'
                        touched="true"
                        error={Boolean(errors.tahun) && Boolean(touched.tahun)}
                        helperText={Boolean(touched.tahun) && errors.tahun} />}
                  />

                </LocalizationProvider>
                <TextField
                  id="type"
                  name="type"
                  sx={{marginTop:'5px'}}
                  fullWidth
                  variant='standard'
                  select
                  label="Jenis DPA"
                  value={values.type}
                  onChange={handleChange('type')}
                  error={Boolean(errors.type) && Boolean(touched.type)}
                  helperText={Boolean(touched.type) && errors.type}>
                    <MenuItem value="belanja">BELANJA</MenuItem>
                    <MenuItem value="pendapatan">PENDAPATAN</MenuItem>
                </TextField>
                <TextField
                  id="tahapan"
                  name="tahapan"
                  sx={{marginTop:'5px'}}
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
                  sx={{marginTop:'5px'}}
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
                  sx={{marginTop:'5px'}}
                  fullWidth
                  variant='standard'
                  value={values.total}
                  onChange={handleChange('total')}
                  inputProps={{inputMode:'numeric'}}
                  error={Boolean(errors.total) && Boolean(touched.total)}
                  helperText={Boolean(touched.total) && errors.total}
                  />
                  { values.tahapan !== 'murni' &&
                   <TextField
                   id='total_after'
                   name='total_after'
                   label="Total Setelah Perubahan"
                   sx={{marginTop:'5px'}}
                   fullWidth
                   variant='standard'
                   value={values.total}
                   onChange={handleChange('total_after')}
                   inputProps={{inputMode:'numeric'}}
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
        {/* <form onSubmit={formik.handleSubmit}>
          <DialogContent>
          <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="tahun"
                  views={['year']}
                  name="tahun"
                  disablePast
                  value={formik.values.tahun}
                  onChange={(value) => formik.setFieldValue('tahun', new Date(value))}
                  renderInput={(params) =>
                    <TextField {...params}
                      fullWidth
                      variant='standard'
                      defaultValue={new Date().getFullYear()}
                      error={Boolean(formik.errors.tahun) && (formik.touched.tahun)}
                      helperText={(formik.touched.tahun) && formik.errors.tahun} />}
                />
               
              </LocalizationProvider>
          </DialogContent>
        </form> */}
      </MainCard>
    </Dialog >
  )
}

DpaForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  afterSave: PropTypes.func
}

export default DpaForm