import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './ViewData.styles'

class ViewData extends React.Component {
  
  getEditHandler(idx) {
    return function() {
      document.getElementById('name_' + idx).innerHTML = '<input type="text" value="' + document.getElementById('name_' + idx).innerHTML + '"></input>';
      document.getElementById('save_' + idx).style.display = '';
      document.getElementById('cancel_' + idx).style.display = '';
      document.getElementById('edit_' + idx).style.display = 'none';
    }
  }

  getSaveHandler(idx) {
    return function () {
      var string = document.getElementById('name_' + idx).childNodes[0].value;
      var Httpreq = new XMLHttpRequest();
      Httpreq.open("GET", '/updateData?id=' + idx + '&name=' + string, true);
      Httpreq.send(null);
      document.getElementById('edit_' + idx).style.display = '';
      document.getElementById('save_' + idx).style.display = 'none';
      document.getElementById('cancel_' + idx).style.display = 'none';
      document.getElementById('name_' + idx).innerHTML = document.getElementById('name_' + idx).childNodes[0].value;
    }
  }

  getCancelHandler(idx) {
    return function () {
      document.getElementById('edit_' + idx).style.display = '';
      document.getElementById('save_' + idx).style.display = 'none';
      document.getElementById('cancel_' + idx).style.display = 'none';
      document.getElementById('name_' + idx).innerHTML = document.getElementById('name_' + idx).getAttribute('data-text');
    }
  }

  getDeleteHandler(idx) {
    return function() {
      var Httpreq = new XMLHttpRequest();
      Httpreq.open("GET", '/deleteData?id=' + idx, true);
      Httpreq.send(null);
      document.getElementById('datarow_' + idx).remove();
    }
  }

  renderEditButton(idx) {
    const {classes} = this.props
    return <button className={classes.editbtn} id={'edit_' + idx} onClick={this.getEditHandler(idx)}>Edit</button>
  }

  renderSaveButton(idx) {
    const {classes} = this.props
    var styles = {
      display: 'none',
    }
    return <button style={styles} className={classes.savebtn} id={'save_' + idx} onClick={this.getSaveHandler(idx)}>Save</button>
  }

  renderCancelButton(idx) {
    var styles = {
      display: 'none',
    }
    const {classes} = this.props
    return <button style={styles} className={classes.canbtn} id={'cancel_' + idx} onClick={this.getCancelHandler(idx)}>Cancel</button>
  }

  renderDeleteButton(idx) {
    const {classes} = this.props
    return <button className={classes.delbtn} onClick={this.getDeleteHandler(idx)}>Delete</button>
  }

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
    return data.map((ele, idx) => {
      return <tr id={'datarow_' + ele.id}><td id={'name_' + ele.id} className={classes.datatabletd} data-text={ele.name}>{ele.name}</td><td className={classes.datatabletd}>{ele.fileFormat}</td><td className={classes.datatabletd}>{this.renderEditButton(ele.id)}{this.renderSaveButton(ele.id)}{this.renderCancelButton(ele.id)}</td><td className={classes.datatabletd}>{this.renderDeleteButton(ele.id)}</td><td className={classes.datatabletd}>{this.renderViewButton(ele.id)}</td></tr>;
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
