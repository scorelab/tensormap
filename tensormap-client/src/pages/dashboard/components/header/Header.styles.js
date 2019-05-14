const styles = theme => ({
  appBar    : {
    height: theme.layout.headerHeight,

    marginLeft                  : theme.layout.sidebarWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.layout.sidebarWidth}px)`,
    },
  },
  menuButton: {
    marginRight                 : 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
})

export default styles
