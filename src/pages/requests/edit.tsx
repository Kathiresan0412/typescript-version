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
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import { IconButton, InputLabel } from '@mui/material'
import AlertMessge from 'src/commponent/messge'
import { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EditForm = ({ onClose, input }: { onClose: any, input: number }) => {
  // Component logic
  const [service_provider_id, setService_provider_id] = useState(input);
  const [customer_id, setCustomer_id] = useState('');
  const [from_date_time, setFrom_date_time] = useState('');
  const [to_date_time, setTo_date_time] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [categorias, setCategorias] = useState([] as any);
  const [customers, getCustomers] = useState([] as any);
  const route = useRouter();
  useEffect(() => {
    getServices();
    getCategorias();
    getCustomerData();
  }, []);

  const getCategorias = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-types`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await res.json();
    setCategorias(response);
    console.log(categorias);
  }
  const getServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${input}`);
      const data = await response.json();
      setService_provider_id(data.service_provider_id);
      setCustomer_id(data.customer_id);
      setFrom_date_time(data.from_date_time),
        setTo_date_time(data.to_date_time);
      setAmount(data.amount);
      setLocation(data.location),
        setStatus(data.status)
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };
  const getCustomerData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await res.json();
    getCustomers(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/requests/${input}`, {
        service_provider_id: service_provider_id,
        customer_id: customer_id,
        from_date_time: from_date_time,
        to_date_time: to_date_time,
        amount: amount,
        location: location,
        status: status
      });
      setSuccess(true); // Set success state to true
      setMessage('requests updated successfully.');

      route.reload();

    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('Failed to update service. Please try again.');
    }
  };

  return (
    <Card className='modal1'>
      <Grid container justifyContent="space-between">
        <CardHeader title='Edition for Customer request' titleTypographyProps={{ variant: 'h6' }} />
        <IconButton aria-label="close" onClick={onClose}><CloseIcon /></IconButton>
      </Grid>
      <Divider sx={{ margin: 0 }} ></Divider>
      {success && (
        <AlertMessge passedValue={message} />
      )}
      {!success && (
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel> Customer</InputLabel>
                  <Select
                    label='Customer'
                    defaultValue={customer_id}
                    onChange={(ev) => setCustomer_id(ev.target.value.toString())}
                  >
                    {customers.map((categoria: any) => (
                      <MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
             <FormControl fullWidth>
               <InputLabel> Customer</InputLabel>
               <Select
                 label='Service Providers'
                 defaultValue={provider_id}
                 onChange={(ev) => setProvider_id(ev.target.value.toString())}
               >
                 {providers.map((categoria: any) => (
                   <MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</MenuItem>
                 ))}
               </Select>
             </FormControl>
           </Grid> */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label="Basic date time picker"
                      value={from_date_time}
                      onChange={(e: any) => setFrom_date_time(e.target.value)} />
                  </DemoContainer>
                </LocalizationProvider>

              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label="Basic date time picker"
                      value={to_date_time}
                      onChange={(e: any) => setTo_date_time(e.target.value)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Location'
                  placeholder='Enter the Location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Total amount'
                  placeholder='Enter the amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Service Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Age"
                    onChange={(ev) => setStatus(ev.target.value.toString())}>
                    <MenuItem value={10}>Pending</MenuItem>
                    <MenuItem value={20}>Approved</MenuItem>
                    <MenuItem value={30}>Rejected</MenuItem>
                  </Select>
                </FormControl>
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
