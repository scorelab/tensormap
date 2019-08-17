import {withStyles} from '@material-ui/core'
import PropTypes    from 'prop-types'
import * as React   from 'react'
import styles       from './VisualizeData.styles'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { saveAs } from 'file-saver';
// import Checkbox from './Checkbox';

// import ScrollableTabsButtonAuto from './assets/ScrollableTabsButtonAuto'
import { forwardRef } from 'react';
import { template } from '@babel/core';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


class VisualizeData extends React.Component {
  constructor() {
    super();

    this.state = {
      fileName: "null",
      columnCheckBoxes : [],
      features : [],
      labels :  [],
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ],
      data: [
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        {
          name: 'Zerya Betül',
          surname: 'Baran',
          birthYear: 2017,
          birthCity: 34,
        },
      ],

           
    }
    
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.populateCheckBox = this.populateCheckBox.bind(this);
    this.toggleCheckboxChange =this.toggleCheckboxChange.bind(this);
    this.deleteCol = this.deleteCol.bind(this);
    this.sendAddRequest = this.sendAddRequest.bind(this);
    this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    this.sendEditRequest = this.sendEditRequest.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.selectFeatures = this.selectFeatures.bind(this);
    this.selectLabels = this.selectLabels.bind(this);
    this.createFeatureCheckboxes = this.createFeatureCheckboxes.bind(this);
    this.createLabelCheckboxes = this.createLabelCheckboxes.bind(this);
    this.toggleLabelCheckboxChange = this.toggleLabelCheckboxChange.bind(this);
    this.toggleFeatureCheckboxChange = this.toggleFeatureCheckboxChange.bind(this);



}

  componentDidMount() { 

    // this.setState({fileName: this.props.location.state.fileName })
    this.setState({fileName: "store" })


    let url = "http://127.0.0.1:5000/visualizeData?fileName="
    // url = url.concat(this.props.location.state.fileName)
    url = url.concat("store")
    console.log(url)

    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.text();
    }).then((responseText) => {
         let splitText =responseText.split("\n")
      console.log(splitText[0])  
      this.setState({sampleData: responseText.split("\n")})    
   }).catch(function (error) {
      console.log(error);
  }); 

  this.populateCheckBox()
  }




  selectFeatures(){
    alert("Features Saved for Experiment")

  }

  selectLabels(){
    alert("Labels Saved for Experiment")
  }




  sendAddRequest(newData){
    var data = JSON.stringify(newData)
    console.log(data) 

    fetch("http://127.0.0.1:5000/addRow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then((response) => {
      return response.text();
    }).then((response) => {
      console.log(response)  
   }).catch(function (error) {
      console.log(error);
  }); 
}

  sendDeleteRequest(oldData){
    var data = JSON.stringify(oldData)
    console.log(data) 

    fetch("http://127.0.0.1:5000/deleteRow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then((response) => {
      return response.text();
    }).then((response) => {
      console.log(response)  
   }).catch(function (error) {
      console.log(error);
  }); 

  }

  sendEditRequest(newData,oldData){

    var obj = {newRowData: newData, oldRowData: oldData}
    var data = JSON.stringify(obj)
    console.log(data) 

    fetch("http://127.0.0.1:5000/editRow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then((response) => {
      return response.text();
    }).then((response) => {
      console.log(response)  
   }).catch(function (error) {
      console.log(error);
  }); 

  }

  downloadCSV(){
    var obj = {fileName: this.state.fileName}
    var data = JSON.stringify(obj)
    console.log(data) 

    fetch("http://127.0.0.1:5000/downloadCSV", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob',
      body: data
    }).then((response) => {
      return response.blob();
    }).then((blob) => {
      var filename = this.state.fileName
      filename = filename.concat(".csv")
      saveAs(blob,filename)  
   }).catch(function (error) {
      console.log(error);
  }); 


  }




  deleteCol(){    
    var data = JSON.stringify(this.state.columnCheckBoxes)
    console.log(data) 

    fetch("http://127.0.0.1:5000/deleteCol", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response)  
      var parserData = JSON.parse(response)
      console.log(parserData)
      var oldColumnData = [...this.state.columns]
      var oldRowData = [...this.state.data]    
      // this.setState({columns: parserData.columns })
      // this.setState({data: parserData.data})  

   }).catch(function (error) {
      console.log(error);
  }); 

  }

  populateCheckBox(){
    for (var column in this.state.columns) {
      var tempColumnData = this.state.columnCheckBoxes
      var tempFeatureData = this.state.features
      var tempLabels = this.state.labels
      var obj = { title: this.state.columns[column].title, isChecked: false }
      tempColumnData.push(obj);
      tempFeatureData.push(obj);
      tempLabels.push(obj);
      this.setState({columnCheckBoxes:tempColumnData});     
      this.setState({features:tempFeatureData});
      this.setState({labels:tempLabels}); 
  }

  }

  toggleCheckboxChange(e){
    console.log(e.target.value);
    var tempData = [...this.state.columnCheckBoxes]
    for (var column in tempData) {
      if (e.target.value == tempData[column].title){
        tempData[column].isChecked = !(tempData[column].isChecked)
        break;
      }
    }
    this.setState({columnCheckBoxes:tempData});
    console.log(tempData)      
  }

  toggleLabelCheckboxChange(e){
    console.log(e.target.value);
    var tempData = [...this.state.labels]
    for (var column in tempData) {
      if (e.target.value == tempData[column].title){
        tempData[column].isChecked = !(tempData[column].isChecked)
        break;
      }
    }
    this.setState({labels:tempData});
    console.log(tempData)
  }


  toggleFeatureCheckboxChange(e){
    console.log(e.target.value);
    var tempData = [...this.state.features]
    for (var column in tempData) {
      console.log("**********")
      console.log(tempData[column].title)
      if (e.target.value == tempData[column].title){
        
        tempData[column].isChecked = !(tempData[column].isChecked)
        console.log(tempData[column].isChecked)
        var currentLabels = [...this.state.labels]
        if(tempData[column].isChecked == true){
          console.log("y")          
          for(var labeldata in currentLabels){
            if (e.target.value == currentLabels[labeldata].title){
              currentLabels.splice(currentLabels.indexOf(currentLabels[labeldata]), 1);
              this.setState({labels:currentLabels});
              break;
            }
          }          
        }
        else if(tempData[column].isChecked == false){  
          console.log("else")      
            var labelCheckBoxAlter = tempData[column]
            labelCheckBoxAlter.isChecked = false
            currentLabels.splice(tempData.indexOf(tempData[column]), 0,labelCheckBoxAlter);
            this.setState({labels:currentLabels});
          }
        console.log(currentLabels)
        break;       
        }
        
        
        
      }
    this.setState({features:tempData});
    console.log(tempData)

    }
    

  createCheckboxes(){
    return this.state.columnCheckBoxes.map((column) => (
      <label>
        {column.title}
       <input
      type="checkbox"
      value={column.title}
      // checked={column.isChecked}
      onChange={this.toggleCheckboxChange}
      />        
        <br/>
      </label>
    ));    
  }

  createFeatureCheckboxes(){
    return this.state.features.map((column) => (
      <label>
        {column.title}
       <input
      type="checkbox"
      value={column.title}
      // checked={column.isChecked}
      onChange={this.toggleFeatureCheckboxChange}
      />        
        <br/>
      </label>
    ));
  }

  createLabelCheckboxes(){
    return this.state.labels.map((column) => (
      <label>
        {column.title}
       <input
      type="checkbox"
      value={column.title}
      // checked={column.isChecked}
      onChange={this.toggleLabelCheckboxChange}
      />        
        <br/>
      </label>
    ));
  }



  render() {
    const {sampleData} = this.state;
    const {classes} = this.props;
    const {match} = this.props;

    

    return (
      <div className={classes.container}>
      <div className={classes.visualizeHeader}>
        {/* <ScrollableTabsButtonAuto/> */}
        <div>
          <label>Choose colums to delete:</label>
          <br/>
            {this.createCheckboxes()}
            <button type="button"  onClick={this.deleteCol}>Delete</button>          
        </div>
        <div><button type="button"  onClick={this.downloadCSV}>Download CSV</button> </div>
        <div>
          <label>Choose Features:</label>
          <br/>
            {this.createFeatureCheckboxes()}
            <button type="button"  onClick={this.selectFeatures}>Save Features</button>          
        </div>
        <div>
          <label>Choose Label:</label>
          <br/>
            {this.createLabelCheckboxes()}
            <button type="button"  onClick={this.selectLabels}>Save Label</button>          
        </div>

        </div>
        <div style={{ maxWidth: "100%" }}>
        <MaterialTable
        icons={tableIcons}
      title={this.state.fileName}
      columns={this.state.columns}
      data={this.state.data}
      options={{
        filtering: true
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tempdata = [...this.state.data];
              tempdata.push(newData);
              this.setState({data:tempdata});
              console.log(newData);
              this.sendAddRequest(newData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(oldData)
              const tempdata = [...this.state.data];
              tempdata.splice(tempdata.indexOf(oldData), 1);
              this.setState({data:tempdata});
              console.log(oldData);
              this.sendDeleteRequest(oldData);
            }, 600);
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tempdata = [...this.state.data];
              tempdata[tempdata.indexOf(oldData)] = newData;
              this.setState({data:tempdata});
              console.log(oldData);
              console.log(newData);
              this.sendEditRequest(newData,oldData);
            }, 600);
          }),
      }}
    />
        </div>
      </div>
    )
  }


}

