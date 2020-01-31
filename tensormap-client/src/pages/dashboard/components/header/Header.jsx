import {withStyles} from '@material-ui/core'
import AppBar       from '@material-ui/core/AppBar/index'
import IconButton   from '@material-ui/core/IconButton/index'
import Toolbar      from '@material-ui/core/Toolbar/index'
import Typography   from '@material-ui/core/Typography/index'
import MenuIcon     from '@material-ui/icons/Menu'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './Header.styles'

class Header extends React.Component {
  state = {
<<<<<<< HEAD
    mobileOpen: false
  }

  
 
=======
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}))
  }
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d

  render() {
    const {classes} = this.props

    return (
<<<<<<< HEAD
      // <div style = {{position:'relative',zIndex:'200000000'}}>

=======
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
<<<<<<< HEAD
                onClick={this.props.handleClick}
=======
                onClick={this.handleDrawerToggle}
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
                className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
<<<<<<< HEAD
            <Typography variant="h6"  color="inherit" noWrap>
=======
            <Typography variant="h6" color="inherit" noWrap>
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
              [Title]
            </Typography>
          </Toolbar>
        </AppBar>
<<<<<<< HEAD
        // </div>

=======
>>>>>>> f4680c217941cae3990de591426d28ab38f6751d
    )
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Header)
