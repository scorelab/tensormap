import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split
from tensorflow import keras
from tensorflow.keras import layers

np.random.seed(0)


optimizerType = "adam"
lossFunction = "L2 loss"

dataCsv = pd.read_csv()

_x = dataCsv[0]
_y = dataCsv[1]

x_train, y_train, x_test, y_test = train_test_split(_x, _y, random_state=42, shuffle=True, test_size=0.10)

network = tf.keras.models.Sequential(name="userModel")

network.compile(optimizer=optimizerType, loss=lossFunction)

mod_history = network.fit(x_train, y_train, epochs=100, verbose=1, batch_size=16)

(test_loss,) = network.evaluate(x_test, y_test)

predictions = network.predict(x_test, verbose=1)

mse = mean_squared_error(test_labels, prediction)
rmse = sqrt(meanSquaredError)
mae = mean_absolute_error(test_labels, prediction)

print("MSE: ", mse)
print("RMSE: ", rmse)
print("MAE: ", mae)

with open("results.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerows(zip(y_test, predictions))
