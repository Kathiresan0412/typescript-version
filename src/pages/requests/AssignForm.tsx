import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { IconButton } from '@mui/material';
import AlertMessge from 'src/commponent/messge';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs'; // Import dayjs for date formatting

 const AssignForm = ({ onClose, input }: { onClose: any; input: number; }) => {
  const [service_provider_id, setService_provider_id] = useState(input);
  const [customer_id, setCustomer_id] = useState('');
  const [from_date_time, setFrom_date_time] = useState('');
  const [to_date_time, setTo_date_time] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  // const [providers, getProviders] = useState([] as any);

  const [customers, getCustomers] = useState([] as any);

  const route = useRouter();
  useEffect(() => {


    // getGig();
    getCustomerData();
    setService_provider_id(input);

    // getProvidersData();

  }, []);

  const handleFromDateTimeChange = (date:any) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss'); // Format the selected date
    setFrom_date_time(formattedDate);
    console.log("from_date_time", from_date_time);
  };
  const handelToDateTimeChange = (date:any) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss'); // Format the selected date
    setTo_date_time(formattedDate);
    console.log("to_date_time", to_date_time);
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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
        customer_id: customer_id,
        service_provider_id: service_provider_id,
        from_date_time: from_date_time,
        to_date_time: to_date_time,
        amount: amount,
        location: location,
        status: status

      });
      setSuccess(true); // Set success state to true
      setMessage('Request Created successfully.');

      setTimeout(() => {
        route.push('/provigerGigs');
      }, 1000);

    } catch (error:any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message);
      }
      setMessage('Failed to create service. Please try again.');
    }
    }  ;

  return (
    <Card className='modal1'>
      <Grid container justifyContent="space-between">
        <CardHeader title='Assign a service for a customer' titleTypographyProps={{ variant: 'h6' }} />
        <IconButton aria-label="close" onClick={onClose}><CloseIcon /></IconButton>
      </Grid>
      <Divider sx={{ margin: 0 }}></Divider>
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
                       onChange={handleFromDateTimeChange}

                   //  value={from_date_time}
                      />
                  </DemoContainer>
                </LocalizationProvider>

              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      label="Basic date time picker"

                    //  value={to_date_time}

                      onChange={handelToDateTimeChange}

                   //   onChange={(e: any) => setTo_date_time(e.target.value)}
                   />
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
                  <InputLabel>Service status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Service status"
                    onChange={(ev) => setStatus(ev.target.value.toString())}>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
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

export default AssignForm
