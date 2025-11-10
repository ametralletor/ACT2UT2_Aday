import { useState } from 'react'
import './App.css'
import { Alert, Box, Button, Grid, Icon, Paper, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [datos, setDatos] = useState({ name: '', pass: '' })
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' })



 //datos de inicio de sesion:
 const bduser= 'aday'
 const bdpassword= '1234'


const navigate = useNavigate()

  const handleSubmit = (e:any) => {
  e.preventDefault(); 
  if (datos.name === bduser && datos.pass === bdpassword) {     
    setAlerta({ tipo: 'success', mensaje: 'Inicio de sesión exitoso' });
    console.log(datos)
    navigate('/home');
  } else {
    setAlerta({ tipo: 'error', mensaje: 'Usuario o contraseña incorrectos' });
    console.log(datos)
  }
};

 const handleChangeName = (e:any) =>{
 setDatos({
 ...datos,
 name: e.target.value
 })
 }
  const handleChangePass = (e:any) =>{
 setDatos({
 ...datos,
 pass: e.target.value
 })
 }




  return (
    <Box component="form" onSubmit={handleSubmit} >
      <Paper elevation={3} sx={{ paddingBottom: 2, paddingTop: 0, paddingLeft: 2, paddingRight: 2}}>

      <Grid container spacing={1}>
          <Grid size={{ xs: 12}}>
            <p>Sistema de acceso</p><LockIcon ></LockIcon>
          </Grid>
            <Grid size={{ xs: 12}}>
              <TextField
                required
              label='Usuario'
              variant='outlined'
              fullWidth
              value={datos.name}
              onChange={handleChangeName}
            />
          </Grid>
          <Grid size={{ xs: 12  }}>
            <TextField
              required
              label='Contraseña'
              type='password'
              variant='outlined'
              fullWidth
              value={datos.pass}
              onChange={handleChangePass}
            />
          </Grid>

          <Button variant='contained' fullWidth type='submit'>Acceder</Button>
        </Grid>
        {alerta.tipo && (
          <Alert severity={alerta.tipo} sx={{ mt: 2 }}>
            {alerta.mensaje}
          </Alert>
        )}
      </Paper>
    </Box>
  )
}

export default Login
