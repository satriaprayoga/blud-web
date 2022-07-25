import React from 'react'
import PropTypes from 'prop-types'
import MainCard from '../../ui-component/cards/MainCard'
import SubCard from '../../ui-component/cards/SubCard'
import { useState } from 'react'
import { useParams } from 'react-router'
import api from '../../utils/api'
import { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { IconPlus,IconTrash, IconEdit } from '@tabler/icons';
import MuiTypography from '@mui/material/Typography';
import Subunits from './subunits/Subunits'
import FormAction from '../../ui-component/cards/FormAction'

const UnitsDetails = props => {
  const [unit,setUnit]=useState({});
  const [subunits,setSubunits]=useState([]);
  const {id}=useParams();

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
    <MainCard title={unit.name} secondary={<FormAction titleDelete="Hapus Unit" titleEdit="Edit Unit" iconDelete={<IconTrash/>} iconEdit={<IconEdit/>}/>}>
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
    <MainCard title="Sub Unit" sx={{marginTop:5}} secondary={<FormAction title="Tambah Sub Unit" icon={<IconPlus/>} />}>
      {subunits.length>0 && <Subunits/>}
    </MainCard>
    </>
  )
}

UnitsDetails.propTypes = {}

export default UnitsDetails