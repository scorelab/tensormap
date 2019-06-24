import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './AddData.styles'

class AddData extends React.Component {

  render() {
    const {classes} = this.props

    return (
        <form action="localhost:5000/addData" method="post" enctype="multipart/form-data">
        	Name: <input type="text" name="dataset_name"></input><br/>
        	Type: <input type="text" name="dataset_type"></input><br/>
        	Upload csv file: <input type="file" name="dataset_csv"></input><br/>
        	<input type="submit" value="Submit"></input>
        </form>
    )
  }

}

AddData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(AddData)
