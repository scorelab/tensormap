# from .. import db
# from ..resources.database_models.code_gen import template_copies,user_template_index,code_layers

# def makeKerasModel(json_config):

#     dict_list = []
#     layerCommon = {"name": "userModel", "layers":"None"}
#     modelCommon = {"class_name": "Sequential", "config":layerCommon, "keras_version": "2.2.4-tf", "backend": "tensorflow"}

#      for i in range(len(json_config["graph"][0]["nodes"])):

#         layerType = json_config["graph"][0]["nodes"][i]["type"]
#         layerId = json_config["graph"][0]["nodes"][i]["id"]

#         layerInfo = code_layers.query.filter_by(name=layerType).one()

#         attributeInfo = layerInfo.attributes
#         splitAttr = attributeInfo.split(",")
        
#         dict_string = layerInfo.kerasConfig
#         layer_dict = literal_eval(dict_string)

#         print(layer_dict)

#         for j in range(len(splitAttr)):
#             pointInJSON = layer_dict["config"]
#             iterateJSON(splitAttr,j, pointInJSON,layerId,json_config)
                

# def getNodeVal(layerId,sentKey,json_config):
#     for i in range(len(content["node_param"])):
#         if json_config["node_param"][i]["id"] == layerId:
#             for key, value in json_config["node_param"][i]["param"][0].items():
#                 if key == sentKey:
#                     return value
#                     break
#             break

# def iterateJSON(splitAttr,index,pointInJSON,layerId,json_config):

#     for key, value in pointInJSON.items():    
#         if hasattr(value,'iteritems'):
#             pointInJSON = pointInJSON[key]
#             iterateJSON(splitAttr,index,pointInJSON,layerId,json_config)
                                            
#         elif splitAttr[index] == key:
#                 value = getNodeVal(layerId,key,json_config )
#                 pointInJSON[key]= value
#                 break

                        



#             #search for split array attr in dict and set it's value


#         # add dict to main dict
#         #return dict

#         {
# 			"class_name": "Dense",
# 			"config": {
# 				"name": "dense_1",
# 				"trainable": true,
# 				"dtype": "float32",
# 				"units": 128,
# 				"activation": "relu",
# 				"use_bias": true,
# 				"kernel_initializer": {
# 					"class_name": "GlorotUniform",
# 					"config": {
# 						"seed": null,
# 						"dtype": "float32"
# 					}
# 				},
# 				"bias_initializer": {
# 					"class_name": "Zeros",
# 					"config": {
# 						"dtype": "float32"
# 					}
# 				},
# 				"kernel_regularizer": null,
# 				"bias_regularizer": null,
# 				"activity_regularizer": null,
# 				"kernel_constraint": null,
# 				"bias_constraint": null
# 			}
# 		}
		





