from shared.constants import *

def test_GetDataMetrics_success(client,db_session,add_sample_file):
    file_id = 1
    response = client.get(f'/api/v1/data/process/data_metrics/{file_id}')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] == True
    assert data['message'] == 'Dataset metrics generated succesfully'
    assert 'data_types' in data['data']

def test_get_data_metrics_file_not_found(client,db_session):
    response = client.get('/api/v1/data/process/data_metrics/3')
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] == False
    assert data['message'] == "File doesn't exist in DB"

def test_add_target_service_file_exists(client,db_session,add_sample_file):
    response = client.post('/api/v1/data/process/target',json={FILE_ID: 1, FILE_TARGET_FIELD: 'Spending Score (1-100)'})
    data = response.get_json()
    assert data['success'] == True
    assert data['message'] == 'Target field added successfully'
    assert response.status_code == 201

def test_add_target_service_file_not_found(client,db_session,add_sample_file):
    response = client.post('/api/v1/data/process/target',json={FILE_ID: 2, FILE_TARGET_FIELD: 'Spending Score (1-100)'})
    data = response.get_json()
    assert data['success'] == False
    assert data['message'] == "File doesn't exist in DB"
    assert response.status_code == 400

def test_get_all_targets_service(client,db_session,add_sample_file):
    response = client.get('/api/v1/data/process/target')
    data = response.get_json()
    assert response.status_code == 200
    assert data["success"] == True
    assert data["message"] == "Target fields of all files received successfully"
    assert data["data"][0][FILE_NAME] == "test"