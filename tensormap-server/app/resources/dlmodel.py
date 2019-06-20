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
from ..common import validate_model_json, make_model_json



@socketio.on('nn_execute', namespace='/nn')
def nn_execute(nnmodelconfig):

    resultString = validate_model_json.validate_json(nnmodelconfig)

    if resultString == True:

        modelJSON=make_model_json.makeKerasModel(nnmodelconfig)

        np.random.seed(0)

        number_of_features = 1000

        np_load_old = np.load

        np.load = lambda *a,**k: np_load_old(*a, allow_pickle=True, **k)

        (train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words=number_of_features)

        np.load = np_load_old

        tokenizer = Tokenizer(num_words=number_of_features)
        train_features = tokenizer.sequences_to_matrix(train_data, mode='binary')
        test_features = tokenizer.sequences_to_matrix(test_data, mode='binary')

        model = keras.models.model_from_json(modelJSON)

        model.compile(loss='binary_crossentropy', 
                        optimizer='rmsprop', 
                        metrics=['accuracy'])

        model.fit(train_features,
                        train_labels, 
                        epochs=3, 
                        verbose=1, 
                        batch_size=100) 

        val_loss, val_acc = model.evaluate(test_features, test_labels) 

        results = {}
        results['loss'] = float(val_loss)
        results['accuracy']= float(val_acc)
        results = json.dumps(results)        
            
        #TO_DO - change according to frontend
        emit('sample_response', results, namespace='/samplenamespace')
    
    else:
        results = {}
        results['error'] = resultString
        results = json.dumps(results)

        #TO_DO - change according to frontend
        emit('sample_response', results, namespace='/samplenamespace')

