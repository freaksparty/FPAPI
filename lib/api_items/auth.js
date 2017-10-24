const ApiItem = require('../api_item.js');
const ApiCall = require('../api_call.js');
const Auth = require('../auth/auth.js');

const buildSuccess = (data, status, headers) => {
  return {
    body: () => {return data},
    statusCode: () => {return status},
    headers: () => {return headers}
  }
};

const buildError = (error, status, headers) => {
  return {
    response: {
      data: error,
      statusCode: status,
      headers: headers
    }
  }
};

class SignInPromise {
  constructor(auth) {
    this._auth = auth;
  }

  promise(api, context = (fn) => (fn())) {
    return new Promise((resolve, reject) => {
      const call = new ApiCall(api, context);

      call.subscribe(
        (data, status, headers) => resolve(this._onSuccess(resolve, data, status, headers)),
        (error, status, headers) => reject(this._onError(reject, error, status, headers))
      );
    });
  }

  _onSuccess(resolve, data, status, headers) {
    this._auth.signOut();
    this._auth.signIn(data.access_token, data.refresh_token);

    return buildSuccess(data, status, headers);
  }

  _onError(reject, data, status, headers) {
    this._auth.signOut();
    return buildError(data, status, headers);
  }
}

class AuthApiItem extends ApiItem {
  constructor(api, context, root) {
    super({
      api,
      root,
      context,
      url: 'auth',
    });

    this._auth = new Auth();
  }

  signIn(email, password) {
    const promiseCall = new SignInPromise(this._auth);
    const promise = promiseCall.promise(this._all().post(this._prepareData({email, password})));

    return new ApiCall(promise, this.context);
  }

  signOut() {
    
  }
};

module.exports = AuthApiItem;
