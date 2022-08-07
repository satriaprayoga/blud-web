import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import SubCard from '../../ui-component/cards/SubCard'
import api from '../../utils/api'
import { useEffect } from 'react'

const Dpa = props => {

  const [year, setYear] = useState(new Date().getFullYear());
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState({})

  const handleYearChange = async (event) => {
    setYear(event.target.value);
  }

  const handleUnitChange = async (event) => {
    setUnit(event.target.value);
  }

  const loadUnits = async () => {
    try {
      const response = await api.get('units');
      console.log(response.data.units);
      setUnits(response.data.units);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadUnits();
  }, [])


  return (
    <MainCard title="Daftar DPA">
      <SubCard title="Unit Kerja">
        <Grid container>
        <Grid item xs={12}>
          <FormControl sx={{ minWidth: 250, margin: '10px' }}>
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
            <FormControl sx={{ minWidth: 250, margin: '10px' }}>
              <InputLabel id="demo-simple-select-label">Unit Kerja</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tahun"
                value={unit}
                onChange={handleUnitChange}
              >
                {units.map((unit) => (
                  <MenuItem value={unit} key={unit.id}>[{unit.kode}] {unit.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </SubCard>
    </MainCard>
  )
}

Dpa.propTypes = {}

export default Dpa