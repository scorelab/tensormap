from jinja2 import Environment, FileSystemLoader
from shared.constants import *
import json

def model_generation(model_params):
    source_nodes = {}
    target_nodes = {}

    for edge in model_params["edges"]:
        source_node = edge["source"]
        target_node = edge["target"]

        # Populate nodes starting from each node
        if source_node in source_nodes:
            source_nodes[source_node].append(target_node)
        else:
            source_nodes[source_node] = [target_node]

        # Populate nodes ending from each node
        if target_node in target_nodes:
            target_nodes[target_node].append(source_node)
        else:
            target_nodes[target_node] = [source_node]

    with open('templates\code-templates\model_func.json', 'r') as file:
        starter_json = json.load(file)
    
    visited = set()
    queue = []

    # Run a BFS algorithm through the model_params and add nodes to the JSON
    for node in model_params["nodes"]:
        if node["type"]=="custominput":
            queue.append(node)
            visited.add(node["id"])  
            starter_json["config"]["layers"].append(helper_generate_layers(node))
            starter_json["config"]["input_layers"].append([
                node["id"],
                0,
                0
                ])
    
    while queue:
        current_node = queue.pop(0)
        targets = [edge['target'] for edge in model_params['edges'] if edge['source'] == current_node["id"]]
        adjacent_targets =  [node for node in model_params["nodes"] if node["id"] in targets]
        
        for node in adjacent_targets:
            if node["id"] not in visited:
                queue.append(node)
                visited.add(node["id"])
                layer_json = helper_generate_layers(node)
                layer_json["inbound_nodes"].append(
                    [
                        current_node["id"],
                        0,
                        0,
                        {}
                    ]
                )
                starter_json["config"]["layers"].append(layer_json)

            else:
                for added_node in starter_json["config"]["layers"]:
                    if added_node["name"]==node["id"]:
                        added_node["inbound_nodes"].append(
                    [
                        current_node["id"],
                        0,
                        0,
                        {}
                    ]
                )

    # Add concatenate nodes to JSON for nodes with more than one connection
    i=0
    for t in target_nodes.keys():
        if len(target_nodes[t])>1:
            starter_json["config"]["layers"].append(
                {"class_name": "Concatenate","config": {"name": "concatenate"+str(i),"trainable": True,"dtype": "float32","axis": -1},"name": "concatenate"+str(i),"inbound_nodes": [[[id,0,0,{}] for id in target_nodes[t]]]}
            )
            for node in starter_json["config"]["layers"]:
                if node["name"] == t:
                    inbound_nodes = node["inbound_nodes"]
                    filtered_inbound = [item for item in inbound_nodes if item[0] not in target_nodes[t]]
                    filtered_inbound.append(["concatenate"+str(i),0,0,{}])
                    node["inbound_nodes"] = filtered_inbound
                    i+=1
    
    # Select the output nodes and add to the JSON
    for node in model_params["nodes"]:
        if node["id"] not in source_nodes.keys():
            starter_json["config"]["output_layers"].append([
                node["id"],
                0,
                0
                ])
        
    return starter_json


# Get the JSON for each node type
def helper_generate_layers(layer_params):
    if (layer_params["type"]=='custominput'):
        default_input = {
            "class_name": "InputLayer",
            "config": {
                "batch_input_shape": [],
                "dtype": "float32",
                "sparse": False,
                "ragged": False,
                "name": ""
             },
            "name": "",
            "inbound_nodes": []
        }

        default_input["config"]["batch_input_shape"] = [None,layer_params["data"]["params"]["dim-y"]]
        default_input["config"]["name"] = layer_params["id"]
        default_input["name"] = layer_params["id"]

        return default_input
    
    elif (layer_params["type"]=="customdense"):
        default_dense = {
        "class_name": "Dense",
        "config": {
          "name": "",
          "trainable": True,
          "dtype": "float32",
          "units": 0,
          "activation": "",
          "use_bias": True,
          "kernel_initializer": {
            "class_name": "GlorotUniform",
            "config": {
              "seed": None
            }
          },
          "bias_initializer": {
            "class_name": "Zeros",
            "config": {}
          },
          "kernel_regularizer": None,
          "bias_regularizer": None,
          "activity_regularizer": None,
          "kernel_constraint": None,
          "bias_constraint": None
        },
        "name": "",
        "inbound_nodes": []
      }
        
        default_dense["config"]["units"] = layer_params["data"]["params"]["units"]
        default_dense["config"]["name"] = layer_params["id"]
        default_dense["name"] = layer_params["id"]
        default_dense["config"]["activation"] = layer_params["data"]["params"]["activation"]

        return default_dense
    
    elif (layer_params["type"]=="customflatten"):
        default_flatten = {
        "class_name": "Flatten",
        "config": {
          "name": "",
          "batch_input_shape": [],
          "trainable": True,
          "dtype": "float32",
          "data_format": "channels_last"
        },
        "name": "",
        "inbound_nodes": []
      }
    
        default_flatten["config"]["batch_input_shape"] = [None,layer_params["data"]["params"]["dim-x"],layer_params["data"]["params"]["dim-y"]]
        default_flatten["config"]["name"] = layer_params["id"]
        default_flatten["name"] = layer_params["id"]

        return default_flatten
    

