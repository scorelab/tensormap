import React, {Component} from 'react';
import io from "socket.io-client";
import * as urls from '../../constants/Urls';
import * as strings from "../../constants/Strings";
import axios from "../../shared/Axios";
import {Grid, Menu, Button, Form, Dropdown} from 'semantic-ui-react';

class ResultPanel extends Component {

    socket = io(urls.WS_DL_RESULTS);


    state = {
        modelList: null,
        selectedModel:null,
        disableDownloadButton: true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.socket.on(strings.DL_RESULT_LISTENER, (resp)=>{
            // console.log(resp)
        })
    }

    componentDidMount() {
        axios.get(urls.BACKEND_GET_ALL_MODELS)
            .then(resp => {
                if (resp.data.success === true){
                    this.setState({
                        ...this.state,
                        modelList: resp.data.data.map((file, index)=> (
                            {"text":file + strings.MODEL_EXTENSION, "value":file, "key":index}
                        ))
                    })
                }
            })
    }

    modelSelectHandler = (event,val)=> {
        this.setState({...this.state, selectedModel: val.value, disableDownloadButton: false });
    }

    modelDownloadHandler = ()=> {
        if (this.state.selectedModel != null){
            const data = {"model_name": this.state.selectedModel};

            axios.post(urls.BACKEND_DOWNLOAD_CODE,data).then(resp =>{
                let link = document.createElement("a");
                link.href = window.URL.createObjectURL(
                    new Blob([resp.data], { type: "application/octet-stream" })
                );
                link.download = this.state.selectedModel + strings.MODEL_EXTENSION;

                document.body.appendChild(link);

                link.click();

                setTimeout(function () {
                    window.URL.revokeObjectURL(link);
                }, 200);
                
        });
        }
    }


    render() {
        return (
            <div>
                <Grid.Row>
                    <Grid.Column>
                        <Menu>
                            <Menu.Item>Model Execution</Menu.Item>

                            <Menu.Item>
                                <Form>
                                    <Form.Field>
                                        <Dropdown
                                            fluid
                                            placeholder='Select a File'
                                            search
                                            selection
                                            onChange={this.modelSelectHandler}
                                            options={this.state.modelList}
                                        />
                                    </Form.Field>
                                </Form>
                            </Menu.Item>

                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button
                                        color='blue'
                                        onClick={this.modelDownloadHandler}
                                        disabled ={this.state.disableDownloadButton}
                                    >
                                        Download Code
                                    </Button>
                                </Menu.Item>

                                <Menu.Item>
                                    <Button color='green'>Model Run</Button>
                                </Menu.Item>

                                <Menu.Item>
                                    <Button color='brown'>Clear Panel</Button>

                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>


            </div>
        );
    }
}

export default ResultPanel;