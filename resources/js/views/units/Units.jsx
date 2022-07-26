import React from 'react'
import MainCard from '../../ui-component/cards/MainCard';
import FormAction from '../../ui-component/cards/FormAction';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import UnitsData from './UnitsData';
import api from '../../utils/api';
import { useEffect } from 'react';
import UnitForm from './forms/UnitForm';


const Units = () => {
  const [open,setOpen]=useState(false);
  const [units,setUnits]=useState([]);

  const handleClick=()=>{
    console.log('handle click')
    setOpen(true);
  };

  const handleClose=()=>{
    setOpen(false);
  };

  const afterSave=()=>{
    loadUnits();
  }

  const loadUnits= async ()=>{
    try{
      const response=await api.get('units');
      console.log(response.data.units);
      setUnits(response.data.units.map(e=>{
        return{
          namaUnit:e.name,kode:e.kode,singkatan:e.singkatan,lokasi:e.lokasi,id:e.id
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
        <UnitsData rows={units}/>
    </MainCard>
    <UnitForm open={open} handleClose={handleClose} afterSave={afterSave}/>
    
    {/* <Dialog open={open} onClose={handleClose}>
      <MainCard title="Tambah Unit Baru">
        
      <DialogContent>
        <TextField autoFocus margin='dense' id='nama' label='Nama Unit' fullWidth variant='standard'/>
        <TextField margin='dense' id='kode' label='Kode Unit' fullWidth variant='standard'/>
        <TextField margin='dense' id='singkatan' label='Singkatan' fullWidth variant='standard'/>
        <TextField margin='dense' id='lokasi' label='Lokasi' fullWidth variant='standard'/>
        <TextField margin='dense' id='nama_kepala' label='Nama Kepala Unit' fullWidth variant='standard'/>
        <TextField margin='dense' id='nip_kepala' label='NIP Kepala Unit' fullWidth variant='standard'/>
        <TextField margin='dense' id='jabatan_kepala' label='Jabatan Kepala Unit' fullWidth variant='standard'/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button onClick={handleSave}>Simpan</Button>
      </DialogActions>
      </MainCard>
    </Dialog> */}
    </>
    
    
  )
}

export default Units