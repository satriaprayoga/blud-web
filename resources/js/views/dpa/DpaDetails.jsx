import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import api from '../../utils/api';
import FormAction from '../../ui-component/cards/FormAction';

const numberFormat=(value)=>{
  const numberFormatter = Intl.NumberFormat('id-ID');
  const formatted = numberFormatter.format(value);   
  return formatted;
}

const DpaDetails = props => {
  const {id}=useParams();

  const [dpa,setDpa]=useState({});
  const [subunit,setSubunit]=useState({});

  const [openEdit, setOpenEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditClick = () => {
    setOpenEdit(true);
  }

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  }

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  }
  
  const loadDpa=async()=>{
    try {
        const response=await api.get('dpa/'+id);
        setDpa(response.data.dpa);
        setSubunit(response.data.subunit);
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    loadDpa();
  },[]);
  return (
    <MainCard title={`DPA ${subunit.nama}`} 
      secondary={
        dpa.aktif==false ? 
        
        <FormAction 
        titleDelete="Hapus DPA" 
        iconDelete={<IconTrash/>} 
        handleDelete={handleDeleteClick}
        titleEdit="Edit DPA" 
        iconEdit={<IconEdit />} 
        handleEdit={handleEditClick}/>
       :
        <FormAction
         titleEdit="Edit DPA" 
         iconEdit={<IconEdit />} 
         handleEdit={handleEditClick} />
         
      }>
         <Grid container spacing={2}>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>No.DPA</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {dpa.no_dpa}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Tahapan</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {dpa.tahapan}</Typography>
          </Grid>
          
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Kegiatan</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {dpa.kode_kegiatan} {dpa.kegiatan}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Sub Kegiatan</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {dpa.kode_subkegiatan} {dpa.subkegiatan}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Total</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {numberFormat(dpa.total)}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Total Perubahan</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {numberFormat(dpa.total_after)}</Typography>
          </Grid>
          
         </Grid>
    </MainCard>
  )
}

DpaDetails.propTypes = {}

export default DpaDetails