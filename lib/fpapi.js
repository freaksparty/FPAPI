import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

const ApiItem = require('./api_item.js');
const EventsApiItem = require('./api_items/events.js');
const UsersApiItem = require('./api_items/users.js');
const AuthApiItem = require('./api_items/auth.js');

class FPAPI extends ApiItem {
  constructor(api, context) {
    super({api, context});
  }

  events(id=null) {
      return new EventsApiItem(this.api, id, this.context, this);
  }

  users(id=null) {
      return new UsersApiItem(this.api, id, this.context);
  }

  auth() {
    return new AuthApiItem(this.api, this.context, this);
  }

  authDebug() {
    return require('./auth/auth.js');
  }
};

module.exports = {
  create: (url, context) => {
    return new FPAPI(restful(url, fetchBackend(fetch)), context);
  }
};
