import React, { useState, useRef, useCallback,useMemo } from 'react';
import { Grid,Form,Button } from 'semantic-ui-react';
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


let id = 0;
const getId = () => `dndnode_${id++}`;



const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const nodeTypes = useMemo(() => ({ custominput: InputNode,customdense:DenseNode,customflatten:FlattenNode }), [])
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const modelValidateHandler = ()=>{
    console.log(reactFlowInstance.toObject())
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
          data: { label: `${type} node`,params:{"dim-x":0,"dim-y":0} },
        };
      }else if(type==='customdense'){
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`,params:{"units":0, "activation":'default'} },
        };
      }else if (type==='customflatten'){
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node`,params:{"dim-x":0,"dim-y":0}},
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
      <div>
        <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={13}>
                <div className="dndflow" style={{ width: '60vw', height: '62vh' }}>
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
                        fitView
                      >
                        <Controls />
                        <Background id="1" gap={10} color="#454545" style={{ backgroundColor: "#3c3c3c" }} variant={BackgroundVariant.Lines}/>
                      </ReactFlow>
                    </div>

                  </ReactFlowProvider>
               </div>
                </Grid.Column>
                <Grid.Column width={3}>
                    <PropertiesBar />
                    <Form>
                        <Form.Field>
                            <Button
                                color='green'
                                size='medium'
                                style={{"marginTop":"10%", "marginLeft":"15%"}}
                                onClick={modelValidateHandler}
                                // disabled ={properties.disableButton}
                            >
                                Validate Model
                            </Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
  );
};

export default Canvas;
