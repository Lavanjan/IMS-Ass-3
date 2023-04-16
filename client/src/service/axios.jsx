import axios from "axios";
import { API_URI } from "../shared/constants";
export const Method = { POST: "post", GET: "get", PUT: "put" };

function addParamsToURL(url, params) {
  if (params) {
    let temp = url;
    temp = temp + "/" + params;
    return temp;
  }
  return url;
}

const getHeaders = async (token, adHeaders) => {
  const accessToken = JSON.parse(localStorage.getItem("store"));
  if (token !== null) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        ...adHeaders,
        Authorization: `Bearer ${accessToken.authReducer.data.token}`,
      },
    };
  } else {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        ...adHeaders,
      },
    };
  }
};

export default async function api(
  method,
  header,
  endPoint,
  token,
  body,
  params
) {
  let customURL = addParamsToURL(API_URI + endPoint, params);
  let headers = await getHeaders(token, header === null ? {} : header);

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: customURL,
      data: body,
      headers: headers.headers,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error.response);
      });
  });
}
