from shared.request.response import generic_response


def model_validate_service(incoming):
    return generic_response(status_code=200, success=True, message="Done")
