from flask import session, redirect, url_for, render_template, request
from . import main
from .. import db
from .database_models.code_gen import template_copies,user_template_index,code_layers
import os
from flask import send_file
from ..common import validate_model_json
import ast
import json


def convertToBinaryData(filename):
    #Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

def write_file(data, filename):
    # Convert binary data to proper format and write it on Hard Disk
    with open(filename, 'wb') as file:
        file.write(data)

def edit_code(layerInfo,content):
        tempCode = layerInfo.code
        codeAttributes = layerInfo.attributes
        splitAttr = codeAttributes.split(",")
        tempString = tempCode
        for i in range(len(splitAttr)):
                tempString += splitAttr[i] + " = " + content["layerSpec"][i]
                if i != (len(content["layerSpec"])-1) :
                        tempString += ","
                else:
                         tempString += "))"
        return tempString  

def getFile():
        #get template file from database
        dirPath = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '.', 'user_template'))
        result = template_copies.query.filter_by(id="1").one()
        filename = '{}{}{}'.format(dirPath, "/", result.fileName)
        write_file(result.data,filename)
        return filename

def update_template_copies(filename):
        #updating data saved in table template_copies
        result = template_copies.query.filter_by(id="1").one()
        result.data = convertToBinaryData(filename)
        db.session.commit()

def edit_line_no(filename):
        allLayers = user_template_index.query.all()

        for layer in allLayers:
                with open(filename, "r") as f:
                                lines = f.readlines()
                f.close()
                for i, line in enumerate(lines):
                        if layer.layerId in line:
                                print("line no: ",i)
                                result = user_template_index.query.filter_by(layerId = layer.layerId).one()
                                result.lineNo = i
                                db.session.commit()   








def getNodeVal(layerId,sentKey,json_config):
    for i in range(len(json_config["node_param"])):
        if json_config["node_param"][i]["id"] == layerId:
            for key, value in json_config["node_param"][i]["param"][0].items():
                if key == sentKey:
                    return value
                    break
            break
        

def iterate(splitAttr,index,pointInJSON,layerId,json_config):
        print("i**************************************")
        for key, value in pointInJSON.items():    
                print("in")
                if hasattr(value,'iteritems'):
                        iterate(splitAttr,index,value,layerId,json_config)
                                                        
                elif splitAttr[index] == key:
                        value = getNodeVal(layerId,key,json_config )
                        pointInJSON[key]= value
                        print(pointInJSON)
                        break













                              
                                

@main.route('/add', methods=['POST'])
def addNewLine():

        content = request.get_json()

        filename = getFile()        

        parentNodeInfo = user_template_index.query.filter_by(layerId=content["parentNodeId"]).one()
        lineToEnter = parentNodeInfo.lineNo + 2
        print(parentNodeInfo)
        print(lineToEnter)

        layerInfo = code_layers.query.filter_by(name=content["layerType"]).one()

        codeToEnter = edit_code(layerInfo,content)
        codeToEnter += "\n\n"

        f = open(filename, "r")
        fileContents = f.readlines()
        f.close()

        fileContents.insert(lineToEnter, codeToEnter)

        f = open(filename, "w")
        tempFileContents = "".join(fileContents)
        f.write(tempFileContents)
        f.close()

        update_template_copies(filename)

        #adding layer to user template index table
        data = user_template_index(content["layerId"],lineToEnter)
        db.session.add(data)
        db.session.commit()
        user_template_index

        edit_line_no(filename)

        return "done"

#         sample json: {
# 	"layerId": "87ba7b08-0557-475f-839f-0729f70c0389",
# 	"layerType": "dense",
# 	"layerSpec": ["2","'relu'","'87ba7b08-0557-475f-839f-0729f70c0389'"],
# 	"parentNodeId": "userModel"
# }

@main.route('/edit', methods=['POST'])
def editConfig():

        content = request.get_json()

        filename = getFile()

        layerInfo = user_template_index.query.filter_by(layerId=content["layerId"]).one()
        lineToReplace = layerInfo.lineNo

        layerInfo = code_layers.query.filter_by(name=content["layerType"]).one()

        codeToReplace = edit_code(layerInfo,content)
        codeToReplace += "\n"

        f = open(filename, "r")
        fileContents = f.readlines()
        f.close()

        fileContents[lineToReplace] = codeToReplace

        f = open(filename, "w")
        f.writelines(fileContents)
        f.close()

        update_template_copies(filename)

        return "done"

