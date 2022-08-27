import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router'
import MainCard from '../../../ui-component/cards/MainCard';
import { useState } from 'react';
import api from '../../../utils/api';
import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../../../ui-component/cards/SubCard';
import FormAction from '../../../ui-component/cards/FormAction';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons';
import EditForm from './forms/EditForm';

const SubunitsDetails = props => {
  const {id}=useParams();
  const navigation=useNavigate();

  const [subunit,setSubunit]=useState({});
  const [unit,setUnit]=useState({});

  const [open,setOpen]=useState(false);
  const [deleteOpen,setDeleteOpen]=useState(false);

  const handleEditClick=()=>{
    setOpen(true);
  }
  const handleClose=()=>{
    setOpen(false);
  };

  const handleDeleteClose=()=>{
    setDeleteOpen(false);
  }

  const handleDeleteClick=()=>{
    setDeleteOpen(true);
  }

  const handleDelete= async ()=>{
    try {
      const response=await api.delete('subunits/'+id);
     
    } catch (error) {
      
    }
    handleDeleteClose();
    navigation("/units");
  }


  const loadSubunit=async()=>{
    try {
        let response=await api.get('subunits/'+id);
        setSubunit(response.data.subunit);
        setUnit(response.data.subunit.unit);
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    loadSubunit();
  },[])


  return (
    <>
    <MainCard title={subunit.nama} secondary={<FormAction titleEdit="Edit Sub Unit" 
    iconEdit={<IconEdit/>} 
    handleEdit={handleEditClick}
    titleDelete="Hapus Sub Unit"
    iconDelete={<IconTrash/>}
    handleDelete={handleDeleteClick}
    />}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <SubCard title="Profile">
                    <Grid item>
                        <MuiTypography variant="h3" gutterBottom>
                                {unit.kode} {unit.name}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.kode} {subunit.nama}
                        </MuiTypography>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="Bendahara BLUD">
                    <Grid item>
                    <MuiTypography variant="h3" gutterBottom>
                                {subunit.nama_bend}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.nip_bend}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.jabatan_bend}
                        </MuiTypography>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="Penandatangan SPTJM">
                <Grid item>
                    <MuiTypography variant="h3" gutterBottom>
                                {subunit.nama_sptjm}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.nip_sptjm}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.jabatan_sptjm}
                        </MuiTypography>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="Penandatangan SP3B">
                <Grid item>
                    <MuiTypography variant="h3" gutterBottom>
                                {subunit.nama_sp2b}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.nip_sp2b}
                        </MuiTypography>
                        <MuiTypography variant="h3" gutterBottom>
                                {subunit.jabatan_sp2b}
                        </MuiTypography>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
        <SubCard title="Unit Operasional" 
          secondary={<FormAction 
            title='Tambah Unit Operasional'
            icon={<IconPlus/>}/>}>

        </SubCard>
    </MainCard>
   
    <EditForm open={open} handleClose={handleClose} initialValues={subunit} afterSave={loadSubunit}/>
    <Dialog open={deleteOpen}>
      <MainCard title="Hapus Unit">
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Menghapus unit {subunit.nama}. Anda Yakin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Ya, Hapus</Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Batal
          </Button>
        </DialogActions>
      </MainCard>
    </Dialog>
    </>
  )
}

SubunitsDetails.propTypes = {}

export default SubunitsDetails