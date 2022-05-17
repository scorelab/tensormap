import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from tensorflow import keras
from tensorflow.keras import layers

np.random.seed(0)

optimizerType = "adam"
lossFunction = "Cross-entropy loss"

dataCsv = pd.read_csv()

_x = dataCsv[0]
_y = dataCsv[1]

x_train, y_train, x_test, y_test = train_test_split(_x, _y, random_state=42, shuffle=True, test_size=0.1)

network = tf.keras.models.Sequential(name="userModel")

network.compile(optimizer=optimizerType, loss=lossFunction)

mod_history = network.fit(x_train, y_train, epochs=100, verbose=1, batch_size=16)

(test_loss,) = network.evaluate(x_test, y_test)

predictions = network.predict(x_test, verbose=1)

prediction = prediction.astype(int)
accuracy = accuracy_score(test_labels, prediction)
f1 = f1_score(test_labels, prediction, average="macro")
recall = recall_score(y_true=test_labels, y_pred=prediction, average="macro")
precision = precision_score(test_labels, prediction, average="macro")

print("Accuracy: ", accuracy)
print("F1: ", f1)
print("Recall: ", recall)
print("Precision: ", precision)

with open("results.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerows(zip(y_test, predictions))