#         sample json: {
# 	"layerId": "87ba7b08-0557-475f-839f-0729f70c0389",
# 	"layerType": "dense",
# 	"layerSpec": ["8","'tanh'","'87ba7b08-0557-475f-839f-0729f70c0389'"],
# }


@main.route('/delete', methods=['POST'])
def deleteLine():

        content = request.get_json()

        filename = getFile()

        layerInfo = user_template_index.query.filter_by(layerId=content["layerId"]).one()
        lineToDelete = layerInfo.lineNo

        print(lineToDelete)

        with open(filename, "r") as f:
                lines = f.readlines()
        f.close()
        with open(filename, "w") as f:
                for i, line in enumerate(lines):
                        if (i != lineToDelete) and (i != (lineToDelete+1)):
                                f.write(line)                        
        f.close()

        user_template_index.query.filter_by(layerId=content["layerId"]).delete()
        db.session.commit()

        edit_line_no(filename)
        
        update_template_copies(filename)

        return "done"

#         sample json: {
# 	"layerId": "87ba7b08-0557-475f-839f-0729f70c0389",
# }

@main.route('/getCode', methods=['GET'])
def sendFile():
        content = request.get_json()
        print("aesxfcgvhbj")
        print(content)
            
        filename = getFile()       

        result = validate_model_json.validate_json(content)

        if result == True:
                try:
                        return send_file(filename,
                        attachment_filename='user_keras_temp.py',
                        as_attachment=True)
                except Exception as e:
                        return str(e)
        else:
                return result

#         sample json: <the complete JSON of model>

@main.route('/editExeConfig', methods=['POST'])
def editExe():

        content = request.get_json()
            
        filename = getFile()   

        layerInfo = user_template_index.query.filter_by(layerId="network.compile").one()
        lineToReplace = layerInfo.lineNo

        layerInfo = code_layers.query.filter_by(name="compile").one()

        tempCode = layerInfo.code
        codeAttributes = layerInfo.attributes
        splitAttr = codeAttributes.split(",")
        tempString = tempCode
        tempString += splitAttr[0] + " = " + content["optimizer"]+","+splitAttr[1] + " = "+content["loss"]+","+splitAttr[2]+ " = ["
        
        for i in range(len(content["metrics"])):
                tempString += content["metrics"][i]

                if i != (len(content["metrics"])-1):
                        tempString += ","
                else:    
                        tempString += "])"                                                           

        tempString += "\n"

        f = open(filename, "r")
        fileContents = f.readlines()
        f.close()

        fileContents[lineToReplace] = tempString

        f = open(filename, "w")
        f.writelines(fileContents)
        f.close()

        update_template_copies(filename)

        return "done"

#         sample json: {
        # "optimizer":"'adam'",
        # "loss": "'sparse_categorical_crossentropy'",
# 	"metrics": ["'accuracy'"]
# }

@main.route('/test', methods=['POST'])
def editthis():

        json_config = request.get_json()

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
                        print(pointInJSON)
                        iterate(splitAttr,j, pointInJSON,layerId,json_config)

                dict_list.append(layer_dict)

        layerCommon = {"name": "userModel", "layers":"None"}
        layerCommon["layers"] = dict_list
        modelCommon = {"class_name": "Sequential", "config":layerCommon, "keras_version": "2.2.4-tf", "backend": "tensorflow"}

        print(modelCommon)

        finalresult = json.dumps(modelCommon)

        return finalresult




            
                
##adding file to database when user is first created
# file = convertToBinaryData("/home/suleka/Documents/Tensormap_GSOC/TensorMap/tensormap-server/app/resources/user_template/user_keras_temp.py")
# data = template_copies("1","user_keras_temp.py",file)
# db.session.add(data)
# db.session.commit()

        
    







