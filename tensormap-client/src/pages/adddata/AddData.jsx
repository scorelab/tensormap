import {withStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import PropTypes    from 'prop-types'
import * as React   from 'react'
import ReactDOM from 'react-dom';
import styles       from './AddData.styles'

class AddData extends React.Component {
  state = {
    dtype_: '',
    name: 'hai',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props


    // <div className={classes.container}>
    // <form action="http://localhost:5000/addData" method="post" enctype="multipart/form-data" noValidate autoComplete="off">
    // <TextField
    //     id="filled-full-width"
    //     label="Label"
    //     style={{ margin: 8 }}
    //     placeholder="Placeholder"
    //     helperText="Full width!"
    //     fullWidth
    //     margin="normal"
    //     variant="filled"
    //     InputLabelProps={{
    //       shrink: true,
    //     }}
    //   />
    //
    //   Name: <input type="text" name="dataset_name" className={classes.text} placeholder="Enter dataset name"></input><br/>
    //   Type: <input type="text" name="dataset_type" className={classes.text} placeholder="Enter file format"></input><br/>
    //   Upload csv file: <br/> <input type="file" name="dataset_csv" className={classes.browse} ></input><br/>
    //   <input type="submit" value="Submit" className={classes.submit}></input>
    // </form>
    // </div>

    return (
      <Grid container className={classes.main_container} >
      <Grid item xs={4}>

      </Grid>
        <Grid item xs={4}>
        <Paper elevation={2} square>
          <form className={classes.container} action="http://localhost:5000/addData" method="post" enctype="multipart/form-data" noValidate autoComplete="off">
            <TextField
              id="outlined-full-width"
              label="Name"
              style={{ margin: 8 }}
              placeholder="Enter Dataset Name"
              helperText="Choose a name for dataset, example: iris1, mnist2"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid item xs={6} container>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Data Type
              </InputLabel>
              <Select
                value={this.state.dtype_}
                onChange={this.handleChange}

                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="dtype_"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>CSV</MenuItem>
                <MenuItem value={20}>XLSX</MenuItem>
                <MenuItem value={30}>JSON</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={6} >

            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="outlined-full-width"
                type="file"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            </Grid>
            <Grid item xs={12} >

            <FormControl className={classes.buttonControl}>
              <Button variant="contained" color="default" className={classes.button} onClick={() => {console.log("hihihihihihihihihihih")}}>
                <CloudUploadIcon className={classes.leftIcon} />
                  Upload
              </Button>
            </FormControl>
            </Grid>
          </form>
          </Paper>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>


    )
  }

}

AddData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(AddData)
