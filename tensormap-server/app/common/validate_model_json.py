
def validate_json(content):

    layers = {'input': False, 'hidden':False, 'output':False}
    errorString = None
    inputCounter = 0
    hiddenCounter = 0
    outputCounter = 0
    node_param_validation = True

    for i in range(len(content["graph"][0]["nodes"])):
        if "Input" in content["graph"][0]["nodes"][i]["name"]:
            layers['input']= True
            inputCounter += 1
        elif "Hidden" in content["graph"][0]["nodes"][i]["name"]:
            layers['hidden']= True
            hiddenCounter += 1
        elif "Output" in content["graph"][0]["nodes"][i]["name"]:
            layers['output']= True
            outputCounter += 1

    if layers['input'] == False and layers['output'] and layers['hidden']:
        errorString = "Input Layer is Missing."
    elif layers['output'] == False and layers['input'] and layers['hidden'] :
        errorString = "Output Layer is Missing."
    elif layers['input'] == False and layers['output'] == False and layers['hidden']:
        errorString = "Output Layer and Input Layer is Missing."
    elif layers['input'] == False and layers['output'] == False and layers['hidden'] == False:
        errorString = "No Layers Defined."
    elif layers['hidden'] == False and layers['output'] and layers['input']:
        errorString = "No Hidden Layers Defined."
    
    elif inputCounter != 1:
        errorString = "Too Many Input Layers Defined."
    elif outputCounter != 1:
        errorString = "Too Many Output Layers Defined."

    totalNumLayers = len(content["graph"][0]["nodes"])
   
    if len(content["node_param"]) != totalNumLayers:
        errorString += " Too many or Less Layer Parameters in node_param."
        node_param_validation = False
    else:     
        for i in range(len(content["node_param"])):
            try:
                param1 = float(content["node_param"][i]["param"][0]["param1"])
            except ValueError:
                errorString += " param1 not a digit."
                node_param_validation = False
                break
            try:
                param2 = float(content["node_param"][i]["param"][0]["param2"])
            except ValueError:
                errorString += " param2 not a digit."
                node_param_validation = False
                break
      
    if layers['input'] and layers['output'] and layers['hidden'] and layers['inputNo'] == 1 and layers['outputNo'] == 1 and node_param_validation:
        errorString = True    

    print(errorString)

    return errorString



    