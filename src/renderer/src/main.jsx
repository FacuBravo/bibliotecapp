import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { BibliotecApp } from './BibliotecApp'
import { store } from './store'
import './assets/css/styles.css'
import { ScrollToTop } from './routers/ScrollToTop'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <HashRouter>
                <ScrollToTop />
                <BibliotecApp />
            </HashRouter>
        </Provider>
    </StrictMode>
)
