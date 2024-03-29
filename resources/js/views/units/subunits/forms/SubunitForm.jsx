import React from 'react'
import PropTypes from 'prop-types'
import { Field, Form, Formik } from 'formik'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material'
import { object } from 'yup'
import { string } from 'yup'
import MainCard from '../../../../ui-component/cards/MainCard'
import SubCard from '../../../../ui-component/cards/SubCard'
import api from '../../../../utils/api'


const SubunitForm = ({ open, handleClose, initialValues }) => {

    const handleSave = async (values) => {
        try {
            let response = await api.post('subunits', values);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
           <Formik
                    initialValues={initialValues}
                    validationSchema={object({
                        nama: string().required("Mohon isi nama Unit").min(4, "Min. 4 karakter"),
                        kode: string().required("Mohon isi kode Unit").min(4, "Min. 4 karakter"),
                        singkatan: string().required("Mohon isi singkatan Unit").min(4, "Min. 4 karakter"),
                        nama_bend: string().required("Mohon isi nama bend Unit"),
                        nip_bend: string().required("Mohon isi NIP bend Unit"),
                        jabatan_bend: string().required("Mohon isi Jabatan bend Unit"),

                    })}
                    onSubmit={(values, formikHelpers) => {
                        console.log(values);
                        handleSave(values);
                        formikHelpers.resetForm();
                        handleClose();

                    }}
                >

                    {({ errors, isValid, touched, dirty }) => (
                        <Form>
                            <DialogTitle>Tambah Sub Unit</DialogTitle>
                            <DialogContent id="scroll-dialog-description">
                                <SubCard>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Field name="kode"
                                                type="text"
                                                as={TextField}
                                                variant="standard"
                                                fullWidth

                                                label="Kode"
                                                error={Boolean(errors.kode) && Boolean(touched.kode)}
                                                helperText={Boolean(touched.kode) && errors.kode} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field name="nama"
                                                type="text"
                                                as={TextField}
                                                variant="standard"
                                                fullWidth
                                                label="Nama Sub Unit"
                                                error={Boolean(errors.nama) && Boolean(touched.nama)}
                                                helperText={Boolean(touched.nama) && errors.nama}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            
                                            <Field name="singkatan"
                                                type="text"
                                                as={TextField}
                                                variant="standard"
                                                fullWidth
                                                label="Singkatan"
                                                error={Boolean(errors.singkatan) && Boolean(touched.singkatan)}
                                                helperText={Boolean(touched.singkatan) && errors.singkatan} />
                                                    </Grid>
                                    </Grid>

                                </SubCard>
                                <SubCard>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <Field name="nama_bend"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth margin="dense"
                                    label="Bendahara"
                                    error={Boolean(errors.nama_bend) && Boolean(touched.nama_bend)}
                                    helperText={Boolean(touched.nama_bend) && errors.nama_bend} />
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Field name="nip_bend"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth
                                    label="NIP bend Unit"
                                    error={Boolean(errors.nip_bend) && Boolean(touched.nip_bend)}
                                    helperText={Boolean(touched.nip_bend) && errors.nip_bend} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            
                                        <Field name="jabatan_bend"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth
                                    label="Jabatan bend Unit"
                                    error={Boolean(errors.jabatan_bend) && Boolean(touched.jabatan_bend)}
                                    helperText={Boolean(touched.jabatan_bend) && errors.jabatan_bend} />
                                                    </Grid>
                                    </Grid>

                                </SubCard>
                                <SubCard>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <Field name="nama_sptjm"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth margin="dense"
                                    label="Penandatangan SPTJM"
                                    error={Boolean(errors.nama_sptjm) && Boolean(touched.nama_sptjm)}
                                    helperText={Boolean(touched.nama_sptjm) && errors.nama_sptjm} />
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Field name="nip_sptjm"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth
                                    label="NIP sptjm Unit"
                                    error={Boolean(errors.nip_sptjm) && Boolean(touched.nip_sptjm)}
                                    helperText={Boolean(touched.nip_sptjm) && errors.nip_sptjm} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            
                                        <Field name="jabatan_sptjm"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth
                                    label="Jabatan sptjm Unit"
                                    error={Boolean(errors.jabatan_sptjm) && Boolean(touched.jabatan_sptjm)}
                                    helperText={Boolean(touched.jabatan_sptjm) && errors.jabatan_sptjm} />
                                                    </Grid>
                                    </Grid>

                                </SubCard>
                                <SubCard>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <Field name="nama_sp2b"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth margin="dense"
                                    label="Penandatangan SP2B"
                                    error={Boolean(errors.nama_sp2b) && Boolean(touched.nama_sp2b)}
                                    helperText={Boolean(touched.nama_sp2b) && errors.nama_sp2b} />
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Field name="nip_sp2b"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth
                                    label="NIP sp2b Unit"
                                    error={Boolean(errors.nip_sp2b) && Boolean(touched.nip_sp2b)}
                                    helperText={Boolean(touched.nip_sp2b) && errors.nip_sp2b} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            
                                         
                                <Field name="jabatan_sp2b"
                                    type="text"
                                    as={TextField}
                                    variant="standard"
                                    fullWidth
                                    label="Jabatan sp2b Unit"
                                    error={Boolean(errors.jabatan_sp2b) && Boolean(touched.jabatan_sp2b)}
                                    helperText={Boolean(touched.jabatan_sp2b) && errors.jabatan_sp2b} />
                                                    </Grid>
                                    </Grid>

                                </SubCard>


                                
                                
                                
                               
                                
                               
                                
                              

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Batal</Button>
                                <Button type="submit" variant="contained" disabled={!dirty || !isValid}>Simpan</Button>
                            </DialogActions>
                        </Form>
                    )
                    }
                </Formik>
        </Dialog>
    )
}

SubunitForm.propTypes = {}

export default SubunitForm