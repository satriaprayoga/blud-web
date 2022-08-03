import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import api from '../../utils/api';
import { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SubCard from '../../ui-component/cards/SubCard';
import { Link } from 'react-router-dom';

const AccountsDetails = props => {
  const { id } = useParams();

  const [account, setAccount] = useState({})
  const [children, setChildren] = useState([]);
  const [type, setType] = useState({})

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
      <MainCard title={`Rekening ${type.toString().toUpperCase()}`}>
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
                    <TableBody  striped>
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
      </MainCard>
    </>
  )
}

AccountsDetails.propTypes = {}

export default AccountsDetails