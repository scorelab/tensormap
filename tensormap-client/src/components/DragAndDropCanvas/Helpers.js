export const InitialFormState = {
    fileList:null,
    totalDetails:null,
    fieldsList: [{"text":"Select a file first", "value":null, "key":0,disabled:true}],
    selectedFile:null,
    targetField:null,
    modalName:"",
    problemType:null,
    optimizer:null,
    metric:null,
    epochCount:0,
    trainTestRatio:0,
    disableButton:true,
    modalOpen:false,
    modelValidatedSuccessfully:false
}

// Checks whether all the node inputs, form inputs are filled and the graph is connected before enabling validate button 
export const enableValidateButton = (formState,modelData)=>{
    if  (formState.selectedFile !== null && formState.targetField !==null && formState.modalName !== "" && formState.problemType !== null && formState.optimizer !== null && formState.metric !== null && formState.epochCount !== 0 && formState.trainTestRatio !== 0){
        if (modelData.edges.length !==0 || modelData.nodes.length !==0  ){
            for (let i = 0; i < modelData.nodes.length; i++){
                if (modelData.nodes[i].type==="customdense"){   
                    if (modelData.nodes[i].data.params.activation === "default" || modelData.nodes[i].data.params.units===0 || modelData.nodes[i].data.params.units===''){
                        return true
                    }
                }else if (modelData.nodes[i].type==='custominput'){
                    if (modelData.nodes[i].data.params["dim-x"]=== 0 || modelData.nodes[i].data.params["dim-y"]=== '' || modelData.nodes[i].data.params.units===''){
                        return true
                    }
                }else if (modelData.nodes[i].type==='customflatten'){
                    if (modelData.nodes[i].data.params["dim-x"]=== 0 || modelData.nodes[i].data.params["dim-y"]=== '' || modelData.nodes[i].data.params.units===''){
                        return true
                    }
                }
            }
            return !isGraphConnected(modelData)
        }else{
            return true
        }
    }
    return true
}

// Runs a BFS through the graph and checks whether the graph is connect or not
const isGraphConnected = (graph) =>  {
    const visited = new Set();
    const firstNodeId = graph.nodes[0].id;
    const queue = [firstNodeId];
    visited.add(firstNodeId);
  
    while (queue.length > 0) {
      const currentNodeId = queue.shift()
      const adjacentNodes = graph.edges
        .filter((edge) => edge.source === currentNodeId || edge.target === currentNodeId)
        .map((edge) => (edge.source === currentNodeId ? edge.target : edge.source));
  
      for (const nodeId of adjacentNodes) {
        if (!visited.has(nodeId)) {
          queue.push(nodeId);
          visited.add(nodeId);
        }
      }
    }
    return visited.size === graph.nodes.length;
  }


export const generateModelJSON = (model_data) => {
    let filteredJSON = model_data
    
    filteredJSON.nodes.forEach(node => {
        delete node.width;
        delete node.height;
        delete node.position;
        delete node.positionAbsolute;
        delete node.selected;
        delete node.dragging
        delete node.data.label
      });

    filteredJSON.edges.forEach(edge => {
        delete edge.sourceHandle
        delete edge.targetHandle
        delete edge.id
    })

    delete filteredJSON.viewport
    return filteredJSON
}