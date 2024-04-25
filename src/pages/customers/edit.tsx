import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button, { ButtonProps } from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import 'text-encoding-polyfill';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router'
import { ChangeEvent, ElementType, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import AlertMessge from 'src/commponent/messge'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))
const EditForm = ({ onClose, input }: { onClose: any, input: number }) => {
  // Component logic
  const [name, setName] = useState('');
  const [user_name, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [enable, setEnable] = useState(false);

  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [img, setImg] = useState('');

  const route = useRouter();
  useEffect(() => {
    getServices();

  }, []);

  const getServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${input}`);
      const data = await response.json();
      setName(data.name);
      setUserName(data.user_name);
      setMobile(data.mobile),
        setEmail(data.email);
      setImg(data.img);
      setPassword(data.password)
      setUserId(data.usr_id);
      console.log("data", data.user);

    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/customers/${input}`, {
        name: name,
        mobile: mobile,
        email: email,
        user_name: user_name,
        role: "Customer",
        password: password,
        img: img,
        user_id: userId

      });

      setSuccess(true); // Set success state to true
      setMessage('Customer updated successfully.');

      route.reload();
    } catch (error) {
      console.error('Error updating Customer:', error);
      setMessage('Failed to update Customer. Please try again.');
    }
  };

  const [, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <Card className='modal1'>
      <Grid container justifyContent="space-between">
        <CardHeader title='Edition for A Customer' titleTypographyProps={{ variant: 'h6' }} />
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
                <TextField
                  fullWidth
                  label='Customer Name'
                  placeholder='Enter customer name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Customer Email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Customer mobile'
                  placeholder='Enter mobile No'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Customer user name'
                  placeholder='Enter user name '
                  value={user_name}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              {!enable && (
                <Grid item xs={12} sm={6}>
                  <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'
                    onClick={() => setEnable(true)}>
                    change passwords
                  </Button>
                </Grid>
              )}
              {enable && (<>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Customer Passwords'
                    placeholder='Enter passwords '
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  /></Grid>
                <Grid item xs={12} sm={6} style={{ alignItems: 'center',justifyContent:'center' }}>
                  <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'
                    onClick={() => setEnable(false)}
                    style={{ alignItems: 'center',justifyContent:'center', padding:'0,10px,0,0'}}>
                    Hide
                  </Button>
                </Grid>
              </>)}
              <Grid item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={img} alt='Profile Pic' />
                    <Box>
                      <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                        Upload New Photo
                        <input
                          hidden
                          type='file'
                          onChange={onChange}
                          accept='image/png, image/jpeg'
                          id='account-settings-upload-image'
                        />
                      </ButtonStyled>
                      <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                        Reset
                      </ResetButtonStyled>
                      <Typography variant='body2' sx={{ marginTop: 5 }}>
                        Allowed PNG or JPEG. Max size of 800K.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
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
