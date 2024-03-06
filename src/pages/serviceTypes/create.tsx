import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import 'text-encoding-polyfill';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const CreateForm = ({onClose}:{onClose:any}) => {
const route=useRouter();
const [serviceName, setServiceName] = useState('');
const [description, setDescription] = useState('');
const [message, setMessage] = useState<string>('');
const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.post(`http://localhost:8000/api/service-types/`, {
        name: serviceName,
        description: description
      });
      setSuccess(true); // Set success state to true
      setMessage('Service updated successfully.');

       route.reload();

    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('Failed to update service. Please try again.');
    }
  };

  return (
    <Card className='modal1'>

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
              <TextField
                fullWidth
                label='Service Type Name'
                placeholder='Service Type Name'
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Description'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={onClose}>
            Cancel
          </Button>
        </CardActions>
      </form>
       )}
    </Card>
  );

}

export default CreateForm
