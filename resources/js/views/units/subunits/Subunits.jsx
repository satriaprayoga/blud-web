import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import MainCard from '../../../ui-component/cards/MainCard'
import FormAction from '../../../ui-component/cards/FormAction'
import { IconEye, IconPlus } from '@tabler/icons'
import SubunitForm from './forms/SubunitForm'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router'

const ActionColumn=(props)=>{
  const {value}=props;
  const navigation=useNavigate();
  return(
      <>
          <Box sx={{border: 'none', alignItems:'center', display:'flex', width:'100%'}}>
          <Button onClick={(e)=>{e.preventDefault();navigation('/units/subs/'+value);}} sx={{width:'50%',}}>
              <IconEye/>
            </Button>
          </Box>
      </>
  );
}

const columns = [
    {
      field: 'nama',
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
      field: 'id',
      headerName: 'Aksi',
      width: 160,
      editable: false,
      renderCell: ActionColumn,
    }
]

const Subunits = ({rows,unit})=> {
  const [open,setOpen]=useState(false);

  const handleClick=()=>{
    console.log('handle click')
    setOpen(true);
  };
  const handleClose=()=>{
    setOpen(false);
  };
  return (
    <MainCard title="Sub Unit" sx={{marginTop:5}} secondary={<FormAction title="Tambah Sub Unit" icon={<IconPlus/>} handleClick={handleClick}/>}>
     {rows && 
      <Box sx={{height:400,width:'100%'}}>
         <DataGrid columns={columns} rows={rows}/>
      </Box>
     
     }
     <SubunitForm open={open} 
     handleClose={handleClose} 
     initialValues={{
      "nama": "",
      "kode": "",
      "singkatan": "",
      "nama_bend": "-",
      "nip_bend": "-",
      "jabatan_bend": "-",
      "nama_sptjm": unit.nama_kepala,
      "nip_sptjm": unit.nip_kepala,
      "jabatan_sptjm": unit.jabatan_kepala,
      "nama_sp2b": unit.nama_kepala,
      "nip_sp2b": unit.nip_kepala,
      "jabatan_sp2b": unit.jabatan_kepala,
      "unit_id":unit.id
     }} />
    </MainCard>
  )
}

Subunits.propTypes = {
    rows: PropTypes.array
}

export default Subunits