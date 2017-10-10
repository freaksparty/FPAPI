const mock = require('./utils/mock.js');
const ApiCall = require('./api_call.js');

class ApiItem {
  constructor(options) {
    this.api = options.api;
    this.url = options.url || '';
    this.id = options.id || null;
    this.base = options.base || null;
  }

  create(data) {
    return new ApiCall(this._all().post(this._prepareData(data)));
  }

  update(data) {
    return new ApiCall(this._one().put(this._prepareData(data)));
  }

  delete() {
    return new ApiCall(this._one().delete());
  }

  one() {
    return new ApiCall(this._one().get())
  }

  all() {
    return new ApiCall(this._all().getAll())
  }

  mock_one(id) {
    return this._mocked(id);
  }

  mock_all(size) {
    var items = [];

    for (var i = 0; i < size; i++) {
      items.push(this.mock_one(i));
    }

    return items;
  }

  _all() {
    return this.api.all(this.url);
  }

  _one() {
    return this.api.one(this.url, this.id);
  }

  _prepareData(data) {
    var struct={};

    if(this.base == null) {
      struct = data;
    } else {
      struct[this.base] = data;
    }

    return struct;
  }

  _mock() {
    return mock;
  }

  _mocked() {
    return {};
  }
};

module.exports = ApiItem;
