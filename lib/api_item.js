const mock = require('./utils/mock.js');
const ApiCall = require('./api_call.js');

class ApiItem {
  constructor(options) {
    this.api = options.api;
    this.url = options.url || '';
    this.key = options.key || options.url || '';
    this.id = options.id || null;
    this.base = options.base || null;
    this.root = options.root || null;
    this.context = options.context || ((fn) => fn());
  }

  create(data) {
    return new ApiCall(this._all().post(this._prepareData(data)), this.context);
  }

  update(data) {
    return new ApiCall(this._one().put(this._prepareData(data)), this.context);
  }

  delete() {
    return new ApiCall(this._one().delete(), this.context);
  }

  one() {
    return new ApiCall(this._one().get(), this.context)
  }

  all() {
    return new ApiCall(this._all().getAll(), this.context)
  }

  mock_one(id, alone) {
    var mock = this._mocked(id);

    return alone ? mock : this._generate_mock(mock);
  }

  mock_all(size, alone) {
    var items = [];

    for (var i = 0; i < size; i++) {
      items.push(this.mock_one(i, true));
    }

    return alone ? items : this._generate_mock(items);
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

  _generate_mock(data) {
    if(this.root == null) {
      return data;
    } else {
      var mock_tree = this.root.mock_one(1);
      mock_tree[this.key] = data;
      return mock_tree;
    }
  }

  _mock() {
    return mock;
  }

  _mocked() {
    return {};
  }
};

module.exports = ApiItem;
