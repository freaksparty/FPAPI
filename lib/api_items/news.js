const ApiItem = require('../api_item.js');

class NewsApiItem extends ApiItem {
  constructor(api, id, context, root) {
    super({
      api,
      id,
      root,
      context,
      url: 'news',
      base: 'news'
    });
  }

  _mocked(id) {
    return {};
  }
};

module.exports = NewsApiItem;