VisualizeData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme  : PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(VisualizeData)




  // addNewRow() {
  //   const {sampleData} = this.state;
  //   var rows = sampleData.length;
  //   var cols = sampleData[0].split(",").length;
  //   var str = "";
  //   var array = null;
  //   if(this.state.selectRow != null) {
  //     var array = sampleData[this.state.selectRow].split(",");
  //   }
  //   for(var i=0;i<cols;i++) {
  //     if(i == 0) {
  //       str += "Row" + rows.toString();
  //     }
  //     else if(array != null) {
  //       str += "," + array[i];
  //     }
  //     else {
  //       str += ",0";
  //     }
  //   }
  //   sampleData.push(str);
  //   this.setState({
  //     sampleData: sampleData
  //   });
  // }

  // addNewCol() {
  //   const {sampleData} = this.state;
  //   var cols = sampleData[0].split(",").length;
  //   var array = [];
  //   if(this.state.selectCol != null) {
  //     for(var i = 0;i<sampleData.length;i++) {
  //       array.push(sampleData[i].split(",")[this.state.selectCol]);
  //     }
  //   }
  //   for(var i=0;i<sampleData.length;i++) {
  //     if(i == 0) {
  //       sampleData[i] += ",Col" + cols.toString();
  //     }
  //     else if(array != null && array.length > 0) {
  //       sampleData[i] += "," + array[i];
  //     }
  //     else {
  //       sampleData[i] += ",0";
  //     }
  //   }
  //   this.setState({
  //     sampleData: sampleData
  //   });
  // }

  // highlightRow(event) {
  //   if(this.state.selectRow != Number(event.target.id)) {
  //     this.setState({
  //       selectRow: Number(event.target.id)
  //     })
  //   }
  //   else {
  //     this.setState({
  //       selectRow: null
  //     })
  //   }
  // }

  // highlightCol(event) {
  //   if(this.state.selectCol != Number(event.target.id)) {
  //     this.setState({
  //       selectCol: Number(event.target.id)
  //     })
  //   }
  //   else {
  //     this.setState({
  //       selectCol: null
  //     })
  //   } 
  // }

  // renderCols(data, row) {
  //   const {classes} = this.props
  //   return data.map((ele, idx) => {
  //     if(idx == 0) {
  //       if(this.state.selectCol != null && this.state.selectCol == idx) {
  //         return <td className={classes.tabletd} id={row} onClick={this.highlightRow} className={classes.highlightCol}>{ele}</td>
  //       }
  //       else {
  //         return <td className={classes.tabletd} id={row} onClick={this.highlightRow}>{ele}</td>
  //       }
  //     }
  //     else if(row == 0 && idx != 0) {
  //       if(this.state.selectCol != null && this.state.selecCol == idx) {
  //         return <td className={classes.tabletd} id={idx} onClick={this.highlightCol} className={classes.highlightCol}>{ele}</td>
  //       }
  //       else {
  //         return <td className={classes.tabletd} id={idx} onClick={this.highlightCol}>{ele}</td>
  //       }
  //     }
  //     else {
  //       if(this.state.selectCol != null && this.state.selectCol == idx) {
  //         if(this.state.editRow != null && this.state.editCol != null && this.state.editRow == row && this.state.editCol == idx) {
  //           return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable} className={classes.highlightCol}><input className={classes.inputdata} type="text" defaultValue={ele}/></td>
  //         }
  //         else {
  //           return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable} className={classes.highlightCol} className={classes.input}>{ele}</td>
  //         }
  //       }
  //       else {  
  //         if(this.state.editRow != null && this.state.editCol != null && this.state.editRow == row && this.state.editCol == idx) {    
  //           return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable}><input className={classes.inputdata} type="text" defaultValue={ele} onChange={this.handleInputChange}/></td>
  //         }
  //         else {
  //           return <td className={classes.tabletd} id={row + ',' + idx} onDoubleClick={this.makeEditable}>{ele}</td>
  //         }
  //       }
  //     }
  //   }, this);
  // }

  // handleInputChange(event) {
  //   this.newValue = event.target.value;
  // }
  // makeEditable(event) {
  //   var id = event.target.id;
  //   var row = Number(id.split(",")[0]);
  //   var col = Number(id.split(",")[1]);
  //   console.log(row, col);
  //   this.setState({
  //     editRow: row,
  //     editCol: col
  //   })
  // }

  // renderRows(data) {
  //   const {classes} = this.props
  //   if(this.state.selectRow == null){
        
  //   }
  //   return data.map((ele, idx) => {
  //     if(this.state.selectRow != null && this.state.selectRow == idx) {
  //       return <tr className={classes.highlightRow} >{this.renderCols(ele.split(","), idx)}</tr>;
  //     }
  //     else {
  //       return <tr>{this.renderCols(ele.split(","), idx)}</tr>;
  //     }
  //   });
  // }

  // delRow() {
  //   if(this.state.selectRow != null) {
  //     var {sampleData} = this.state;
  //     sampleData.splice(this.state.selectRow, 1);
  //     this.setState({
  //       sampleData: sampleData,
  //       selectRow: null
  //     })
  //   }
  // }

  // delCol() {
  //   if(this.state.selectCol != null) {
  //     var {sampleData} = this.state;
  //     for(var i=0;i<sampleData.length;i++) {
  //       sampleData[i] = sampleData[i].split(",");
  //       sampleData[i].splice(this.state.selectCol, 1);
  //       sampleData[i] = sampleData[i].join(",");
  //     }
  //     this.setState({
  //       sampleData: sampleData,
  //       selectCol: null
  //     })
  //   }
  // }
  // renderDelRow() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.delRow}>Delete row</button>
  // }

  // renderDelCol() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.delCol}>Delete col</button>
  // }

  // renderAddRow() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.addNewRow}>Add row</button>
  // }

  // renderAddCol() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.addNewCol}>Add col</button>
  // }

  // renderDelBtn() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.delRow}>Del row</button>
  // }

  // renderSavVal() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.savVal}>Save value</button>
  // }

  // renderCanVal() {
  // const {classes} = this.props;
  //   return <button className={classes.viewbtn} onClick={this.canVal}>Cancel</button>
  // }

  // savVal() {
  //   if(this.state.editCol != null && this.state.editRow != null) {
  //     const {sampleData} = this.state;
  //     var editRow = this.state.editRow;
  //     var editCol = this.state.editCol;
  //     sampleData[editRow] = sampleData[editRow].split(",")
  //     sampleData[editRow][editCol] = this.newValue;
  //     sampleData[editRow] = sampleData[editRow].join(",");
  //     this.setState({
  //       sampleData: sampleData,
  //       editRow: null,
  //       editCol: null
  //     })
  //   }
  // }

  // canVal() {
  //   this.setState({
  //     editRow: null,
  //     editCol: null
  //   })
  // }