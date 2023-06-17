export const enableValidateButton = (formState,modelData)=>{
    if  (formState.selectedFile !== null && formState.targetField !==null && formState.modalName !== "" && formState.problemType !== null && formState.optimizer !== null && formState.metric !== null && formState.epochCount !== 0 && formState.trainTestRatio !== 0){
        if (modelData.edges.length !==0 || modelData.nodes.length !==0  ){
            for (let i = 0; i < modelData.nodes.length; i++){
                if (modelData.nodes[i].type==="customdense"){   
                    if (modelData.nodes[i].data.params.activation === "default" || modelData.nodes[i].data.params.units===0){
                        return true
                    }
                }else if (modelData.nodes[i].type==='custominput'){
                    if (modelData.nodes[i].data.params["dim-x"]=== 0 || modelData.nodes[i].data.params["dim-y"]=== 0){
                        return true
                    }
                }else if (modelData.nodes[i].type==='customflatten'){
                    if (modelData.nodes[i].data.params["dim-x"]=== 0 || modelData.nodes[i].data.params["dim-y"]=== 0){
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