import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error

np.random.seed(0)

network = tf.keras.models.Sequential(name='userModel')

network.compile (optimizer = ,loss = )

mod_history = network.fit(x_train, y_train, epochs=, verbose=1, batch_size=, validation_data=(x_val, y_val))

test_loss, = network.evaluate(x_test, y_test)

predictions = network.predict(x_test, verbose=1)

mse = mean_squared_error(test_labels, prediction)
rmse = sqrt(meanSquaredError)
mae = mean_absolute_error(test_labels, prediction)

print("MSE: ",mse)
print("RMSE: ",rmse)
print("MAE: ",mae)

with open("results.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerows(zip(y_test,predictions))


