import React from 'react'
import { Field, Form, Formik} from 'formik'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material'
import { bool, object } from 'yup'
import { string } from 'yup'
import PropTypes from 'prop-types'

const OperasionalForm = ({ open, handleClose, initialValues }) => {

    return (
        <Dialog open={open} 
            onClose={handleClose} 
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
                <Formik
                    initialValues={initialValues}
                    validationSchema={object({
                        name: string().required('Nama Unit Operasional harus diisi'),
                        kode: string().required("Mohon isi kode Unit").min(4, "Min. 4 karakter"),
                        pendapatan: bool().required("Opsi pendapatan harus diisi").default(false)
                    })}
                >

                </Formik>
        </Dialog>
    )
}

OperasionalForm.propTypes = {}

export default OperasionalForm