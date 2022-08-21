import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useState } from 'react'
import SubCard from '../../ui-component/cards/SubCard'
import api from '../../utils/api'
import { useEffect } from 'react'
import { IconPlus } from '@tabler/icons';
import FormAction from '../../ui-component/cards/FormAction'
import { Link } from 'react-router-dom'

const Rba = props => {

    const [year, setYear] = useState(new Date().getFullYear());
    const [units, setUnits] = useState([]);
    const [unit, setUnit] = useState({});

    const [type, setType] = useState('pendapatan');

    const [subunits, setSubunits] = useState([]);
    const [subunit, setSubunit] = useState({});

    const [dpas,setDpas]=useState([]);
    const [dpa,setDpa]=useState({});

    const handleYearChange = async (event) => {
        setYear(event.target.value);
    }

    const handleUnitChange = async (event) => {
        setUnit(event.target.value);
        const selected = event.target.value;
        try {
            const response = await api.get('units/' + selected.id);
            console.log(response.data.subunits);
            setSubunits(response.data.subunits);
            setDpas(response.data.subunit.dpas);
        } catch (error) {

        }
    }

    const handleSubunitChange = async (event) => {
        setSubunit(event.target.value);
        const selected = event.target.value;
        try {
            const response = await api.get('subunits/' + selected.id);
            console.log(response.data.subunit.dpas);
            // setSubunits(response.data.subunits);
            setDpas(response.data.subunit.dpas);
        } catch (error) {

        }
    }

    const handleDpaChange= async (event) => {
        setDpa(event.target.value);
    }

    const handleTypeChange = async (event) => {
        setType(event.target.value)
    }

    const loadUnits = async () => {
        try {
            const response = await api.get('units');
            setUnits(response.data.units);
        } catch (err) {
        }
    }

    useEffect(() => {
        loadUnits();
    }, [])


    return (
        <MainCard title="Daftar RBA" secondary=
            {
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-label">Jenis RBA</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Jenis RBA"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value='pendapatan'>Pendapatan</MenuItem>
                        <MenuItem value='belanja'>Belanja</MenuItem>
                    </Select>
                </FormControl>
            }>
            <SubCard title='Unit Kerja'>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 250, marginLeft: '20px', marginTop: '10px' }}>
                            <InputLabel id="demo-simple-select-label">Tahun</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tahun"
                                value={year}
                                onChange={handleYearChange}
                            >
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 400, marginLeft: '20px', marginTop: '10px' }}>
                            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Unit"
                                value={unit}
                                onChange={handleUnitChange}
                            >
                                {units.map((unit) => (
                                    <MenuItem value={unit} key={unit.id}>[{unit.kode}] {unit.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        Object.keys(unit).length !== 0 &&
                        <Grid item xs={12}>
                            <FormControl sx={{ minWidth: 250, marginLeft: '20px', marginTop: '10px' }}>
                                <InputLabel id="demo-simple-select-label">Sub Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Sub Unit"
                                    value={subunit}
                                    onChange={handleSubunitChange}
                                >
                                    {subunits.map((sub) => (
                                        <MenuItem value={sub} key={sub.id}>[{sub.kode}] {sub.nama}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    {
                        Object.keys(subunit).length !== 0 &&
                        <Grid item xs={12}>
                            <FormControl sx={{ minWidth: 250, marginLeft: '20px', marginTop: '10px' }}>
                                <InputLabel id="demo-simple-select-label">DPA</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Sub Unit"
                                    value={dpa}
                                    onChange={handleDpaChange}
                                >
                                    {dpas.map((d) => (
                                        <MenuItem value={d} key={d.id}>[{d.tahapan}] {d.no_dpa}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    }
                </Grid>
            </SubCard>

        </MainCard>
    )
}

Rba.propTypes = {}

export default Rba