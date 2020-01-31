<<<<<<< HEAD
// import MuiThemeProvider   from '@material-ui/core/styles/MuiThemeProvider'
import { MuiThemeProvider } from '@material-ui/core/styles';
=======
import MuiThemeProvider   from '@material-ui/core/styles/MuiThemeProvider'
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
import React              from 'react'
import ReactDOM           from 'react-dom'
import {Provider}         from 'react-redux'
import App                from './App'
import {store}            from './helpers'
import './index.sass'
import * as serviceWorker from './serviceWorker'
import theme              from './theme'

<<<<<<< HEAD

=======
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App/>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
