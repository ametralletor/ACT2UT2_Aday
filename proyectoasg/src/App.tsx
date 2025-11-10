import React from 'react'
import './App.css';
import Login from './Login'
import Home from './Home'
import Reports from './Reports'
import ErrorPage from './ErrorPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
{
path: '/',
errorElement: <ErrorPage/>,
children: [
{
index: true,
element: <Login/>
},
{
path: 'home',
element: <Home/>
},
{
path: 'reports',
element: <Reports/>
}
]
},
]);
function App() {
 return (
    <RouterProvider router={router} />
)
}
export default App;