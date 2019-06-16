from flask_restful import Resource
from flask import request
from flask import jsonify
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.text import Tokenizer
import tensorflow as tf
import json
from .. import socketio
from flask_socketio import emit
from ..common import validate_model_json

@socketio.on('nn_execute', namespace='/nn')
def nn_execute(nnmodelconfig):

    print(nnmodelconfig)

    result = validate_model_json.validate_json(nnmodelconfig)

    json_config = json.dumps(nnmodelconfig)

    #sample model (IMDB) - Binary Classification
    number_of_features = 1000

    (train_data, train_target), (test_data, test_target) = imdb.load_data(num_words=number_of_features)

    # Convert movie review data to one-hot encoded feature matrix
    tokenizer = Tokenizer(num_words=number_of_features)
    train_features = tokenizer.sequences_to_matrix(train_data, mode='binary')
    test_features = tokenizer.sequences_to_matrix(test_data, mode='binary')  

    #constructing model from json
    model = keras.models.model_from_json(json_config)

    model.compile(loss='binary_crossentropy', 
                optimizer='rmsprop', 
                metrics=['accuracy'])

    model.fit(train_features,
                      train_target, 
                      epochs=3, 
                      verbose=1, 
                      batch_size=100) 

    val_loss, val_acc = model.evaluate(test_features, test_target) 

    results = {}
    results['loss'] = float(val_loss)
    results['accuracy']= float(val_acc)
    results = json.dumps(results)
        
    #TO_DO - change according to frontend
    emit('sample_response', results, namespace='/samplenamespace')

