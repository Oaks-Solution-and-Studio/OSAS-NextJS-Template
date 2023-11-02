import APIHeader from "../configs/APIHeader";
import APIPaths from "../configs/APIPaths";
import APIResult from "../configs/APIResult";

import { debugPrint } from "./Utilities";

async function callAPI(body, target, defaultReturn) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": APIHeader.contentType,
    },
    body: JSON.stringify(body),
  };

  debugPrint(target);
  debugPrint(body);

  var proceed = true;

  if (proceed) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return await fetch(target, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        return responseData;
      })
      .catch(error => {
        return defaultReturn;
      });
  } else {
    return defaultReturn;
  }
}

export async function login() {
  var body = {};
  var target = APIPaths.apiEndPoint + APIPaths.login;

  return callAPI(body, target, {
    status: APIResult.TIME_OUT,
    status_message: "-",
    result: [],
  });
}
