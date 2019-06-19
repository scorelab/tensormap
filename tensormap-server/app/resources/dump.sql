-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: tensormap
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `code_layers`
--

DROP TABLE IF EXISTS `code_layers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code_layers` (
  `name` varchar(255) NOT NULL,
  `code` varchar(500) DEFAULT NULL,
  `attributes` varchar(500) DEFAULT NULL,
  `kerasConfig` json DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_layers`
--

LOCK TABLES `code_layers` WRITE;
/*!40000 ALTER TABLE `code_layers` DISABLE KEYS */;
INSERT INTO `code_layers` VALUES ('compile','network.compile (','optimizer,loss,metrics',NULL),('dense','network.add(tf.keras.layers.Dense(','units,activation,name','{\"config\": {\"name\": \"dense_1\", \"dtype\": \"float32\", \"units\": 128, \"use_bias\": true, \"trainable\": true, \"activation\": \"relu\", \"bias_constraint\": null, \"bias_initializer\": {\"config\": {\"dtype\": \"float32\"}, \"class_name\": \"Zeros\"}, \"bias_regularizer\": null, \"kernel_constraint\": null, \"kernel_initializer\": {\"config\": {\"seed\": null, \"dtype\": \"float32\"}, \"class_name\": \"GlorotUniform\"}, \"kernel_regularizer\": null, \"activity_regularizer\": null}, \"class_name\": \"Dense\"}');
/*!40000 ALTER TABLE `code_layers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_copies`
--

DROP TABLE IF EXISTS `template_copies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_copies` (
  `id` varchar(50) NOT NULL,
  `fileName` varchar(50) NOT NULL,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_copies`
--

LOCK TABLES `template_copies` WRITE;
/*!40000 ALTER TABLE `template_copies` DISABLE KEYS */;
INSERT INTO `template_copies` VALUES ('1','user_keras_temp.py',_binary 'import tensorflow as tf\nfrom tensorflow import keras\nfrom tensorflow.keras import layers\nimport numpy as np\n\nnp.random.seed(0)\n\nnetwork = tf.keras.models.Sequential(name=\'userModel\')\n\nnetwork.add(tf.keras.layers.Dense(units = 9,activation = \'relu\',name = \'87ba7b08-0557-475f-839f-0729f70c039\'))\n\nnetwork.add(tf.keras.layers.Dense(units = 5,activation = \'tanh\',name = \'87ba7b08-0557-475f-839f-0729f70c031\'))\n\nnetwork.compile (optimizer = \'adam\',loss = \'sparse_categorical_crossentropy\',metrics = [\'accuracy\'])\n\nmod_history = network.fit(x_train, y_train, epochs=, verbose=1, batch_size=, validation_data=(x_val, y_val))\n\ntest_loss, = network.evaluate(x_test, y_test)\n\npredictions = network.predict(x_test, verbose=1)\n\ntrain_loss = mod_history.history[\'loss\']\nval_loss   = mod_history.history[\'val_loss\']\ntrain_acc  = mod_history.history[\'acc\']\nval_acc    = mod_history.history[\'val_acc\']\n\nprint(\"train loss: \", train_loss)\nprint(\"validation loss: \", val_loss)\nprint(\"train accuracy: \", train_acc)\nprint(\"validation accuracy: \", val_acc)\nprint(\"test loss: \", test_loss)\n\nwith open(\"results.csv\", \"w\") as f:\n    writer = csv.writer(f)\n    writer.writerows(zip(y_test,predictions))\n\n\n\n');
/*!40000 ALTER TABLE `template_copies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_template_index`
--

DROP TABLE IF EXISTS `user_template_index`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_template_index` (
  `lineNo` int(11) DEFAULT NULL,
  `layerId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_template_index`
--

LOCK TABLES `user_template_index` WRITE;
/*!40000 ALTER TABLE `user_template_index` DISABLE KEYS */;
INSERT INTO `user_template_index` VALUES (7,'userModel'),(13,'network.compile'),(11,'87ba7b08-0557-475f-839f-0729f70c031'),(9,'87ba7b08-0557-475f-839f-0729f70c039');
/*!40000 ALTER TABLE `user_template_index` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 17:22:34
