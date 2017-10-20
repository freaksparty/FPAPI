const successWrapper = (callback, completeCallback) => {
  return (response) => {
    new Promise(resolve => resolve()).then(() => {
      callback && callback(response.body(false), response.statusCode(), response.headers());
      completeCallback && completeCallback();
    });
  }
}

const errorWrapper = (callback, completeCallback) => {
  return (error) => {
    new Promise(resolve => resolve()).then(() => {
      callback && callback(error.response.data, error.response.statusCode, error.response.headers);
      completeCallback && completeCallback();
    });
  }
}

class ApiCall {
  constructor (call) {
    this.call = call;
  }

  subscribe (successCallback, errorCallback, completeCallback) {
    this.call.then(successWrapper(successCallback, completeCallback))
             .catch(errorWrapper(errorCallback, completeCallback));
  }
};

module.exports = ApiCall;
