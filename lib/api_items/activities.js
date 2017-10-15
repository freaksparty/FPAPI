const ApiItem = require('../api_item.js');

class ActivitiesApiItem extends ApiItem {
  constructor(api, id, root) {
    super({
      api,
      id,
      root,
      url: 'activities',
      base: 'activity'
    });
  }

  _mocked(id) {
    return {
      name: this._mock().name(id),
      description: this._mock().text(),
      image_url: this._mock().url(),
      num_participants: this._mock().participants(id),
      type: this._mock().random_range(['conference', 'production', 'tournament', 'workshop']),
      official: this._mock().boolean(),
      date_start: this._mock().datetime(),
      date_end: this._mock().datetime(),
      reg_date_open: this._mock().datetime(),
      reg_date_close: this._mock().datetime()
    };
  }
};

module.exports = ActivitiesApiItem;