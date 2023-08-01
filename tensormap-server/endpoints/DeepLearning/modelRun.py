import tensorflow as tf
import json
import pandas as pd
import numpy as np
import yaml

from endpoints.DeepLearning.models import ModelBasic
from endpoints.DataUpload.models import DataFile
from shared.constants import *
from shared.services.config import get_configs
from shared.utils import get_socket_ref


socketio = get_socket_ref()

class CustomProgressBar(tf.keras.callbacks.Callback):
    def __init__(self):
        super(CustomProgressBar, self).__init__()

    def on_epoch_begin(self, epoch, logs=None):
        model_result(f"Epoch {epoch+1}/{self.params['epochs']}")

    def on_batch_end(self, batch, logs=None):
        progress = batch / self.params['steps']
        progress_bar_width = 50
        arrow = '>' * int(progress * progress_bar_width)
        spaces = '=' * (progress_bar_width - len(arrow))
        if (self.params['steps']/1000>=0.1):
            if batch%10==0:
                model_result(f"{batch+1}/{self.params['steps']}  [{arrow}{spaces}] {int(progress * 100)}% - Loss: {logs['loss']:.4f} - Accuracy: {logs['accuracy']:.4f}")
        elif(self.params['steps']/10000>=0.1):
            if batch%10==0:
                model_result(f"{batch+1}/{self.params['steps']}  [{arrow}{spaces}] {int(progress * 100)}% - Loss: {logs['loss']:.4f} - Accuracy: {logs['accuracy']:.4f}")
        else:
            model_result(f"{batch+1}/{self.params['steps']}  [{arrow}{spaces}] {int(progress * 100)}% - Loss: {logs['loss']:.4f} - Accuracy: {logs['accuracy']:.4f}")

    def on_test_begin(self, logs=None):
        model_result("Evaluating...")

    def on_test_end(self, logs=None):
        model_result(f"Evaluation Results: Accuracy - {logs['accuracy']:.4f} Loss - {logs['loss']:.4f}")
        model_result("Finish")

def model_result(message):
    message = message.split('')[-1]
    socketio.emit(SOCKETIO_LISTENER, message, namespace=SOCKETIO_DL_NAMESPACE)

def helper_generate_file_location(file_id):
    configs = get_configs()
    file = DataFile.query.filter_by(id=file_id).first()
    return configs['api']['upload']['folder'] + '/' + file.file_name + '.' + file.file_type

def helper_generate_json_model_file_location(model_name):
    return MODEL_GENERATION_LOCATION + model_name + MODEL_GENERATION_TYPE

def model_run(incoming):
    model_name = incoming[MODEL_NAME]
    model_configs = ModelBasic.query.filter_by(model_name=model_name).first()

    FILE_NAME = helper_generate_file_location(file_id=getattr(model_configs,FILE_ID))
    features = pd.read_csv(FILE_NAME)

    training_features = features.sample(frac=getattr(model_configs,MODEL_TRAINING_SPLIT), random_state=220)
    training_labels = training_features.pop(getattr(model_configs,FILE_TARGET))

    testing_features = features.drop(training_features.index)
    testing_labels = testing_features.pop(getattr(model_configs,FILE_TARGET))

    x_training, y_training = (training_features.to_numpy(), training_labels.to_numpy())
    x_testing, y_testing = (testing_features.to_numpy(), testing_labels.to_numpy())

    # Preprocessing - scaling
    x_training = x_training / np.linalg.norm(x_training)
    x_testing = x_testing / np.linalg.norm(x_testing)

    json_string = json.dumps(yaml.load(open(helper_generate_json_model_file_location(model_name=model_name))))
    model = tf.keras.models.model_from_json(json_string, custom_objects=None)

    model.compile(
        optimizer=getattr(model_configs,MODEL_OPTIMIZER),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=[getattr(model_configs,MODEL_METRIC)],
    )

    model.fit(x_training, y_training,epochs = getattr(model_configs,MODEL_EPOCHS),callbacks=[CustomProgressBar()],verbose=0)
    model.evaluate(x_testing, y_testing,verbose=0,callbacks=[CustomProgressBar()])