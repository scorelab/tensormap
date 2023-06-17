import {Handle,Position,useStoreApi,useReactFlow} from 'reactflow'

import './FlattenNode.css'

function FlattenNode({data,id }) {
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
      <div className="flatten-node">
        <Handle type="source" position={Position.Right} isConnectable={true} id={`${id}_out`}  />
        <div className='node-header'>Flatten Node</div>
        <label htmlFor="text">Dim X</label>
        <input id="dim-x" name="dim-x" type='number' min="0" onChange={onChange} className="nodrag" value={data.params["dim-x"]}/>
        <br/>
        <label htmlFor="text">Dim Y</label>
        <input id="dim-y" name="dim-y" type='number' min="0" onChange={onChange} className="nodrag" value={data.params["dim-y"]} />
        <Handle type="target" position={Position.Left} isConnectable={true} id={`${id}_in`} />
      </div>
    );
  }

  export default FlattenNode;