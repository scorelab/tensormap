from flask import session, redirect, url_for, render_template, request
from . import main
from .. import db
from .database_models.code_gen import template_copies,user_template_index,code_layers
import os
from flask import send_file

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

def edit_line_no():
        allLayers = user_template_index.query.all()

        for layer in allLayers:
                if layer.layerId == "top":
                        continue
                else:
                        with open(filename, "r") as f:
                                lines = f.readlines()
                        f.close()
                        for i, line in enumerate(lines):
                                if layer.layerId in line:
                                        print("line no: ",i)
                                        result = user_template_index.query.filter_by(layerId = layer.layerId).one()
                                        result.lineNo = i
                                        db.session.commit()


       

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

        edit_line_no()

        return "done"

#         sample json: {
# 	"layerId": "87ba7b08-0557-475f-839f-0729f70c0389",
# 	"layerType": "dense",
# 	"layerSpec": ["2","'relu'","'87ba7b08-0557-475f-839f-0729f70c0389'"],
# 	"parentNodeName": "top"
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

        edit_line_no()
        
        update_template_copies(filename)

        return "done"

#         sample json: {
# 	"layerId": "87ba7b08-0557-475f-839f-0729f70c0389",
# }

@main.route('/getCode', methods=['GET'])
    def sendFile():

            content = request.get_json()
            
            filename = getFile()

            return send_file(filename,
                     mimetype='text/csv',
                     attachment_filename='user_keras_temp.py.py',
                     as_attachment=True)






        







                









        ##adding file to database when user is first created
        # file = convertToBinaryData("/home/suleka/Documents/Tensormap_GSOC/TensorMap/tensormap-server/app/resources/user_template/user_keras_temp.py")
        # data = template_copies("1","user_keras_temp.py",file)
        # db.session.add(data)
        # db.session.commit()

        
    







