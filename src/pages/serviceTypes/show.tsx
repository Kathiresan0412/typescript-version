import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { styled } from '@mui/material/styles'
import { Modal } from '@mui/material'
import DeleteForm from './delete'
import EditForm from './edit'

interface Service {
  name: string
  service_type: string
  description: string
}

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    fontWeight: 1000
  }
}))

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 10
  }
}))
const TableBasic = ({ data }: any) => {
  const [columns, setcolums] = useState([1, 2, 3]);
  const [datas, setdatas] = useState([] as Service[]);
  const [editForm, setEditForm1] = useState(false);
  const [deleteForm, setDeleteForm1] = useState(false);
  useEffect(() => {
    setcolums(data.columns)
    setdatas(data.services);
  }, [data])


  const edit = () => {
    setEditForm1(true);
  }
  const deleteform = () => {
    setDeleteForm1(true);
  }

  return (
    <TableContainer component={Paper}>

      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow >
            {columns && columns.length > 0 ? (
              columns.map((column, index) => (
                <StyledTableCell align='right' key={index}>{column}</StyledTableCell>))) : (
              <StyledTableCell align='right'>No data available</StyledTableCell>
            )}
            <StyledTableCell align='right'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas?.map((data, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align='right'>{data.name}</StyledTableCell>
              <StyledTableCell align='right'>{data.description}</StyledTableCell>
              <StyledTableCell align='right'>{data.service_type}</StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton aria-label="edit" onClick={edit}><EditIcon /></IconButton>
                <IconButton aria-label="delete" onClick={deleteform}><DeleteIcon /></IconButton>
              </StyledTableCell>
            </StyledTableRow>

          ))}
        </TableBody>
      </Table>

      <Modal open={editForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <EditForm onClose={() => setEditForm1(false)} />

      </Modal>
      <Modal open={deleteForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DeleteForm onClose={() => setDeleteForm1(false)} />
      </Modal>
    </TableContainer>
  )
}

export default TableBasic
