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
// import DiscreteSlider from './assets/slider'

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
      trainPercentage : "null",
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
    this.getSliderValue = this.getSliderValue.bind(this);



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
      var obj1 = { title: this.state.columns[column].title, checked: false }
      var obj2 = { title: this.state.columns[column].title, checked: false }
      var obj3 = { title: this.state.columns[column].title, checked: false }
      tempColumnData.push(obj1);
      tempFeatureData.push(obj2);
      tempLabels.push(obj3);
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
        tempData[column].checked = !(tempData[column].checked)
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
        tempData[column].checked = !(tempData[column].checked)
        break;
      }
    }
    this.setState({labels:tempData});
    console.log(tempData)
    console.log(this.state.features)
    console.log(this.state.columnCheckBoxes)

  }


  toggleFeatureCheckboxChange(e){
    
    console.log(e.target.value);
    var tempFeatureData = [...this.state.features]
    var featureColumn = null
    for (var column in tempFeatureData) {   
      console.log(tempFeatureData[column].title)       
      if (e.target.value == tempFeatureData[column].title){
        tempFeatureData[column].checked = !(tempFeatureData[column].checked) 
        featureColumn = tempFeatureData[column]
        console.log(featureColumn)
        break;       
        }    
      }

    this.setState({features:tempFeatureData});
    console.log(tempFeatureData)

    console.log(featureColumn.checked)
    var currentLabels = [...this.state.labels]

    if(featureColumn.checked == true){
      console.log("y")          
      for(var labeldata in currentLabels){
        if (e.target.value == currentLabels[labeldata].title){
          currentLabels.splice(currentLabels.indexOf(currentLabels[labeldata]), 1);
          this.setState({labels:currentLabels});
          break;
        }
      }          
    }
    else if(featureColumn.checked == false){  
      console.log("else")      
        var labelCheckBoxAlter = featureColumn
        labelCheckBoxAlter.checked = false
        currentLabels.splice(tempFeatureData.indexOf(featureColumn), 0,labelCheckBoxAlter);
        this.setState({labels:currentLabels});
      }
    console.log(currentLabels)

    }
    

  createCheckboxes(){
    return this.state.columnCheckBoxes.map((column) => (
      <label>
        {column.title}
       <input
      type="checkbox"
      value={column.title}
      // checked={column.checked}
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
      // checked={column.checked}
      onClick={this.toggleFeatureCheckboxChange}
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
      // checked={column.checked}
      onChange={this.toggleLabelCheckboxChange}
      />        
        <br/>
      </label>
    ));
  }

  getSliderValue(e){
    this.setState({trainPercentage: e.target.value})
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
        <div>
        <label>Select Test Data Percentage</label><br/>
        <input type="range" min="1" max="90" className={classes.slider} onInput={this.getSliderValue} />        
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




 