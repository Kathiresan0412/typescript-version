// ** Icon imports
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import 'bootstrap-icons/font/bootstrap-icons.css';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Services',
      icon: AccountCogOutline,
      path: '/services'
    },{
      title: 'Service Type',
      icon: Table,
      path: '/serviceTypes'
    },
    {
      title: 'Customers',
      icon: AccountCogOutline,
      path: '/customers'
    },{
      title: 'Providers',
      icon: Table,
      path: '/providers'
    },
    {
      title: 'Provider Gig  ',
      icon: AlertCircleOutline,
      path: '/provigerGigs',

    },
    {
      title: 'Service Requests',
      icon: AlertCircleOutline,
      path: '/requests',

    },
    {
      sectionTitle: 'Configuration'
    },

    {
      title: 'Users',
      icon: CreditCardOutline,
      path: '/users'
    },
    {
      title: 'Profile Settings',
      icon: FormatLetterCase,
      path: '/account-settings'
    },
    {
      icon: CubeOutline,
      title: 'Others',
      path: '/form-layouts'
    }
  ]
}

export default navigation
