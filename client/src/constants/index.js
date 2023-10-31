import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    img: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    img: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    img: payment,
    link: '/payment',
    disabled: true,
  },
  {
    name: 'withdraw',
    img: withdraw,
    link: '/withdraw',
    disabled: true,
  },
  {
    name: 'profile',
    img: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    img: logout,
    link: '/logout',
    disabled: true,
  },
];