import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const UnitsData = ({columns,rows}) => {
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
    columns:PropTypes.array,
    rows:PropTypes.array
}

export default UnitsData