import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './ViewData.styles'
import Table from './assets/Table'
import * as ENDPOINT from '../../constants/URLs';

class ViewData extends React.Component {
  constructor() {
    super();
    var Httpreq = new XMLHttpRequest();
    const URI = ENDPOINT.BACKEND_BASE_URL + ENDPOINT.VIEW_DATA_URL;
    Httpreq.open("GET", URI, false);
    Httpreq.send(null);
    this.state = {
      data:JSON.parse(Httpreq.responseText),
    };
  }


  render() {
    console.log(this.state.data);
    const {classes} = this.props

    return (
        <Table data={this.state.data}/>
    )
  }

}

ViewData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(ViewData)
