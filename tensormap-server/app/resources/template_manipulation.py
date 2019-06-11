from flask import session, redirect, url_for, render_template, request
from . import main
from .. import db
from .database_models.code_gen import template_copies

def convertToBinaryData(filename):
    #Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

@main.route('/add', methods=['POST'])
def addNewLine():

    
    
# @main.route('/edit', methods=['GET', 'POST'])
#     def editConfig():

# @main.route('/delete', methods=['GET', 'POST'])
#     def deleteLine():


