const ApiItem = require('../api_item.js');

class NewsApiItem extends ApiItem {
  constructor(api, id, root) {
    super({
      api,
      id,
      root,
      url: 'news',
      base: 'news'
    });
  }

  _mocked(id) {
    return {};
  }
};

module.exports = NewsApiItem;
