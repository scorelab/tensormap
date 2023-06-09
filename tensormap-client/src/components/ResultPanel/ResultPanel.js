import React, {Component} from 'react';
import io from "socket.io-client";
import * as urls from '../../constants/Urls';
import * as strings from "../../constants/Strings";
import {Grid, Menu, Button, Form, Dropdown, Segment, Dimmer, Loader} from 'semantic-ui-react';
import Result from "./Result/Result";
import { getAllModels,download_code,runModel } from '../../services/ModelServices';

class ResultPanel extends Component {

    socket = io(urls.WS_DL_RESULTS);


    state = {
        modelList: null,
        selectedModel:null,
        disableDownloadButton: true,
        disableRunButton: true,
        disableClearButton: true,
        resultValues: null,
        resultFinished:null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.socket.on(strings.DL_RESULT_LISTENER, (resp)=>{
        //
        //
        //     if (!Array.isArray(prevState.resultValues) && resp.includes("Starting")){
        //         if (!Array.isArray(this.state.resultValues)){
        //             this.setState({...this.state, resultValues:[]})
        //             console.log("array created")
        //         }
        //
        //     }
        //
        //     if (Array.isArray(this.state.resultValues) && resp.includes("Finish")) {
        //         if (this.state.resultFinished === null){
        //
        //             this.setState({...this.state, resultFinished:true});
        //             console.log("Finishing");
        //         }
        //     }
        //
        //
        //     if (Array.isArray(this.state.resultValues) && this.state.resultFinished === null){
        //
        //
        //             if (this.state.resultValues[this.state.resultValues.length -1] !== resp){
        //                 this.setState({...this.state, resultValues:this.state.resultValues.push(resp)});
        //             }
        //
        //
        //
        //     }
        //
        //
        // })
    }

    componentDidMount() {

        this.socket.on(strings.DL_RESULT_LISTENER, (resp)=>{

            if (resp.includes("Starting")){

                this.setState({...this.state, resultValues:[]});

            } else if(resp.includes("Finish")){

                this.setState({...this.state, resultFinished:true});

            }else if (Array.isArray(this.state.resultValues) && this.state.resultFinished === null){

                let a = [...this.state.resultValues]
                a.push(resp)

                this.setState({...this.state, resultValues: a });

            }

            }
        )

        // Get all the created models from the backend for the model selector.
        getAllModels()
        .then(
            response => {
                const models = response.map((file, index) => ({
                    "text": file + strings.MODEL_EXTENSION,
                    "value": file,
                    "key": index
                  }));
                  this.setState(prevState => ({
                    ...prevState,
                    resultFinished: null,
                    modelList: models,
                  }));
            }
        )
    }

    modelSelectHandler = (event,val)=> {
        this.setState({...this.state, selectedModel: val.value, disableDownloadButton: false,
            disableRunButton:false });
    }

    modelDownloadHandler = ()=> {
        if (this.state.selectedModel != null){
            const model_name = this.state.selectedModel;

            // Get the Python script for the particular project
            download_code(model_name)
            .catch(error => {
                console.error(error);
      });
        }
    }

    RunButtonHandler = () => {
        this.setState({...this.state, resultValues: ""}, ()=> {
            if (this.state.selectedModel != null){
                const { selectedModel } = this.state;

                // Run the selected model in the backend
                runModel(selectedModel)
                .then(message => {
                console.log(message);
                this.setState({ disableRunButton: false, disableClearButton: false });
                })
                .catch(error => {
                console.error(error);
                });

                this.setState({...this.state, disableRunButton:true});
            }
        });
    };


    clearButtonHandler = () => {
        this.setState({...this.state, resultValues:null, disableClearButton:true})
    }


    render() {

        let results = null;

        if(this.state.resultValues === ""){
            results = (
                <Segment style={{marginLeft: "10px", marginRight: "10px", height:"400px", marginTop:"10px"}} >
                    <Dimmer active inverted>
                        <Loader size='large' content='Model is running please wait ...' />
                    </Dimmer>
                </Segment>
            );
        }

        if (Array.isArray(this.state.resultValues) ){

            results = this.state.resultValues.map((item, index)=> (
                <Result result={item} key={index} />
            ));
        }

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
                                    <Button
                                        color='green'
                                        onClick={this.RunButtonHandler}
                                        disabled={this.state.disableRunButton}
                                    >
                                        Model Run
                                    </Button>
                                </Menu.Item>

                                <Menu.Item>
                                    <Button
                                        color='brown'
                                        onClick={this.clearButtonHandler}
                                        disabled={this.state.disableClearButton}
                                    >
                                        Clear Panel
                                    </Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {results}
                    </Grid.Column>
                </Grid.Row>


            </div>
        );
    }
}

export default ResultPanel;
