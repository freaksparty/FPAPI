const jwtDecode = require('jwt-decode');

class JWT {
  exp(token) {
    return this._decode(token).exp * 1000 || false;
  }

  _decode(token) {
    return jwtDecode(token) || {};
  }
};
  
module.exports = JWT;