import { useNavigate, Link } from 'react-router-dom';
//Importamos el useDispatch del react-redux
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HelpIcon from '@mui/icons-material/Help';
import type { RootState } from '../store';
import { useEffect } from 'react';
import { authActions } from '../store/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';


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
          <Tooltip title="Ir a inicio" arrow>
            <ListItemButton onClick={() => { navigate('/home'); setOpen(false); }}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
        {userData.userRol === "admin" && (
        <ListItem disablePadding>
          <Tooltip title="Ver informes" arrow>
            <ListItemButton onClick={() => { navigate('/reports'); setOpen(false); }}>
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary="Informes" />
            </ListItemButton>
          </Tooltip>
        </ListItem>)}
        <ListItem disablePadding>
          <Tooltip title="Abrir manual de usuario" arrow>
            <ListItemButton component="a" href="/Guía_de_ejecución_Sánchez_Guedes_Aday.pdf" target="_blank">
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Ayuda" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding>
          <Tooltip title="Cerrar sesión" arrow>
            <ListItemButton onClick={salirPagina}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="Abrir menú" arrow>
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
          </Tooltip>
          <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userData.userName}
          </Typography>
          <Tooltip title={userData.userRol === "admin" ? "Administrador" : "Usuario"} arrow>
            <Button color="inherit">
              {userData.userRol === "admin" && (
              <AdminPanelSettingsIcon/>)}
              {userData.userRol === "user" && (
              <PersonIcon/>
              )}
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}