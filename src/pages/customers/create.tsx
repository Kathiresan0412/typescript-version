import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import { Select } from '@mui/material'

const CreateForm = ({onClose}:{onClose:any}) => {
  return (
    <>
      <Card className='modal1' >
        <CardHeader title='Creation for A Customer' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Customer Name' placeholder='Service Name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Service Type</InputLabel>
                  <Select
                    label='Type'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Care</MenuItem>
                    <MenuItem value='USA'>personal</MenuItem>
                    <MenuItem value='Australia'>private</MenuItem>
                    <MenuItem value='Germany'>known</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Description' placeholder='Description' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
                  <Select
                    label='Type'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value='UK'>Active</MenuItem>
                    <MenuItem value='USA'>Deactive</MenuItem>
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
      </Card>
    </>
  )
}

export default CreateForm
