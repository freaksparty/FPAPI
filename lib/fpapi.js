import 'whatwg-fetch';
import restful, { fetchBackend } from 'restful.js';

const ApiItem = require('./api_item.js');
const EventsApiItem = require('./api_items/events.js');
const UsersApiItem = require('./api_items/users.js');

class FPAPI extends ApiItem {
  constructor(api) {
    super({api: api})
  }

  events(id=null) {
      return new EventsApiItem(this.api, id, this);
  }

  users(id=null) {
      return new UsersApiItem(this.api, id);
  }
};

module.exports = {
  create: (url) => {
    return new FPAPI(restful(url, fetchBackend(fetch)));
  }
};
