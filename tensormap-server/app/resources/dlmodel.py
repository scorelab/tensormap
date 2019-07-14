from flask_restful import Resource
from flask import request
from flask import jsonify
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.text import Tokenizer
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.metrics import f1_score, recall_score, precision_score, accuracy_score
import tensorflow as tf
import json
from .. import socketio
from flask_socketio import emit
from ..common import validate_model_json, make_model_json

class ShowProgress(keras.callbacks.Callback):
    
    # This function is called at the end of each epoch
    def on_epoch_end(epoch, logs={}):
        loss = logs.get('loss')
        epoch = epoch
        print("oooya",loss)

        # trainingResults = {}
        # trainingResults['loss'] = float(loss)
        # trainingResults['epoch']= epoch
        # trainingResults = json.dumps(results)        
            
        # #TO_DO - change according to frontend
        # emit('sample_response', trainingResults, namespace='/samplenamespace')

get_progress = ShowProgress()


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

        model.compile(loss=  nnmodelconfig["experiment_info"]["loss"], 
                        optimizer= nnmodelconfig["experiment_info"]["optimizer"])

        model.fit(train_features,
                        train_labels, 
                        epochs= nnmodelconfig["experiment_info"]["epoch"], 
                        verbose=1, 
                        batch_size=nnmodelconfig["experiment_info"]["batch_size"],
                        callbacks=[get_progress]) 

        test_loss = model.evaluate(test_features, test_labels)

        prediction = model.predict(test_features, verbose=1)

        if nnmodelconfig["experiment_info"]["type"] == "regression":
            mse = mean_squared_error(test_labels, prediction)
            rmse = sqrt(meanSquaredError)
            mae = mean_absolute_error(test_labels, prediction)

            metrics = {}
            metrics['loss'] = float(test_loss)
            metrics['mae']= float(mae)
            metrics['rmse']= float(rmse)
            metrics['mse']= float(mse)
            metrics['accuracy'] = None
            metrics['f1']= None
            metrics['precision']= None
            metrics['recall']= None
            metrics = json.dumps(metrics)     

        elif nnmodelconfig["experiment_info"]["type"] == "classification":

            if nnmodelconfig["experiment_info"]["multiclass"]  == True:
                argmax_pred_array = []
                argmax_true_array = []

                for i in range(len(prediction)):
                    argmax_pred_array.append(np.argmax(prediction[i], 0))
                    argmax_true_array.append(np.argmax(test_y[i], 0))

                argmax_true_array=(np.array(argmax_true_array, dtype=np.int32)).tolist()
                argmax_pred_array=(np.array(argmax_pred_array, dtype=np.int32)).tolist()

                accuracy = accuracy_score(argmax_true_array, argmax_pred_array)
                f1 = f1_score(argmax_true_array, argmax_pred_array, average="macro")
                recall = recall_score(y_true=argmax_true_array, y_pred=argmax_pred_array, average='macro')
                precision = precision_score(argmax_true_array, argmax_pred_array, average='macro')

            elif nnmodelconfig["experiment_info"]["multiclass"]  == False :
                accuracy = accuracy_score(test_labels, prediction)
                f1 = f1_score(test_labels, prediction, average="macro")
                recall = recall_score(y_true=test_labels, y_pred=prediction, average='macro')
                precision = precision_score(test_labels, prediction, average='macro')           

            metrics = {}
            metrics['loss'] = float(test_loss)
            metrics['mae']= None
            metrics['rmse']= None
            metrics['mse']= None
            metrics['accuracy'] = float(accuracy)
            metrics['f1']= float(f1)
            metrics['precision']= float(precision)
            metrics['recall']= float(recall)
            metrics = json.dumps(metrics)  

        #TO_DO - change according to frontend
        print("done in posirive")
        # emit('sample_response', metrics, namespace='/samplenamespace')
    
    else:
        results = {}
        results['error'] = resultString
        results = json.dumps(results)

        #TO_DO - change according to frontend
        print("done in error path")
        # emit('sample_response', results, namespace='/samplenamespace')

