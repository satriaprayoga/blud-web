import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import FormAction from '../../ui-component/cards/FormAction'
import ApbdForm from './forms/ApbdForm'
import api from '../../utils/api'
import { useEffect } from 'react'

const Apbd = props => {
    const [open, setOpen] = useState(false);
    const [apbds, setApbds] = useState([]);

    const loadApbds = async () => {
        try {
            const response = await api('apbd');
            setApbds(response.data.apbds);
        } catch (error) {

        }
    }

    const handleClick = () => {
        console.log('handle click')
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const afterSave = () => {
        console.log("after save");
    }

    useEffect(() => {
        loadApbds();
    }, [])

    return (
        <MainCard title="APBD" secondary={<FormAction title="Tambah Unit" icon={<IconPlus />} handleClick={handleClick} />}>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tahun</TableCell>
                                    <TableCell>Periode</TableCell>
                                    <TableCell>Perda</TableCell>
                                    <TableCell>Perbup</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apbds.map((apbd) => (
                                    <TableRow key={apbd.id}>
                                        <TableCell>{apbd.tahun}</TableCell>
                                        <TableCell>{apbd.tahapan}</TableCell>
                                        <TableCell>{apbd.perda}</TableCell>
                                        <TableCell>{apbd.perkada}</TableCell>
                                        <TableCell>{apbd.status == 0 ? 'Draft' : 'Final'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
            <ApbdForm open={open} handleClose={handleClose} afterSave={afterSave} />
        </MainCard>
    )
}

Apbd.propTypes = {}

export default Apbd