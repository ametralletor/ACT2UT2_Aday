import { useNavigate } from 'react-router-dom';
//Importamos el useDispatch del react-redux
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import type { RootState } from '../store';
import { useEffect } from 'react';
import { authActions } from '../store/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Menu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.authenticator)


  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const isLoggedin = userData.isAutenticated
  useEffect(() => {
    if (!isLoggedin) {
      navigate('/')
    }
  }, [isLoggedin, navigate])

  //hacemos la funcion para salir de la página. ponemos el dispatch para cambiar el estado a 
  //logout en el store y navigate a la pagina principal
  const salirPagina = (e: any) => {
    e.preventDefault();
    dispatch(authActions.logout())
    navigate('/');

  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { navigate('/'); setOpen(false); }}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { navigate('/informes'); setOpen(false); }}>
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="Informes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={salirPagina}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userData.userName}
          </Typography>
          <Button color="inherit" onClick={salirPagina}>Salir</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}