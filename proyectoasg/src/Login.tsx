import { useState } from 'react'
import './App.css'
import { Alert, Box, Button, Grid, Icon, Paper, TextField, Tooltip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../src/store/authSlice.ts';




function Login() {
  const dispatch = useDispatch()
  const [datos, setDatos] = useState({ name: '', pass: '' })
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' })



const navigate = useNavigate()

  const handleSubmit = (e:any) => {
  e.preventDefault(); 
    isVerifiedUser();
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


 async function isVerifiedUser () {
 fetch(`http://localhost:3030/login?user=${datos.name}&password=${datos.pass}`)
 .then(response => response.json())
 .then (response => {
 console.log('Lo que nos llega de la base de datos: ')
 console.log(response.data)
 if (response.data.length !== 0){
setAlerta({ tipo: 'success', mensaje: 'Inicio de sesión exitoso' });
    console.log(response.data)
    //aquí pongo el dispatch para cambiar el estado a login en el store del redux
    dispatch(authActions.login({
    name: response.data.nombre,   //user de la base de datos
    userRol: response.data.rol    //rol en la base de datos
    }))
    navigate('/home');
 } else{
setAlerta({ tipo: 'error', mensaje: 'Usuario o contraseña incorrectos' });
    console.log(datos)
 }
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

          <Tooltip title="Iniciar sesión con tus credenciales" arrow placement="bottom">
            <Button variant='contained' fullWidth type='submit'>Acceder</Button>
          </Tooltip>
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
