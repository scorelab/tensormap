## Backend setup and architecture


First, make sure you have MySQL server and Python 3.x installed in your system.
(the recommended version is python 3.9)


### Installation instructions

* All the backend related required libraries are listed in the **requirements.txt** file.
  Before installing the libraries, install a python virtual environment. You can install
  the python virtual environment by following [this](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
  guide. Follow the relevant guide based on your operating system.

* run the setup script using `./setup.sh` to create a virtual environment and activate it.

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

* set up the FLASK_APP environment variable:

`export FLASK_APP=app.py`

* Now the backend is ready to go ! You can run the backend
  by the following command.

`python app.py`
 or
`flask run`


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
├── migrations
│   ├── README
│   ├── __pycache__
│   │   └── env.cpython-39.pyc
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions
│       ├── db_migration_table_v1.py

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
├── templates
|__ tests
    |_ unit
    |_ test.csv
    |_ conftest.py
```

##### TODO: Describe architecture and how to do incremental developments.

### Database modifications

Once you change to database models or create one, it will not affect as soon you have done it.
You have to migrate the database accordingly. To migrate database, please follow the below steps.

* run `flask db migrate`
This will generate migration scripts in `migrations/versions` directory.

* To apply migrations to the database, run `flask db upgrade`

* Don't forget to commit the generated migration scripts to code.

## Testing
For the backend, `PyTest` is used for testing. Sample unit tests and configurations are added inside the `tests` directory. For database tests make sure to create a mock database and add a sample datafile using `db_session` and `add_sample_file` fixtures in `conftest.py`.
