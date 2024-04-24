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



const CreateForm = ({ onClose }: { onClose: any }) => {
  const route = useRouter();
 const [name, setName] = useState('');
  const [user_name, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

 // const [categorias, setCategorias] = useState([] as any);


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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make PUT request to update service
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
        name: name,
        mobile: mobile,
        email: email,
        user_name: user_name,
        img: img,
        role: "Customer",
        password:password,


      });
      setSuccess(true); // Set success state to true
      setMessage('Customer Created successfully.');

      route.reload();

    } catch (error) {
      console.error('Error Creation Customer:', error);
      setMessage('Failed to Creation Customer. Please try again.');
    }
  };


  useEffect(() => {

   //  getCategorias();

  })

  // const getCategorias = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-types`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //   const response = await res.json();
  //   setCategorias(response);
  //   console.log(categorias);
  // }

  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

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
        <CardHeader title='Create A Customer' titleTypographyProps={{ variant: 'h6' }} />
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Customer Passwords'
                  placeholder='Enter passwords '
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /></Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Image'
                  placeholder='Image'
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={imgSrc} alt='Profile Pic' />
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
