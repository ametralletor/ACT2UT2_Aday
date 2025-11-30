/*//Importamos el useSelector del react-redux
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


//Comprobamos por la consola qué obtenemos del store
console.log(userData)*/

import React from 'react';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';

export default function Home() {
  return (
    <>
      <Menu />
      <Dashboard />
    </>
  );
}

