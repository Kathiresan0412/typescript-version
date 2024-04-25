
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Avatar, Button, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CreateForm from './create'
import EditForm from './edit'
import DeleteForm from './delete'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICustomers } from '../InterFaces/page'




const MUITablea = () => {
  const [allCustomers, setAllCustomers] = useState([] as ICustomers[]);
  const [showForm1, setShowForm1] = useState(false);
  const [editForm, setEditForm1] = useState(false);
  const [deleteForm, setDeleteForm1] = useState(false);


  useEffect(() => { getServices(); }, [])
  const getServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
      const data = await response.json();
      setAllCustomers(data);

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
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const handleRowClick = (id: any) => {
    setSelectedServiceId(id);
  };

  return (
    <Grid container spacing={6} >
      <Grid  item xs={12}><></>
        <Card style={{ position: 'relative' }}>
          <Button type='submit' variant='contained' size='large'
            style={{ position: 'absolute', top: 5, right: 7, zIndex: 1 }} onClick={add}>+ ADD
          </Button>
          <CardHeader title='All Customers' titleTypographyProps={{ variant: 'h6' }}
            style={{ backgroundColor: '', fontSize: 20 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow style={{ backgroundColor: '#e8e6e6' }}>
                  <TableCell align='center' style={{ fontSize: 17 }}>#</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Name</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Email</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Phone</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCustomers?.map((row, index) =>
                  <TableRow key={row.id} onClick={() => handleRowClick(row.id)} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }} >
                    <TableCell align='center' style={{ fontSize: 17 , minWidth: 150}}>{index + 1}</TableCell>
                    <TableCell  style={{ fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'left' , minWidth: 150}}>
                      <Avatar
                        alt={row.name}
                        src={row.img}
                        sx={{ width: 56, height: 60 }}
                      />&nbsp;&nbsp; {row.name}
                    </TableCell>
                    <TableCell align='center' style={{ fontSize: 17 , minWidth: 150}}>{row.email}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.mobile}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}><IconButton aria-label="edit" onClick={edit}><EditIcon /></IconButton>
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
        <EditForm onClose={() => setEditForm1(false)} input={selectedServiceId} />
      </Modal>
      <Modal open={deleteForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DeleteForm onClose={() => setDeleteForm1(false)} input={selectedServiceId} />
      </Modal>
    </Grid>
  );
}
export default MUITablea
