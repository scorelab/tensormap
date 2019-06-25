import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './ViewData.styles'

class ViewData extends React.Component {
  
  renderEditButton() {
    const {classes} = this.props
    return <button className={classes.editbtn}>Edit</button>
  }

  renderDeleteButton() {
    const {classes} = this.props
    return <button className={classes.delbtn}>Delete</button>
  }

  renderViewButton() {
    const {classes} = this.props
    return <button className={classes.viewbtn}>View Dataset</button>
  }
  renderDatasets() {
    const {classes} = this.props
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", '/viewData', false);
    Httpreq.send(null);
    var data = JSON.parse(Httpreq.responseText);
    return data.map(ele => {
      return <tr><td className={classes.datatabletd}>{ele.name}</td><td className={classes.datatabletd}>{ele.fileFormat}</td><td className={classes.datatabletd}>{this.renderEditButton()}</td><td className={classes.datatabletd}>{this.renderDeleteButton()}</td><td className={classes.datatabletd}>{this.renderViewButton()}</td></tr>;
    });
  }
  render() {
    const {classes} = this.props

    return (
        <div className={classes.container}>
          <table id="dataTable" className={classes.datatable} border="1">
            <tr>
              <th className={classes.datatableth}> Dataset Name </th>
              <th className={classes.datatableth}> Dataset Type </th>
              <th className={classes.datatableth}> Edit option </th>
              <th className={classes.datatableth}> Delete option </th>
              <th className={classes.datatableth}> View dataset </th>
            </tr>
            {this.renderDatasets()}
          </table>
        </div>
    )
  }

}

ViewData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(ViewData)
