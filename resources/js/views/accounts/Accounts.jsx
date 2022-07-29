import React from 'react'
import PropTypes from 'prop-types'

import MainCard from '../../ui-component/cards/MainCard'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import api from '../../utils/api';
import { SearchOutlined } from '@mui/icons-material'

const Accounts = ({ report }) => {

    const [induk, setInduk] = useState('')
    const [accounts, setAccounts] = useState([]);

    const handleChange = async (event) => {
        try {
            setInduk(event.target.value);
            let response = await api.get(`accounts/report/${report}/type/${event.target.value}`);
            setAccounts(response.data.accounts);
            console.log(response.data.accounts);
        } catch (error) {

        }
    }

    return (
        <MainCard title={`Rekening ${report}`}
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
                    <Typography variant='h3'>{induk.length === 0 ? 'Semua Akun' : induk}</Typography>
                </Grid>
                <Grid item xs={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchOutlined />
                        <TextField id="input-with-sx" label="Cari..." variant="standard" />
                    </Box>
                </Grid>
            </Grid>

        </MainCard>
    )
}

Accounts.propTypes = {
    report: PropTypes.string
}

export default Accounts