const ApiItem = require('../api_item.js');
const ActivitiesApiItem = require('./activities');
const SponsorsApiItem = require('./sponsors');
const NewsApiItem = require('./news');

class EventsApiItem extends ApiItem {
  constructor(api, id, context, root) {
    super({
      api,
      id,
      context,
      root,
      url: 'events',
    });
  }

  activities(id=null) {
    return new ActivitiesApiItem(this._one(), id, this.context, this);
  }

  sponsors(id=null) {
    return new SponsorsApiItem(this._one(), id, this.context, this);
  }

  news(id=null) {
    return new NewsApiItem(this._one(), id, this.context, this);
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
