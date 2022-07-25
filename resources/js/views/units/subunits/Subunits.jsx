import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'

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
    }
]

const Subunits = ({rows})=> {
  return (
    <DataGrid columns={columns} 
              row={rows}  
              pageSize={5}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick/>
  )
}

Subunits.propTypes = {
    rows: PropTypes.array
}

export default Subunits