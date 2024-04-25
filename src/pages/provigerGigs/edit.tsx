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
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import AlertMessge from 'src/commponent/messge'
import { IconButton, InputLabel } from '@mui/material'


const EditForm = ({ onClose, input }: { onClose: any, input: number }) => {
  // Component logic
  const [provider_id, setProvider_id] = useState('');
  const [service_id, setService_id] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [Services, getServices] = useState([] as any);
  const [providers, getProviders] = useState([] as any);

  const route = useRouter();
  useEffect(() => {
    getGig();
    getServicesData();
    getProvidersData();
    console.log("services",Services);
    console.log("providers",providers);

  },[]);
  const getServicesData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
    const response = await res.json();
    getServices(response);

  }
 const getProvidersData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/providers`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
    })
    const response = await res.json();
    getProviders(response);
  }
  const getGig = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provider-service/${input}`);
      const data = await response.json();
      setProvider_id(data.provider_id);
      setService_id(data.service_id);
      setAmount(data.amount_per_hour);
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/provider-service/${input}`, {
        service_id: service_id,
        provider_id: provider_id,
        amount_per_hour: amount
      });
      setSuccess(true); // Set success state to true
      setMessage('Gig updated successfully.');

      route.reload();

    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('Failed to update service. Please try again.');
    }
  };

  return (
    <Card className='modal1'>
      <Grid container justifyContent="space-between">
        <CardHeader title='Edition for A Gig' titleTypographyProps={{ variant: 'h6' }} />
        <IconButton aria-label="close" onClick={onClose}><CloseIcon /></IconButton>
      </Grid>
      <Divider sx={{ margin: 0 }} ></Divider>
      {success && (
        <AlertMessge passedValue={message}/>
      )}
      {!success && (
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Service Provider</InputLabel>
                  <Select
                    label='Service Provider'
                    value={provider_id}
                    onChange={(ev) => setProvider_id(ev.target.value.toString())}
                  >
                    {providers.map((categoria: any) => (
                      <MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Service Name</InputLabel>
                  <Select
                    label='Service Name'
                    value={service_id}
                    onChange={(ev) => setService_id(ev.target.value.toString())}
                  >
                    {Services.map((categoria: any) => (
                      <MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Amount per hour'
                  placeholder='Enter the amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
