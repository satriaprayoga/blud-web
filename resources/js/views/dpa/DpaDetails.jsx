import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import MainCard from '../../ui-component/cards/MainCard';
import api from '../../utils/api';
import FormAction from '../../ui-component/cards/FormAction';
import EditForm from './form/EditForm';
import SubCard from '../../ui-component/cards/SubCard';

const numberFormat = (value) => {
  const numberFormatter = Intl.NumberFormat('id-ID');
  const formatted = numberFormatter.format(value);
  return formatted;
}

const DpaDetails = props => {
  const { id } = useParams();

  const [dpa, setDpa] = useState({});
  const [subunit, setSubunit] = useState({});

  const [openEdit, setOpenEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [toggleActive, setToogleActive] = useState(false);
  const [checked,setChecked]=useState(true);

  const navigation = useNavigate();

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

  const handleToggleActive = () => {
    setToogleActive(!toggleActive);
  }

  const handleAktifSwitch=()=>{
    setChecked(!checked);
  }

  const handleActivate= async ()=>{
    try {
      const response=api.put('dpa/activate/'+id,{aktif:checked});
    } catch (error) {
      
    }
    setToogleActive(!toggleActive);
    loadDpa();
  }

  const loadDpa = async () => {
    try {
      const response = await api.get('dpa/' + id);
      setDpa(response.data.dpa);
      setChecked(response.data.dpa.aktif==false?false:true);
      setSubunit(response.data.subunit);
    } catch (error) {

    }
  }

  const afterSave = () => {
    loadDpa();
  }

  useEffect(() => {
    loadDpa();
  }, []);
  return (
    <MainCard title={`DPA ${subunit.nama}`}
      secondary={
        dpa.aktif == false ?

          <FormAction
            titleDelete="Hapus DPA"
            iconDelete={<IconTrash />}
            handleDelete={handleDeleteClick}
            titleEdit="Edit DPA"
            iconEdit={<IconEdit />}
            handleEdit={handleEditClick} />
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
        <Grid item xs={4} align='right'>
          <Typography variant='h4'>Status</Typography>

        </Grid>
        <Grid item xs={4} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography variant='h4'>:
            {dpa.aktif == false ? 'Tidak Aktif' : 'Aktif'}
          </Typography>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start", top: '' }}>
            <IconEdit onClick={handleToggleActive} />
          </Grid>


        </Grid>

        {
          toggleActive == true &&
          <Grid container style={{ display: "flex", justifyContent: "center"}}>
            <SubCard title="Status DPA" >
              <Formik
                initialValues={{
                  aktif:checked
                }}
                onSubmit={(values,formikHelpers)=>{
                  handleActivate();
              }}>
                  {({ errors, isValid, touched, dirty, values, setFieldValue, handleChange }) => (
                    <Form>
                      <FormControlLabel control={
                        <Field 
                          label="Aktif"
                          name="aktif"
                          component={Switch}
                          onChange={handleAktifSwitch}
                          checked={checked}/>
                        }
                        label="Aktif">

                      </FormControlLabel>
                      <FormControl>
                      <Button type="submit" variant="contained" disabled={dirty}>Simpan</Button>
                      </FormControl>
                    </Form>
                  )}
              </Formik>
             
            </SubCard>

          </Grid>

        }


      </Grid>
      <EditForm open={openEdit} handleClose={handleEditClose} initialValues={dpa} afterSave={afterSave} />
    </MainCard>
  )
}

DpaDetails.propTypes = {}

export default DpaDetails