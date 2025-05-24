import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { BibliotecApp } from './BibliotecApp'
import { store } from './store'
import './assets/css/styles.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <BibliotecApp />
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
