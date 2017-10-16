const ApiItem = require('../api_item.js');
const ActivitiesApiItem = require('./activities');
const SponsorsApiItem = require('./sponsors');

class EventsApiItem extends ApiItem {
  constructor(api, id, root) {
    super({
      api,
      id,
      root,
      url: 'events',
    });
  }

  activities(id=null) {
    return new ActivitiesApiItem(this._one(), id, this);
  }

  sponsors(id=null) {
    return new SponsorsApiItem(this._one(), id, this);
  }

  nested() {
    var eventsAllApi = new EventsApiItem(this._one(), null, this);
    eventsAllApi.url = 'all';

    return eventsAllApi;
  }

  _mocked(id) {
    return {
      name: this._mock().name(id, 'event'),
      description: this._mock().text(),
      num_participants: this._mock().participants(),
      minimum_age: this._mock().age(18),
      price: this._mock().price(),
      date_start: this._mock().date(),
      date_end: this._mock().date(),
      reg_date_open: this._mock().datetime(),
      reg_date_close: this._mock().datetime(),
      rules: this._mock().text()
    };
  }
};

module.exports = EventsApiItem;
