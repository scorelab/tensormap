import React, {Component} from 'react';
import {Form, Message, Segment, Dropdown} from 'semantic-ui-react';
import * as strings from "../../constants/Strings";
import ModalComponent from '../shared/Modal';
import { getAllFiles } from '../../services/FileServices';
import { validateModel } from '../../services/ModelServices';

class PropertiesBar extends Component {
    
    state = {
        fileList:null,
        totalDetails:null,
        fieldsList: [{"text":"Select a file first", "value":null, "key":0,disabled:true}],
        selectedFile:null,
        targetField:null,
        modalName:null,
        problemType:null,
        optimizer:null,
        metric:null,
        epochCount:null,
        trainTestRatio:null,
        inputNodesList: [],
        flattenNodesList: [],
        denseNodesList: [],
        inputXParam:null,
        inputYParam:null,
        flattenXParam:null,
        flattenYParam:null,
        denseUnitParamsList:[],
        denseActParamsList:[],
        disableButton:true,
        modalOpen:false,
        modelValidatedSuccessfully:false,
    }



    componentDidMount() {

        // Get the list of datafiles from the backend for the file selector
        getAllFiles()
        .then(
            response => {
                const fileList = response.map((file,index)=>(
                    {"text": file.file_name +"."+ file.file_type, "value": file.file_id, "key":index}
                ))
                this.setState(prevState => ({
                    ...prevState,
                    fileList: fileList,
                    totalDetails: response
                  }))
            }
            
        )
        .catch(err => {
            console.error(err)
        })
    }

    fileSelectHandler = (event,val) => {    
        const selectedFIleDetails = this.state.totalDetails.filter(item => item.file_id === val.value);
        this.setState({...this.state, selectedFile: val.value,  fieldsList: selectedFIleDetails[0].fields.map(
            (item,index)=>({"text":item, "value":item, "key":index})) })
    };

    fieldSelectHandler = (event,val) => {
        this.setState({...this.state, targetField:val.value},()=>this.enableSubmitButton());
    }

    modalNameHandler = (event) => {
        this.setState({...this.state, modalName:event.target.value }, ()=>this.enableSubmitButton());
    }

    problemTypeHandler = (event,val) => {
        this.setState({...this.state, problemType:val.value}, ()=>this.enableSubmitButton());
    }

    optimizerHandler = (event,val) => {
        this.setState({...this.state, optimizer:val.value}, ()=>this.enableSubmitButton());
    }

    metricHandler = (event,val) => {
        this.setState({...this.state, metric:val.value}, ()=>this.enableSubmitButton());
    }

    epochCountHandler = (event)=> {
        this.setState({...this.state, epochCount:event.target.value}, ()=>this.enableSubmitButton());
    }

    trainTestRatioHandler = (event)=>{
        this.setState({...this.state, trainTestRatio:event.target.value}, ()=>this.enableSubmitButton());

    }

    enableSubmitButton = ()=>{
        if (this.state.selectedFile !== null && this.state.targetField !==null && this.state.modalName !== null &&
            this.state.problemType !== null && this.state.optimizer !== null && this.state.metric !== null &&
            this.state.epochCount !== null && this.state.trainTestRatio != null){              
                    this.setState({...this.state, disableButton:false});
        }

    }

    modelValidateHandler = ()=> {
        let data = {
            "model": {
                "layer_types": [
                    "input",
                    "dense"
                ],
                "model_name":this.state.modalName,
                "input": {
                    "input_dim":[this.state.inputXParam, this.state.inputYParam]
                }
            },
            "code": {
                "dataset": {
                    "file_id": this.state.selectedFile,
                    "target_field": this.state.targetField,
                    "training_split": this.state.trainTestRatio
                },
                "dl_model": {
                    "model_name": this.state.modalName,
                    "optimizer": this.state.optimizer,
                    "metric": this.state.metric,
                    "epochs": this.state.epochCount
                },
                "problem_type_id": this.state.problemType
            }
        }
        if (this.state.flattenNodesList.length !== 0){
            data.model.layer_types.push("flatten");
            data.model["flatten"] = {
                "input_dim": [this.state.flattenXParam, this.state.flattenYParam]
            }
        }
        let denseNodeDataList = []
        for (const denseNode of this.state.denseNodesList){
            denseNodeDataList.push({
                "units": this.state.denseUnitParamsList[denseNode],
                "activation":this.state.denseActParamsList[denseNode]})
        }

        if (denseNodeDataList.length !== 0){
            data.model["dense"] = denseNodeDataList
        }
        
        // Send the model data to the backend for validation and update the Modal state accordingly
        validateModel(data)
          .then(modelValidatedSuccessfully => {
            this.setState(prevState => ({...prevState,
                modelValidatedSuccessfully: modelValidatedSuccessfully,
              }));
            this.modelOpen();
          })
          .catch(error => {
            console.error(error);
            this.setState({ modelValidatedSuccessfully: false });
            this.modelOpen();
          });
    }

