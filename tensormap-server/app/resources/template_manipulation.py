from flask import session, redirect, url_for, render_template, request
from . import main
from .. import db
from .database_models.code_gen import template_copies

def convertToBinaryData(filename):
    #Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

def write_file(data, filename):
    # Convert binary data to proper format and write it on Hard Disk
    with open(filename, 'wb') as file:
        file.write(data)

@main.route('/add', methods=['POST'])
def addNewLine():

        ##updating
        # result = template_copies.query.filter_by(id="1").one()
        # result.data = convertToBinaryData("/home/suleka/Documents/Tensormap_GSOC/TensorMap/tensormap-server/app/resources/user_template/user_keras_temp.py")
        # db.session.commit()

        ##retiving file
        # result = template_copies.query.filter_by(id="1").one()
        # file_name = "/home/suleka/Documents/Tensormap_GSOC/TensorMap/tensormap-server/app/resources/user_template/user_keras_temp.py/"+result.fileName
        # write_file(result.data,file_name)


        ##adding file to database wen user is first created
        # file = convertToBinaryData("/home/suleka/Documents/Tensormap_GSOC/TensorMap/tensormap-server/app/resources/user_template/user_keras_temp.py")
        # data = template_copies("1","user_keras_temp.py",file)
        # db.session.add(data)
        # db.session.commit()

        return "done"
    
# @main.route('/edit', methods=['GET', 'POST'])
#     def editConfig():

# @main.route('/delete', methods=['GET', 'POST'])
#     def deleteLine():


