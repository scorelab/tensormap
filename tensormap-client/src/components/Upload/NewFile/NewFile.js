import React, {Component} from 'react';
import {Form, Button, Icon, Modal, Header} from 'semantic-ui-react';
import * as strings from "../../../constants/Strings";
import axios from "axios";
import * as urls from '../../../constants/Urls';

class NewFile extends Component {

    state = {
        fileType:'',
        fileName:'',
        file: null,
        uploadButtonDisabledStatus: true,
        fileAddedSuccessfully:false,
        modalOpen:false
    }
//default status file
    componentDidMount() {
        this.setState({fileType:'', fileName:'', file: null, uploadButtonDisabledStatus: true});
    };

     //select fileTypes dataset
    fileTypes = [
        { key: 'csv', text: 'CSV', value: 'csv' },
        { key: 'zip', text: 'ZIP', value: 'zip' },
        { key: 'rar', text: 'RAR', value: 'rar' }
    ]

    dataTypeHandler = (event,val) => {
        this.setState({...this.state, fileType: val.value},
            ()=> {
                this.submitButtonEnableHandler();
            });
    };

    fileChange = e => {
        this.setState({...this.state, file: e.target.files[0], fileName: e.target.files[0].name},
            ()=> {
                this.submitButtonEnableHandler();
            });
    };


    /*
    * Submission button enable only after the all the necessary fields added.
    *
    * */
    submitButtonEnableHandler = () => {
        if (this.state.fileType !== '' && this.state.fileName !== '' && this.state.file !== null){
            this.setState({...this.state, uploadButtonDisabledStatus:false})
        }
    };

    /*
    * handle file uploads and send a request to backend
    *
    * */
    fileUploadHandler = () => {

        const file = new FormData();
        file.append("data", this.state.file)
        axios({
            method: "post",
            url: urls.base_URL + urls.BACKEND_FILE_UPLOAD,
            data: file,
            headers: { "Content-Type": "multipart/form-data" },
        }).then( resp => {
            if(resp.data.success === true){
                this.setState({...this.state, fileAddedSuccessfully:true});
                this.modelOpen();
            }
        }).catch(err => {
            console.log(err);
            this.setState({...this.state, fileAddedSuccessfully:false});
        })
    };


    /*
    * Model related functions controls the feedback of the request
    *
    * */
    modelClose = () => {
        this.setState({ ...this.state, modalOpen: false });
        window.location.reload();
    }

    modelOpen = () => this.setState({ modalOpen: true });

    render() {

        /*
        * addedSuccessfully and errorInAddition are modals that will pop up after successful addition or failure.
        *
        * */

        const addedSuccessfully = (
            <Modal open={this.state.modalOpen} onClose={this.modelClose} basic size='small' >

                <Header icon='check circle' content={strings.UPLOAD_SUCCESS_MODEL_MESSAGE} />


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

        return (
            <div>

                {(this.state.fileAddedSuccessfully)? addedSuccessfully : errorInAddition}

                <Form size='big' onSubmit={this.fileUploadHandler}>
                    <Form.Field required>
                        <label  >{strings.UPLOAD_SELECT_FILE_TYPE}</label>
                        <Form.Select
                            fluid
                            options={this.fileTypes}
                            onChange={this.dataTypeHandler}
                            placeholder={strings.UPLOAD_SELECT_FILE_TYPE}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label>{strings.UPLOAD_HIDDEN_BUTTON_CONTEXT}  </label>
                        <Button as="label" htmlFor="file" type="button" animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>{strings.UPLOAD_HIDDEN_BUTTON_CONTEXT}</Button.Content>
                        </Button>
                        {/* button input dataset types  */}
                         <input
                            type="file"
                            name="files[]"
                            multiple="true"
                            id="file"
                            accept={".csv"| ".zip" | ".rar"}
                            hidden
                            onChange={this.fileChange}

                        />

                        <Form.Input
                            fluid
                            size='mini'
                            label={strings.UPLOAD_NEW_FILE_INPUT_LABEL}
                            placeholder={strings.UPLOAD_NEW_FILE_INPUT_PLACEHOLDER}
                            readOnly
                            value={this.state.fileName}
                        />
                    </Form.Field>
                    <Form.Field >
                        <Button color='green' size='large'
                                type="submit" disabled ={this.state.uploadButtonDisabledStatus}>
                            {strings.UPLOAD_BUTTON_CONTEXT}
                        </Button>
                </Form.Field>
                </Form>
            </div>
        );
    }
}

export default NewFile;
