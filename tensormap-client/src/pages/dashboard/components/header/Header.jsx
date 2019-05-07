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
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}))
  }

  render() {
    const {classes} = this.props

    return (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              [Title]
            </Typography>
          </Toolbar>
        </AppBar>
    )
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Header)
