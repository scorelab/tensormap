import React, { useState, useRef, useCallback,Fragment } from 'react';
import { Grid,Form,Button } from 'semantic-ui-react';
import * as strings from "../../constants/Strings";
import ModalComponent from '../shared/Modal';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import InputNode from './CustomNodes/InputNode/InputNode.js';
import DenseNode from './CustomNodes/DenseNode/DenseNode.js';
import FlattenNode from './CustomNodes/FlattenNode/FlattenNode.js';

import Sidebar from './Sidebar.js';
import PropertiesBar from '../PropertiesBar/PropertiesBar.js';
import './Canvas.css';
import { enableValidateButton,generateModelJSON,InitialFormState } from './Helpers.js';
import { validateModel } from '../../services/ModelServices';
import { models as allModels } from '../../shared/atoms';
import {useRecoilState} from 'recoil'

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { custominput: InputNode,customdense:DenseNode,customflatten:FlattenNode }
const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [modelList,setModelList] = useRecoilState(allModels)
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [formState,setFormState] = useState(InitialFormState)
  const defaultViewport = { x: 10, y: 15, zoom: 0.5 }
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const modelData = (reactFlowInstance===null?{}:reactFlowInstance.toObject())
  /*
    * Model related functions controls the feedback of the request
    *
    * */
  const closeModel = () => {
    setFormState(prevState => ({...prevState,
      modalOpen: false,
    }));
  }
  const openModel = () => {
    setFormState(prevState => ({...prevState,
      modalOpen: true,
    }))};

  const validatedSuccessfully = (
    <ModalComponent
    modalOpen={formState.modalOpen}
    modelClose={closeModel}
    sucess={true}
    Modalmessage = {strings.MODEL_VALIDATION_MODAL_MESSAGE}/>
);

const errorInValidation = (
    <ModalComponent
    modalOpen={formState.modalOpen}
    modelClose={closeModel}
    sucess={false}
    Modalmessage = {strings.PROCESS_FAIL_MODEL_MESSAGE}
    modalText={formState.modalContent}
    />
);

  const modelValidateHandler = ()=>{
    let data = {
      "code": {
          "dataset": {
          "file_id": formState.selectedFile,
          "target_field": formState.targetField,
          "training_split": formState.trainTestRatio
        },
      "dl_model": {
          "model_name": formState.modalName,
          "optimizer": formState.optimizer,
          "metric": formState.metric,
          "epochs": formState.epochCount
      },
        "problem_type_id": formState.problemType
    },
    "model" : {...generateModelJSON(reactFlowInstance.toObject()),"model_name": formState.modalName,}
    }

     // Send the model data to the backend for validation and update the Modal state accordingly
     validateModel(data)
     .then(validationResp => {
      if (validationResp.success){
        setModelList(prevList => (
        [...prevList,{
                  "text":  formState.modalName + strings.MODEL_EXTENSION,
                  "value": formState.modalName,
                  "key": prevList.length+1
        }]
        ))
      }
       setFormState(prevState => ({...prevState,
           modelValidatedSuccessfully: validationResp.success,
           modalContent:validationResp.message
         }));
       openModel();
     })
     .catch(error => {
       console.error(error);
       setFormState({ modelValidatedSuccessfully: false,modalContent:error.message });
       openModel();
     });
  }

  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      let newNode
      if (type==='custominput'){
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`,params:{"dim-x":'',"dim-y":''} },
        };
      }else if(type==='customdense'){
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`,params:{"units":'', "activation":'default'} },
        };
      }else if (type==='customflatten'){
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`,params:{"dim-x":'',"dim-y":''}},
        }}
        else{
          newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node`},
          }
        }
      setNodes((nds) => nds.concat(newNode));
      
    },
    [reactFlowInstance,setNodes]
    );
    
    return (
      <Fragment>
        {(formState.modelValidatedSuccessfully)? validatedSuccessfully : errorInValidation}
        <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={13}>
                <div className="dndflow">
                  <ReactFlowProvider>
                  <Sidebar />
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        defaultViewport={defaultViewport}
                      >
                        <Controls />
                        <Background id="1" gap={10} color="#454545" style={{ backgroundColor: "#3c3c3c" }} variant={BackgroundVariant.Lines}/>
                      </ReactFlow>
                    </div>

                  </ReactFlowProvider>
               </div>
                </Grid.Column>
                <Grid.Column width={3}>
                    <PropertiesBar formState = {formState} setFormState = {setFormState} />
                    <Form>
                        <Form.Field>
                            <Button
                                color='green'
                                size='medium'
                                style={{"marginTop":"10%", "marginLeft":"15%"}}
                                onClick={modelValidateHandler}
                                disabled ={enableValidateButton(formState,modelData)}
                            >
                                Validate Model
                            </Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </Fragment>
  );
};

export default Canvas;
