import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useEffect, useState } from 'react'
import 'text-encoding-polyfill';
import axios from 'axios';
import { useRouter } from 'next/router'

import AlertMessge from 'src/commponent/messge'



  const EditForm = ({ onClose, input }: { onClose: any, input: number  }) => {
    // Component logic
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);


  //setUpdateData([...updateData, { ...updateData[1], name: "" }]);


const route=useRouter();
  useEffect(() => {
    getServices();
  },[]);

  const getServices = async () => {
    try {
      const response = await fetch(`https://backendserve-production.up.railway.app/api/service-types/${input}`);
      const data = await response.json();
      setServiceName(data.name);
      setDescription(data.description);
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/service-types/${input}`, {
        name: serviceName,
        description: description
      });
      setSuccess(true); // Set success state to true
      setMessage('Service Type updated successfully.');

       route.reload();

    } catch (error) {
      console.error('Error updating service type:', error);
      setMessage('Failed to update service type. Please try again.');
    }
  };


  return (
    <Card className='modal1'>
      <CardHeader title='Edition for A Service Type' titleTypographyProps={{ variant: 'h6' }}  ></CardHeader>
      <Divider sx={{ margin: 0 }} ></Divider>
      {success && (
       <AlertMessge passedValue={message}/>
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
                onChange={(ev) => setServiceName(ev.target.value.toString())}

              //  onChange={(e) => setServiceName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Description'
                placeholder='Description'
                value={description}
                onChange={(ev) => setDescription(ev.target.value.toString())}
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
};

export default EditForm;
