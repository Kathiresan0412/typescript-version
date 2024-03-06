import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CreateForm from './create'
import EditForm from './edit'
import DeleteForm from './delete'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface Provider {
  id: string
  name: string
  email: string
  location: string
  password: string

}
const MUITablea = () => {
  const [allServices, setallService] = useState([] as Provider[]);
  const [showForm1, setShowForm1] = useState(false);
  const [editForm, setEditForm1] = useState(false);
  const [deleteForm, setDeleteForm1] = useState(false);


  useEffect(() => { getServices(); }, [])
  const getServices = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/providers`);
      const data = await response.json();
      setallService(data);

    } catch (error) {
    }
  }
  const add = () => {
    setShowForm1(true);
  }
  const edit = () => {
    setEditForm1(true);
  }
  const deleteform = () => {
    setDeleteForm1(true);
  }

  return (
    <Grid container spacing={6} >
      <Grid item xs={12}>
        <Card style={{ position: 'relative' }}>
          <Button type='submit' variant='contained' size='large'
            style={{ position: 'absolute', top: 5, right: 7, zIndex: 1 }} onClick={add}>+ ADD
          </Button>
          <CardHeader title='All Users' titleTypographyProps={{ variant: 'h6' }}
           style={{ backgroundColor: '' , fontSize:20 }}/>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow  style={{ backgroundColor: '#e8e6e6' , fontSize:20 }}>
          <TableCell align='center'  style={{ fontSize:17 }}>#</TableCell>
            <TableCell align='center'  style={{ fontSize:17 }}>ID</TableCell>
            <TableCell align='center'  style={{ fontSize:17 }}>Name</TableCell>

            <TableCell align='center'  style={{ fontSize:17 }}>Email</TableCell>
            <TableCell align='center'  style={{ fontSize:17 }}>Passwords</TableCell>
            <TableCell align='center'  style={{ fontSize:17 }}>Location</TableCell>
            <TableCell align='center'  style={{ fontSize:17 }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allServices.map((row ,index)=>
            <TableRow key={row.name} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell align='center'  style={{ fontSize:17 }}>{index}</TableCell>
              <TableCell align='center'  style={{ fontSize:17 }}>{row.id}</TableCell>
              <TableCell align='center' style={{ fontSize:17 }}>{row.name}</TableCell>
              <TableCell align='center'  style={{ fontSize:17 }}>{row.email}</TableCell>
              <TableCell align='center'  style={{ fontSize:17 }}>{row.password}</TableCell>
              <TableCell align='center'  style={{ fontSize:17 }}>{row.location}</TableCell>
              <TableCell align='center' ><IconButton aria-label="edit" onClick={edit}><EditIcon /></IconButton>
                <IconButton aria-label="delete" onClick={deleteform}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
        </Card>
      </Grid>
      <DatePickerWrapper>
        <Grid container spacing={6} justifyContent="center" alignItems="center" >
          <Grid item xs={12}>
            <Modal open={showForm1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreateForm onClose={() => setShowForm1(false)} />
            </Modal>
          </Grid>
        </Grid>
      </DatePickerWrapper>

      <Modal open={editForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EditForm onClose={() => setEditForm1(false)} />
      </Modal>
      <Modal open={deleteForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DeleteForm onClose={() => setDeleteForm1(false)} />
      </Modal>
    </Grid>
  );
}
export default MUITablea
