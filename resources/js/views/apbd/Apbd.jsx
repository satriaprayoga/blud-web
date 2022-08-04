import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { Formik, useFormik } from 'formik'
import { date, object } from 'yup'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const initialValues = {
    "tahun":new Date().getFullYear(),
}

const Apbd = props => {

    const formik=useFormik({
        initialValues:{
            'tahun':new Date().getFullYear(),
        },
        validationSchema:object({
            tahun:date().min(new Date().getFullYear(),"Tahun harus lebih atau sama dengan tahun ini").required("Tahun harus diisi")
        }),
        onSubmit:values=>{
            console.log(values);
        }
    });
    return (
        <MainCard title="APBD">
            <Grid container>
                <Grid xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tahun</TableCell>
                                    <TableCell>Tahapan</TableCell>
                                    <TableCell>Periode</TableCell>
                                    <TableCell>Perda</TableCell>
                                    <TableCell>Perbup</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>2022</TableCell>
                                    <TableCell>APBD 2022</TableCell>
                                    <TableCell>Murni</TableCell>
                                    <TableCell>No 8 Tahun 2022</TableCell>
                                    <TableCell>No 69 Tahun 2022</TableCell>
                                    <TableCell>final</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid xs={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker 
                            label="tahun"
                            views={['year']}
                            name="tahun"
                            value={formik.values.tahun}
                            onChange={(value)=>formik.setFieldValue('tahun',Date.parse(value))}
                            renderInput={(params)=>
                                <TextField {...params} 
                                error={Boolean(formik.errors.tahun) && Boolean(formik.touched.tahun)}
                                helperText={Boolean(formik.touched.tahun) && formik.errors.tahun}/>}
                            />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            
        </MainCard>
    )
}

Apbd.propTypes = {}

export default Apbd