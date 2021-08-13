import React, {Component} from 'react';
import {Form, Message, Segment, Dropdown, Button, Modal, Header, Icon} from 'semantic-ui-react';
import axios from "../../shared/Axios";
import * as urls from '../../constants/Urls';
import * as strings from "../../constants/Strings";
import {subject} from "../../services";

class PropertiesBar extends Component {

    state = {
        fileList:null,
        totalDetails:null,
        showFieldsList: false,
        fieldsList: null,
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

        this.subscription = subject.subscribe(res => {
            this.setState({...this.state,
                inputNodesList:res.inputNodes,
                flattenNodesList:res.flattenNodes,
                denseNodesList:res.denseNodes})
        });

        axios.get(urls.BACKEND_GET_ALL_FILES)
            .then(resp =>{
                if (resp.data.success === true){
                    this.setState(
                        {...this.state,
                            fileList: resp.data.data.map((file,index)=>(
                                {"text": file.file_name +"."+ file.file_type, "value": file.file_id, "key":index}
                            )),
                            totalDetails: resp.data.data
                        }
                    );
                }
            })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    fileSelectHandler = (event,val) => {

        const promise = new Promise(resolve => {
            this.setState({...this.state, selectedFile: val.value, showFieldsList:true }, () => resolve());
        });

        promise.then(()=>{
            const selectedFIleDetails = this.state.totalDetails.filter(item => item.file_id === this.state.selectedFile);

            this.setState({...this.state, fieldsList: selectedFIleDetails[0].fields.map(
                    (item,index)=>({"text":item, "value":item, "key":index})) });
        });
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

    inputDimXHandler = (event)=>{
        this.setState({...this.state, inputXParam:event.target.value}, ()=>this.enableSubmitButton());
    }

    inputDimYHandler = (event)=>{
        this.setState({...this.state, inputYParam:event.target.value}, ()=>this.enableSubmitButton());
    }

    flattenDimXHandler = (event)=>{
        this.setState({...this.state, flattenXParam:event.target.value}, ()=>this.enableSubmitButton());
    }

    flattenDimYHandler = (event)=>{
        this.setState({...this.state, flattenYParam:event.target.value}, ()=>this.enableSubmitButton());
    }

    denseNodeUnitHandler = (event, nodeID)=>{
        let denseUnitList = this.state.denseUnitParamsList;
        denseUnitList[nodeID] = event.target.value;
        this.setState({...this.state, denseUnitParamsList:denseUnitList}, ()=>this.enableSubmitButton());
    }

    denseNodeActHandler = (event, {name, value})=> {
        let denseActList = this.state.denseActParamsList;
        denseActList[name] = value;
        this.setState({...this.state, denseActParamsList:denseActList}, ()=>this.enableSubmitButton());
    }

    enableSubmitButton = ()=>{
        if (this.state.selectedFile !== null && this.state.targetField !==null && this.state.modalName !== null &&
            this.state.problemType !== null && this.state.optimizer !== null && this.state.metric !== null &&
            this.state.epochCount !== null && this.state.trainTestRatio != null && this.state.inputXParam !== null &&
            this.state.inputYParam !==null && this.state.denseNodesList.length !== 0){
            if (this.state.denseUnitParamsList.length === this.state.denseActParamsList.length ){
                console.log(this.state)
                if ((this.state.flattenXParam === null && this.state.flattenYParam === null) ||
                    (this.state.flattenXParam !== null && this.state.flattenYParam !== null)){
                    this.setState({...this.state, disableButton:false});
                }
            }
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

        axios.post(urls.BACKEND_VALIDATE_MODEL,data)
            .then(resp=>{
                if(resp.data.success === true){
                    this.setState({...this.state, modelValidatedSuccessfully:true});
                    this.modelOpen();
                }
            }).catch(err => {
            console.log(err);
            this.setState({...this.state, modelValidatedSuccessfully:false});
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
            <Modal open={this.state.modalOpen} onClose={this.modelClose} basic size='small' >

                <Header icon='check circle' content={strings.MODEL_VALIDATION_MODAL_MESSAGE} />


                <Modal.Actions>
                    <Button color='green' onClick={this.modelClose} inverted>
                        <Icon name='checkmark' /> {strings.PROCESS_SUCCESS_MODEL_BUTTON}
                    </Button>
                </Modal.Actions>

            </Modal>
        );

        const errorInValidation = (
            <Modal open={this.state.modalOpen} onClose={this.modelClose} basic size='small' >

                <Header icon='exclamation' content={strings.PROCESS_FAIL_MODEL_MESSAGE} />

                <Modal.Actions>
                    <Button color='red' onClick={this.modelClose} inverted>
                        <Icon name='checkmark' /> {strings.PROCESS_FAIL_MODEL_BUTTON}
                    </Button>
                </Modal.Actions>
            </Modal>
        );

        let inputNodes = this.state.inputNodesList.map((nodeName, index)=> (
            <Segment key={"input_node_"+index} style={{marginTop:'5px',marginBottom:'5px'}}>
                <Form>
                    <Form.Field>
                        <Form.Input
                            fluid
                            size='small'
                            placeholder={nodeName}
                            readOnly
                            style={{marginTop:"2%", marginLeft:"-5px"}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            placeholder='Dim X'
                            type='number'
                            style={{marginTop:'5px',marginBottom:'5px'}}
                            onChange={(e) =>this.inputDimXHandler(e, nodeName)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            placeholder='Dim Y'
                            type='number'
                            style={{marginTop:'5px',marginBottom:'5px'}}
                            onChange={(e) =>this.inputDimYHandler(e, nodeName)}
                        />
                    </Form.Field>
                </Form>
            </Segment>
        ));

        let flattenNodes = this.state.flattenNodesList.map((nodeName, index)=> (
            <Segment key={"flatten_node_"+index} style={{marginTop:'5px',marginBottom:'5px'}}>
                <Form>
                    <Form.Field>
                        <Form.Input
                            fluid
                            size='small'
                            placeholder={nodeName}
                            readOnly
                            style={{marginTop:"2%", marginLeft:"-5px"}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            placeholder='Dim X'
                            type='number'
                            style={{marginTop:'5px',marginBottom:'5px'}}
                            onChange={(e) =>this.flattenDimXHandler(e, nodeName)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            placeholder='Dim Y'
                            type='number'
                            style={{marginTop:'5px',marginBottom:'5px'}}
                            onChange={(e) =>this.flattenDimYHandler(e, nodeName)}
                        />
                    </Form.Field>
                </Form>
            </Segment>
        ));

        let denseNodes = this.state.denseNodesList.map((nodeName, index)=>(
            <Segment key={"flatten_node_"+index} style={{marginTop:'5px',marginBottom:'5px'}}>
                <Form>
                    <Form.Field>
                        <Form.Input
                            fluid
                            size='small'
                            placeholder={nodeName}
                            readOnly
                            style={{marginTop:"2%", marginLeft:"-5px"}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            placeholder='No of Units'
                            type='number'
                            style={{marginTop:'5px',marginBottom:'5px'}}
                            onChange={(e) =>this.denseNodeUnitHandler(e, nodeName)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            fluid options={this.activationOptions}
                            placeholder='Activation function'
                            name={nodeName}
                            style={{marginTop:'5px',marginBottom:'5px'}}
                            onChange={this.denseNodeActHandler}
                        />
                    </Form.Field>
                </Form>
            </Segment>
        ));


        let fileFieldsList = <Form.Input
            fluid
            size='large'
            placeholder={strings.PROCESS_SELECT_FILE_FIELD_BEFORE}
            readOnly
            style={{"marginTop":"2%"}}
        />

        if (this.state.showFieldsList){
            fileFieldsList = <Dropdown
                style={{"marginTop":"2%"}}
                fluid
                placeholder='Target field'
                search
                selection
                onChange={this.fieldSelectHandler}
                options={this.state.fieldsList}
            />
        }


        return (
            <div>

                {(this.state.modelValidatedSuccessfully)? validatedSuccessfully : errorInValidation}

                <Segment style={{overflow: 'auto', maxHeight: '60vh', minWidth:'15vw', marginLeft:'-13px',marginRight:'-28px'}}>
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

                    <Message style={{textAlign:"center"}}>Model Related </Message>

                    {inputNodes}

                    {flattenNodes}

                    {denseNodes}

                    <Form>
                        <Form.Field>
                            <Button
                                color='green'
                                size='medium'
                                style={{"marginTop":"2%"}}
                                onClick={this.modelValidateHandler}
                                disabled ={this.state.disableButton}
                            >
                                Validate Model
                            </Button>
                        </Form.Field>
                    </Form>

                </Segment>

            </div>
        );
    }
}

export default PropertiesBar;
