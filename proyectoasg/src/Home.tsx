//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
// Importamos lo que necesitamos para el tipo del selector()
import type { RootState } from '../src/store/index';
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../src/store/authSlice';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'

function Home(){
const dispatch = useDispatch()
const navigate = useNavigate()

//Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
const userData = useSelector((state: RootState) => state.authenticator)

//hacemos la funcion para salir de la página. ponemos el dispatch para cambiar el estado a 
//logout en el store y navigate a la pagina principal
const salirPagina = (e:any) => {
  e.preventDefault();
  dispatch(authActions.logout())
  navigate('/');

};
//Comprobamos por la consola qué obtenemos del store
console.log(userData)

  return (
    <>
    <br />
    
        <Typography variant="h1">Página Home de Aday Sánchez Guedes. <br />Soy el usuario {userData.userName} y tengo el rol de {userData.userRol} </Typography>
    <br />
    <Button  variant='outlined'  onClick={salirPagina} >Salir</Button>
    </>
  )
}

export default Home