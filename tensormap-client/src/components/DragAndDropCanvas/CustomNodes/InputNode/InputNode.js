import {Handle,Position,useStoreApi,useReactFlow} from 'reactflow'

import './InputNode.css'

const InputNode = ({data,id }) => {
    const {setNodes} = useReactFlow();
    const store = useStoreApi();
    const updateNodeState = (evt) => {
      const { nodeInternals } = store.getState();
      const { name, value } = evt.target;
      setNodes(
        Array.from(nodeInternals.values()).map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              params: {
                ...node.data.params,
                [name]: Number(value),
              },
            };
          }
          return node;
        })
      );
    };
    return (
      <div className="input-node">
        <div className='node-header'>Input Node</div>
        <label htmlFor="text">Dim X</label>
        <input id="dim-x" name="dim-x" type='number' min="0" onChange={updateNodeState} className="nodrag" value={data.params["dim-x"]} placeholder='Enter dim-x'/>
        <br/>
        <label htmlFor="text">Dim Y</label>
        <input id="dim-y" name="dim-y" type='number' min="0" onChange={updateNodeState} className="nodrag" value={data.params["dim-y"]} placeholder='Enter dim-y'/>
        <Handle type="source" position={Position.Right} isConnectable={true} id={`${id}_out`}  />
      </div>
    );
  }

  export default InputNode;