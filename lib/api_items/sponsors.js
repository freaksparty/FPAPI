const ApiItem = require('../api_item.js');

class SponsorsApiItem extends ApiItem {
  constructor(api, id, context, root) {
    super({
      api,
      id,
      root,
      context,
      url: 'sponsors',
      base: 'sponsor'
    });
  }

  _mocked(id) {
    return {
      name: this._mock().name(id, this.base),
      image_url: this._mock().image_url(),
      url: this._mock().url(),
    };
  }
};

module.exports = SponsorsApiItem;
