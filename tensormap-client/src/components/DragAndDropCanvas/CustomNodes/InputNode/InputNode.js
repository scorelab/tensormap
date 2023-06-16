import {Handle,Position,useStoreApi,useReactFlow} from 'reactflow'

import './InputNode.css'

function InputNode({data,id }) {
    const {setNodes} = useReactFlow();
    const store = useStoreApi();
    const onChange = (evt) => {
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
        <input id="dim-x" name="dim-x" onChange={onChange} className="nodrag" value={data.params["dim-x"]}/>
        <br/>
        <label htmlFor="text">Dim Y</label>
        <input id="dim-y" name="dim-y" onChange={onChange} className="nodrag" value={data.params["dim-y"]} />
        <Handle type="source" position={Position.Right} isConnectable={true} id={`${id}_out`}  />
      </div>
    );
  }

  export default InputNode;