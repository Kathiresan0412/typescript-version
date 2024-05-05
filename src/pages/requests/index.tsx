
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Avatar, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import EditForm from './edit'
import DeleteForm from './delete'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IRequest } from '../InterFaces/page'




const MUITablea = () => {
  const [allRequest, setAllRequest] = useState([] as IRequest[]);
  const [editForm, setEditForm1] = useState(false);
  const [deleteForm, setDeleteForm1] = useState(false);


  useEffect(() => { getServices(); }, [])
  const getServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`);
      const data = await response.json();
      setAllRequest(data);

    } catch (error) {
    }
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

          <CardHeader title='All Customers requests' titleTypographyProps={{ variant: 'h6' }}
            style={{ backgroundColor: '', fontSize: 20 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow style={{ backgroundColor: '#e8e6e6' }}>
                  <TableCell align='center' style={{ fontSize: 17 }}>#</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Customer</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Service Provider</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Service Name</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>From</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Status</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Location</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Total Amount</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Status</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequest?.map((row, index) =>
                  <TableRow key={row.id} onClick={() => handleRowClick(row.id)} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }} >
                    <TableCell align='center' style={{ fontSize: 17 , minWidth: 150}}>{index + 1}</TableCell>
                    <TableCell  style={{ fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'left' , minWidth: 150}}>
                      <Avatar
                        alt={row.customer_name}
                        src={row.img}
                        sx={{ width: 56, height: 60 }}
                      /> {row.customer_name}
                    </TableCell>
                    <TableCell align='center' style={{ fontSize: 17 , minWidth: 150}}>{row.provider_name}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.service_name}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 , minWidth: 150}}>{row.from_date_time}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.to_date_time}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.location}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{"Rs "}{row.amount}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.status}</TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 200  }}><IconButton aria-label="edit" onClick={edit}><EditIcon /></IconButton>
                      <IconButton aria-label="delete" onClick={deleteform}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>


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
