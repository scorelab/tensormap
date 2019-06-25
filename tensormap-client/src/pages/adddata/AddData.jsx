import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './AddData.styles'

class AddData extends React.Component {

  render() {
    const {classes} = this.props

    return (
        <div className={classes.container}>
        <form action="/addData" method="post" enctype="multipart/form-data">
            Name: <input type="text" name="dataset_name" className={classes.text} placeholder="Enter dataset name"></input><br/>
            Type: <input type="text" name="dataset_type" className={classes.text} placeholder="Enter file format"></input><br/>
            Upload csv file: <br/> <input type="file" name="dataset_csv" className={classes.browse} ></input><br/>
            <input type="submit" value="Submit" className={classes.submit}></input>
        </form>
        </div>
    )
  }

}

AddData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(AddData)