    /*
    * Model related functions controls the feedback of the request
    *
    * */
    modelClose = () => {
        this.setState({ ...this.state, modalOpen: false });
        window.location.reload();
    }

    modelOpen = () => this.setState({ ...this.state, modalOpen: true });


    optimizerOptions = [
        { key: 'opt_1', text: 'Adam', value: 'adam' },
    ]

    metricOptions = [
        { key: 'acc_1', text: 'Accuracy', value: 'accuracy' },
    ]

    problemTypeOptions = [
        { key: 'prob_type_1', text: 'Multi class classification [All values float]', value: 1 },
    ]

    activationOptions = [
        { key: 'act_1', text: 'ReLU', value: "relu" },
        { key: 'act_2', text: 'Linear', value: "linear" }
    ]

    render() {


        /*
        * addedSuccessfully and errorInAddition are modals that will pop up after successful addition or failure.
        *
        * */
        const validatedSuccessfully = (
            <ModalComponent
            modalOpen={this.state.modalOpen}
            modelClose={this.modelClose}
            sucess={true}
            Modalmessage = {strings.MODEL_VALIDATION_MODAL_MESSAGE}/>
        );

        const errorInValidation = (
            <ModalComponent
            modalOpen={this.state.modalOpen}
            modelClose={this.modelClose}
            sucess={false}
            Modalmessage = {strings.PROCESS_FAIL_MODEL_MESSAGE}/>
        );

       
        let fileFieldsList = <Dropdown
            style={{"marginTop":"2%"}}
            fluid
            placeholder='Target field'
            search
            selection
            onChange={this.fieldSelectHandler}
            options={this.state.fieldsList}
        />
        


        return (
            <div>

                {(this.state.modelValidatedSuccessfully)? validatedSuccessfully : errorInValidation}

                <Segment style={{overflow: 'auto', maxHeight: '55vh', minWidth:'15vw', marginLeft:'-13px',marginRight:'-28px'}}>
                    <Message style={{textAlign:"center"}}>Code Related </Message>
                    <Form>
                        <Form.Field required>
                            <input
                                placeholder='Model Name'
                                style={{marginTop:'5px',marginBottom:'5px'}}
                                onChange={this.modalNameHandler}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <Form.Select
                                fluid options={this.problemTypeOptions}
                                placeholder='Select Problem Type'
                                style={{marginTop:'5px',marginBottom:'5px'}}
                                onChange={this.problemTypeHandler}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <Form.Select
                                fluid options={this.optimizerOptions}
                                placeholder='Optimizer'
                                style={{marginTop:'5px',marginBottom:'5px'}}
                                onChange={this.optimizerHandler}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <Form.Select
                                fluid options={this.metricOptions}
                                placeholder='Result Metrics'
                                style={{marginTop:'5px',marginBottom:'5px'}}
                                onChange={this.metricHandler}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <input
                                placeholder='No of Epochs'
                                type='number'
                                style={{marginTop:'5px',marginBottom:'5px'}}
                                onChange={this.epochCountHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                fluid
                                placeholder='Select a File'
                                search
                                selection
                                onChange={this.fileSelectHandler}
                                options={this.state.fileList}
                            />
                        </Form.Field>
                        <Form.Field required>
                            {fileFieldsList}
                        </Form.Field>
                        <Form.Field required>
                            <input
                                placeholder='Train:Test ratio'
                                type='number'
                                style={{marginTop:'5px',marginBottom:'5px'}}
                                onChange={this.trainTestRatioHandler}
                            />
                        </Form.Field>
                    </Form>
                </Segment>

            </div>
        );
    }
}

export default PropertiesBar;
