import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, ButtonGroup } from '@mui/material';
import { IconEye, IconEdit } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ActionColumn=(props)=>{
    const {value}=props;
    const navigation=useNavigate();
    return(
        <>
            <Box sx={{border: 'none', alignItems:'center', display:'flex', width:'100%'}}>
            <ButtonGroup aria-label="outlined button group" sx={{alignSelf:'center'}}>
            <Button onClick={(e)=>{e.preventDefault();navigation('/units/'+value);}} sx={{width:'50%',}}>
                <IconEye/>
              </Button>
              <Button>
                  <IconEdit/>
              </Button>
            </ButtonGroup>
              
            </Box>
        </>
    );
}

const columns = [
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
      editable: false
    },
    {
        field: 'id',
        headerName: 'Aksi',
        width: 160,
        editable: false,
        renderCell: ActionColumn,
        headerAlign:'center'
    }
]

const UnitsData = ({rows}) => {
  return (
    <>
     <Box sx={{height:400,width:'100%'}}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
        />
     </Box>
    </>
  )
}

UnitsData.propTypes = {
    rows:PropTypes.array
}

export default UnitsData