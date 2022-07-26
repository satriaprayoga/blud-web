import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import SubCard from '../../ui-component/cards/SubCard'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../utils/api'
import { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography } from '@mui/material'
import { IconPlus,IconTrash, IconEdit } from '@tabler/icons';
import MuiTypography from '@mui/material/Typography';
import Subunits from './subunits/Subunits'
import FormAction from '../../ui-component/cards/FormAction'
import EditForm from './forms/EditForm'

const UnitsDetails = props => {
  const [unit,setUnit]=useState({});
  const [subunits,setSubunits]=useState([]);
  const [open,setOpen]=useState(false);
  const [deleteOpen,setDeleteOpen]=useState(false);

  const {id}=useParams();
  const navigation=useNavigate();

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
      const response=api.delete('units/'+id);
     
    } catch (error) {
      
    }
    handleDeleteClose();
    navigation("/units");
  }

  const loadUnit=async()=>{
    try {
      let response=await api.get('/units/'+id);
      setUnit(response.data.unit);
      if(response.data.subunits.length>0){
        setSubunits(response.data.subunits.map(e=>{
          return{
            nama:e.name,kode:e.kode,singkatan:e.singkatan,id:e.id
          }
        }));
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadUnit();
  },[])

  return (
    <>
    <MainCard title={unit.name} secondary={<FormAction titleDelete="Hapus Unit" titleEdit="Edit Unit" iconDelete={<IconTrash/>} iconEdit={<IconEdit/>} handleEdit={handleEditClick} handleDelete={handleDeleteClick}/>}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <SubCard title="Profil Unit Kerja">
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <MuiTypography variant="h2" gutterBottom>
                                Nama Unit: {unit.name}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h2" gutterBottom>
                                Kode: {unit.kode}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h2" gutterBottom>
                                Singkatan: {unit.singkatan}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h2" gutterBottom>
                                Lokasi: {unit.lokasi}
                            </MuiTypography>
                        </Grid>
                        
                    </Grid>
                </SubCard>
        </Grid>
        <Grid item xs={12} sm={6}>
                <SubCard title="Kepala Unit">
                    <Grid container direction="column" spacing={1}>
                    <Grid item>
                            <MuiTypography variant="h2" gutterBottom>
                                {unit.nama_kepala}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h3" gutterBottom>
                                {unit.nip_kepala}
                            </MuiTypography>
                        </Grid>
                        <Grid item>
                            <MuiTypography variant="h3" gutterBottom>
                                {unit.jabatan_kepala}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            
      </Grid>
           
    </MainCard>
    <EditForm initialValues={unit} open={open} handleClose={handleClose} afterSave={loadUnit}/>
    <Dialog open={deleteOpen}>
      <MainCard title="Hapus Unit">
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Menghapus unit {unit.name}. Anda Yakin?
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
    <MainCard title="Sub Unit" sx={{marginTop:5}} secondary={<FormAction title="Tambah Sub Unit" icon={<IconPlus/>} />}>
      {subunits.length>0 && <Subunits/>}
    </MainCard>
    </>
  )
}

UnitsDetails.propTypes = {}

export default UnitsDetails