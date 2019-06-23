import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

np.random.seed(0)

network = tf.keras.models.Sequential(name='userModel')

network.compile (optimizer = ,loss = ,metrics = )

mod_history = network.fit(x_train, y_train, epochs=, verbose=1, batch_size=, validation_data=(x_val, y_val))

test_loss, = network.evaluate(x_test, y_test)

predictions = network.predict(x_test, verbose=1)

train_loss = mod_history.history['loss']
val_loss   = mod_history.history['val_loss']
train_acc  = mod_history.history['acc']
val_acc    = mod_history.history['val_acc']

print("train loss: ", train_loss)
print("validation loss: ", val_loss)
print("train accuracy: ", train_acc)
print("validation accuracy: ", val_acc)
print("test loss: ", test_loss)

with open("results.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerows(zip(y_test,predictions))


