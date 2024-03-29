import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

import MainCard from '../../ui-component/cards/MainCard'
import SubCard from '../../ui-component/cards/SubCard'
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'

import api from '../../utils/api';
import { SearchOutlined } from '@mui/icons-material'

const Accounts = ({ report }) => {

    const [induk, setInduk] = useState('')
    const [accounts, setAccounts] = useState([]);

    const handleChange = async (event) => {
        setAccounts([]);
        try {
            setInduk(event.target.value);
            let response = await api.get(`accounts/group/${report.toLowerCase()}/type/${event.target.value}`);
            setAccounts(response.data.accounts);
            console.log(response.data.accounts);
        } catch (error) {

        }
    }

    useEffect(()=>{
       const onPageLoad=async()=>{
        let response = await api.get(`accounts/group/${report.toLowerCase()}/type`);
        setAccounts(response.data.accounts);
       }
       onPageLoad();
    },[])

    return (
        <MainCard title={`Rekening ${report.toUpperCase()}`}
            secondary=
            {
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-label">Akun</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={induk}
                        label="Akun"
                        onChange={handleChange}
                    >
                        <MenuItem value=''>Semua</MenuItem>
                        <MenuItem value='pendapatan'>Pendapatan</MenuItem>
                        <MenuItem value='belanja'>Belanja</MenuItem>
                    </Select>
                </FormControl>
            }>
            <Grid container>
                <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Typography variant='h3'>{induk.length === 0 ? 'Semua Akun' : induk.toUpperCase()}</Typography>
                </Grid>
                <Grid item xs={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', margin:1 }}>
                        <SearchOutlined />
                        <TextField id="input-with-sx" label="Cari..." variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Daftar Rekening">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Kode</TableCell>
                                        <TableCell>Uraian</TableCell>
                                        <TableCell>Laporan</TableCell>
                                        <TableCell>Level</TableCell>
                                        <TableCell>Kelompok</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {accounts.map((acc)=>(
                                       <TableRow key={acc.id}>
                                            <TableCell><Link to={`/accounts/${acc.id}`}>{acc.kode}</Link></TableCell>
                                            <TableCell>{acc.name}</TableCell>
                                            <TableCell>{acc.group.toUpperCase()}</TableCell>
                                            <TableCell>{acc.report}</TableCell>
                                            <TableCell>{acc.type}</TableCell>
                                       </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination rowsPerPageOptions={[5,10,25]} 
                            count={accounts.length}
                            rowsPerPage={5}
                            page={0}></TablePagination>
                    </SubCard>
                </Grid>
            </Grid>
           

        </MainCard>
    )
}

Accounts.propTypes = {
    report: PropTypes.string
}

export default Accounts