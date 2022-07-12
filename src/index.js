import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'

//  Context Provider
import { SoftUIControllerProvider } from 'context'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
    <BrowserRouter>
        <SoftUIControllerProvider>
            <SnackbarProvider maxSnack={2}>
                <App/>
            </SnackbarProvider>
        </SoftUIControllerProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
