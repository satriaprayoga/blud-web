import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Apbd = props => {
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
            </Grid>
        </MainCard>
    )
}

Apbd.propTypes = {}

export default Apbd