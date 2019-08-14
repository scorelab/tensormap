import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './VisualizeData.styles'
// import * as qs from 'query-string';


class VisualizeData extends React.Component {
  constructor() {
    super();
    this.addNewRow = this.addNewRow.bind(this);
    this.addNewCol = this.addNewCol.bind(this);
    this.delRow = this.delRow.bind(this);
    this.delCol = this.delCol.bind(this);
    this.highlightRow = this.highlightRow.bind(this);
    this.highlightCol = this.highlightCol.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.savVal = this.savVal.bind(this);
    this.canVal = this.canVal.bind(this);
    //var Httpreq = new XMLHttpRequest();
    //Httpreq.open("GET", '/visualizeData?' + 'name=IMAGENET', false);
    //Httpreq.send(null);
    //var response = Httpreq.responseText.split("\n");
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
      fileName: "null",
      sampleData: response
    };
}

  componentDidMount() { 
    console.log("printing")
    console.log(this.props.location.state.fileName)
    // this.setState({fileName: this.props.location.state.fileName })

    let url = "http://127.0.0.1:5000/visualizeData?fileName="
    url = url.concat(this.props.location.state.fileName)
    console.log(url)

    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.text();
    }).then((responseText) => {
      console.log(responseText.split("\n"))  
      // this.setState({sampleData: responseText.split("\n")})    
   }).catch(function (error) {
      console.log(error);
  });
    
    
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
      else if(array != null && array.length > 0) {
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
          return <td className={classes.tabletd} id={row} onClick={this.highlightRow} className={classes.highlightCol}>{ele}</td>
        }
        else {
          return <td className={classes.tabletd} id={row} onClick={this.highlightRow}>{ele}</td>
        }
      }
      else if(row == 0 && idx != 0) {
        if(this.state.selectCol != null && this.state.selecCol == idx) {
          return <td className={classes.tabletd} id={idx} onClick={this.highlightCol} className={classes.highlightCol}>{ele}</td>
        }
        else {
          return <td className={classes.tabletd} id={idx} onClick={this.highlightCol}>{ele}</td>
        }
      }
      else {
        if(this.state.selectCol != null && this.state.selectCol == idx) {
          if(this.state.editRow != null && this.state.editCol != null && this.state.editRow == row && this.state.editCol == idx) {
            return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable} className={classes.highlightCol}><input className={classes.inputdata} type="text" defaultValue={ele}/></td>
          }
          else {
            return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable} className={classes.highlightCol} className={classes.input}>{ele}</td>
          }
        }
        else {  
          if(this.state.editRow != null && this.state.editCol != null && this.state.editRow == row && this.state.editCol == idx) {    
            return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable}><input className={classes.inputdata} type="text" defaultValue={ele} onChange={this.handleInputChange}/></td>
          }
          else {
            return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable}>{ele}</td>
          }
        }
      }
    }, this);
  }

  handleInputChange(event) {
    this.newValue = event.target.value;
  }
  makeEditable(event) {
    var id = event.target.id;
    var row = Number(id.split(",")[0]);
    var col = Number(id.split(",")[1]);
    console.log(row, col);
    this.setState({
      editRow: row,
      editCol: col
    })
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
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.delRow}>Delete row</button>
  }

  renderDelCol() {
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.delCol}>Delete col</button>
  }

  renderAddRow() {
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.addNewRow}>Add row</button>
  }

  renderAddCol() {
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.addNewCol}>Add col</button>
  }

  renderDelBtn() {
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.delRow}>Del row</button>
  }

  renderSavVal() {
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.savVal}>Save value</button>
  }

  renderCanVal() {
  const {classes} = this.props;
    return <button className={classes.viewbtn} onClick={this.canVal}>Cancel</button>
  }

  savVal() {
    if(this.state.editCol != null && this.state.editRow != null) {
      const {sampleData} = this.state;
      var editRow = this.state.editRow;
      var editCol = this.state.editCol;
      sampleData[editRow] = sampleData[editRow].split(",")
      sampleData[editRow][editCol] = this.newValue;
      sampleData[editRow] = sampleData[editRow].join(",");
      this.setState({
        sampleData: sampleData,
        editRow: null,
        editCol: null
      })
    }
  }

  canVal() {
    this.setState({
      editRow: null,
      editCol: null
    })
  }

  render() {
    const {sampleData} = this.state;
    const {classes} = this.props;
    const {match} = this.props;

    return (
      <div className={classes.container}>
        <table className={classes.table}>
          <tr>
            <td className={classes.tabletd}>Welcome to {match.params.name}</td>
            <td className={classes.tabletd}>Operations</td>
          </tr>
          <tr>
            <td className={classes.tabletd}>
              <table className={classes.table}>
                {this.renderRows(sampleData)}
              </table>
            </td>
            <td className={classes.tabletd}>
              {this.renderAddRow()}<br/>
              {this.renderAddCol()}<br/>
              {this.renderDelRow()}<br/>
              {this.renderDelCol()}<br/>
              {this.renderSavVal()}<br/>
              {this.renderCanVal()}<br/>
              <button className={classes.viewbtn}>Pass to network</button>
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