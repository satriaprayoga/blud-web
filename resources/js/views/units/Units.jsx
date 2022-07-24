import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid';
import MainCard from '../../ui-component/cards/MainCard';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import FormAction from '../../ui-component/cards/FormAction';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import Loader from '../../ui-component/Loader';
import { useNavigate } from 'react-router';
import UnitsData from './UnitsData';
import api from '../../utils/api';
import { useEffect } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'namaUnit',
      headerName: 'Nama',
      width: 250,
      editable: false,
    },
    {
      field: 'kode',
      headerName: 'Kode',
      width: 250,
      editable: false,
    },
    {
      field: 'singkatan',
      headerName: 'Singkatan',
      width: 150,
    },
    {
      field: 'lokasi',
      headerName: 'Lokasi',
      width: 160,
    },
    /* {
      field: 'nama_kepala',
      headerName: 'Kepala Unit',
      width: 160,
    },
    {
      field: 'nip_kepala',
      headerName: 'NIP',
      width: 160,
    },
    {
      field: 'jabatan_kepala',
      headerName: 'Jabatan',
      width: 160,
    }, */
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

const Units = props => {
  const [open,setOpen]=useState(false);
  const [units,setUnits]=useState([]);
  const navigation=useNavigate();


  const handleClick=()=>{
    console.log('handle click')
    setOpen(true);
  };

  const handleClose=()=>{
    setOpen(false);
  };

  const handleSave=()=>{
    setOpen(false);
    console.log('navigate')
    navigation('/dashboard/default');
  }

  const loadUnits= async ()=>{
    try{
      const response=await api.get('units');
      console.log(response.data.units);
      setUnits(response.data.units.map(e=>{
        return{
          id:e.id,namaUnit:e.name,kode:e.kode,singkatan:e.singkatan,lokasi:e.lokasi
        }
      }));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
      loadUnits();
  },[])

  return (
    <>
    <MainCard title="Unit Kerja" secondary={<FormAction title="Tambah Unit" icon={<IconPlus/>} handleClick={handleClick}/>}>
        <UnitsData rows={units} columns={columns}/>
    </MainCard>
    
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tambah Unit Kerja</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin='dense' id='nama' label='Nama Unit' fullWidth variant='standard'/>
        <TextField autoFocus margin='dense' id='kode' label='Kode Unit' fullWidth variant='standard'/>
        <TextField autoFocus margin='dense' id='singkatan' label='Singkatan' fullWidth variant='standard'/>
        <TextField autoFocus margin='dense' id='lokasi' label='Lokasi' fullWidth variant='standard'/>
        <TextField autoFocus margin='dense' id='nama_kepala' label='Nama Kepala Unit' fullWidth variant='standard'/>
        <TextField autoFocus margin='dense' id='nip_kepala' label='NIP Kepala Unit' fullWidth variant='standard'/>
        <TextField autoFocus margin='dense' id='jabatan_kepala' label='Jabatan Kepala Unit' fullWidth variant='standard'/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button onClick={handleSave}>Simpan</Button>
      </DialogActions>
    </Dialog>
    </>
    
    
  )
}

Units.propTypes = {}

export default Units