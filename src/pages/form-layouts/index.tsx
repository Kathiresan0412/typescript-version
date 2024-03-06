// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'

// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormLayoutsSeparator />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
