import axios from "../shared/Axios";
import * as urls from "../constants/Urls";

export const getAllFiles =  async () => {
  return axios.get(urls.BACKEND_GET_ALL_FILES)
    .then(resp => {
      if (resp.data.success === true) {
        return resp.data.data
      }
      return []; 
    })
    .catch(err=> {
      console.error(err)
      throw(err)
    })
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('data', file);

  return axios.post(urls.BACKEND_FILE_UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(resp => {
      if (resp.data.success === true) {
        return true;
      }
      return false;
    })
    .catch(err => {
      console.error(err);
      throw err
    });
};


export const setTargetField = async (fileId, targetField) => {
  const data = {
    file_id: fileId,
    target: targetField
  };

  return axios.post(urls.BACKEND_ADD_TARGET_FIELD, data)
    .then(resp => {
      if (resp.data.success === true) {
        return true;
      }
      return false;
    })
    .catch(err => {
      console.error(err.response.data.message);
      return false;
    });
};
