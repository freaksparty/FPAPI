const store = require('store');
const JWT = require('./jwt');

const SIGNED_IN_THRESHOLD = 1 * 60 * 1000;
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

class Auth {
  constructor() {
    this._jwt = new JWT();
  }

  getAccessToken() {
    return this._getToken(ACCESS_TOKEN);
  }

  hasValidToken() {
    return !this._isTimedOut(ACCESS_TOKEN);
  }

  isSignedIn() {
    return !this._isTimedOut(REFRESH_TOKEN);
  }

  signIn(accessToken, refreshToken) {
    this._addToken(ACCESS_TOKEN, accessToken);
    this._addToken(REFRESH_TOKEN, refreshToken);
  }

  signOut() {
    this._removeToken(ACCESS_TOKEN);
    this._removeToken(REFRESH_TOKEN);
  }

  exchange(accessToken) {
    this._removeToken(ACCESS_TOKEN);
    this._addToken(ACCESS_TOKEN, accessToken);
  }

  _addToken(type, token) {
    store.set(type, token);
  }

  _getToken(type) {
    return store.get(type);
  }

  _removeToken(type) {
    store.remove(type);
  }

  _isTimedOut(type) {
    const now = new Date().getTime();
    const token = this._getToken(type);
    const exp = this._jwt.exp(token);
    const threshold = exp - SIGNED_IN_THRESHOLD;

    return !!exp ? now > threshold : true;
  }

};
  
module.exports = Auth;