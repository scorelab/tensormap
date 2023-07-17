import React, {useState,useEffect} from 'react';
import io from "socket.io-client";
import * as urls from '../../constants/Urls';
import * as strings from "../../constants/Strings";
import {Grid, Menu, Button, Form, Dropdown, Segment, Dimmer, Loader} from 'semantic-ui-react';
import Result from "./Result/Result";
import {download_code,runModel } from '../../services/ModelServices';
import {useRecoilState} from 'recoil'
import {models as modelListAtom} from '../../shared/atoms'
import { getAllModels } from '../../services/ModelServices';

const ResultPanel = () => {
    const [modelList,setModelList] = useRecoilState(modelListAtom)

    const [selectedModel,setSelectedModel] = useState(null);
    const [disableDownloadButton,setDisableDownloadButton] = useState(true);
    const [disableRunButton,setDisableRunButton] = useState(true);
    const [disableClearButton, setDisableClearButton] = useState(true);
    const [resultValues, setResultValues] = useState([]);
    const [resultFinished, setResultFinished] = useState(null);
    
    const socket = io(urls.WS_DL_RESULTS);
    
    useEffect(() => {
      socket.on(strings.DL_RESULT_LISTENER, (resp) => {
        if (resp.includes('Starting')) {
          setResultValues([]);
        } else if (resp.includes('Finish')) {
          setResultFinished(true);
        } else if (Array.isArray(resultValues) && resultFinished === null) {
          setResultValues((prevState) => [...prevState, resp]);
        }
      });

        getAllModels()
        .then(
            response => {
                const models = response.map((file, index) => ({
                    "text": file + strings.MODEL_EXTENSION,
                    "value": file,
                    "key": index
                  }));
                setModelList(models)
            }
        )
      }, []);
      
      const modelSelectHandler = (event, { value }) => {
        setSelectedModel(value);
        setDisableDownloadButton(false);
        setDisableRunButton(false);
      };

      const modelDownloadHandler = () => {
        if (selectedModel != null) {
          const model_name = selectedModel;
          download_code(model_name).catch((error) => {
            console.error(error);
          });
        }
      };

      const runButtonHandler = () => {
        setResultValues('');
        if (selectedModel != null) {
          runModel(selectedModel)
            .then((message) => {
              console.log(message);
              setDisableRunButton(false);
              setDisableClearButton(false);
            })
            .catch((error) => {
              console.error(error);
            });
    
          setDisableRunButton(true);
        }
      };

      const clearButtonHandler = () => {
        setResultValues(null);
        setDisableClearButton(true);
      };

      
      let results = null;

      if(resultValues === ""){
          results = (
              <Segment style={{marginLeft: "10px", marginRight: "10px", height:"400px", marginTop:"10px"}} >
                  <Dimmer active inverted>
                      <Loader size='large' content='Model is running please wait ...' />
                  </Dimmer>
              </Segment>
          );
      }

      if (Array.isArray(resultValues) ){
          results = resultValues.map((item, index) => <Result result={item} key={index} />);
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
                                        onChange={modelSelectHandler}
                                        options={modelList}
                                    />
                                </Form.Field>
                            </Form>
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Button
                                    color='blue'
                                    onClick={modelDownloadHandler}
                                    disabled ={disableDownloadButton}
                                >
                                    Download Code
                                </Button>
                            </Menu.Item>

                            <Menu.Item>
                                <Button
                                    color='green'
                                    onClick={runButtonHandler}
                                    disabled={disableRunButton}
                                >
                                    Model Run
                                </Button>
                            </Menu.Item>

                            <Menu.Item>
                                <Button
                                    color='brown'
                                    onClick={clearButtonHandler}
                                    disabled={disableClearButton}
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

export default ResultPanel