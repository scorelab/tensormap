## Backend setup and architecture


First, make sure you have MySQL server and Python 3.x installed in your system. 
(the recommended version is python 3.9)


### Installation instructions

* All the backend related required libraries are listed in the **requirements.txt** file. 
  Before installing the libraries, install a python virtual environment. You can install 
  the python virtual environment by following [this](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) 
  guide. Follow the relevant guide based on your operating system. 


  
* Then Active the virtual environment and run the following
  command to install the pip packages to your virtual 
  environment. 
  
`pip install -r requirements.txt`

* To set up the database, open your MySQL console and create a database. 
  And add a .env file and add the following details as shown below.
  
```
secret_key = 'Your secret key'
db_name = 'database name'
db_host = 'host ip address'
db_password = 'database user password'
db_user = 'database username'
```

* Now the backend is ready to go ! You can run the backend
  by the following command. 
  
`python app.py`


### Application Architecture

The application architecture is set up as follows. 

```
.
├── README.md
├── app.py
├── .env
├── .gitignore
├── config.yaml
├── endpoints
│   ├── DataProcess
│   ├── DataUpload
│   └── DeepLearning
├── requirements.txt
├── setup
│   ├── settings.py
│   └── urls.py
├── shared
│   ├── request
│   │   └── response.py
│   ├── services
│   │   └── config.py
│   └── utils.py
├── static
└── templates
```

##### TODO: Describe architecture and how to do incremental developments.
