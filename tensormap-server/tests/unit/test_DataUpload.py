from shared.constants import *

def test_get_all_files_service(client,db_session,add_sample_file):
    response = client.get('/api/v1/data/upload/file')
    
    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] == True
    assert data["message"] == "Saved files found successfully"
    
    first_file = data["data"][0]
    assert first_file[FILE_NAME] == "test"
    assert first_file[FILE_TYPE] == "csv"
    assert first_file[FILE_ID] == 1