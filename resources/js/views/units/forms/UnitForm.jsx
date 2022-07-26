import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../../ui-component/cards/MainCard'
import { Field, Form, Formik } from 'formik'
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { object } from 'yup'
import { string } from 'yup'
import api from '../../../utils/api'

const initialValues = {
    "name": "",
    "kode": "",
    "singkatan": "",
    "lokasi": "",
    "nama_kepala": "-",
    "nip_kepala": "-",
    "jabatan_kepala": "Direktur"
}

const UnitForm = ({open, handleClose, afterSave}) => {

    const handleSave=async (values)=>{
        try {
            const response=await api.post('units',values);
            //console.log(response);
        } catch (error) {
            console.log(error)
        }
        afterSave();
      }

    return (
        <Dialog open={open} onClose={handleClose}>
            <MainCard title="Tambah Unit Baru">
            <Formik 
                initialValues={initialValues} 
                validationSchema={object({
                    name:string().required("Mohon isi nama Unit").min(4,"Min. 4 karakter"),
                    kode:string().required("Mohon isi kode Unit").min(4,"Min. 4 karakter"),
                    singkatan:string().required("Mohon isi singkatan Unit").min(4,"Min. 4 karakter"),
                    lokasi:string().required("Mohon isi lokasi Unit").min(4,"Min. 4 karakter"),
                    nama_kepala:string().required("Mohon isi nama Kepala Unit"),
                    nip_kepala:string().required("Mohon isi NIP Kepala Unit"),
                    jabatan_kepala:string().required("Mohon isi Jabatan Kepala Unit"),

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
                                <Field name="name" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth
                                    label="Nama Unit Kerja"
                                    error={Boolean(errors.name) && Boolean(touched.name)}
                                    helperText={Boolean(touched.name) && errors.name}
                                    />
                                <Field name="kode" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth 
                                    
                                    label="Kode" 
                                    error={Boolean(errors.kode) && Boolean(touched.kode)}
                                    helperText={Boolean(touched.kode) && errors.kode}/>
                                <Field name="singkatan" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth 
                                    label="Singkatan"
                                    error={Boolean(errors.singkatan) && Boolean(touched.singkatan)} 
                                    helperText={Boolean(touched.singkatan) && errors.singkatan}/>
                                <Field name="lokasi" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth 
                                    label="Lokasi"
                                    error={Boolean(errors.lokasi) && Boolean(touched.lokasi)} 
                                    helperText={Boolean(touched.lokasi) && errors.lokasi}/>
                                <Field name="nama_kepala" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth margin="dense" 
                                    label="Kepala Unit"
                                    error={Boolean(errors.nama_kepala) && Boolean(touched.nama_kepala)}
                                    helperText={Boolean(touched.nama_kepala) && errors.nama_kepala} />
                                <Field name="nip_kepala" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth 
                                    label="NIP Kepala Unit"
                                    error={Boolean(errors.nip_kepala) && Boolean(touched.nip_kepala)}
                                    helperText={Boolean(touched.nip_kepala) && errors.nip_kepala} />
                                <Field name="jabatan_kepala" 
                                    type="text" 
                                    as={TextField} 
                                    variant="standard"
                                    fullWidth 
                                    label="Jabatan Kepala Unit"
                                    error={Boolean(errors.jabatan_kepala) && Boolean(touched.jabatan_kepala)}
                                    helperText={Boolean(touched.jabatan_kepala) && errors.jabatan_kepala} />
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

UnitForm.propTypes = {
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    afterSave:PropTypes.func
}

export default UnitForm