# {
#   "graph": [
#     {
#       "id": "e0d57cd7-00ba-4c27-9007-6914eeba4995",
#       "offsetX": 0,
#       "offsetY": 0,
#       "zoom": 100,
#       "gridSize": 0,
#       "links": [
#         {
#           "id": "516449cc-c982-4e3a-a3ad-979caf715ccd",
#           "type": "default",
#           "selected": false,
#           "source": "9825cd47-20e0-44ae-bb76-aa92af5f321b",
#           "sourcePort": "87ba7b08-0557-475f-839f-0729f70c0389",
#           "target": "019842a3-ee19-4b8f-883c-0600c702294d",
#           "targetPort": "cbc6617b-651e-4fbd-85ea-dd941e9e3650",
#           "points": [
#             {
#               "id": "aa9fc1fe-4053-433d-b911-0c7b5f978142",
#               "selected": false,
#               "x": 128.98748779296875,
#               "y": 132.5
#             },
#             {
#               "id": "edd5dc14-cd6e-4b21-b33a-362d3ee959dd",
#               "selected": false,
#               "x": 409.5,
#               "y": 132.5
#             }
#           ],
#           "extras": {},
#           "labels": [],
#           "width": 3,
#           "color": "rgba(255,255,255,0.5)",
#           "curvyness": 50
#         }
#       ],
#       "nodes": [
#         {
#           "id": "9825cd47-20e0-44ae-bb76-aa92af5f321d",
#           "type": "default",
#           "selected": true,
#           "x": 100,
#           "y": 100,
#           "extras": {},
#           "ports": [
#             {
#               "id": "87ba7b08-0557-475f-839f-0729f70c0389",
#               "type": "default",
#               "selected": false,
#               "name": "8e219951-6b45-42f1-8425-df751727bd25",
#               "parentNode": "userModel",
#               "links": [
#                 "516449cc-c982-4e3a-a3ad-979caf715ccd"
#               ],
#               "in": false,
#               "label": "Out"
#             }
#           ],
#           "name": "Input",
#           "color": "rgb(0,192,255)",
#           "layerType":"dense"
#         },
#         {
#           "id": "9825cd47-20e0-44ae-bb76-aa92af5f321c",
#           "type": "default",
#           "selected": false,
#           "x": 400,
#           "y": 100,
#           "extras": {},
#           "ports": [
#             {
#               "id": "cbc6617b-651e-4fbd-85ea-dd941e9e3650",
#               "type": "default",
#               "selected": false,
#               "name": "894b0115-6231-4e31-a2a0-09716125500d",
#               "parentNode": "019842a3-ee19-4b8f-883c-0600c702294d",
#               "links": [
#                 "516449cc-c982-4e3a-a3ad-979caf715ccd"
#               ],
#               "in": true,
#               "label": "In"
#             },
#             {
#               "id": "4b1ed401-7720-4cc7-b28b-953ea8d38674",
#               "type": "default",
#               "selected": false,
#               "name": "out-1",
#               "parentNode": "019842a3-ee19-4b8f-883c-0600c702294d",
#               "links": [],
#               "in": false,
#               "label": "Out"
#             }
#           ],
#           "name": "Hidden 0",
#           "color": "rgb(192,255,0)",
#           "layerType":"dense"
#         },
#         {
#           "id": "9825cd47-20e0-44ae-bb76-aa92af5f321b",
#           "type": "default",
#           "selected": false,
#           "x": 400,
#           "y": 100,
#           "extras": {},
#           "ports": [
#             {
#               "id": "cbc6617b-651e-4fbd-85ea-dd941e9e3650",
#               "type": "default",
#               "selected": false,
#               "name": "894b0115-6231-4e31-a2a0-09716125500d",
#               "parentNode": "019842a3-ee19-4b8f-883c-0600c702294d",
#               "links": [
#                 "516449cc-c982-4e3a-a3ad-979caf715ccd"
#               ],
#               "in": true,
#               "label": "In"
#             },
#             {
#               "id": "4b1ed401-7720-4cc7-b28b-953ea8d38674",
#               "type": "default",
#               "selected": false,
#               "name": "out-1",
#               "parentNode": "019842a3-ee19-4b8f-883c-0600c702294d",
#               "links": [],
#               "in": false,
#               "label": "Out"
#             }
#           ],
#           "name": "Output",
#           "color": "rgb(192,255,0)",
#           "layerType":"dense"
#         }
#       ]
#     }
#   ],
#   "node_param": [
#    {
#       "id": "9825cd47-20e0-44ae-bb76-aa92af5f321d",
#       "param": [
#         {
#           "units": "100",
#           "activation": "relu",
#           "name": "9825cd47-20e0-44ae-bb76-aa92af5f321d"
#         }]
#         },
#      {
#       "id": "9825cd47-20e0-44ae-bb76-aa92af5f321c",
#       "param": [
#         {
#           "units": "200",
#           "activation": "relu",
#           "name": "9825cd47-20e0-44ae-bb76-aa92af5f321c"
#         }]},
#     {
#       "id": "9825cd47-20e0-44ae-bb76-aa92af5f321b",
#       "param": [
#         {
#           "units": "1",
#           "activation": "relu",
#           "name": "9825cd47-20e0-44ae-bb76-aa92af5f321b"
#         }
#       ]
#     }
#   ]
# }