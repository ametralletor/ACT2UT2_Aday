import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/index'

import { createRoot } from 'react-dom/client'
import './index.css'
//import Login from './Login.tsx'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
