const successWrapper = (callback, completeCallback, context) => {
  return (response) => {
      callback && context(() => callback(response.body(false), response.statusCode(), response.headers()));
      completeCallback && context(() => completeCallback());
  }
}

const errorWrapper = (callback, completeCallback, context) => {
  return (error) => {
      callback && context(() => callback(error.response.data, error.response.statusCode, error.response.headers));
      completeCallback && context(() => completeCallback());
  }
}

class ApiCall {
  constructor (call, context) {
    this.call = call;
    this.context = context;
  }

  subscribe (successCallback, errorCallback, completeCallback) {
    this.call.then(successWrapper(successCallback, completeCallback, this.context))
             .catch(errorWrapper(errorCallback, completeCallback, this.context));
  }
};

module.exports = ApiCall;
