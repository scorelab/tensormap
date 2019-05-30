# TensorMap

TensorMap is a web application that will allow the users to create machine learning algorithms visually. TensorMap supports reverse engineering of the visual layout to a Tensorflow implementation in preferred languages. The goal of the project is to let the beginners play with machine learning algorithms in Tensorflow without less background knowledge about the library.

## Getting Started
Follow these steps to set up TensorMap on your local machine.

First clone this repo by running
```bash

git clone https://github.com/scorelab/TensorMap.git
```````````````````````````


### Setting up Frontend

#### Prerequisites
* Node.js
* Yarn
* Npm

```bash
cd Tensormap
yarn install
npm start
```
### Setting up Backend

First, go into 'tensormap-server' folder

```bash
cd Tensormap
cd tensormap-server
```

Then install all the required packages by running

```bash
pip install -r requirements.txt
```

To start the server run

```bash
python run.py
```



## Built With

* [Reactjs](https://reactjs.org/docs/getting-started.html) : Frontend  
* [Flask](http://flask.pocoo.org/) : Backend
* [TensorFlow - Keras](https://www.tensorflow.org/) : Model implemetation 

## Contributing

Please read [CONTRIBUTING.md](https://github.com/scorelab/TensorMap/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [git](https://git-scm.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors



## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/scorelab/TensorMap/blob/master/LICENSE) file for details
