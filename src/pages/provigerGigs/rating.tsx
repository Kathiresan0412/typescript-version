import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import 'text-encoding-polyfill';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from 'react'
import { IconButton, Modal, Table, TableContainer } from '@mui/material'
import { Avatar, Grid, Paper, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DeleteRatingForm from './deleteRatingA';
import DeleteIcon from '@material-ui/icons/Delete';
import { IRatings } from '../InterFaces/page';

const RatingForm = ({ onClose, input }: { onClose: any, input: number }) => {

  const [allRatings, setAllRatings] = useState([] as IRatings[]);
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [deleteRatingForm, setDeleteRatingForm] = useState<boolean>(false);

  useEffect(() => {
    // console.log("input", input);
    setallRatingsData();
  }, []);
  const setallRatingsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provider-service/${input}/ratings`);
      const data = await response.json();
      setAllRatings(data);
    } catch (error) {
    }
  }
  const handleRowClick = (id: any) => {
    setSelectedServiceId(id);
  };

  const deleteform = () => {
    setDeleteRatingForm(true);
  };

  return (
    <Card className='modal1'>
      <Grid container justifyContent="space-between">
        <CardHeader title='All Ratings for A Gigs' titleTypographyProps={{ variant: 'h6' }} />
        <IconButton aria-label="close" onClick={onClose}><CloseIcon /></IconButton>
      </Grid>
      <Divider sx={{ margin: 0 }} ></Divider>
      <Grid container spacing={6} >
        <Grid item xs={12}><></>
          <Card style={{ position: 'relative' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#e8e6e6' }}>
                    <TableCell align='center' style={{ fontSize: 17 }}>#</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}>Service Provider</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}>Service Name</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}>Service Type</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}>Rating</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}>Feedback</TableCell>
                    <TableCell align='center' style={{ fontSize: 17 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allRatings?.map((row,index) =>
                    <TableRow key={row.id} onClick={() => {

                      handleRowClick(row.id)
                    }} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }} >
                      <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{index + 1}</TableCell>
                      <TableCell style={{ fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'left', minWidth: 150 }}>
                        <Avatar
                          alt={""}
                          src={row.img}
                          sx={{ width: 56, height: 60 }}
                        />&nbsp;&nbsp; {row.provider_name}
                      </TableCell>
                      <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.service_name}</TableCell>
                      <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.service_type_name}</TableCell>
                      <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.rating}</TableCell>
                      <TableCell align='center' style={{ fontSize: 17, minWidth: 150 }}>{row.feedback}</TableCell>
                      <TableCell align='center' style={{ fontSize: 17 }}>
                        <IconButton aria-label="delete" onClick={deleteform}><DeleteIcon /></IconButton>

                      </TableCell>
                    </TableRow>
                  )}

                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Modal open={deleteRatingForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DeleteRatingForm onClose={() => setDeleteRatingForm(false)} input={selectedServiceId} />
        </Modal>
      </Grid>
    </Card>
  );
};

export default RatingForm;
