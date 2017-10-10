const ApiItem = require('../api_item.js');

class EventsApiItem extends ApiItem {
  constructor(api, id, root) {
    super({
      api,
      id,
      url: 'events'
    });

    this.rootLink = root;
  }

  activities(id=null) {
    return new ApiItem(this._one(), 'activities', id);
  }

  root() {
    return this.rootLink;
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
