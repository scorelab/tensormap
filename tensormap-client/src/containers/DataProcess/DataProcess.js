import React, {Component} from 'react';
import * as strings from "../../constants/Strings";
import {Segment, Dropdown, Form, Button, Header, Icon, Modal} from "semantic-ui-react";
import axios from "../../shared/Axios";
import * as urls from '../../constants/Urls';

class DataProcess extends Component {

    state = {
        fileList: null,
        selectedFile: null,
        totalDetails: null,
        showFieldsList: false,
        fieldsList: null,
        targetField: null,
        disableButton: true,
        targetAddedSuccessfully:false,
        modalOpen:false
    }

    componentDidMount() {

        /*
        * In this react life cycle hook, file data is fetch from backend and added to state
        *
        * */
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

    fileSelectHandler = (event,val) => {

        const promise = new Promise(resolve => {
            this.setState({...this.state, selectedFile: val.value, showFieldsList:true }, () => resolve());
        });

       promise.then(()=>{
           const selectedFIleDetails = this.state.totalDetails.filter(item => item.file_id === this.state.selectedFile);

           this.setState({...this.state, fieldsList: selectedFIleDetails[0].fields.map(
               (item,index)=>({"text":item, "value":item, "key":index})) });
       })
    };

    fieldSelectHandler = (event,val) => {
        this.setState({...this.state, targetField:val.value}, ()=>this.enableSubmitButton());
    }

    /*
    * Submission button enable only after the all the necessary fields added.
    *
    * */
    enableSubmitButton = () => {
        if (this.state.selectedFile !== null && this.state.targetField !== null){
            this.setState({...this.state, disableButton:false})
        }
    }

    setTargetFieldHandler = () => {
        const data = {"file_id": this.state.selectedFile, "target": this.state.targetField}
        axios.post(urls.BACKEND_ADD_TARGET_FIELD,data)
            .then(resp=>{
                if(resp.data.success === true){
                    this.setState({...this.state, targetAddedSuccessfully:true});
                    this.modelOpen();
                }
            }).catch(err => {
            console.log(err);
            this.setState({...this.state, targetAddedSuccessfully:false});
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

    render() {

        /*
        * addedSuccessfully and errorInAddition are modals that will pop up after successful addition or failure.
        *
        * */
        const addedSuccessfully = (
            <Modal open={this.state.modalOpen} onClose={this.modelClose} basic size='small' >

                <Header icon='check circle' content={strings.PROCESS_SUCCESS_MODEL_MESSAGE} />


                <Modal.Actions>
                    <Button color='green' onClick={this.modelClose} inverted>
                        <Icon name='checkmark' /> {strings.PROCESS_SUCCESS_MODEL_BUTTON}
                    </Button>
                </Modal.Actions>

            </Modal>
        );

        const errorInAddition = (
            <Modal open={this.state.modalOpen} onClose={this.modelClose} basic size='small' >

                <Header icon='exclamation' content={strings.PROCESS_FAIL_MODEL_MESSAGE} />

                <Modal.Actions>
                    <Button color='red' onClick={this.modelClose} inverted>
                        <Icon name='checkmark' /> {strings.PROCESS_FAIL_MODEL_BUTTON}
                    </Button>
                </Modal.Actions>
            </Modal>
        );

        /*
        * Until a file is selected field list of a file is not showing
        *
        * */
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
                placeholder='Select a Target field'
                search
                selection
                onChange={this.fieldSelectHandler}
                options={this.state.fieldsList}
            />
        }

        return (
            <div>

                {(this.state.targetAddedSuccessfully)? addedSuccessfully : errorInAddition}

                <Segment
                    textAlign='center'
                    size='huge'
                >{strings.PROCESS_SELECT_FILE_TITLE}</Segment>
                <Dropdown
                    fluid
                    placeholder='Files'
                    search
                    selection
                    onChange={this.fileSelectHandler}
                    options={this.state.fileList}
                />
                {fileFieldsList}
                <Button color='green'
                        size='large'
                        style={{"marginTop":"2%"}}
                        onClick={this.setTargetFieldHandler}
                        disabled ={this.state.disableButton}
                >
                    {strings.PROCESS_TARGET_FIELD_SUBMIT_BUTTON}
                </Button>
            </div>
        );
    }
}

export default DataProcess;
