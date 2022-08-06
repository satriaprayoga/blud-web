import React from 'react'
import PropTypes from 'prop-types'
import { Formik, useFormik } from 'formik'
import { date, object, string } from 'yup'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import MainCard from '../../../ui-component/cards/MainCard'
import moment from 'moment'
import { values } from 'lodash'
import api from '../../../utils/api'


const ApbdForm = ({ open, handleClose, afterSave }) => {

  const handleSubmit=async(values)=>{
    try {
      const reponse=await api.post('apbd',values)
      console.log(response.data);
    } catch (error) {
      
    }
  }

  const formik = useFormik({
    initialValues: {
      'tahun': new Date().getFullYear(),
      'tahapan':'',
      'perda':'',
      'perkada':'',
      'status':0
    },
    validationSchema: object({
      tahun: date().min(new Date().getFullYear(), "Tahun harus lebih atau sama dengan tahun ini").required("Tahun harus diisi"),
      tahapan:string().required('Tahapan harus diisi'),
      perda:string().required('Perda harus diisi'),
      perkada:string().required('Perkada harus diisi')
    }),
    onSubmit: values => {
      console.log(formik.initialValues)
      console.log((values['tahun']).getFullYear());
      handleSubmit(values);
      formik.resetForm()
      handleClose()
    }
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <MainCard title="Pengaturan APBD">
          <form onSubmit={formik.handleSubmit}>
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
              <TextField
                    fullWidth
                    variant='standard'
                    id="tahapan"
                    name="tahapan"
                    label="Tahapan APBD"
                    value={formik.values.tahapan}
                    onChange={formik.handleChange}
                    error={(formik.errors.tahapan) && Boolean(formik.touched.tahapan)}
                    helperText={(formik.touched.tahapan) && formik.errors.tahapan}
                    />
              <TextField
                    fullWidth
                    variant='standard'
                    id="perda"
                    name="perda"
                    label="No Perda APBD"
                    value={formik.values.perda}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.perda) && Boolean(formik.touched.perda)}
                    helperText={Boolean(formik.touched.perda) && formik.errors.perda}
                    />
              <TextField
                    fullWidth
                    variant='standard'
                    id="perkada"
                    name="perkada"
                    label="Perkada APBD"
                    value={formik.values.perkada}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.perkada) && Boolean(formik.touched.perkada)}
                    helperText={Boolean(formik.touched.perkada) && formik.errors.perkada}
                    />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Batal</Button>
              <Button type="submit" variant="contained" disabled={!formik.dirty || !formik.isValid}>Simpan</Button>
            </DialogActions>

          </form>

      </MainCard>
    </Dialog>
  );
}

ApbdForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  afterSave: PropTypes.func
}

export default ApbdForm