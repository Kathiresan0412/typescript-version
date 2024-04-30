
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Avatar, Button, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteForm from './delete'

import { ICustomers } from '../InterFaces/page'
import UpdateStatus from './upateStatus'


const MUITablea = () => {
  const [allUsers, setAllUsers] = useState([] as ICustomers[]);
  const [deleteForm, setDeleteForm1] = useState(false);
  const [updataForm, setUpdate] = useState(false);

  useEffect(() => { getServices(); }, [])
  const getServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await response.json();
      setAllUsers(data);

    } catch (error) {
    }
  }

  const deleteform = () => {
    setDeleteForm1(true);
  }
  const update = () => {
    setUpdate(true);
  }
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const handleRowClick = (id: any) => {
    setSelectedServiceId(id);
  };

  return (
    <Grid container spacing={6} >
      <Grid  item xs={12}><></>
        <Card style={{ position: 'relative' }}>
          <CardHeader title='All Users' titleTypographyProps={{ variant: 'h6' }}
            style={{ backgroundColor: '', fontSize: 20 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow style={{ backgroundColor: '#e8e6e6' }}>
                  <TableCell align='center' style={{ fontSize: 17 }}>#</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Name</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Email</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Phone</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>Role</TableCell>
                  <TableCell align='center' style={{ fontSize: 17 }}>status</TableCell>
                  {/* <TableCell align='center' style={{ fontSize: 17 }}>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers?.map((row, index) =>
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
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.role} </TableCell>
                    <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>
                      {(row.status==="Active")&&<>
                      <Button size='large' color='success' variant='outlined'onClick={deleteform}> Active </Button>
                      </> }
                      {(row.status==="Inactive")&&<>
                      <Button size='large' color='warning' variant='outlined'onClick={update}>Inactive</Button>
                      </> }
                    </TableCell>
                    {/* <TableCell align='center' style={{ fontSize: 17 }}>
                      <IconButton aria-label="delete" onClick={deleteform}><DeleteIcon /></IconButton>
                    </TableCell> */}
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Modal open={deleteForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DeleteForm onClose={() => setDeleteForm1(false)} input={selectedServiceId} />
      </Modal>
      <Modal open={updataForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <UpdateStatus onClose={() => setUpdate(false)} input={selectedServiceId} />
      </Modal>
    </Grid>
  );
}
export default MUITablea
