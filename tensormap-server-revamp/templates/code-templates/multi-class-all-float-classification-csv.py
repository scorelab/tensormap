import pandas as pd
import tensorflow as tf
import numpy as np
import yaml
import json


def deep_learning_model():
    features = pd.read_csv("{{data.dataset.file_name}}")

    # Split Training and testing sets
    training_features = features.sample(frac={{data.dataset.training_split}}, random_state=200)
    training_labels = training_features.pop('{{data.dataset.target_field}}')

    testing_features = features.drop(training_features.index)
    testing_labels = testing_features.pop('{{data.dataset.target_field}}')

    x_training, y_training = (training_features.to_numpy(), training_labels.to_numpy())
    x_testing, y_testing = (testing_features.to_numpy(), testing_labels.to_numpy())

    # Preprocessing - scaling
    x_training = x_training / np.linalg.norm(x_training)
    x_testing = x_testing / np.linalg.norm(x_testing)

    json_string = json.dumps(yaml.load(open("{{data.dl_model.json_file}}")))
    model = tf.keras.models.model_from_json(
        json_string, custom_objects=None
    )

    model.compile(optimizer='{{data.dl_model.optimizer}}',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                  metrics=['{{data.dl_model.metric}}'])

    history = model.fit(x_training, y_training, epochs={{data.dl_model.epochs}})

    test_loss, test_acc = model.evaluate(x_testing, y_testing, verbose=2)

    return history, test_loss, test_acc


print("Starting")
history, test_loss, test_acc = deep_learning_model()
print("Finish")
