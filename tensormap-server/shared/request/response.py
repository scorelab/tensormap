def generic_response(status_code, success, message, data=None):
    """
    This function handles all the requests going through the backend

    :rtype: object
    """
    response = {"success": success, "message": message, "data": data}
    return response, status_code
