// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface Service {
  name: string
  service_type: string
  description: string
}
const TableBasic = ({ data }: any) => {
  const [columns, setcolums] = useState([1, 2, 3]);
  const [datas, setdatas] = useState([] as Service[]);

  useEffect(() => {
    setcolums(data.columns)
    setdatas(data.services);
  }, [data])

  // const add = async () => {
  //   await setcolums(data.columns)
  //   await setdatas(data.services);
  //   console.log(columns);
  //   console.log(datas);
  // }

  console.log("data--->", datas);

  return (
    <TableContainer component={Paper}>

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow >
            {columns && columns.length > 0 ? (
              columns.map((column, index) => (
                <TableCell align='right' key={index}>{column}</TableCell>))) : (
              <TableCell align='right'>No data available</TableCell>
            )}
            <TableCell align='right'>
  <IconButton aria-label="edit">
    <EditIcon />
  </IconButton>
  <IconButton aria-label="delete">
    <DeleteIcon />
  </IconButton>
</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas?.map((data, index) => (
            <tr key={index}>
              <TableCell align='right'>{data.name}</TableCell>
              <TableCell align='right'>{data.description}</TableCell>
              <TableCell align='right'>{data.service_type}</TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
