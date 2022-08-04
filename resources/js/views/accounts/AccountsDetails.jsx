import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router'
import api from '../../utils/api';
import { useState } from 'react';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons';
import MainCard from '../../ui-component/cards/MainCard';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SubCard from '../../ui-component/cards/SubCard';
import { Link } from 'react-router-dom';
import FormAction from '../../ui-component/cards/FormAction';
import AccountForm from './forms/AccountForm';
import EditForm from './forms/EditForm';

const AccountsDetails = props => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [account, setAccount] = useState({})
  const [children, setChildren] = useState([]);
  const [type, setType] = useState({})

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClick = () => {
    console.log('handle click')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleDelete = async () => {
    try {
      const response = api.delete('accounts/' + id);

    } catch (error) {

    }
    handleDeleteClose();
    navigation("/accounts/lra");
  }

  const afterSave = () => {
    loadAccount();
  }


  const loadAccount = async () => {
    setAccount({});
    try {
      let response = await api.get('accounts/' + id);
      setAccount(response.data.account);
      setType(response.data.account.group);
      setChildren(response.data.account.children);
    } catch (error) {

    }
  }

  useEffect(() => {
    loadAccount();
  }, [id])

  return (
    <>
      <MainCard title={`Rekening ${type.toString().toUpperCase()}`}
        secondary={<FormAction title="Tambah Kode Rekening" 
          icon={<IconPlus />} 
          handleClick={handleClick} 
          titleEdit="Edit Kode Rekening" 
          iconEdit={<IconEdit />} 
          handleEdit={handleEditClick} 
          titleDelete="Hapus Kode Rekening" 
          iconDelete={<IconTrash/>} 
          handleDelete={handleDeleteClick}/>}>
        <Grid container spacing={2}>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Kode</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {account.kode}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Uraian</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {account.name}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Level</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {account.report}</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h4'>Kelompok</Typography>

          </Grid>
          <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant='h4'>: {account.type}</Typography>
          </Grid>

          {
            account.parent &&
            <>
              <Grid item xs={4} align='right'>
                <Typography variant='h4'>Induk</Typography>

              </Grid>
              <Grid item xs={8} align='left' style={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography variant='h4'>: {account.parent.kode} {account.parent.name}</Typography>
              </Grid>
            </>

          }
          {
            children.length > 0 &&
            <Grid item xs={12}>
              <SubCard>
                <TableContainer component={Paper}>
                  <Table striped>
                    <TableHead>
                      <TableRow>
                        <TableCell>Kode</TableCell>
                        <TableCell>Uraian</TableCell>
                        <TableCell>Laporan</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Kelompok</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody striped>
                      {children.map((acc) => (
                        <TableRow key={acc.id}>
                          <TableCell><Link to={`/accounts/${acc.id}`}>{acc.kode}</Link></TableCell>
                          <TableCell>{acc.name}</TableCell>
                          <TableCell>{acc.group.toUpperCase()}</TableCell>
                          <TableCell>{acc.report}</TableCell>
                          <TableCell>{acc.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SubCard>
            </Grid>
          }
        </Grid>
        <AccountForm open={open} handleClose={handleClose} afterSave={loadAccount} parentAccount={account} />
        <EditForm open={openEdit} handleClose={handleEditClose} afterSave={loadAccount} initialValues={account} />
        <Dialog open={deleteOpen}>
          <MainCard title="Hapus Akun">
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Menghapus Akun {account.name}. Anda Yakin?
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
      </MainCard>
    </>
  )
}

AccountsDetails.propTypes = {}

export default AccountsDetails