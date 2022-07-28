import React from 'react'
import PropTypes from 'prop-types'

import MainCard from '../../ui-component/cards/MainCard'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

const Accounts = ({ report }) => {

    const [induk,setInduk]=useState('')

    const handleChange= async (event)=>{
        setInduk(event.target.value);
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
                        <MenuItem value='semua'>Semua</MenuItem>
                        <MenuItem value='pendapatan'>Pendapatan</MenuItem>
                        <MenuItem value='belanja'>Belanja</MenuItem>
                    </Select>
                </FormControl>}></MainCard>
    )
}

Accounts.propTypes = {
    report: PropTypes.string
}

export default Accounts