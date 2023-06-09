import axios from "../shared/Axios";
import * as urls from "../constants/Urls";
import * as strings from "../constants/Strings";

export const validateModel = async (data) => {
    return axios.post(urls.BACKEND_VALIDATE_MODEL, data)
      .then(resp => {
        if (resp.data.success === true) {
          return true;
        }
        return false;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  };

export const getAllModels = async () => {
    return axios.get(urls.BACKEND_GET_ALL_MODELS)
      .then(resp => {
        if (resp.data.success === true) {
          return resp.data.data
        }
        return [];
      }).catch(err =>{
        console.error(err);
        throw(err)
      })
  };

export const download_code = async (model_name) =>  {
  const data = {"model_name": model_name}
  return axios.post(urls.BACKEND_DOWNLOAD_CODE, data)
    .then(resp => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([resp.data], { type: "application/octet-stream" }));
      link.download = data.selectedModel + strings.MODEL_EXTENSION;

      document.body.appendChild(link);

      link.click();

      setTimeout(function () {
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, 200);
    })
    .catch(err => {
      console.error(err);
      throw err
    });
};

export const runModel = async (modelName) => {
  const data = {
    model_name: modelName
  };

  return axios.post(urls.BACKEND_RUN_MODEL, data)
    .then(resp => {
      if (resp.data.success === true) {
        return resp.data.message;
      }
      throw new Error(resp.data.message);
    })
    .catch(err => {
      throw err
    })
}