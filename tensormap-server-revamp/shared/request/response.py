

def generic_response(status_code, success, message, data=None):
    response = {
        "success": success,
        "message": message,
        "data": data
    }
    return response, status_code
