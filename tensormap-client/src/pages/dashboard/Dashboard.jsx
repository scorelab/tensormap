import {withStyles} from '@material-ui/core'
import CssBaseline  from '@material-ui/core/CssBaseline'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import {Route}      from 'react-router-dom'
import {Home}       from './scenes/home'
import {A}        from './scenes/a'
import {B}        from './scenes/b'
import {Header}     from './components/header'
import {Sidebar}    from './components/sidebar'
import styles       from './Dashboard.styles'

class Dashboard extends React.Component {

  render() {
    const {classes} = this.props

    return (
        <div className={classes.root}>
          <CssBaseline/>
          <Header/>w
          <Sidebar/>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/a' component={A}/>
            <Route exact path='/b' component={B}/>
          </main>
        </div>
    )
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Dashboard)
