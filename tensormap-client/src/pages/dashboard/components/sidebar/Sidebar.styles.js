const styles = theme => ({
  drawer     : {
    [theme.breakpoints.up('sm')]: {
      width     : theme.layout.sidebarWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: theme.layout.sidebarWidth,
  },
})

export default styles
