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
    console.log(window.location.href);
    var url_ = new URL(window.location.href);
    console.log(url_);
    return (

        <div className={classes.root}>
          <CssBaseline/>
          {url_.pathname !== '/neuralnet' &&
              <Header/>
          }
          <Sidebar/>
          <main className={classes.content}>
            {url_.pathname !== '/neuralnet' &&
                <div className={classes.toolbar}/>
            }

            <Route exact path='/home' component={Home}/>
            <Route exact path='/neuralnet' component={A}/>
            <Route exact path='/data' component={B}/>
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
