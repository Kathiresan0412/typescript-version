import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaCheckCircle } from 'react-icons/fa'

// import { useEffect, useRef } from 'react'
const DeleteForm = ({ onClose, input }: { onClose: any, input: number }) => {
  const route = useRouter();
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.delete(`https://backendserve-production.up.railway.app/api/services/${input}`, {
      });
      setSuccess(true); // Set success state to true
      setMessage('Service Deleted successfully.');

      route.reload();

    } catch (error) {
      console.error('Error Delete service type:', error);
      setMessage('Failed to delete service. Please try again.');
    }
  };

  return (
        <Card className='modal1' >
          <CardHeader title='Edition for A Service' titleTypographyProps={{ variant: 'h6' }}  ></CardHeader>
          <Divider sx={{ margin: 0 }} ></Divider>
          {success && (
            <>
              <      FaCheckCircle color="green" size={24} />
              <p style={{ display: "inline-block", marginLeft: "5px" }}>{message}</p>
            </>
          )}
          {!success && (
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <Button ></Button >
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
              <CardActions>
                <Button size='large' color='secondary' variant='outlined' onClick={onClose}>
                  Cancel
                </Button>
                <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                  Are You sure
                </Button>
              </CardActions>
            </form>
          )}
        </Card>
  );
}

export default DeleteForm
