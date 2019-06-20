from .. import db
import json
from ..resources.database_models.code_gen import template_copies,user_template_index,code_layers

def getNodeVal(layerId,sentKey,json_config):
    for i in range(len(json_config["node_param"])):
        if json_config["node_param"][i]["id"] == layerId:
            for key, value in json_config["node_param"][i]["param"][0].items():
                if key == sentKey:
                    return value
                    break
            break
        

def iterate(splitAttr,index,pointInJSON,layerId,json_config):
    for key, value in pointInJSON.items():    
        if hasattr(value,'iteritems'):
            iterate(splitAttr,index,value,layerId,json_config)
                                                        
        elif splitAttr[index] == key:
            value = getNodeVal(layerId,key,json_config )
            pointInJSON[key]= value
            break


def makeKerasModel(json_config):

    dict_list = []

    for i in range(len(json_config["graph"][0]["nodes"])):

        layerType = json_config["graph"][0]["nodes"][i]["layerType"]
        layerId = json_config["graph"][0]["nodes"][i]["id"]

        layerInfo = code_layers.query.filter_by(name=layerType).one()
        attributeInfo = layerInfo.attributes
        splitAttr = attributeInfo.split(",")                
        layer_dict = layerInfo.kerasConfig

        for j in range(len(splitAttr)):
            pointInJSON = layer_dict["config"]
            iterate(splitAttr,j, pointInJSON,layerId,json_config)

    dict_list.append(layer_dict)

    layerCommon = {"name": "userModel", "layers":"None"}
    layerCommon["layers"] = dict_list
    modelCommon = {"class_name": "Sequential", "config":layerCommon, "keras_version": "2.2.4-tf", "backend": "tensorflow"}
    #Only for testing
    modelCommon["config"]["layers"][0]["batch_input_shape"] =  [None, 1000]

    finalModelJSON = json.dumps(modelCommon)

    return finalModelJSON

		





