import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './VisualizeData.styles'

class VisualizeData extends React.Component {
  constructor() {
    super();
    this.addNewRow = this.addNewRow.bind(this);
    this.addNewCol = this.addNewCol.bind(this);
    this.delRow = this.delRow.bind(this);
    this.delCol = this.delCol.bind(this);
    this.highlightRow = this.highlightRow.bind(this);
    this.highlightCol = this.highlightCol.bind(this);
    var response = `Model,mpg,cyl,disp,hp,drat,wt,qsec,vs,am,gear,carb
Mazda RX4,21,6,160,110,3.9,2.62,16.46,0,1,4,4
Mazda RX4 Wag,21,6,160,110,3.9,2.875,17.02,0,1,4,4
Datsun 710,22.8,4,108,93,3.85,2.32,18.61,1,1,4,1
Hornet 4 Drive,21.4,6,258,110,3.08,3.215,19.44,1,0,3,1
Hornet Sportabout,18.7,8,360,175,3.15,3.44,17.02,0,0,3,2
Valiant,18.1,6,225,105,2.76,3.46,20.22,1,0,3,1
Duster 360,14.3,8,360,245,3.21,3.57,15.84,0,0,3,4
Merc 240D,24.4,4,146.7,62,3.69,3.19,20,1,0,4,2
Merc 230,22.8,4,140.8,95,3.92,3.15,22.9,1,0,4,2
Merc 280,19.2,6,167.6,123,3.92,3.44,18.3,1,0,4,4
Merc 280C,17.8,6,167.6,123,3.92,3.44,18.9,1,0,4,4
Merc 450SE,16.4,8,275.8,180,3.07,4.07,17.4,0,0,3,3
Merc 450SL,17.3,8,275.8,180,3.07,3.73,17.6,0,0,3,3
Merc 450SLC,15.2,8,275.8,180,3.07,3.78,18,0,0,3,3
Cadillac Fleetwood,10.4,8,472,205,2.93,5.25,17.98,0,0,3,4
Lincoln Continental,10.4,8,460,215,3,5.424,17.82,0,0,3,4
Chrysler Imperial,14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
Fiat 128,32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1`.split("\n");
    this.state = {
      sampleData: response
    };
  }

  addNewRow() {
    const {sampleData} = this.state;
    var rows = sampleData.length;
    var cols = sampleData[0].split(",").length;
    var str = "";
    var array = null;
    if(this.state.selectRow != null) {
      var array = sampleData[this.state.selectRow].split(",");
    }
    for(var i=0;i<cols;i++) {
      if(i == 0) {
        str += "Row" + rows.toString();
      }
      else if(array != null) {
        str += "," + array[i];
      }
      else {
        str += ",0";
      }
    }
    sampleData.push(str);
    this.setState({
      sampleData: sampleData
    });
  }

  addNewCol() {
    const {sampleData} = this.state;
    var cols = sampleData[0].split(",").length;
    var array = [];
    if(this.state.selectCol != null) {
      for(var i = 0;i<sampleData.length;i++) {
        array.push(sampleData[i].split(",")[this.state.selectCol]);
      }
    }
    for(var i=0;i<sampleData.length;i++) {
      if(i == 0) {
        sampleData[i] += ",Col" + cols.toString();
      }
      else if(array != null) {
        sampleData[i] += "," + array[i];
      }
      else {
        sampleData[i] += ",0";
      }
    }
    this.setState({
      sampleData: sampleData
    });
  }

  highlightRow(event) {
    if(this.state.selectRow != Number(event.target.id)) {
      this.setState({
        selectRow: Number(event.target.id)
      })
    }
    else {
      this.setState({
        selectRow: null
      })
    }
  }

  highlightCol(event) {
    if(this.state.selectCol != Number(event.target.id)) {
      this.setState({
        selectCol: Number(event.target.id)
      })
    }
    else {
      this.setState({
        selectCol: null
      })
    } 
  }

  renderCols(data, row) {
    const {classes} = this.props
    return data.map((ele, idx) => {
      if(idx == 0) {
        if(this.state.selectCol != null && this.state.selectCol == idx) {
          return <td id={row} onClick={this.highlightRow} className={classes.highlightCol}>{ele}</td>
        }
        else {
          return <td id={row} onClick={this.highlightRow}>{ele}</td>
        }
      }
      else if(row == 0 && idx != 0) {
        if(this.state.selectCol != null && this.state.selectCol == idx) {
          return <td id={idx} onClick={this.highlightCol} className={classes.highlightCol}>{ele}</td>
        }
        else {
          return <td id={idx} onClick={this.highlightCol}>{ele}</td>
        }
      }
      else {
        if(this.state.selectCol != null && this.state.selectCol == idx) {
          return <td className={classes.highlightCol}>{ele}</td>
        }
        else {        
          return <td>{ele}</td>
        }
      }
    }, this);
  }

  renderRows(data) {
    const {classes} = this.props
    return data.map((ele, idx) => {
      if(this.state.selectRow != null && this.state.selectRow == idx) {
        return <tr className={classes.highlightRow} >{this.renderCols(ele.split(","), idx)}</tr>;
      }
      else {
        return <tr>{this.renderCols(ele.split(","), idx)}</tr>;
      }
    });
  }

  delRow() {
    if(this.state.selectRow != null) {
      var {sampleData} = this.state;
      sampleData.splice(this.state.selectRow, 1);
      this.setState({
        sampleData: sampleData,
        selectRow: null
      })
    }
  }

  delCol() {
    if(this.state.selectCol != null) {
      var {sampleData} = this.state;
      for(var i=0;i<sampleData.length;i++) {
        sampleData[i] = sampleData[i].split(",");
        sampleData[i].splice(this.state.selectCol, 1);
        sampleData[i] = sampleData[i].join(",");
      }
      this.setState({
        sampleData: sampleData,
        selectCol: null
      })
    }
  }
  renderDelRow() {
    return <button onClick={this.delRow}>Delete row</button>
  }

  renderDelCol() {
    return <button onClick={this.delCol}>Delete col</button>
  }

  renderAddRow() {
    return <button onClick={this.addNewRow}>Add row</button>
  }

  renderAddCol() {
    return <button onClick={this.addNewCol}>Add col</button>
  }

  renderDelBtn() {
    return <button onClick={this.delRow}>Del row</button>
  }

  render() {
    const {sampleData} = this.state;
    const {classes} = this.props
    const {match} = this.props
    return (
      <div className={classes.container}>
        <table>
          <tr>
            <td>
              Hello {match.params.name}
              <table>
                {this.renderRows(sampleData)}
              </table>
            </td>
            <td>
              Operations<br/>
              {this.renderAddRow()}<br/>
              {this.renderAddCol()}<br/>
              {this.renderDelRow()}<br/>
              {this.renderDelCol()}
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

VisualizeData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(VisualizeData)