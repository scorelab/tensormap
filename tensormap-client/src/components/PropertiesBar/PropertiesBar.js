import React, {Component} from 'react';
import {Form, Message, Segment, Dropdown} from 'semantic-ui-react';
import * as strings from "../../constants/Strings";
import ModalComponent from '../shared/Modal';
import { getAllFiles } from '../../services/FileServices';
import { validateModel } from '../../services/ModelServices';

class PropertiesBar extends Component {

    componentDidMount() {
        
        // Get the list of datafiles from the backend for the file selector
        getAllFiles()
        .then(
            response => {
                const fileList = response.map((file,index)=>(
                    {"text": file.file_name +"."+ file.file_type, "value": file.file_id, "key":index}
                ))
                this.props.setFormState(prevState => ({
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
        const selectedFIleDetails = this.props.formState.totalDetails.filter(item => item.file_id === val.value);
        const newFieldsList = selectedFIleDetails[0].fields.map((item, index) => ({
            text: item,
            value: item,
            key: index,
          }));
        this.props.setFormState((prevState) => ({
            ...prevState,
            selectedFile: val.value,
            fieldsList: newFieldsList,
          }))
    };

    fieldSelectHandler = (event,val) => {
        this.props.setFormState((prevState) => ({
            ...prevState,
            targetField: val.value,
          }))
        
    }

    modalNameHandler = (event) => {
        this.props.setFormState((prevState) => ({
            ...prevState,
            modalName: event.target.value,
          }))
    }

    problemTypeHandler = (event,val) => {
        this.props.setFormState((prevState) => ({
            ...prevState,
            problemType: val.value,
          }))
        
    }

    optimizerHandler = (event,val) => {
        this.props.setFormState((prevState) => ({
            ...prevState,
            optimizer: val.value,
          }))
        
    }

    metricHandler = (event,val) => {
        this.props.setFormState((prevState) => ({
            ...prevState,
            metric: val.value,
          }))
        
    }

    epochCountHandler = (event)=> {
        this.props.setFormState((prevState) => ({
            ...prevState,
            epochCount: event.target.value,
          }))
        
    }

    trainTestRatioHandler = (event)=>{
        this.props.setFormState((prevState) => ({
            ...prevState,
            trainTestRatio: event.target.value,
          }))
        

    }
    
    modelValidateHandler = ()=> {
        let data = {
            "model": {
                "layer_types": [
                    "input",
                    "dense"
                ],
                "model_name":this.props.formState.modalName,
                "input": {
                    "input_dim":[this.props.formState.inputXParam, this.props.formState.inputYParam]
                }
            },
            "code": {
                "dataset": {
                    "file_id": this.props.formState.selectedFile,
                    "target_field": this.props.formState.targetField,
                    "training_split": this.props.formState.trainTestRatio
                },
                "dl_model": {
                    "model_name": this.props.formState.modalName,
                    "optimizer": this.props.formState.optimizer,
                    "metric": this.props.formState.metric,
                    "epochs": this.props.formState.epochCount
                },
                "problem_type_id": this.props.formState.problemType
            }
        }
        if (this.props.formState.flattenNodesList.length !== 0){
            data.model.layer_types.push("flatten");
            data.model["flatten"] = {
                "input_dim": [this.props.formState.flattenXParam, this.props.formState.flattenYParam]
            }
        }
        let denseNodeDataList = []
        for (const denseNode of this.props.formState.denseNodesList){
            denseNodeDataList.push({
                "units": this.props.formState.denseUnitParamsList[denseNode],
                "activation":this.props.formState.denseActParamsList[denseNode]})
        }

        if (denseNodeDataList.length !== 0){
            data.model["dense"] = denseNodeDataList
        }
        
        // Send the model data to the backend for validation and update the Modal state accordingly
        validateModel(data)
          .then(modelValidatedSuccessfully => {
            this.props.setFormState(prevState => ({...prevState,
                modelValidatedSuccessfully: modelValidatedSuccessfully,
              }));
            this.modelOpen();
          })
          .catch(error => {
            console.error(error);
            this.props.setFormState({ modelValidatedSuccessfully: false });
            this.modelOpen();
          });
    }

    /*
    * Model related functions controls the feedback of the request
    *
    * */
    modelClose = () => {
        this.props.setFormState({ ...this.props.formState, modalOpen: false });
        window.location.reload();
    }
   
    modelOpen = () => this.props.setFormState({ ...this.props.formState, modalOpen: true });


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
            modalOpen={this.props.formState.modalOpen}
            modelClose={this.modelClose}
            sucess={true}
            Modalmessage = {strings.MODEL_VALIDATION_MODAL_MESSAGE}/>
        );

        const errorInValidation = (
            <ModalComponent
            modalOpen={this.props.formState.modalOpen}
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
            options={this.props.formState.fieldsList}
        />
        


        return (
            <div>
                {(this.props.formState.modelValidatedSuccessfully)? validatedSuccessfully : errorInValidation}
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
                                options={this.props.formState.fileList}
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
