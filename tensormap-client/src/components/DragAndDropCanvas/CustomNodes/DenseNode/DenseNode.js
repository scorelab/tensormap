import {Handle,Position,useStoreApi,useReactFlow} from 'reactflow'

import './DenseNode.css'

const activations = [
  {value:'default',label:'Select activation'},
  {value:'relu',label:'ReLU'},
  {value:'linear',label:'Linear'}
]


const DenseNode = ({data,id }) => {
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
                [name]: name === 'units' ? Number(value) : value,
              },
            };
          }
          return node;
        })
      );
    };
    return (
      <div className="dense-node">
        <Handle type="target" position={Position.Left} isConnectable={true} id={`${id}_in`}  />
        <div className='node-header'>Dense Node</div>
        <label htmlFor="no. units">No. Units</label>
        <input id="units" name="units" type='number' min="0" onChange={updateNodeState} className="nodrag" value={data.params["units"]} placeholder='Enter the no. of units'/>
        <label htmlFor="activation">Activation</label>
      <select id = "activation" className="activation" name="activation" onChange={updateNodeState} value={data.params["activation"]}>
        {activations.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

        <Handle type="source" position={Position.Right} isConnectable={true} id={`${id}_out`}  />
      </div>
    );
  }

  export default DenseNode;